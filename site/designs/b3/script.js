// B3 halftone field: a dot grid on the cobalt hero.
// Dot radius follows a smooth drifting field, larger toward the edges,
// and swells a little near the cursor. Static under reduced motion,
// paused while the hero is off-screen.
(() => {
  const canvas = document.querySelector('.halftone');
  if (!canvas) return;
  const host = canvas.parentElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const STEP = 14;          // grid pitch, CSS px
  const RMAX = 3.6;         // max dot radius, CSS px
  const CURSOR_R = 150;     // cursor influence radius, CSS px

  let w = 0, h = 0, dpr = 1, cols = 0, rows = 0;
  let edge = new Float32Array(0); // precomputed edge weight per dot
  let mx = -9999, my = -9999, tmx = -9999, tmy = -9999;
  let visible = true, raf = 0, t0 = performance.now();

  function resize() {
    const r = host.getBoundingClientRect();
    w = Math.max(1, Math.round(r.width));
    h = Math.max(1, Math.round(r.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    cols = Math.ceil(w / STEP) + 1;
    rows = Math.ceil(h / STEP) + 1;
    edge = new Float32Array(cols * rows);
    // weight: 0 in a soft central ellipse that keeps the copy clean, 1 at the edges
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const nx = (i * STEP) / w * 2 - 1;
        const ny = (j * STEP) / h * 2 - 1;
        // weighted toward left/right and bottom corners
        const d = Math.sqrt(nx * nx * 1.0 + ny * ny * 0.45);
        let e = (d - 0.62) / 0.5;
        e = e < 0 ? 0 : e > 1 ? 1 : e;
        // fade out under the nav bar
        const top = Math.min(1, Math.max(0, (j * STEP - 96) / 140));
        edge[j * cols + i] = e * e * (3 - 2 * e) * top;
      }
    }
    draw(performance.now());
  }

  function draw(now) {
    const t = (now - t0) / 1000;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.78)';
    ctx.beginPath();
    const cr2 = CURSOR_R * CURSOR_R;
    for (let j = 0; j < rows; j++) {
      const y = j * STEP;
      for (let i = 0; i < cols; i++) {
        const x = i * STEP;
        const e = edge[j * cols + i];
        // smooth drifting field from summed sines (cheap stand-in for noise)
        const n =
          Math.sin(x * 0.0062 + t * 0.32) * 0.5 +
          Math.sin(y * 0.0091 - t * 0.24) * 0.35 +
          Math.sin((x + y) * 0.0043 + t * 0.18) * 0.4;
        let s = e * (0.72 + n * 0.28);
        const dx = x - mx, dy = y - my, d2 = dx * dx + dy * dy;
        if (d2 < cr2) s += (1 - d2 / cr2) * 0.42;
        if (s <= 0.08) continue;
        const r = Math.min(1, s) * RMAX;
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, 6.2832);
      }
    }
    ctx.fill();
  }

  function frame(now) {
    raf = 0;
    // ease the cursor so the swell trails a little
    mx += (tmx - mx) * 0.18;
    my += (tmy - my) * 0.18;
    draw(now);
    if (visible && !reduce.matches) raf = requestAnimationFrame(frame);
  }

  function start() {
    if (!raf && visible && !reduce.matches) raf = requestAnimationFrame(frame);
  }
  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  host.addEventListener('pointermove', (e) => {
    const r = host.getBoundingClientRect();
    tmx = e.clientX - r.left;
    tmy = e.clientY - r.top;
    if (mx < -999) { mx = tmx; my = tmy; }
  });
  host.addEventListener('pointerleave', () => { tmx = tmy = -9999; mx = my = -9999; });

  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    visible ? start() : stop();
  }).observe(host);

  new ResizeObserver(() => resize()).observe(host);
  reduce.addEventListener('change', () => { reduce.matches ? (stop(), draw(performance.now())) : start(); });

  resize();
  start();
})();
