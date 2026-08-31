// A flock of pigeons occasionally drifts across the sunset sky in the
// background. Each bird is a small inline SVG built from two wing
// paths that rotate in opposition (see birds.css @keyframes flap-left /
// flap-right), so — unlike a single static flock photo — they actually
// flap as they fly. Purely ambient: not draggable, not clickable.
// Spawns periodically rather than continuously, to keep the page light
// on battery/CPU.

(function () {
  if (window.innerWidth < 380) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const BIRD_SVG = (scale) => `
    <svg class="flap-bird" viewBox="-16 -12 32 20" width="${scale}" height="${scale * 0.625}">
      <g class="wing wing-left"><path d="M0 0 Q -8 -9 -15 -3" /></g>
      <g class="wing wing-right"><path d="M0 0 Q 8 -9 15 -3" /></g>
    </svg>
  `;

  function buildBird(left, top, scale) {
    const wrap = document.createElement('div');
    wrap.innerHTML = BIRD_SVG(scale);
    const bird = wrap.firstElementChild;
    bird.style.left = left + '%';
    bird.style.top = top + '%';
    bird.style.setProperty('--flap-dur', (0.34 + Math.random() * 0.22).toFixed(2) + 's');
    bird.style.setProperty('--flap-delay', (Math.random() * 0.4).toFixed(2) + 's');
    bird.style.setProperty('--bob-dur', (1.2 + Math.random() * 1.1).toFixed(2) + 's');
    bird.style.setProperty('--bob-delay', (Math.random() * 1).toFixed(2) + 's');

    // Give every pigeon its own gentle horizontal/vertical drift so the
    // flock breathes and changes shape while the whole flock crosses.
    bird.style.setProperty('--drift-x', ((Math.random() - 0.5) * 180).toFixed(0) + 'px');
    bird.style.setProperty('--drift-y', ((Math.random() - 0.5) * 90).toFixed(0) + 'px');
    bird.style.setProperty('--drift-dur', (4.5 + Math.random() * 4).toFixed(2) + 's');
    bird.style.setProperty('--drift-delay', (Math.random() * 3).toFixed(2) + 's');
    return bird;
  }

  function spawnFlock() {
    const flock = document.createElement('div');
    flock.className = 'bird-flock';

    const width = 600 + Math.random() * 300; // overall flock footprint, in px — wide enough for a real crowd
    const topPct = 5 + Math.random() * 30;   // upper part of the sky, below the nav pill
    const duration = 26 + Math.random() * 16; // 26–42s to cross the screen (a bit slower, since there's more to see)
    const ltr = Math.random() < 0.5;
    const birdCount = 10 + Math.floor(Math.random() * 7); // 10–16 birds per flock — loose enough to read as individual pigeons

    flock.style.width = width + 'px';
    flock.style.height = width + 'px';
    flock.style.top = topPct + 'vh';
    flock.style.left = '0';
    flock.style.animation = `${ltr ? 'fly-across-ltr' : 'fly-across-rtl'} ${duration}s linear forwards`;

    // Loosely cluster birds within the flock's footprint. Each bird then
    // gets its own independent drift in CSS, so the formation naturally
    // spreads and compresses instead of moving as one rigid object.
    for (let i = 0; i < birdCount; i++) {
      const clusterX = 3 + Math.random() * 94;
      const clusterY = 6 + Math.random() * 88;
      const scale = 24 + Math.random() * 12;
      flock.appendChild(buildBird(clusterX, clusterY, scale));
    }

    document.body.appendChild(flock);

    setTimeout(() => flock.remove(), duration * 1000 + 500);

    // schedule the next pass, well after this one finishes
    scheduleNext();
  }

  function scheduleNext() {
    const delay = 5000; // next flock in 25–60s
    setTimeout(spawnFlock, delay);
  }

  // first flock arrives a little while after the page loads, not instantly
  setTimeout(spawnFlock, 6000 + Math.random() * 6000);
})();
