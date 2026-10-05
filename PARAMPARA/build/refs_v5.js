// v5 reference list = v4 list + datasheets, the real-data test and equipment sources (4 October 2026).
const v4 = require("./refs_v4");
const methods = v4.findIndex((r) => r.group && r.group.startsWith("J."));
const head = v4.slice(0, methods);
const tail = v4.slice(methods);

const added = [
  { group: "S. Component datasheets and engineering standards (added in v5)" },
  { key: "bmi270", s: "V", t: "Bosch Sensortec. BMI270 6-axis IMU datasheet (BST-BMI270-DS000). LGA package 2.5 × 3.0 × 0.83 mm; 16-bit accelerometer and gyroscope; 685 µA typical in full operation; 2 KB FIFO; I2C and SPI.", u: "https://cdn.sparkfun.com/assets/9/a/2/9/6/bst-bmi270-ds000.pdf" },
  { key: "drv2605lds", s: "P", t: "Texas Instruments. DRV2605L datasheet (SLOS854): 2–5.2 V supply; VSSOP-10 3.00 × 3.00 mm or DSBGA 1.50 × 1.50 mm; closed-loop LRA auto-resonance; fixed 7-bit I2C address 0x5A (as used in open driver code), so several drivers need an I2C switch.", u: "https://ti.com/lit/gpn/drv2605l" },
  { key: "tca9548a", s: "V", t: "Texas Instruments. TCA9548A low-voltage 8-channel I2C switch (SCPS207): addresses 0x70–0x77, Standard and Fast mode (100 and 400 kHz), one control register enables each channel.", u: "https://www.ti.com/document-viewer/lit/html/SCPS207H/GUID-170D1E15-60B5-418E-AEF2-45D0CB1F14A2" },
  { key: "esp32s3mini", s: "V", t: "Espressif. ESP32-S3-MINI-1 module datasheet: 15.4 × 20.5 × 2.4 mm; Xtensa LX7 dual core up to 240 MHz; 2.4 GHz Wi-Fi and Bluetooth 5 (LE); PCB antenna.", u: "https://www.espressif.com/sites/default/files/documentation/esp32-s3-mini-1_mini-1u_datasheet_en.pdf" },
  { key: "esp32s3power", s: "P", t: "Espressif. ESP32-S3 series datasheet, current consumption: modem-sleep about 33–47 mA at 80 MHz with both cores; Bluetooth LE transmit about 130 mA (typical).", u: "https://documentation.espressif.com/esp32-s3_datasheet_en.html" },
  { key: "espadc", s: "V", t: "Espressif. ESP-IDF ADC continuous mode driver for ESP32-S3: DMA sampling of one or more channels; default maximum sampling frequency 83,333 Hz.", u: "https://docs.espressif.com/projects/esp-idf/en/latest/esp32s3/api-reference/peripherals/adc/adc_continuous.html" },
  { key: "c08005", s: "V", t: "Precision Microdrives. C08-005 8 mm coin linear resonant actuator (LRA): 235 Hz resonance; 8.0 mm diameter × 3.3 mm; 1.8 V rated; 75 mA typical, 102 mA maximum; 1.28 G typical vibration amplitude.", u: "https://www.precisionmicrodrives.com/?p=12426" },
  { key: "mcp73831", s: "V", t: "Microchip. MCP73831 single-cell Li-ion/Li-polymer charge management controller: SOT-23-5 or 2 × 3 mm DFN; charge current programmable from 15 to 500 mA; 4.20 V regulation option (±0.75%); thermal regulation.", u: "https://www.radiolocman.com/datasheet/data.html?di=430997" },
  { key: "murata7bb", s: "V", t: "Murata. 7BB-27-4L0 piezoelectric diaphragm: 27 mm diameter × 0.54 mm; resonant frequency 4.6 kHz; capacitance 20 nF.", u: "https://nz.element14.com/murata/7bb-27-4/piezo-diaphragm-4-6khz-27mm/dp/2443198" },
  { key: "um10204", s: "V", t: "NXP Semiconductors. UM10204, I2C-bus specification and user manual: maximum bus capacitance 400 pF per line for Standard and Fast mode (550 pF for Fast-mode Plus); rise time up to 300 ns in Fast mode.", u: "https://www.nxp.com/docs/en/user-guide/UM10204.pdf" },

  { group: "T. Real-data test, movement identity and instrument sizes (added in v5)" },
  { key: "gmd2019", s: "V", t: "Gillick, J., Roberts, A., Engel, J., Eck, D., & Bamman, D. (2019). Learning to groove with inverse sequence transformations. Proc. ICML 2019. Groove MIDI Dataset: 13.6 hours, 1,150 MIDI files, over 22,000 measures by 10 drummers on a Roland TD-11 electronic kit, played to a click; drummer, session and style labelled; licence CC BY 4.0.", u: "https://magenta.tensorflow.org/datasets/groove" },
  { key: "uwave2009", s: "V", t: "Liu, J., Zhong, L., Wickramasuriya, J., & Vasudevan, V. (2009). uWave: accelerometer-based personalized gesture recognition and its applications. Pervasive and Mobile Computing, 5(6), 657–675 (first at IEEE PerCom 2009). 98.6% accuracy on over 4,000 samples from 8 users; used for gesture-based user authentication.", u: "https://www.yecl.org/project_uwave.html" },
  { key: "tablasize", s: "V", t: "Retail tabla set listings: 5.5-inch dayan (about 10.5 inches tall) with a 9-inch bayan (about 10.25 inches tall).", u: "https://darbukaplanet.com/products/banjira-standard-tabla-set-aluminum-bayan-and-5-50-dayan" },
  { key: "kathputlisize", s: "V", t: "Retail listings of handmade Rajasthani Kathputli string puppets: wooden head and torso, cloth body; examples 43–58 cm tall.", u: "https://itokri.com/products/564547-30-rajasthani-men-handmade-puppet-kathputli" },
];

module.exports = [...head, ...added, ...tail];
