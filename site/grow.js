// B7: the CTA sheet under the headline widens to the frame as the page
// scrolls. Writes progress (0..1) to --p on [data-grow], once per frame.
// Narrow screens and reduced motion get the finished sheet, no scroll link.
(() => {
  const el = document.querySelector("[data-grow]");
  if (!el) return;
  const still = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 900px)");
  let queued = false;
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const update = () => {
    queued = false;
    if (still.matches) { el.style.setProperty("--p", "1"); return; }
    const vh = window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    // begin at once if the sheet is already on screen; finish over ~half a screen
    const begin = Math.max(0, top - vh * 0.9);
    el.style.setProperty("--p", clamp((window.scrollY - begin) / (vh * 0.5)).toFixed(4));
  };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  still.addEventListener?.("change", queue);
  update();
})();
