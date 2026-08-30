// Little floating props scattered over the page: a pigeon flock photo,
// a coffee cup, a hand-drawn sunset, a cookie, and a flower bouquet.
// Each idle-drifts on its own in a lazy loop, perks up on hover, and can
// be dragged anywhere — position is remembered per device.

(function () {
  const STORAGE_KEY = 'decor-positions-v1';

  // your own photos for four of these; the sunset stays a simple line
  // drawing since no photo was provided for it
  const ICONS = {
    pigeon: {
      type: 'img',
      src: 'props/pigeon.png',
      width: 108,
      height: 75,
      duration: 4.6,
      delay: 0
    },
    coffee: {
      type: 'img',
      src: 'props/coffee.png',
      width: 46,
      height: 74,
      duration: 5.0,
      delay: 0.6
    },
    sunset: {
      type: 'svg',
      width: 64,
      height: 64,
      duration: 6.0,
      delay: 1.1,
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="34" r="12" fill="#c2953f" stroke="#2b3440" stroke-width="2"/>
        <line x1="32" y1="10" x2="32" y2="16" stroke="#2b3440" stroke-width="2" stroke-linecap="round"/>
        <line x1="12" y1="34" x2="18" y2="34" stroke="#2b3440" stroke-width="2" stroke-linecap="round"/>
        <line x1="46" y1="34" x2="52" y2="34" stroke="#2b3440" stroke-width="2" stroke-linecap="round"/>
        <line x1="17" y1="19" x2="21" y2="23" stroke="#2b3440" stroke-width="2" stroke-linecap="round"/>
        <line x1="47" y1="19" x2="43" y2="23" stroke="#2b3440" stroke-width="2" stroke-linecap="round"/>
        <path d="M6 48 Q32 40 58 48" fill="none" stroke="#74805a" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M6 54 Q32 47 58 54" fill="none" stroke="#545c3f" stroke-width="2.4" stroke-linecap="round"/>
      </svg>`
    },
    cookie: {
      type: 'img',
      src: 'props/cookie.png',
      width: 64,
      height: 64,
      duration: 4.7,
      delay: 1.7
    },
    flower: {
      type: 'img',
      src: 'props/flowers.png',
      width: 78,
      height: 68,
      duration: 5.6,
      delay: 2.3
    },
    music: {
      type: 'svg',
      width: 78,
      height: 78,
      duration: 5.2,
      delay: 0.4,
      svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="10" width="56" height="46" rx="5" fill="#8a6038" stroke="#2b3440" stroke-width="2"/>
        <rect x="4" y="10" width="56" height="10" rx="5" fill="#a67a30" stroke="#2b3440" stroke-width="2"/>
        <g class="record-disc" style="transform-origin: 25px 38px;">
          <circle cx="25" cy="38" r="19" fill="#232833" stroke="#2b3440" stroke-width="2"/>
          <circle cx="25" cy="38" r="15" fill="none" stroke="#3a4453" stroke-width="1"/>
          <circle cx="25" cy="38" r="11" fill="none" stroke="#3a4453" stroke-width="1"/>
          <line x1="25" y1="38" x2="25" y2="20" stroke="#3a4453" stroke-width="1.3"/>
          <circle cx="25" cy="23" r="2" fill="#c1848c" stroke="#2b3440" stroke-width="1"/>
          <circle cx="25" cy="38" r="4.5" fill="#c2953f" stroke="#2b3440" stroke-width="1.4"/>
        </g>
        <circle cx="52" cy="20" r="3" fill="#a67a30" stroke="#2b3440" stroke-width="1.6"/>
        <g class="tonearm" style="transform-origin: 52px 20px;">
          <line x1="52" y1="20" x2="55" y2="34" stroke="#2b3440" stroke-width="2" stroke-linecap="round"/>
          <circle cx="55" cy="34" r="2.6" fill="#c2953f" stroke="#2b3440" stroke-width="1.4"/>
        </g>
      </svg>`
    }
  };

  // default scattered spots, as % of viewport — spread across more of
  // the page (not just the corners) so they have real room to roam
  const DEFAULTS = {
    pigeon: { left: 5, top: 12 },
    coffee: { left: 92, top: 10 },
    sunset: { left: 4, top: 55 },
    cookie: { left: 93, top: 60 },
    flower: { left: 50, top: 88 },
    music: { left: 47, top: 8 }
  };

  function loadSaved() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function savePos(key, leftPct, topPct) {
    const all = loadSaved();
    all[key] = { left: leftPct, top: topPct };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }

  function build() {
    if (window.innerWidth < 380) return; // too cramped to bother on tiny screens

    const saved = loadSaved();

    // one shared audio element for the background track, used by the
    // music companion below
    let audioEl = null;
    if (typeof MUSIC_SRC !== 'undefined' && MUSIC_SRC) {
      audioEl = document.createElement('audio');
      audioEl.src = MUSIC_SRC;
      audioEl.loop = true;
      audioEl.preload = 'auto';
      document.body.appendChild(audioEl);
    }

    // the pigeon companion is temporarily disabled — it now flies across
    // the sky in the background instead (see birds.js); re-enable by
    // removing this line if you want the draggable version back too
    const DISABLED_COMPANIONS = ['pigeon'];

    Object.keys(ICONS).forEach((key) => {
      if (key === 'music' && !audioEl) return; // no track configured yet
      if (DISABLED_COMPANIONS.includes(key)) return;

      const icon = ICONS[key];
      const pos = saved[key] || DEFAULTS[key];

      const item = document.createElement('div');
      item.className = 'decor-item';
      item.dataset.key = key;
      item.style.left = pos.left + 'vw';
      item.style.top = pos.top + 'vh';
      item.style.width = icon.width + 'px';
      item.style.height = icon.height + 'px';

      const hover = document.createElement('div');
      hover.className = 'decor-hover';

      const anim = document.createElement('div');
      anim.className = 'decor-anim';
      anim.style.setProperty('--duration', icon.duration + 's');
      anim.style.setProperty('--delay', icon.delay + 's');

      if (icon.type === 'img') {
        const img = document.createElement('img');
        img.src = icon.src;
        img.alt = '';
        img.draggable = false;
        anim.appendChild(img);
      } else {
        anim.innerHTML = icon.svg;
      }

      hover.appendChild(anim);
      item.appendChild(hover);

      if (key === 'music') {
        item.classList.add('decor-music');
        item.title = 'Play our song';
        attachDrag(item, () => toggleMusic(item, audioEl));
        wireMusicItem(item, audioEl);
      } else {
        attachDrag(item);
      }

      document.body.appendChild(item);
    });
  }

  // reflect the audio element's real state on the icon (covers the
  // autoplay-then-blocked-then-resumed-on-first-tap flow below, not just
  // clicks on the icon itself)
  function wireMusicItem(item, audioEl) {
    audioEl.addEventListener('play', () => {
      item.classList.add('playing');
      item.title = 'Pause our song';
    });
    audioEl.addEventListener('pause', () => {
      item.classList.remove('playing');
      item.title = 'Play our song';
    });

    // Browsers block audio that starts with sound before any interaction
    // with the page at all — no website can override that, it's an OS/
    // browser policy, not something code can force. The standard way
    // around it: autoplay muted (always allowed), then try to unmute
    // right away — several desktop browsers permit that even with zero
    // interaction. Anywhere that still refuses, the first tap/click
    // anywhere on the page unmutes and starts it for real.
    audioEl._userWantsSound = true; // becomes false only if the person explicitly pauses

    function tryAutoplay() {
      audioEl.muted = true;
      audioEl.play().then(() => {
        audioEl.muted = false;
      }).catch(() => { /* even muted autoplay got blocked — wait for a tap */ });
    }

    function unmuteAndPlayOnFirstTouch() {
      if (!audioEl._userWantsSound) return;
      audioEl.muted = false;
      if (audioEl.paused) audioEl.play().catch(() => {});
    }
    document.addEventListener('pointerdown', unmuteAndPlayOnFirstTouch);

    if (audioEl.readyState >= 2) {
      tryAutoplay();
    } else {
      audioEl.addEventListener('canplay', tryAutoplay, { once: true });
    }
  }

  function toggleMusic(item, audioEl) {
    if (audioEl.paused) {
      audioEl._userWantsSound = true;
      audioEl.muted = false;
      audioEl.play().catch(() => {});
    } else {
      audioEl._userWantsSound = false;
      audioEl.pause();
    }
  }

  function attachDrag(item, onClick) {
    let startX, startY, startLeftVw, startTopVh, moved;

    item.addEventListener('dragstart', (e) => e.preventDefault());

    item.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      item.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startY = e.clientY;
      startLeftVw = parseFloat(item.style.left);
      startTopVh = parseFloat(item.style.top);
      moved = false;
      item.classList.add('dragging');
    });

    item.addEventListener('pointermove', (e) => {
      if (!item.classList.contains('dragging')) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
      if (!moved) return;

      const newLeftVw = startLeftVw + (dx / window.innerWidth) * 100;
      const newTopVh = startTopVh + (dy / window.innerHeight) * 100;
      item.style.left = newLeftVw + 'vw';
      item.style.top = newTopVh + 'vh';
    });

    function endDrag() {
      item.classList.remove('dragging');
      if (moved) {
        savePos(item.dataset.key, parseFloat(item.style.left), parseFloat(item.style.top));
      } else if (onClick) {
        onClick();
      }
    }

    item.addEventListener('pointerup', endDrag);
    item.addEventListener('pointercancel', () => item.classList.remove('dragging'));
  }

  build();
})();
