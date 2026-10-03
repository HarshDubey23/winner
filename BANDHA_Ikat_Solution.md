# BANDHA-YANTRA: Photo-to-Ikat Machine
### SIH 2026 · PS 26214 (AICTE Student Innovation · Heritage & Culture · Hardware)

> **One line:** Show any design (a photo, a motif, a temple wheel, your name in Devanagari). BANDHA-YANTRA computes exactly where each yarn bundle must be tied before dyeing. It projects those tie marks onto the stretched yarn, tracks the yarn with a camera, and previews the final woven fabric (with ikat's natural "bleed") *before a single thread is dyed*. The artisan ties, dyes and weaves, and the pattern appears.

*"Bandha" is the Odia name for ikat. It is GI heritage across India: Patan Patola (Gujarat), Pochampally (Telangana), Sambalpuri/Bandha (Odisha), Telia Rumal.*

---

## 0. The innovation test (use it to judge any idea, including this one)

| Test | SPARSH (previous) | BANDHA-YANTRA |
|---|---|---|
| Does it create a **new capability**, not just a cheaper version of something that exists? | ❌ A cheaper tactile display (Graphiti and MagnePins exist) | ✅ Any image becomes a real double-ikat textile. Today that takes a master artisan, graph paper and months. |
| Did I find an existing product or paper that does the same thing? | Yes | **No.** I found asu winding automation (Mallesham's machine), ikat-*look* CAD (DigiBunai's "IKAT effect" for jacquard) and graph-paper tradition. I found **no system** that generates real tie-maps with bleed/shrinkage compensation and projection-guided tying. *Do a formal patent check before submitting (Google Patents + InPASS).* |
| Can you explain the "wow" in one sentence? | Medium | "Photo in, ikat saree out, and the preview matches the woven cloth." |

---

## 1. The problem (slide 1)

- **Ikat is an inverse problem solved by hand.** The pattern must be calculated *backwards* onto loose yarn before dyeing. Every warp × weft intersection is planned on graph paper. Grids are marked with charcoal-dipped thread, then tied by hand.
- **It is slow and unforgiving.** A Patan Patola double-ikat saree takes **6 months to a year** and about **8 skilled workers**. One miscalculation is found only after weaving, which can waste months.
- **It is a design lock-in.** Because planning is so hard, artisans repeat inherited motifs. New designs (and the new markets that come with them) are hard to make, and young people leave the craft.
- **India already recognises the gap.** Mallesham's **Laxmi Asu Machine** automated just the *winding* step for Pochampally ikat. It was incubated by NIF/DST, he received the **Padma Shri**, and there's a biopic about him (*Mallesham*, 2019). **The design-to-tie step, the hardest one, is still manual.**

**Hook line for the jury:** *"Mallesham automated the winding. We're automating the thinking."*

---

## 2. The solution

### 2.1 The pipeline
```
 Design image ──► INVERSE-IKAT ENGINE (laptop/Pi 5)
                   1. quantize to N dye colours + yarn-bundle grid (warp & weft)
                   2. compute tie-map per colour bath (which bundle segments to tie/untie, in what order)
                   3. compensate: yarn shrinkage after dyeing + measured dye-bleed model
                   4. optimise: exploit fold/mirror symmetry → fewer ties (less labour)
                   5. PREVIEW: render the woven fabric with simulated bleed ("ikat blur")
        │
        ▼
 TYING FRAME (hardware)
   • stretched yarn bundles on a tensioned frame
   • overhead projector paints the exact tie zones onto the yarn (replaces the charcoal grid)
   • camera tracks yarn position/stretch → re-maps projection live (closed loop)
   • foot-pedal (ESP32) steps through ties; counts done/remaining; colour-bath stage shown
        │
        ▼
 Dye ► untie/re-tie per colour stage (projector guides each stage) ► weave
        │
        ▼
 Camera photo of the woven cloth ► compared to the preview (similarity score) ► bleed model updated
```

### 2.2 What's technically deep (this is the "innovation" slide)
1. **Inverse design algorithm:** an image becomes multi-stage tie schedules for warp *and* weft. Double ikat means two coordinated tie-maps that must register at intersections.
2. **A measured dye-bleed model, which is your own research contribution.** Run experiments: tie tightness × dye time × yarn type (cotton/silk) produce bleed in mm. Fit a model and use it for both compensation and preview. One graph from this experiment is worth more than any claim.
3. **Tie-count optimisation:** choose bundle grouping and fold symmetry to minimise ties. Report "ties reduced by X%" against the naive graph-paper method.
4. **Projection mapping on moving, stretching yarn:** camera–projector calibration plus live re-registration.
5. **Closed-loop validation:** photograph the woven result and compute similarity to the preview. Each sample improves the model.

### 2.3 What the artisan keeps
**The human still ties, dyes and weaves.** The machine removes the calculation and marking drudgery. It does not replace the craft, and judges, Ministry of Textiles people and weavers all respond to that.

---

## 3. Hackathon demo (what the jury sees in 3 minutes)

1. A judge picks an image on a tablet (Konark wheel, a Warli figure, or their name).
2. Within 5 seconds the screen shows the **tie-map** plus a **woven-ikat preview** with realistic bleed.
3. The projector lights up the tie zones on the yarn frame in front of them. A team member ties one bundle live; the judge can try one too.
4. You reveal the result: a woven sample (about 20 × 20 cm, single warp ikat, 2 colours) made earlier from the same pipeline, next to its preview. The similarity score is on screen.
5. Close: *"6 months of calculation, done in 5 seconds. The hands stay human."*

**Scope for 10 weeks:** single **warp ikat**, 2 colours, about 120 warp ends, on a tabletop rigid-heddle loom. Double ikat is the roadmap slide. Food-safe or natural dyes (indigo, turmeric, madder) are enough for the demo.

---

## 4. BOM (indicative, recheck prices)

| Item | Qty | ≈ ₹ |
|---|---|---|
| Short-throw / mini projector (720p+) | 1 | 9,000 |
| Raspberry Pi 5 (8 GB) + Camera Module 3 wide | 1 | 10,300 |
| Tying frame: aluminium extrusion, tensioners, clamps | 1 | 3,500 |
| ESP32 + foot pedal + stage buttons + small display | 1 | 1,200 |
| Optional: stepper to rotate/advance yarn bundles (NEMA17 + TMC2209) | 1 | 1,500 |
| Tabletop rigid-heddle loom | 1 | 5,000 |
| Cotton/silk yarn, tying tape/cord, dyes (indigo kit, natural dyes), vessels | — | 3,000 |
| Misc (wiring, mounts, SMPS) | — | 1,500 |
| **Total** | | **≈ ₹34–35k** |

---

## 5. Idea-round proof of concept (≈2 weeks)
- **Software:** image → tie-map → bleed preview (Python + OpenCV). Show three motifs.
- **Hardware:** a small frame with about 40 yarn ends and a projector marking tie zones.
- **Physical:** tie, dye once in indigo, and weave a 10 × 10 cm swatch. Even a rough motif appearing proves the loop.
- **Bleed experiment v0:** 3 tie tightnesses × 2 dye times give a first bleed graph.

---

## 6. 6-slide PPT content
1. **Problem:** ikat is an inverse puzzle solved on graph paper; Patola takes 6–12 months; design lock-in; only the winding step has been automated (Mallesham, Padma Shri).
2. **Solution:** BANDHA-YANTRA, a photo-to-tie-map engine plus a projection-guided tying frame plus a woven-preview twin.
3. **Technical approach:** the pipeline diagram (§2.1), the 5 technical depths (§2.2), and the frame render (Fusion 360).
4. **Feasibility:** BOM ~₹35k, PoC swatch photo, bleed-experiment graph, risks (§7).
5. **Impact:** GI clusters (Patan, Pochampally, Sambalpur, Nuapatna); faster new designs, fewer errors, youth-friendly digital design; links to Ministry of Textiles schemes/weaver service centres, NIF/DST, handloom cooperatives. *Quantify it after week 6:* "tie-planning time from X days to Y minutes; ties reduced Z%."
6. **References:** Patola process sources, the Asu machine (NIF/DST), DigiBunai (C-DAC, to show you know what exists), ikat mathematics, plus your own experiment data.

---

## 7. Risks and jury Q&A

| Question / risk | Answer |
|---|---|
| "DigiBunai already does ikat." | DigiBunai simulates an *ikat look* for jacquard/dobby design. BANDHA produces real **resist-dye tie schedules** for true ikat, plus physical projection-guided tying and a measured bleed model. *(Verify DigiBunai's ikat module yourself before saying this.)* |
| "Will weavers use it?" | Show one interview or video with a weaver (Pochampally/Odisha clusters, or a local handloom co-op/Weavers' Service Centre). Even one quote is strong. |
| Yarn shifts on the frame | Camera re-registration; fiducial threads/markers at frame edges. |
| Bleed varies | That is the point of the measured model, and the closed loop improves it with every sample. |
| Team can't weave | Single warp ikat on a rigid-heddle loom is learnable in a week; plenty of tutorials. Start in week 1. |
| "Is it hardware enough?" | Projector–camera closed loop, motorised frame, ESP32 control, physical dyeing/weaving validation. The *output* is a physical textile. |

---

## 8. 10-week plan (6 people: 2 algorithm, 1 vision/projection, 1 embedded/mech, 2 craft + PPT)

| Week | Work |
|---|---|
| 1 | Learn: watch Pochampally/Odisha ikat process videos, buy the loom, test-weave plain cloth. Write the image → bundle-grid script. |
| 2 | Tie-map v1 (2 colours, warp only); bleed experiment v0; frame build. |
| 3 | **PoC swatch + video** (idea round). |
| 4–5 | Projector–camera calibration; live re-registration; ESP32 pedal/stage UI. |
| 6 | Bleed model v1 from a 9–12 sample experiment; preview renderer with bleed. |
| 7 | Tie-count optimiser (fold/bundle grouping); measure the reduction. |
| 8 | Final sample: Konark wheel/Warli motif; similarity score vs preview; weaver interview. |
| 9–10 | Integration, backup samples, demo rehearsal, double-ikat roadmap render. |

---

## Sources
- Patola process, timeline and graph paper: [Aza Fashions](https://www.azafashions.com/blog/patola-weaving-the-double-ikat-silk-of-gujarat/) · [Deccan Herald](https://www.deccanherald.com/features/pride-patan-2272455) · [MAP Academy](https://mapacademy.io/?p=3258)
- Ikat mathematics: [GW Today, "Dyeing for Beauty"](https://gwtoday.gwu.edu/dyeing-beauty-mathematical-complexity-ikat) · [Wendy Weiss, J. Textile Design Research & Practice](https://wendyweiss.org/wp-content/uploads/2023/02/article-ikat-jtrp-reduced.pdf) · [Double ikat (Asia Research News)](https://www.asiaresearchnews.com/content/double-ikat-tie-resist-dyeing-technique-practised-only-india-indonesia-and-japan)
- Asu machine / Mallesham: [NIF](https://nif.org.in/innovation/laxmi-asu-making-machine-for-pochampally-sarees/748) · [DST](https://dst.gov.in/node/6035) · [The News Minute (Padma Shri, film)](https://www.thenewsminute.com/amp/story/flix/mallesham-won-padma-shri-yet-nobody-knows-him-outside-telangana-director-raj-intv-103948)
- Existing ikat-look CAD: [DigiBunai (Vikaspedia)](https://en.vikaspedia.in/viewcontent/social-welfare/entrepreneurship/indian-handloom/digibunai™-computer-aided-textile-designing-for-weaving) · [Odisha Ikat](https://en.wikipedia.org/wiki/Odisha_Ikat) · [Pochampally Ikat (Vikaspedia)](https://vikaspedia.in/social-welfare/entrepreneurship/indian-handloom/pochampally-ikat)
