// Little doodles (sparkle, heart, swirl, burst) that randomly pop up
// near a photo when you hover over it — a random one, not every time,
// so it feels playful rather than constant.

(function () {
  const DOODLES = [
    // sparkle / twinkle
    `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 3 L23 16 L36 20 L23 24 L20 37 L17 24 L4 20 L17 16 Z" fill="#c2953f" stroke="#2b3440" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`,
    // heart
    `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 34 C6 24 4 15 11 10 C15 7 19 9 20 13 C21 9 25 7 29 10 C36 15 34 24 20 34Z" fill="#c1848c" stroke="#2b3440" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`,
    // swirl
    `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 33 C10 33 6 26 9 19 C11 14 18 12 21 16 C23 19 21 23 17 23 C15 23 14 21 15 19" fill="none" stroke="#74805a" stroke-width="2.6" stroke-linecap="round"/>
    </svg>`,
    // little burst of dots
    `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="8" r="3" fill="#c97b6f"/>
      <circle cx="33" cy="20" r="2.6" fill="#c2953f"/>
      <circle cx="20" cy="33" r="3" fill="#74805a"/>
      <circle cx="7" cy="20" r="2.6" fill="#c1848c"/>
    </svg>`
  ];

  const SPAWN_CHANCE = 0.65; // not every hover — keeps it feeling random
  const COOLDOWN_MS = 900;

  function spawnDoodle(x, y) {
    const el = document.createElement('div');
    el.className = 'doodle-fx';
    const jitterX = (Math.random() - 0.5) * 30;
    const jitterY = (Math.random() - 0.5) * 20;
    el.style.left = x + jitterX + 'px';
    el.style.top = y + jitterY + 'px';
    el.innerHTML = DOODLES[Math.floor(Math.random() * DOODLES.length)];
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }

  document.addEventListener('pointerover', (e) => {
    const card = e.target.closest('.moment-card');
    if (!card) return;
    // ignore internal moves within the same card (only trigger on fresh entry)
    if (e.relatedTarget && card.contains(e.relatedTarget)) return;

    const now = Date.now();
    if (card._lastDoodle && now - card._lastDoodle < COOLDOWN_MS) return;
    card._lastDoodle = now;

    if (Math.random() > SPAWN_CHANCE) return;

    const rect = card.getBoundingClientRect();
    spawnDoodle(rect.left + rect.width / 2, rect.top + rect.height * 0.35);
  });
})();
