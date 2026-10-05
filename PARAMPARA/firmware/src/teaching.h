// Teaching logic shared by the sleeve hub and the phone prototype: fade rule, cue density, cue timing,
// cycle scoring and clock synchronisation. Pure functions, no hardware, so they are unit-tested on a PC.
#pragma once
#include <algorithm>
#include <cmath>
#include <cstdint>
#include <vector>

namespace parampara {

// ---- fade rule: target guidance = clip(1 - s/0.85), at most +/-0.2 per check cycle -------------------
inline double nextGuidance(double g, double unaidedScore, double target = 0.85, double step = 0.2) {
  double want = std::clamp(1.0 - unaidedScore / target, 0.0, 1.0);
  return std::clamp(want, g - step, g + step);
}
// Which beats of a 16-beat cycle get a cue at guidance g (fewer as g falls).
inline bool cueOnBeat(double g, int beat) {
  if (g >= 0.75) return true;
  if (g >= 0.5) return beat % 2 == 0;
  if (g >= 0.25) return beat % 4 == 0;
  if (g > 0.02) return beat == 0;
  return false;
}
// Check cycles: session start and every fourth cycle after it.
inline bool isCheckCycle(int cycle) { return cycle % 4 == 0; }

// ---- cue timing: the pulse must end before the hand starts to move (movement-related tactile gating) ---
struct CueWindow { int64_t on_us; int64_t off_us; };
inline CueWindow cueWindow(int64_t stroke_us, int64_t lead_us = 120000, int64_t pulse_us = 40000) {
  return { stroke_us - lead_us, stroke_us - lead_us + pulse_us };
}

// ---- cycle scoring: hands right and timing within 120 ms, as in the phone prototype ----------------
struct Tap { int64_t t_us; bool left; };
inline double scoreCycle(const std::vector<int64_t>& strokes_us, const std::vector<bool>& needLeft,
                         const std::vector<Tap>& taps, int64_t period_us, double tol_ms = 120.0) {
  double total = 0;
  for (size_t i = 0; i < strokes_us.size(); ++i) {
    int64_t T = strokes_us[i];
    const Tap* bestR = nullptr; const Tap* bestL = nullptr;
    for (const Tap& t : taps) {
      if (std::llabs(t.t_us - T) > period_us / 2) continue;
      const Tap*& b = t.left ? bestL : bestR;
      if (!b || std::llabs(t.t_us - T) < std::llabs(b->t_us - T)) b = &t;
    }
    double hand = needLeft[i] ? (bestR ? 0.5 : 0) + (bestL ? 0.5 : 0) : (bestR ? (bestL ? 0.5 : 1.0) : 0);
    const Tap* ref = bestR ? bestR : bestL;
    double timing = ref ? std::max(0.0, 1.0 - std::fabs(double(ref->t_us - T)) / 1000.0 / tol_ms) : 0.0;
    total += 0.5 * hand + 0.5 * timing;
  }
  return strokes_us.empty() ? 0 : total / double(strokes_us.size());
}

// ---- clock sync: least-squares fit of reference time against local time (offset + drift) ----------
// Each exchange gives (local, reference) timestamps; outliers beyond 3 MAD are dropped, then refit.
struct ClockFit { double slope = 1, offset_us = 0; double toRef(int64_t local) const { return slope * double(local) + offset_us; } };
inline ClockFit fitClock(const std::vector<std::pair<int64_t, int64_t>>& pts) {
  auto fit = [](const std::vector<std::pair<int64_t, int64_t>>& p) {
    ClockFit f; if (p.size() < 2) { if (!p.empty()) f.offset_us = double(p[0].second - p[0].first); return f; }
    double x0 = double(p[0].first), y0 = double(p[0].second), sx = 0, sy = 0, sxx = 0, sxy = 0, n = double(p.size());
    for (auto& q : p) { double x = q.first - x0, y = q.second - y0; sx += x; sy += y; sxx += x * x; sxy += x * y; }
    double den = n * sxx - sx * sx;
    f.slope = den != 0 ? (n * sxy - sx * sy) / den : 1.0;
    double b = (sy - f.slope * sx) / n;                // in centred coordinates
    f.offset_us = y0 + b - f.slope * x0;
    return f;
  };
  ClockFit f = fit(pts);
  std::vector<double> res; for (auto& q : pts) res.push_back(std::fabs(f.toRef(q.first) - double(q.second)));
  std::vector<double> s = res; std::nth_element(s.begin(), s.begin() + s.size() / 2, s.end());
  double mad = s.empty() ? 0 : s[s.size() / 2];
  std::vector<std::pair<int64_t, int64_t>> keep;
  for (size_t i = 0; i < pts.size(); ++i) if (res[i] <= 3 * mad + 1.0) keep.push_back(pts[i]);
  return keep.size() >= 2 ? fit(keep) : f;
}

}  // namespace parampara
