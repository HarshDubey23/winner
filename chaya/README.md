# CHAYA VIDYA: shadow-native sensing (simulation proof + real-photo PoC tool)

This folder holds the **evidence** behind the final CHAYA VIDYA design (`../CHAYA_VIDYA_Final_Design.md`).

| File | What it is |
|---|---|
| `shadow_sim.py` | Physically based renderer of a shadow-puppet stage: point-like light, translucent perforated puppet, cotton-screen diffusion, camera blur, noise, motion blur, tilted puppets (exact central projection) |
| `shadow_depth.py` | Recovers the puppet-to-screen distance and tilt **from the shadow alone**: perforation-pattern homography (main cue), edge blur (secondary), area (weak) |
| `scoring.py` | Turns shadow measurements plus heel-plank beats into TIMING, CONTACT and SHAPE scores |
| `experiments.py` | Runs experiments E1–E7 and writes `results/metrics.json` and the figures |
| `poc_real_photos.py` | **Use this with a phone this week**: photos at known gaps produce the hero graph and leave-one-out errors |
| `make_markers.py` | Generates the 4 ArUco markers you tape to the screen corners |

## Reproduce
```bash
pip install numpy scipy opencv-python-headless matplotlib
python3 experiments.py          # ~3-5 min on a laptop CPU
```

## Results (simulation; see the caveats below)
| Experiment | Result |
|---|---|
| E1 static, 1080p / 4K | Perforation cue RMSE **0.10 / 0.03 mm**. Edge-blur cue RMSE **7.7 / 8.7 mm**. Contact detection (< 10 mm) **57/57 correct** for both |
| E2 arms moving (calibrated in a different pose) | Perforation **0.06 mm**, area 2.2 mm, edge blur 7.4 mm |
| E3 tilt recovery | Single-axis yaw/pitch to 15°: error ≤ 0.7°. Combined yaw+pitch overestimated (+3–4°). Mean abs error 0.8° |
| E7 depth with random tilt to ±15° | Perforation homography **5.6 mm**, edge blur 6.0, area 6.2 |
| E4 puppet moving 30 cm/s | Edge-blur cue **fails** (67 mm at 1/60 s exposure, 10.5 mm at 1/250 s). Perforation cue unaffected (0.04 mm) |
| E5 lamp changed without recalibration | Edge blur 31 mm (fails). Perforation 0.09 mm (geometry-only) |
| E5 tube light 15 × 150 mm | At L = 0.6 m: 26 mm, perforations visible in only 5/12 frames (fails). At L = 1.5 m: 7.3 mm, 11/12 |
| E6 scoring of faulty learners | correct → no flag · late 180 ms → TIMING (measured 167 ms) · contact lapse → CONTACT (71% agreement) · missed bow → SHAPE (35 mm vs 4 mm) |
| Self-test of `poc_real_photos.py` on perspective-warped, JPEG simulated "phone photos" | Leave-one-out fused RMSE **1.6 mm** (perforation cue ≤ 0.2 mm) |
| Speed | ~50 ms/frame for 1.3 MP in plain Python on a 4-core x86 cloud CPU, i.e. ~20 fps. Raspberry Pi 5 is expected to be slower, so use ROI cropping or every 2nd–3rd frame for live cues |

### Caveats (do not over-claim)
- These are simulations of an idealised flat puppet. **Real error will be larger:** leather is not flat, the cloth sags, the lens distorts, and the light is not exactly point-like. A realistic target is **≤ 5 mm in the 0–100 mm range**, plus reliable pressed/away detection. Only **real photos** (PoC-1) can confirm it.
- The perforation cue needs the puppet's punched ornament holes to remain resolvable. Tholu Bommalata puppets are perforated by tradition (Development Commissioner (Handicrafts); Robinage), but hole size and density vary from puppet to puppet.
- The edge-blur cue is only a fallback (motion- and lamp-sensitive).

## PoC-1 with a phone (one afternoon, about ₹1,500)
1. Cotton cloth on a frame (about 0.9 × 0.6 m or larger). Print `results/markers/marker_0..3.png` at 60 mm and tape them at TL, TR, BR, BL. Measure the centre-to-centre width and height in mm.
2. A small bright LED (≤ 20 mm emitting area) on a stand, about 0.6 m behind the screen. Measure L, the LED-to-screen distance.
3. A perforated puppet: a real Tholu Bommalata puppet, or stiff card with a punched grid of 6–8 mm holes.
4. Phone on a tripod on the audience side, fixed zoom, exposure locked. Photograph the puppet pressed flat (**d_000.jpg**), then held parallel at 25, 50, 75, 100 and 150 mm gaps (use spacer blocks), saved as `d_025.jpg` and so on.
5. `python3 poc_real_photos.py --folder photos --L 600 --screen_w <mm> --screen_h <mm>`
6. Put `results/poc_result.png` and the leave-one-out table on the PPT. **That is your proof slide.**
