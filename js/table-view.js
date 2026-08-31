// The scattered "Table" view. Scatters MOMENTS across a surface, lets
// you drag cards around, and flips a card on click (as opposed to a
// drag) to reveal its story. The card markup/behavior itself comes
// from buildMomentCard() in app.js.
//
// Exposes window.TableView = { mount(root), unmount() } for router.js.

var TableView = (function () {
  const STORAGE_KEY = 'table-positions-v1';
  let surface = null;
  let resetBtn = null;
  let onResize = null;
  let lastWidth = window.innerWidth;

  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function loadSavedPositions() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function savePosition(id, xPct, yPct, rot) {
    const all = loadSavedPositions();
    all[id] = { x: xPct, y: yPct, rot };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }

  function clearSavedPositions() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function layoutAll() {
    if (!surface || typeof MOMENTS === 'undefined') return;
    surface.innerHTML = '';
    const rand = mulberry32(20240508);
    const saved = loadSavedPositions();

    const containerWidth = surface.clientWidth || window.innerWidth;
    const cardW = window.innerWidth <= 640 ? 150 : 194;
    const cardH = window.innerWidth <= 640 ? 192 : 248;
    const cellW = Math.round(cardW * 0.72);
    const cellH = Math.round(cardH * 0.62);
    const cols = Math.max(3, Math.floor(containerWidth / cellW));
    const rows = Math.ceil(MOMENTS.length / cols);

    const cellIndices = Array.from({ length: cols * rows }, (_, i) => i);
    for (let i = cellIndices.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [cellIndices[i], cellIndices[j]] = [cellIndices[j], cellIndices[i]];
    }

    surface.style.height = rows * cellH + cardH + 'px';

    MOMENTS.forEach((moment, idx) => {
      const cellIdx = cellIndices[idx];
      const col = cellIdx % cols;
      const row = Math.floor(cellIdx / cols);

      const jitterX = (rand() - 0.5) * (cellW * 0.6);
      const jitterY = (rand() - 0.5) * (cellH * 0.5);
      const rot = (rand() - 0.5) * 18;

      let xPx = col * cellW + jitterX + 20;
      let yPx = row * cellH + jitterY + 50;

      xPx = Math.max(6, Math.min(xPx, containerWidth - cardW - 6));

      let xPct = (xPx / containerWidth) * 100;
      let finalRot = rot;

      if (saved[moment.id]) {
        xPct = saved[moment.id].x;
        yPx = saved[moment.id].y;
        finalRot = saved[moment.id].rot;
      }

      const card = buildMomentCard(moment);
      card.style.left = xPct + '%';
      card.style.top = yPx + 'px';
      card.style.setProperty('--rot', finalRot + 'deg');
      card.dataset.rot = finalRot;

      surface.appendChild(card);
      attachDragAndFlip(card);
    });
  }

  function attachDragAndFlip(card) {
    let startX, startY, startLeftPct, startTopPx, moved, containerW;

    card.addEventListener('pointerdown', (e) => {
      // let the "View full diary" link behave like a normal link — if we
      // preventDefault()/capture the pointer here, the click never reaches
      // the anchor and pointerup just re-flips the card instead of
      // navigating.
      if (e.target.closest('.back-link')) return;

      e.preventDefault();
      card.setPointerCapture(e.pointerId);
      containerW = surface.clientWidth;
      startX = e.clientX;
      startY = e.clientY;
      startLeftPct = parseFloat(card.style.left);
      startTopPx = parseFloat(card.style.top);
      moved = false;
      card.classList.add('dragging');
    });

    card.addEventListener('pointermove', (e) => {
      if (!card.classList.contains('dragging')) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
      if (!moved) return;

      const newLeftPct = startLeftPct + (dx / containerW) * 100;
      const newTopPx = startTopPx + dy;
      card.style.left = newLeftPct + '%';
      card.style.top = newTopPx + 'px';
    });

    function endDrag() {
      card.classList.remove('dragging');
      if (moved) {
        const rot = parseFloat(card.dataset.rot) || 0;
        savePosition(card.dataset.id, parseFloat(card.style.left), parseFloat(card.style.top), rot);
      } else {
        card.classList.toggle('flipped');
      }
    }

    card.addEventListener('pointerup', endDrag);
    card.addEventListener('pointercancel', () => {
      card.classList.remove('dragging');
    });
  }

  function mount(root) {
    root.innerHTML = `
      <header class="table-header">
        <h1>Our little moments, forever on this table</h1>
      </header>
      <p class="table-hint">drag any photo &nbsp;&middot;&nbsp; click to flip &nbsp;&middot;&nbsp; open the full diary from the back</p>
      <div class="table-surface" id="table-surface"></div>
      <div class="table-controls">
        <button id="reset-layout" type="button">Reset scattered layout</button>
      </div>
    `;

    surface = root.querySelector('#table-surface');
    resetBtn = root.querySelector('#reset-layout');

    resetBtn.addEventListener('click', () => {
      clearSavedPositions();
      layoutAll();
    });

    layoutAll();

    lastWidth = window.innerWidth;
    let resizeTimer;
    onResize = () => {
      if (window.innerWidth === lastWidth) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        lastWidth = window.innerWidth;
        layoutAll();
      }, 250);
    };
    window.addEventListener('resize', onResize);
  }

  function unmount() {
    if (onResize) window.removeEventListener('resize', onResize);
    onResize = null;
    surface = null;
    resetBtn = null;
  }

  return { mount, unmount };
})();
