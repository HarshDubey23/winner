"""
End-to-end test of PARAMPARA Lite in headless Chromium: a scripted player taps the theka through the page's
own tap path while the real audio clock, scheduler, scoring and fade rule run. It checks that
(1) a player who taps exactly on the master's timing scores near 100% and guidance fades,
(2) a player 60 ms late on every stroke scores about 75%, and
(3) a silent player scores 0 and keeps full guidance.
Run: python3 PARAMPARA/lite/e2e_test.py   (needs: pip install playwright; a Chromium build)
"""
import json, os, sys
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
PAGE = "file://" + os.path.join(HERE, "index.html")
THEKA_BOTH = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1]

PLAYER_JS = """
([offsetMs, play]) => {
  window.__seen = new Set();
  window.__timer = setInterval(() => {
    const c = window.__plTest.current();
    if (!c || !c.plan || window.__seen.has(c.cycle + ':' + c.kind)) return;
    window.__seen.add(c.cycle + ':' + c.kind);
    if (!play || (c.kind !== 'check' && c.kind !== 'practice')) return;
    const both = %s;
    c.plan.forEach((T, i) => {
      const at = T + offsetMs;
      setTimeout(() => { window.__plTest.tap('R', at); if (both[i]) window.__plTest.tap('L', at); }, Math.max(0, at - performance.now()));
    });
  }, 40);
}
""" % json.dumps(THEKA_BOTH)


def run(page, offset_ms, play, cycles=6):
    page.goto(PAGE)
    page.wait_for_timeout(800)
    page.evaluate("() => window.__plTest.setLatency(0)")
    page.fill("#bpm", "110"); page.dispatch_event("#bpm", "input")
    page.evaluate(PLAYER_JS, [offset_ms, play])
    page.click("#btnStart")
    period = 60 / 110
    page.wait_for_timeout(int((4 + 16 * cycles) * period * 1000) + 1500)
    page.click("#btnStart")
    page.wait_for_timeout(1200)
    return page.evaluate("() => ({unaided: window.__plTest.unaided(), guidance: window.__plTest.guidance()})")


def main():
    with sync_playwright() as p:
        args = ["--autoplay-policy=no-user-gesture-required"]
        try:
            b = p.chromium.launch(args=args)
        except Exception:   # pre-installed Chromium (PLAYWRIGHT_BROWSERS_PATH) when versions differ
            exe = next(x for x in ("/opt/pw-browsers/chromium", "/opt/pw-browsers/chromium-1194/chrome-linux/chrome") if os.path.isfile(x))
            b = p.chromium.launch(args=args, executable_path=exe)
        page = b.new_page(viewport={"width": 1200, "height": 1000})
        results = {}
        results["on_time"] = run(page, 0, True)
        results["late_60ms"] = run(page, 60, True)
        results["silent"] = run(page, 0, False, cycles=2)
        page.screenshot(path=os.path.join(HERE, "e2e_last.png"), full_page=True)
        b.close()
    print(json.dumps(results, indent=1))
    ok = True
    u = results["on_time"]["unaided"]
    ok &= len(u) >= 2 and min(u) > 0.95 and results["on_time"]["guidance"] < 1.0
    l = results["late_60ms"]["unaided"]
    ok &= len(l) >= 2 and all(0.70 < x < 0.80 for x in l)
    s = results["silent"]["unaided"]
    ok &= len(s) >= 1 and max(s) == 0 and results["silent"]["guidance"] == 1.0
    json.dump(results, open(os.path.join(HERE, "e2e_results.json"), "w"), indent=1)
    print("PASS" if ok else "FAIL")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
