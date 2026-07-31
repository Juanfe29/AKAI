// Loaded globally (BaseLayout). Any <video data-lazy data-src="..."> below the fold
// only fetches/plays once it's within 300px of the viewport, and pauses when it leaves —
// ported 1:1 from the original site's IntersectionObserver behavior.
function init() {
  const videos = document.querySelectorAll<HTMLVideoElement>('video[data-lazy]');
  if (!videos.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const v = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          if (!v.src && v.dataset.src) v.src = v.dataset.src;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    },
    { rootMargin: '300px' }
  );
  videos.forEach((v) => io.observe(v));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
