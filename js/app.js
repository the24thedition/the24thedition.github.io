// Shared across the whole SPA: moment/day helpers used by every view,
// plus the PWA service-worker registration. Page-to-page navigation and
// the tab-pill's active state now live in router.js — this file no
// longer does any full-page navigation.

// gentle fade-in on first load, instead of the page just snapping into view
requestAnimationFrame(() => { document.body.style.opacity = '1'; });

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    // scope to the current directory so this works whether the site is
    // hosted at a domain root or a GitHub Pages project path
    const swUrl = new URL('sw.js', document.baseURI).href;
    navigator.serviceWorker.register(swUrl).catch(() => { /* offline caching just won't be available */ });
  });
}

// ---------------------------------------------------------------
// Single shared place that groups MOMENTS by day and resolves each
// day's title/description — used by the Table view, the Timeline's
// album sequence, and the story view, so every view shows exactly
// the same title and text for a given photo.
// ---------------------------------------------------------------
var DAY_GROUPS = [];

(function unifyMomentTitles() {
  if (typeof MOMENTS === 'undefined') return;

  const sorted = [...MOMENTS].sort((a, b) => {
    if (a.month !== b.month) return a.month - b.month;
    if (a.day !== b.day) return a.day - b.day;
    return a.id - b.id;
  });

  const groups = [];
  sorted.forEach((m) => {
    const last = groups[groups.length - 1];
    if (last && last.month === m.month && last.day === m.day) {
      last.photos.push(m);
    } else {
      groups.push({ month: m.month, day: m.day, monthName: m.monthName, photos: [m] });
    }
  });

  groups.forEach((group) => {
    const key = `${group.month}-${group.day}`;
    const namedPhoto = group.photos.find((p) => !p.title.startsWith('✏️'));
    group.title = namedPhoto ? namedPhoto.title : 'A Day Together';

    group.photos.forEach((p) => { p.title = group.title; });

    if (typeof DAY_STORIES !== 'undefined' && DAY_STORIES[key]) {
      group.desc = DAY_STORIES[key];
    } else if (group.photos.length === 1) {
      group.desc = group.photos[0].story;
    } else {
      group.desc = '✏️ Write about this day.';
    }
  });

  DAY_GROUPS = groups;
})();

// ---------------------------------------------------------------
// Shared flip-card builder — used by both the Table (scattered,
// draggable) and Timeline (static masonry) views so the card itself
// behaves identically everywhere.
// ---------------------------------------------------------------
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function momentDateLabel(m) {
  return `${m.monthName} ${m.day}${typeof YEAR !== 'undefined' && YEAR ? ', ' + YEAR : ''}`;
}

function buildMomentCard(moment) {
  const card = document.createElement('div');
  card.className = 'moment-card';
  card.dataset.id = moment.id;

  card.innerHTML = `
    <div class="card-inner">
      <div class="face face-front">
        <div class="card-photo">
          <img src="${moment.image}" alt="${moment.title}" loading="lazy" draggable="false" />
        </div>
        <div class="card-caption">
          <span class="card-title">${escapeHtml(moment.title)}</span>
          <span class="card-date">${momentDateLabel(moment)}</span>
        </div>
      </div>
      <div class="face face-back">
        <span class="back-date">${momentDateLabel(moment)}</span>
        <h3 class="back-title">${escapeHtml(moment.title)}</h3>
        <p class="back-blurb">${escapeHtml(moment.blurb)}</p>
        <a class="back-link" href="#/story/${moment.id}">View full diary &rarr;</a>
      </div>
    </div>
  `;

  card.addEventListener('dragstart', (e) => e.preventDefault());
  return card;
}

// click-to-flip only (no drag) — used on the Timeline's static grid
function makeCardFlippable(card) {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
}
