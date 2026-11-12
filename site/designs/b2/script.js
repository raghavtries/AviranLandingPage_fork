// B2 — halftone dot fields drawn on canvas.
// Dot radius follows a diagonal gradient (dense bottom-left, sparse top-right)
// with a slow sine wave on top. Static when reduced motion is requested.
(() => {
  const canvases = Array.from(document.querySelectorAll('canvas.halftone'));
  if (!canvases.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const MODES = {
    hero: { color: '47, 75, 255', alpha: 0.85, pitch: 13, spread: 0.72, origin: 'bl' },
    cta:  { color: '10, 20, 64',  alpha: 0.5, pitch: 12, spread: 0.8, origin: 'br' },
  };

  const items = canvases.map((c) => ({
    c,
    ctx: c.getContext('2d'),
    cfg: MODES[c.dataset.mode] || MODES.hero,
    visible: true,
    w: 0, h: 0,
  }));

  function size(it) {
    const r = it.c.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    it.w = r.width; it.h = r.height;
    it.c.width = Math.round(r.width * dpr);
    it.c.height = Math.round(r.height * dpr);
    it.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(it, t) {
    const { ctx, w, h, cfg } = it;
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = `rgba(${cfg.color}, ${cfg.alpha})`;
    const p = w < 600 ? cfg.pitch - 3 : cfg.pitch;
    const maxR = p * 0.46;
    for (let y = p / 2; y < h; y += p) {
      const v = y / h;
      for (let x = p / 2; x < w; x += p) {
        const u = x / w;
        // distance from the dense corner along the diagonal, 0..1
        const d = cfg.origin === 'br' ? ((1 - u) + (1 - v)) / 2 : (u + (1 - v)) / 2;
        const wave = 0.13 * Math.sin((u * 2.2 - v * 1.6) * Math.PI * 2 + t * 0.00045)
                   + 0.06 * Math.sin((u + v) * Math.PI * 5 - t * 0.0003);
        let k = (1 - d * 1.55 / cfg.spread) + wave;
        if (k <= 0.04) continue;
        if (k > 1) k = 1;
        const r = maxR * Math.pow(k, 1.15);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  let raf = 0, last = 0;
  function loop(t) {
    raf = requestAnimationFrame(loop);
    if (t - last < 50) return; // ~20fps is plenty for a slow drift
    last = t;
    items.forEach((it) => { if (it.visible) draw(it, t); });
  }

  function start() {
    cancelAnimationFrame(raf);
    items.forEach((it) => { size(it); draw(it, 0); });
    if (!reduce.matches) raf = requestAnimationFrame(loop);
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const it = items.find((i) => i.c === e.target);
        if (it) it.visible = e.isIntersecting;
      });
    });
    items.forEach((it) => io.observe(it.c));
  }

  let rt = 0;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(start, 120); });
  reduce.addEventListener?.('change', start);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start); else start();
  start();
})();
