// Hardware abstraction: the sleeve logic talks to these interfaces only, so it runs unchanged on the
// ESP32-S3 (ESP-IDF i2c_master + esp_timer) and on a PC with a mock bus for unit tests.
#pragma once
#include <cstddef>
#include <cstdint>

namespace parampara {

struct I2CBus {
  virtual ~I2CBus() = default;
  // Write `len` bytes starting at register `reg` of 7-bit device `addr`. Returns false on NACK.
  virtual bool write(uint8_t addr, uint8_t reg, const uint8_t* data, size_t len) = 0;
  // Write a raw byte with no register (used by the TCA9548A control register).
  virtual bool writeRaw(uint8_t addr, uint8_t value) = 0;
  // Read `len` bytes starting at register `reg`.
  virtual bool read(uint8_t addr, uint8_t reg, uint8_t* out, size_t len) = 0;
};

struct Clock {
  virtual ~Clock() = default;
  virtual int64_t micros() = 0;           // monotonic microseconds
  virtual void delayMicros(uint32_t us) = 0;
};

inline bool writeReg(I2CBus& bus, uint8_t addr, uint8_t reg, uint8_t value) { return bus.write(addr, reg, &value, 1); }
inline bool readReg(I2CBus& bus, uint8_t addr, uint8_t reg, uint8_t& value) { return bus.read(addr, reg, &value, 1); }

}  // namespace parampara
