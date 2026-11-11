// B6: "for your product." as a halftone. Dot radius shrinks left to right,
// so the line starts near-solid and ends as sparse dots. The text stays real
// (selectable, read by screen readers); the dots are a background clipped to it.
(() => {
  const els = Array.from(document.querySelectorAll("[data-dots]"));
  if (!els.length) return;
  const wide = window.matchMedia("(min-width: 561px)");

  function paint(el) {
    if (!wide.matches) { el.style.backgroundImage = ""; el.style.backgroundSize = ""; return; }
    const rect = el.getBoundingClientRect();
    const w = Math.ceil(rect.width), h = Math.ceil(rect.height);
    if (!w || !h) return;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cell = Math.max(5, fs * 0.052);
    const c = document.createElement("canvas");
    c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
    const ctx = c.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#fff";
    for (let y = cell / 2; y < h + cell; y += cell) {
      for (let x = cell / 2; x < w + cell; x += cell) {
        const t = Math.min(1, x / w);
        // 0.74 of a cell overlaps neighbours (reads solid); 0.2 is a sparse dot
        const r = cell * (0.74 - 0.54 * Math.pow(t, 0.85));
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
    }
    el.style.backgroundImage = `url(${c.toDataURL("image/png")})`;
    el.style.backgroundSize = `${w}px ${h}px`;
  }

  const run = () => els.forEach(paint);
  let t;
  const later = () => { clearTimeout(t); t = setTimeout(run, 120); };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(run);
  window.addEventListener("resize", later);
  wide.addEventListener?.("change", run);
})();
