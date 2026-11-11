// B4 halftone fields: dots grow with a printed gradient. Static drawing.
(() => {
  const canvases = Array.from(document.querySelectorAll('canvas[data-halftone]'));
  if (!canvases.length) return;

  const clamp = (v) => Math.max(0, Math.min(1, v));
  const ease = (t) => t * t * (3 - 2 * t);

  // t in 0..1 = how much ink at (x, y); u and v are 0..1 across the box
  const modes = {
    up: (u, v) => {
      const rise = clamp((v - 0.38) / 0.62);
      const wave = 0.72 + 0.28 * Math.sin(u * Math.PI * 2.2 + 0.6);
      return ease(rise) * wave;
    },
    band: (u, v) => {
      const across = clamp((u - 0.4) / 0.6);
      const swell = 0.55 + 0.45 * Math.sin(v * Math.PI);
      return ease(across) * swell;
    },
  };

  function draw(canvas) {
    const box = canvas.getBoundingClientRect();
    const w = Math.round(box.width);
    const h = Math.round(box.height);
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const pitch = w < 600 ? 9 : 12;
    const maxR = pitch * 0.46;
    const fn = modes[canvas.dataset.halftone] || modes.up;
    ctx.fillStyle = getComputedStyle(canvas).color || 'rgba(255,255,255,0.3)';

    for (let y = pitch / 2, row = 0; y < h; y += pitch, row++) {
      // offset alternate rows: a 45-degree screen like print
      const shift = row % 2 ? pitch / 2 : 0;
      for (let x = pitch / 2 + shift; x < w; x += pitch) {
        const r = maxR * fn(x / w, y / h);
        if (r < 0.45) continue;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const redraw = () => canvases.forEach(draw);
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => redraw());
    canvases.forEach((c) => ro.observe(c));
  } else {
    window.addEventListener('resize', redraw);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
  redraw();
})();
