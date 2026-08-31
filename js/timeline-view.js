// The "Timeline" view. Groups MOMENTS by day into "albums". Each album
// is a tall scroll wrapper containing a sticky stage: as you scroll
// through it, that day's photos arrive one at a time and land on top
// of the previous one, until the whole stack is built. A description
// panel then fades in, and the whole thing lifts away for the next day.
//
// Tuned for a snappier feel: shorter scroll distance per album, and an
// ease-out curve on each card's arrival so it accelerates into place
// instead of crawling linearly with the scrollbar.
//
// Exposes window.TimelineView = { mount(root), unmount() }.

var TimelineView = (function () {
  let albums = [];
  let rafId = null;
  let onVisibility = null;
  let onResize = null;

  function escapeHtmlLocal(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // deterministic per-id "random" in [0,1), stable across reloads
  function seeded(id, salt) {
    const x = Math.sin(id * 12.9898 + salt * 78.233) * 43758.5453;
    return x - Math.floor(x);
  }

  // accelerates quickly into place rather than a linear crawl —
  // this is what makes the reveal feel snappy without hard-snapping
  function easeInOutCubic(t) {
    return t < 0.5
		? 4 * t * t * t
		: 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function build(root) {
    root.innerHTML = `
      <header class="timeline-header">
        <h1>Where our memories live and grow</h1>
      </header>
      <div class="origin-card" id="origin-card"></div>
      <div class="album-sequence" id="album-sequence"></div>
      <div class="scroll-progress-hint">keep scrolling to open each day</div>
    `;

    const introEl = root.querySelector('#origin-card');
    if (introEl && typeof ORIGIN_STORY !== 'undefined') {
      introEl.innerHTML = `
        <span class="origin-label">${escapeHtmlLocal(ORIGIN_STORY.label)} &middot; ${escapeHtmlLocal(ORIGIN_STORY.date)}</span>
        <h2 class="origin-title">${escapeHtmlLocal(ORIGIN_STORY.title)}</h2>
        <p class="origin-text">${escapeHtmlLocal(ORIGIN_STORY.text)}</p>
        <span class="origin-cue">keep scrolling &darr;</span>
      `;
    }

    const seqRoot = root.querySelector('#album-sequence');
    albums = DAY_GROUPS;
    const isMobile = window.innerWidth <= 860;

    albums.forEach((album, albumIdx) => {
      const count = album.photos.length;
      // shorter scroll room than the original build — the main lever
      // for making the reveal feel snappier rather than long and slow
      const vhBase = isMobile ? 260 : 300;
      const vhPerExtra = isMobile ? 55 : 65;
      const sectionVh = Math.min(vhBase + Math.max(0, count - 1) * vhPerExtra, 460);

      // gather finishes earlier in the scroll range, so photos land
      // sooner per unit of scroll/swipe
      const gatherFrac = Math.min(0.62 + count * 0.025, 0.72);
      const exitStart = 0.88;

      album.gatherFrac = gatherFrac;
      album.exitStart = exitStart;

      const wrapper = document.createElement('div');
      wrapper.className = 'album-wrapper';
      wrapper.style.height = Math.round((sectionVh / 100) * window.innerHeight) + 'px';

      const stage = document.createElement('div');
      stage.className = 'album-stage';

      const inner = document.createElement('div');
      inner.className = 'album-inner';

      const stackArea = document.createElement('div');
      stackArea.className = 'stack-area';

      album.cardEls = [];

      album.photos.forEach((moment, i) => {
        const card = buildMomentCard(moment);

        const sx = (seeded(moment.id, 1) - 0.5) * 110;
        const sy = 120 + seeded(moment.id, 2) * 130;
        const srot = (seeded(moment.id, 3) - 0.5) * 18;

        const tx = i * (isMobile ? 2 : 4);
        const ty = -i * (isMobile ? 2 : 4);
        const trot = (i % 2 === 0 ? 1 : -1) * (1.5 + i * 0.8);

        card.style.setProperty('--sx', sx.toFixed(1) + 'px');
        card.style.setProperty('--sy', sy.toFixed(1) + 'px');
        card.style.setProperty('--srot', srot.toFixed(1) + 'deg');
        card.style.setProperty('--tx', tx + 'px');
        card.style.setProperty('--ty', ty + 'px');
        card.style.setProperty('--trot', trot.toFixed(1) + 'deg');
        card.style.setProperty('--lgp', 0);
        card.style.zIndex = i + 1;

        makeCardFlippable(card);
        stackArea.appendChild(card);
        album.cardEls.push(card);
      });

      const panel = document.createElement('div');
      panel.className = 'album-panel';
      panel.innerHTML = `
        <span class="album-index">Album ${albumIdx + 1} / ${albums.length}</span>
        <span class="album-date">${album.monthName} ${album.day}${typeof YEAR !== 'undefined' && YEAR ? ', ' + YEAR : ''}</span>
        <h2 class="album-title">${escapeHtmlLocal(album.title)}</h2>
        <p class="album-desc">${escapeHtmlLocal(album.desc)}</p>
      `;

      inner.appendChild(stackArea);
      inner.appendChild(panel);
      stage.appendChild(inner);
      wrapper.appendChild(stage);
      seqRoot.appendChild(wrapper);

      album._wrapperEl = wrapper;
      album._stageEl = stage;
    });
  }

  function updateAlbums() {
    const vh = window.innerHeight;
    albums.forEach((album) => {
      const wrapper = album._wrapperEl;
      const stage = album._stageEl;
      if (!wrapper || !stage) return;
      const count = album.photos.length;
      const rect = wrapper.getBoundingClientRect();
      const scrollableDist = wrapper.offsetHeight - vh;
      let r = scrollableDist > 0 ? -rect.top / scrollableDist : 0;
      r = Math.max(0, Math.min(1, r));

      const gp = Math.max(0, Math.min(1, r / album.gatherFrac));

      album.cardEls.forEach((card, i) => {
        const li = Math.max(0, Math.min(1, gp * count - i));
        card.style.setProperty('--lgp', easeInOutCubic(li));
      });

      const hp = Math.max(0, Math.min(1, gp));
      const ep = Math.max(0, Math.min(1, (r - album.exitStart) / (1 - album.exitStart)));

      stage.style.setProperty('--hp', hp);
      stage.style.setProperty('--ep', ep);
    });
  }

  function loop() {
    updateAlbums();
    rafId = requestAnimationFrame(loop);
  }

  function mount(root) {
    build(root);

    onVisibility = () => {
      if (document.hidden) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!rafId) {
        loop();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    onResize = updateAlbums;
    window.addEventListener('resize', onResize);

    updateAlbums();
    loop();
  }

  function unmount() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    if (onVisibility) document.removeEventListener('visibilitychange', onVisibility);
    if (onResize) window.removeEventListener('resize', onResize);
    onVisibility = null;
    onResize = null;
    albums = [];
  }

  return { mount, unmount };
})();
