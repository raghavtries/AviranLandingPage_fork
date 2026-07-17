// Aviran landing — minimal vanilla JS: tabs, contract resolve, year.

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

/* ── The one orchestrated moment ──────────────────────────────
   A requirement the customer owed us lands: the sandbox-access
   row resolves Waiting → Confirmed and the tally follows it.
   The blocking row is untouched — the contract stays unsigned.
   ------------------------------------------------------------ */
const contract = document.querySelector("[data-contract]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function resolveRow() {
  const state = document.querySelector("[data-live-state]");
  const label = document.querySelector("[data-live-label]");
  const tally = document.querySelector("[data-tally]");
  const waiting = document.querySelector("[data-waiting]");
  if (!state) return;

  state.classList.remove("state--wait");
  state.classList.add("state--ok");
  if (label) label.textContent = "Confirmed";
  if (tally) tally.textContent = "13";
  if (waiting) waiting.textContent = "0";
}

if (contract) {
  if (reduceMotion || !("IntersectionObserver" in window)) {
    // Render the resolved state outright — no motion to observe.
    resolveRow();
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          setTimeout(resolveRow, 900);
        });
      },
      { threshold: 0.55 }
    );
    io.observe(contract);
  }
}
