// Host unit tests for the sleeve firmware core (no hardware). Build and run: make -C PARAMPARA/firmware test
#include <cstdio>
#include <cstdlib>
#include <map>
#include <random>
#include <vector>
#include "../src/sleeve.h"
#include "../src/teaching.h"

using namespace parampara;

static int failures = 0, checks = 0;
#define CHECK(cond, msg) do { ++checks; if (!(cond)) { ++failures; std::printf("FAIL: %s (%s:%d)\n", msg, __FILE__, __LINE__); } } while (0)

// Mock bus behind a TCA9548A: devices are visible only on the selected channel.
struct MockBus : I2CBus {
  struct Txn { int channel; uint8_t addr, reg; std::vector<uint8_t> data; bool raw; };
  std::vector<Txn> log;
  int channel = -1;
  std::map<std::pair<int, uint8_t>, std::map<uint8_t, uint8_t>> regs;   // (channel, addr) -> registers
  void addDevice(int ch, uint8_t addr) { regs[{ch, addr}]; }
  bool present(uint8_t addr) { return regs.count({channel, addr}) > 0; }
  bool writeRaw(uint8_t addr, uint8_t value) override {
    log.push_back({channel, addr, 0, {value}, true});
    if (addr != 0x70) return false;
    channel = -1; for (int c = 0; c < 8; ++c) if (value == (1u << c)) channel = c;
    return true;
  }
  bool write(uint8_t addr, uint8_t reg, const uint8_t* d, size_t n) override {
    log.push_back({channel, addr, reg, std::vector<uint8_t>(d, d + n), false});
    if (!present(addr)) return false;
    for (size_t i = 0; i < n; ++i) regs[{channel, addr}][uint8_t(reg + (reg == 0x5E ? 0 : i))] = d[i];
    if (addr != 0x5A && reg == 0x59 && n == 1 && d[0] == 0x01) regs[{channel, addr}][0x21] = 0x01;   // BMI270 init done
    return true;
  }
  bool read(uint8_t addr, uint8_t reg, uint8_t* out, size_t n) override {
    if (!present(addr)) return false;
    for (size_t i = 0; i < n; ++i) out[i] = regs[{channel, addr}][uint8_t(reg + i)];
    return true;
  }
};
struct MockClock : Clock { int64_t t = 0; int64_t micros() override { return t; } void delayMicros(uint32_t us) override { t += us; } };

static void setupBuses(MockBus& arm, MockBus& hand) {
  for (int s = 0; s < 9; ++s) { Route r = imuRoute(Site(s)); MockBus& b = r.bus ? hand : arm; b.addDevice(r.channel, r.addr); b.regs[{r.channel, r.addr}][0x00] = 0x24; }
  for (int m = 0; m < 8; ++m) { Route r = motorRoute(Motor(m)); (r.bus ? hand : arm).addDevice(r.channel, r.addr); }
}

