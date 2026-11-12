// B4: the CTA sheet under the headline grows as the page scrolls.
// Writes scroll progress (0..1) to --p on .hero-track, once per frame.
(() => {
  const track = document.querySelector('[data-grow]');
  if (!track) return;
  const grow = track.querySelector('.grow');
  const start = track.querySelector('.grow__start');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const roomy = window.matchMedia('(min-width: 901px) and (min-height: 760px)');
  let raf = 0;

  const clamp = (v) => Math.max(0, Math.min(1, v));

  function measure() {
    // share of the card that the first block takes (used on narrow screens)
    const total = grow.getBoundingClientRect().height;
    const sh = start.getBoundingClientRect().height;
    const pad = parseFloat(getComputedStyle(grow).paddingTop) || 0;
    if (total - pad > 0) track.style.setProperty('--sf', (sh / (total - pad)).toFixed(4));
  }

  function update() {
    raf = 0;
    if (reduce.matches) { track.style.setProperty('--p', '1'); return; }
    const vh = window.innerHeight;
    let p;
    if (track.classList.contains('is-sticky')) {
      p = -track.getBoundingClientRect().top / (vh * 0.7);
    } else {
      // start once the page moves if the card is already on screen at load
      const absTop = grow.getBoundingClientRect().top + window.scrollY;
      const begin = Math.max(0, absTop - vh * 0.92);
      p = (window.scrollY - begin) / (vh * 0.5);
    }
    track.style.setProperty('--p', clamp(p).toFixed(4));
  }

  function mode() {
    track.classList.toggle('is-sticky', roomy.matches && !reduce.matches);
    measure();
    update();
  }

  const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', () => { mode(); });
  reduce.addEventListener?.('change', mode);
  roomy.addEventListener?.('change', mode);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(mode);
  mode();
})();
