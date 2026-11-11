// B6: the product card starts narrow and tilted back, then flattens and
// widens to the frame as you scroll through the first ~60vh.
(() => {
  const el = document.querySelector("[data-grow]");
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.style.setProperty("--p", "1"); return; }
  let queued = false;
  const update = () => {
    queued = false;
    const span = window.innerHeight * 0.6;
    const p = Math.min(1, Math.max(0, window.scrollY / span));
    el.style.setProperty("--p", p.toFixed(3));
  };
  const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