int main() {
  // 1. Address map: no two devices with the same address on the same switch channel.
  {
    std::map<std::tuple<int, int, int>, int> seen;
    for (int s = 0; s < 9; ++s) { Route r = imuRoute(Site(s)); seen[{r.bus, r.channel, r.addr}]++; }
    for (int m = 0; m < 8; ++m) { Route r = motorRoute(Motor(m)); seen[{r.bus, r.channel, r.addr}]++; }
    bool unique = true; for (auto& kv : seen) if (kv.second != 1) unique = false;
    CHECK(unique, "every (bus, channel, address) is unique");
    CHECK(seen.size() == 17, "9 IMUs + 8 motors");
  }
  // 2. Full bring-up on mock buses: every device initialised through the right channel.
  MockBus arm, hand; MockClock clk; setupBuses(arm, hand);
  std::vector<uint8_t> blob(8192, 0xAB);                 // stands in for Bosch's configuration file
  Sleeve sleeve(arm, hand, clk);
  CHECK(sleeve.begin(blob.data(), blob.size()), "sleeve.begin succeeds with all 17 devices present");
  {
    bool allSelected = true;
    for (auto* b : {&arm, &hand}) for (auto& t : b->log) if (!t.raw && t.channel < 0) allSelected = false;
    CHECK(allSelected, "no device access happens without a switch channel selected");
  }
  // 3. DRV2605L set-up for the C08-005 LRA.
  {
    uint8_t rated = Drv2605l::ratedVoltageCode(1.8, 235.0), od = Drv2605l::overdriveCode(2.55);
    CHECK(rated == 70, "rated-voltage code for 1.8 V rms at 235 Hz is 70 (0x46)");
    CHECK(od == 120, "overdrive code for 2.55 V peak is 120 (0x78)");
    auto& r = hand.regs[{2, 0x5A}];
    CHECK(r[0x1A] & 0x80, "middle-finger driver set to LRA mode");
    CHECK(r[0x03] == 6, "LRA library selected");
    CHECK(r[0x01] == 0x05, "driver left in real-time playback mode");
  }
  // 4. BMI270 configured for 200 Hz after the configuration upload.
  {
    auto& r = arm.regs[{1, 0x68}];
    CHECK(r[0x7D] == 0x0E && r[0x40] == 0xA9 && r[0x42] == 0xA9, "upper-arm IMU: sensors on, 200 Hz");
    MockBus noChip; MockClock c2; noChip.addDevice(-1, 0x68); Bmi270 bad(noChip, c2, 0x68);
    CHECK(!bad.init(blob.data(), blob.size()), "init fails when the chip ID is wrong");
  }
  // 5. Reading a sample decodes little-endian words.
  {
    auto& r = hand.regs[{3, 0x68}];
    int16_t v[6] = {1000, -2000, 4096, -1, 300, -300};
    for (int i = 0; i < 6; ++i) { r[uint8_t(0x0C + 2 * i)] = uint8_t(v[i] & 0xFF); r[uint8_t(0x0D + 2 * i)] = uint8_t((uint16_t(v[i]) >> 8) & 0xFF); }
    Bmi270::Sample s{}; CHECK(sleeve.readImu(Site::Ring, s), "ring-finger IMU read");
    CHECK(s.ax == 1000 && s.ay == -2000 && s.az == 4096 && s.gx == -1 && s.gy == 300 && s.gz == -300, "sample decoded");
  }
  // 6. Motor command goes to the right channel; repeated commands on one channel do not reselect.
  {
    size_t before = hand.log.size();
    CHECK(sleeve.motor(Motor::Index, 200), "index motor on");
    CHECK((hand.regs[{1, 0x5A}][0x02] == 200), "RTP amplitude written on channel 1");
    sleeve.motor(Motor::Index, 0);
    int selects = 0; for (size_t i = before; i < hand.log.size(); ++i) if (hand.log[i].raw) ++selects;
    CHECK(selects == 1, "one switch write for two commands on the same channel");
  }
  // 7. Fade rule.
  {
    CHECK(std::fabs(nextGuidance(1.0, 0.0) - 1.0) < 1e-9, "no skill keeps full guidance");
    CHECK(std::fabs(nextGuidance(1.0, 0.85) - 0.8) < 1e-9, "target reached: guidance falls by at most 0.2");
    CHECK(std::fabs(nextGuidance(0.0, 0.2) - 0.2) < 1e-9, "struggle: guidance returns by at most 0.2");
    double g = 1.0; for (int i = 0; i < 10; ++i) g = nextGuidance(g, 0.9);
    CHECK(g == 0.0, "sustained good unaided play fades guidance to zero");
    int cues1 = 0, cues2 = 0; for (int b = 0; b < 16; ++b) { cues1 += cueOnBeat(0.9, b); cues2 += cueOnBeat(0.3, b); }
    CHECK(cues1 == 16 && cues2 == 4 && !cueOnBeat(0.0, 0), "cue density falls with guidance");
    CHECK(isCheckCycle(0) && !isCheckCycle(1) && isCheckCycle(4), "check cycles at start and every fourth");
  }
  // 8. Cue window ends before the stroke.
  {
    CueWindow w = cueWindow(1000000);
    CHECK(w.off_us < 1000000 && w.off_us - w.on_us == 40000, "40 ms pulse ending 80 ms before the stroke");
  }
  // 9. Scoring.
  {
    const int64_t P = 750000; std::vector<int64_t> T; std::vector<bool> both;
    const bool theka[16] = {1,1,1,1, 1,1,1,1, 1,0,0,0, 0,1,1,1};
    for (int i = 0; i < 16; ++i) { T.push_back(i * P); both.push_back(theka[i]); }
    std::vector<Tap> perfect; for (int i = 0; i < 16; ++i) { perfect.push_back({T[i], false}); if (both[i]) perfect.push_back({T[i], true}); }
    CHECK(std::fabs(scoreCycle(T, both, perfect, P) - 1.0) < 1e-9, "perfect cycle scores 1");
    std::vector<Tap> late; for (auto t : perfect) late.push_back({t.t_us + 60000, t.left});
    CHECK(std::fabs(scoreCycle(T, both, late, P) - 0.75) < 1e-9, "60 ms late everywhere scores 0.75");
    CHECK(scoreCycle(T, both, {}, P) == 0.0, "silence scores 0");
  }
  // 10. Clock sync: 50 ppm drift, 2 ms offset, 200 us jitter, 5% outliers -> error well under 1 ms.
  {
    std::mt19937 rng(7); std::normal_distribution<double> jit(0, 200); std::uniform_real_distribution<double> u(0, 1);
    std::vector<std::pair<int64_t, int64_t>> pts;
    for (int k = 0; k < 120; ++k) {
      int64_t local = 1000000LL * k;                    // one exchange per second
      double ref = local * (1 + 50e-6) + 2000 + jit(rng) + (u(rng) < 0.05 ? 8000 : 0);
      pts.push_back({local, int64_t(ref)});
    }
    ClockFit f = fitClock(pts);
    double worst = 0; for (int k = 0; k < 120; ++k) { int64_t l = 1000000LL * k; worst = std::max(worst, std::fabs(f.toRef(l) - (l * (1 + 50e-6) + 2000))); }
    std::printf("clock sync: worst error %.0f us over 2 minutes\n", worst);
    CHECK(worst < 500, "clock sync error under 0.5 ms");
  }
  std::printf("%d checks, %d failures\n", checks, failures);
  return failures ? 1 : 0;
}
