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
    wrap.style.position = 'absolute';
    wrap.style.left = left + '%';
    wrap.style.top = top + '%';
    wrap.innerHTML = BIRD_SVG(scale);
    const bird = wrap.firstElementChild;
    bird.style.setProperty('--flap-dur', (0.34 + Math.random() * 0.22).toFixed(2) + 's');
    bird.style.setProperty('--flap-delay', (Math.random() * 0.4).toFixed(2) + 's');
    bird.style.setProperty('--bob-dur', (1.2 + Math.random() * 1.1).toFixed(2) + 's');
    bird.style.setProperty('--bob-delay', (Math.random() * 1).toFixed(2) + 's');
    return bird;
  }

  function spawnFlock() {
    const flock = document.createElement('div');
    flock.className = 'bird-flock';

    const width = 130 + Math.random() * 110; // overall flock footprint, in px
    const topPct = 6 + Math.random() * 30;   // upper part of the sky, below the nav pill
    const duration = 22 + Math.random() * 14; // 22–36s to cross the screen
    const ltr = Math.random() < 0.5;
    const birdCount = 9 + Math.floor(Math.random() * 8); // 9–16 birds per flock

    flock.style.width = width + 'px';
    flock.style.height = (width * 0.7) + 'px';
    flock.style.top = topPct + 'vh';
    flock.style.left = '0';
    flock.style.animation = `${ltr ? 'fly-across-ltr' : 'fly-across-rtl'} ${duration}s linear forwards`;

    // loosely cluster birds within the flock's footprint, roughly
    // V/blob-shaped rather than a rigid grid, echoing a real flock
    for (let i = 0; i < birdCount; i++) {
      const clusterX = 10 + Math.random() * 80;
      const clusterY = 15 + Math.random() * 65;
      const scale = 16 + Math.random() * 12;
      flock.appendChild(buildBird(clusterX, clusterY, scale));
    }

    document.body.appendChild(flock);

    setTimeout(() => flock.remove(), duration * 1000 + 500);

    // schedule the next pass, well after this one finishes
    scheduleNext();
  }

  function scheduleNext() {
    const delay = 25000 + Math.random() * 35000; // next flock in 25–60s
    setTimeout(spawnFlock, delay);
  }

  // first flock arrives a little while after the page loads, not instantly
  setTimeout(spawnFlock, 6000 + Math.random() * 6000);
})();
