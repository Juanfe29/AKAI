// Home page interactivity: intro video overlay (once per session) + rotating sector hero.
// Ported 1:1 from the original Home.dc.html Component class (intro phases, 8s hero rotation,
// IntersectionObserver lazy video play/pause) — logic unchanged, just re-wired to plain DOM APIs.

function setupIntro() {
  const overlay = document.querySelector<HTMLElement>('[data-intro]');
  if (!overlay) return;
  const video = overlay.querySelector<HTMLVideoElement>('[data-intro-video]');
  const tagline = overlay.querySelector<HTMLElement>('[data-intro-tagline]');
  const skipBtn = overlay.querySelector<HTMLButtonElement>('[data-intro-skip]');

  let t1: ReturnType<typeof setTimeout>;
  let t2: ReturnType<typeof setTimeout>;

  function finish() {
    clearTimeout(t1);
    clearTimeout(t2);
    try {
      sessionStorage.setItem('akai_intro_seen', '1');
    } catch {}
    overlay!.classList.add('is-done');
    setTimeout(() => overlay?.setAttribute('hidden', ''), 850);
  }

  function onEnded() {
    tagline?.removeAttribute('hidden');
    overlay!.classList.add('is-tagline');
    t1 = setTimeout(() => overlay!.classList.add('is-fading'), 1400);
    t2 = setTimeout(finish, 2200);
  }

  video?.addEventListener('ended', onEnded);
  skipBtn?.addEventListener('click', finish);
}

interface HeroSector {
  name: string;
  src: string;
  poster: string;
}

function setupHeroRotation() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const raw = hero.getAttribute('data-hero-sectors');
  if (!raw) return;
  const sectors: HeroSector[] = JSON.parse(raw);

  const video = hero.querySelector<HTMLVideoElement>('[data-hero-video]');
  const counter = hero.querySelector<HTMLElement>('[data-hero-counter]');
  const name = hero.querySelector<HTMLElement>('[data-hero-name]');
  const countEl2 = hero.querySelector<HTMLElement>('[data-hero-counter-mobile]');
  const nameEl2 = hero.querySelector<HTMLElement>('[data-hero-name-mobile]');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || sectors.length <= 1) return;

  let idx = 0;

  function preloadNext() {
    const next = sectors[(idx + 1) % sectors.length];
    const existing = document.querySelector(`link[data-hero-prefetch]`);
    existing?.remove();
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'video';
    link.href = next.src;
    link.setAttribute('data-hero-prefetch', '1');
    document.head.appendChild(link);
  }

  function render() {
    const s = sectors[idx];
    const counterText = `0${idx + 1} / 0${sectors.length}`;
    if (counter) counter.textContent = counterText;
    if (name) name.textContent = s.name;
    if (countEl2) countEl2.textContent = counterText;
    if (nameEl2) nameEl2.textContent = s.name;
    if (video) {
      video.poster = s.poster;
      video.src = s.src;
      video.load();
      video.play().catch(() => {});
    }
    preloadNext();
  }

  preloadNext();
  setInterval(() => {
    idx = (idx + 1) % sectors.length;
    render();
  }, 8000);
}

setupIntro();
setupHeroRotation();
