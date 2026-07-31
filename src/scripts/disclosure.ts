// Loaded globally (BaseLayout). Wires up any [data-disclosure-trigger]/[data-disclosure-panel]
// pair (e.g. case study "Read the full story" toggles) with proper aria-expanded state —
// the original build toggled visibility with no aria-expanded at all.
function init() {
  document.querySelectorAll<HTMLElement>('[data-disclosure]').forEach((root) => {
    const trigger = root.querySelector<HTMLButtonElement>('[data-disclosure-trigger]');
    const panel = root.querySelector<HTMLElement>('[data-disclosure-panel]');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', () => {
      const open = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
