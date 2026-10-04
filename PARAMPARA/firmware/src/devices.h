// Device drivers for the sleeve: TCA9548A I2C switch, DRV2605L haptic driver, BMI270 IMU.
// Register numbers follow the manufacturers' datasheets (TI SCPS207, TI SLOS854, Bosch BST-BMI270-DS000).
#pragma once
#include <cmath>
#include "hal.h"

namespace parampara {

// ---- TCA9548A: one control byte, bit n enables channel n ---------------------------------------
class Tca9548a {
 public:
  Tca9548a(I2CBus& bus, uint8_t addr = 0x70) : bus_(bus), addr_(addr) {}
  bool select(int channel) {
    if (channel == current_) return true;            // avoid redundant bus traffic
    uint8_t mask = channel < 0 ? 0 : uint8_t(1u << channel);
    if (!bus_.writeRaw(addr_, mask)) return false;
    current_ = channel;
    return true;
  }
  int current() const { return current_; }
 private:
  I2CBus& bus_;
  uint8_t addr_;
  int current_ = -2;                                  // unknown at power-up
};

// ---- DRV2605L: closed-loop LRA drive, real-time playback (RTP) for timed pulses -----------------
class Drv2605l {
 public:
  static constexpr uint8_t kAddr = 0x5A;              // fixed address, hence the I2C switch
  enum Reg : uint8_t { STATUS = 0x00, MODE = 0x01, RTP = 0x02, LIBRARY = 0x03, GO = 0x0C,
                       RATED_V = 0x16, OD_CLAMP = 0x17, FEEDBACK = 0x1A, CONTROL3 = 0x1D };
  explicit Drv2605l(I2CBus& bus) : bus_(bus) {}

  // Rated-voltage and overdrive codes for an LRA (datasheet rated-voltage programming section).
  // Default sample time 300 us; verify against the datasheet during bring-up.
  static uint8_t ratedVoltageCode(double vrms, double f_hz, double t_sample = 300e-6) {
    double v = vrms * std::sqrt(1.0 - (4.0 * t_sample + 300e-6) * f_hz) / 20.71e-3;
    return uint8_t(std::lround(v));
  }
  static uint8_t overdriveCode(double vpeak) { return uint8_t(std::lround(vpeak / 21.22e-3)); }

  // C08-005: 1.8 V rms, 235 Hz (Precision Microdrives datasheet).
  bool initLra(double vrms = 1.8, double f_hz = 235.0, double vpeak = 2.55) {
    bool ok = writeReg(bus_, kAddr, MODE, 0x00);                         // leave standby
    ok &= writeReg(bus_, kAddr, FEEDBACK, 0x80 | (3 << 4) | (2 << 2));   // N_ERM_LRA=1 (LRA), brake 3, loop gain 2
    ok &= writeReg(bus_, kAddr, RATED_V, ratedVoltageCode(vrms, f_hz));
    ok &= writeReg(bus_, kAddr, OD_CLAMP, overdriveCode(vpeak));
    ok &= writeReg(bus_, kAddr, LIBRARY, 6);                             // LRA library
    ok &= writeReg(bus_, kAddr, CONTROL3, 0x08);                         // RTP data unsigned, closed loop
    ok &= writeReg(bus_, kAddr, MODE, 0x05);                             // real-time playback mode
    ok &= writeReg(bus_, kAddr, RTP, 0x00);                              // silent
    return ok;
  }
  // Amplitude 0..255 in RTP mode; the scheduler turns it on and off at precise times.
  bool setAmplitude(uint8_t amp) { return writeReg(bus_, kAddr, RTP, amp); }
 private:
  I2CBus& bus_;
};

// ---- BMI270: accelerometer + gyroscope at 200 Hz ------------------------------------------------
class Bmi270 {
 public:
  enum Reg : uint8_t { CHIP_ID = 0x00, DATA_ACC = 0x0C, INTERNAL_STATUS = 0x21, ACC_CONF = 0x40, ACC_RANGE = 0x41,
                       GYR_CONF = 0x42, GYR_RANGE = 0x43, INIT_CTRL = 0x59, INIT_DATA = 0x5E, PWR_CONF = 0x7C, PWR_CTRL = 0x7D };
  static constexpr uint8_t kChipId = 0x24;
  struct Sample { int16_t ax, ay, az, gx, gy, gz; };

  Bmi270(I2CBus& bus, Clock& clk, uint8_t addr) : bus_(bus), clk_(clk), addr_(addr) {}

  // `config` is Bosch's 8 KB configuration file (bmi270_config_file[] in the BSD-3-Clause BMI270_SensorAPI).
  bool init(const uint8_t* config, size_t len) {
    uint8_t id = 0;
    if (!readReg(bus_, addr_, CHIP_ID, id) || id != kChipId) return false;
    writeReg(bus_, addr_, PWR_CONF, 0x00);           // advanced power save off
    clk_.delayMicros(450);
    writeReg(bus_, addr_, INIT_CTRL, 0x00);
    const size_t chunk = 32;                          // stays inside common I2C driver buffers
    for (size_t off = 0; off < len; off += chunk) {
      size_t n = (len - off) < chunk ? (len - off) : chunk;
      uint8_t addrBytes[2] = { uint8_t((off / 2) & 0x0F), uint8_t((off / 2) >> 4) };
      bus_.write(addr_, 0x5B, addrBytes, 2);          // INIT_ADDR_0/1, word address
      bus_.write(addr_, INIT_DATA, config + off, n);
    }
    writeReg(bus_, addr_, INIT_CTRL, 0x01);
    clk_.delayMicros(20000);
    uint8_t st = 0;
    if (!readReg(bus_, addr_, INTERNAL_STATUS, st) || (st & 0x0F) != 0x01) return false;
    writeReg(bus_, addr_, PWR_CTRL, 0x0E);            // accelerometer, gyroscope, temperature on
    writeReg(bus_, addr_, ACC_CONF, 0xA9);            // 200 Hz, normal filter, performance mode
    writeReg(bus_, addr_, ACC_RANGE, 0x02);           // +/- 8 g
    writeReg(bus_, addr_, GYR_CONF, 0xA9);            // 200 Hz
    writeReg(bus_, addr_, GYR_RANGE, 0x00);           // +/- 2000 deg/s
    return true;
  }
  bool read(Sample& s) {
    uint8_t b[12];
    if (!bus_.read(addr_, DATA_ACC, b, 12)) return false;
    auto w = [&](int i) { return int16_t(uint16_t(b[i]) | (uint16_t(b[i + 1]) << 8)); };
    s = { w(0), w(2), w(4), w(6), w(8), w(10) };
    return true;
  }
  uint8_t address() const { return addr_; }
 private:
  I2CBus& bus_;
  Clock& clk_;
  uint8_t addr_;
};

}  // namespace parampara
