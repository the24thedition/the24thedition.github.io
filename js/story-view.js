// One dedicated "diary page" view per moment, with prev/next navigation
// in date order. Exposes window.StoryView = { mount(root, id), unmount() }.

var StoryView = (function () {
  function mount(root, id) {
    if (typeof MOMENTS === 'undefined') return;

    const sorted = [...MOMENTS].sort((a, b) => {
      if (a.month !== b.month) return a.month - b.month;
      if (a.day !== b.day) return a.day - b.day;
      return a.id - b.id;
    });

    const idx = sorted.findIndex((m) => m.id === id);
    const moment = idx >= 0 ? sorted[idx] : null;

    root.innerHTML = '<main class="story-wrap" id="story-root"></main>';
    const wrap = root.querySelector('#story-root');

    if (!moment) {
      wrap.innerHTML = `
        <a class="story-back" href="#/timeline">&larr; back</a>
        <p>We couldn't find that moment. It may have been moved.</p>
      `;
      return;
    }

    const prev = idx > 0 ? sorted[idx - 1] : null;
    const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

    document.title = moment.title + ' — Our Little Table';

    wrap.innerHTML = `
      <a class="story-back" href="#/timeline">&larr; back to timeline</a>
      <div class="story-photo">
        <img src="${moment.image}" alt="${moment.title}" />
      </div>
      <span class="story-date">${moment.monthName} ${moment.day}${typeof YEAR !== 'undefined' && YEAR ? ', ' + YEAR : ''}</span>
      <h1 class="story-title">${moment.title}</h1>
      <p class="story-text">${escapeHtml(moment.story)}</p>
      <nav class="story-nav">
        <a class="${prev ? '' : 'disabled'}" href="${prev ? '#/story/' + prev.id : '#'}">
          &larr; previous
          <span class="dir">${prev ? prev.title : ''}</span>
        </a>
        <a class="${next ? '' : 'disabled'}" href="${next ? '#/story/' + next.id : '#'}" style="text-align:right">
          next &rarr;
          <span class="dir">${next ? next.title : ''}</span>
        </a>
      </nav>
    `;
  }

  function unmount() {
    document.title = 'Our Little Table';
  }

  return { mount, unmount };
})();
