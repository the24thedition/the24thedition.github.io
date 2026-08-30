// Client-side router. The whole site is one document (index.html); this
// swaps the Table / Timeline / Story views in and out of #view-root by
// reading location.hash, with a quick cross-fade so it never feels like
// a page is reloading — including when the browser's own back/forward
// (or an edge-swipe gesture) steps through hash history.

(function () {
  const root = document.getElementById('view-root');
  const closingNoteEl = document.getElementById('closing-note');
  if (!root) return;

  const FADE_MS = 160;
  let current = null; // the currently mounted view module

  function parseRoute() {
    const hash = location.hash || '#/';
    const storyMatch = hash.match(/^#\/story\/(\d+)/);
    if (storyMatch) return { name: 'story', id: parseInt(storyMatch[1], 10) };
    if (hash === '#/timeline') return { name: 'timeline' };
    return { name: 'table' };
  }

  function updateNav(routeName) {
    document.querySelectorAll('.site-nav .tab-pill a').forEach((a) => {
      a.classList.toggle('active', a.dataset.route === (routeName === 'story' ? 'timeline' : routeName));
    });
  }

  function updateFooter(routeName) {
    if (!closingNoteEl) return;
    if (routeName === 'story') {
      closingNoteEl.style.display = 'none';
    } else {
      closingNoteEl.style.display = '';
      closingNoteEl.innerHTML = (typeof CLOSING_NOTE !== 'undefined' ? CLOSING_NOTE : '').replace(/\n/g, '<br>');
    }
  }

  function moduleFor(name) {
    if (name === 'timeline') return window.TimelineView;
    if (name === 'story') return window.StoryView;
    return window.TableView;
  }

  function render() {
    const route = parseRoute();
    const nextModule = moduleFor(route.name);
    if (!nextModule) return;

    root.style.transition = `opacity ${FADE_MS}ms ease`;
    root.style.opacity = '0';

    setTimeout(() => {
      if (current && current.unmount) current.unmount();
      root.innerHTML = '';

      if (route.name === 'story') {
        nextModule.mount(root, route.id);
      } else {
        nextModule.mount(root);
      }
      current = nextModule;

      updateNav(route.name);
      updateFooter(route.name);
      window.scrollTo(0, 0);

      root.style.opacity = '1';
      window.dispatchEvent(new CustomEvent('viewchanged'));
    }, FADE_MS);
  }

  window.addEventListener('hashchange', render);
  window.addEventListener('DOMContentLoaded', render);
})();
