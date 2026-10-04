// One sleeve: 9 IMUs and 8 motors on two I2C buses, each behind a TCA9548A (address map: document Figure 6).
#pragma once
#include <array>
#include <vector>
#include "devices.h"

namespace parampara {

enum class Site : uint8_t { Shoulder, UpperArm, Wrist, Hand, Thumb, Index, Middle, Ring, Little };
enum class Motor : uint8_t { Shoulder, Elbow, Wrist, Thumb, Index, Middle, Ring, Little };

struct Route { uint8_t bus; int8_t channel; uint8_t addr; };   // bus 0 = arm (hub), bus 1 = hand board

// Each finger shares one switch channel between its ring IMU (0x68) and its motor driver (0x5A).
inline Route imuRoute(Site s) {
  switch (s) {
    case Site::Shoulder: return {0, 0, 0x68};
    case Site::UpperArm: return {0, 1, 0x68};
    case Site::Wrist:    return {0, 2, 0x68};
    case Site::Hand:     return {1, 0, 0x69};
    case Site::Thumb:    return {1, 0, 0x68};
    case Site::Index:    return {1, 1, 0x68};
    case Site::Middle:   return {1, 2, 0x68};
    case Site::Ring:     return {1, 3, 0x68};
    case Site::Little:   return {1, 4, 0x68};
  }
  return {0, -1, 0};
}
inline Route motorRoute(Motor m) {
  switch (m) {
    case Motor::Shoulder: return {0, 0, Drv2605l::kAddr};
    case Motor::Elbow:    return {0, 1, Drv2605l::kAddr};
    case Motor::Wrist:    return {0, 2, Drv2605l::kAddr};
    case Motor::Thumb:    return {1, 0, Drv2605l::kAddr};
    case Motor::Index:    return {1, 1, Drv2605l::kAddr};
    case Motor::Middle:   return {1, 2, Drv2605l::kAddr};
    case Motor::Ring:     return {1, 3, Drv2605l::kAddr};
    case Motor::Little:   return {1, 4, Drv2605l::kAddr};
  }
  return {0, -1, 0};
}

class Sleeve {
 public:
  Sleeve(I2CBus& arm, I2CBus& hand, Clock& clk) : buses_{&arm, &hand}, clk_(clk), mux_{Tca9548a(arm), Tca9548a(hand)} {}

  bool begin(const uint8_t* bmiConfig, size_t len) {
    bool ok = true;
    for (int m = 0; m < 8; ++m) { Route r = motorRoute(Motor(m)); ok &= mux_[r.bus].select(r.channel); Drv2605l d(*buses_[r.bus]); ok &= d.initLra(); }
    for (int s = 0; s < 9; ++s) { Route r = imuRoute(Site(s)); ok &= mux_[r.bus].select(r.channel); Bmi270 b(*buses_[r.bus], clk_, r.addr); ok &= b.init(bmiConfig, len); }
    return ok;
  }
  bool readImu(Site s, Bmi270::Sample& out) {
    Route r = imuRoute(s);
    if (!mux_[r.bus].select(r.channel)) return false;
    Bmi270 b(*buses_[r.bus], clk_, r.addr);
    return b.read(out);
  }
  bool motor(Motor m, uint8_t amplitude) {
    Route r = motorRoute(m);
    if (!mux_[r.bus].select(r.channel)) return false;
    Drv2605l d(*buses_[r.bus]);
    return d.setAmplitude(amplitude);
  }
  Tca9548a& mux(int bus) { return mux_[bus]; }
 private:
  std::array<I2CBus*, 2> buses_;
  Clock& clk_;
  std::array<Tca9548a, 2> mux_;
};

}  // namespace parampara
