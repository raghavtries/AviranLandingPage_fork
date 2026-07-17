// Aviran landing — minimal vanilla JS: tabs, stamp reveal, year.

/* ── Footer year ─────────────────────────────────────────── */
const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Process tabs (WAI-ARIA tabs pattern) ────────────────── */
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

function selectTab(tab) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute("aria-selected", String(selected));
    t.classList.toggle("is-active", selected);
    t.tabIndex = selected ? 0 : -1;
  });
  panels.forEach((p) => {
    const show = p.id === tab.getAttribute("aria-controls");
    p.hidden = !show;
    p.classList.toggle("is-active", show);
  });
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (e) => {
    let next = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
    else if (e.key === "Home") next = tabs[0];
    else if (e.key === "End") next = tabs[tabs.length - 1];
    if (next) {
      e.preventDefault();
      selectTab(next);
      next.focus();
    }
  });
});

/* ── Orchestrated moment: stamp presses down on reveal ───── */
const stamp = document.querySelector("[data-stamp]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (stamp) {
  if (reduceMotion || !("IntersectionObserver" in window)) {
    stamp.classList.add("is-stamped");
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stamp.classList.add("is-stamped");
            io.disconnect();
          }
        });
      },
      { threshold: 0.6 }
    );
    io.observe(stamp);
  }
}
