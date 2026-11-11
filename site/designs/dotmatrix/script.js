// Dot matrix variant: nav floats once the page leaves the top.
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("is-floating", window.scrollY > 24);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
