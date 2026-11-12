// B1: the hero CTA grows from a pill into a full-width band as the page scrolls.
// Progress runs from scroll 0 until the band's top edge reaches ~22% of the
// viewport (about 50-70vh of scroll, depending on screen), so the band finishes
// growing while it is still in view.
(() => {
  const el = document.querySelector('[data-grow]');
  if (!el) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.classList.add('is-full'); return; }
  const band = el.querySelector('.grow__band');
  let travel = 1, ticking = false;
  const measure = () => {
    const top = band.getBoundingClientRect().top + window.scrollY; // growth is down/right, so top is stable
    travel = Math.max(120, top - window.innerHeight * 0.22);
  };
  const update = () => {
    ticking = false;
    const p = Math.min(1, Math.max(0, window.scrollY / travel));
    el.style.setProperty('--p', p.toFixed(3));
    el.classList.toggle('is-full', p > 0.8);
  };
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', () => { measure(); req(); });
  el.style.setProperty('--p', '0');
  measure();
  update();
  document.fonts && document.fonts.ready.then(() => { measure(); update(); });
})();
