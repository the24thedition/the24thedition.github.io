# Our Little Table

A personal scrapbook site: a draggable, flippable "table" of photos, a
scrolling timeline, and a dedicated diary page per photo. Built as a
single-page app (one real page, no reloads between views) so it feels
like a real app once added to your iPhone's Home Screen.

## What changed in this version

- **One real page, not three.** `index.html` is now the whole site —
  the Table, Timeline, and a diary page all live inside it and swap in
  and out instantly (`js/router.js`). Nothing reloads, so clicking a
  card or a nav tab never has that "flash of white / loading a new
  page" feeling anymore, and Safari's edge-swipe-back gesture no
  longer yanks you out of the app the way it did when each view was a
  separate `.html` file. Individual moments are still shareable/
  bookmarkable as a link — e.g. `index.html#/story/6`.
- **It's a real installable PWA now.** Added `manifest.json` and
  `sw.js` (a service worker). Once you visit it in Safari and use
  **Add to Home Screen**, it opens full-screen with no browser chrome
  at all, and the app shell (everything except your photos/music) is
  cached so it opens instantly and still works with no signal.
- **Fireworks are a real little show now**, not a placeholder gag:
  actual rockets launch from the bottom of the screen with a trail,
  arc up, and burst — with layered launch/boom/crackle sound — and it
  fires every time you scroll to the bottom (scroll away and come back
  and it goes off again), not just once ever.
- **The pigeons actually flap now.** Each bird is a small SVG with two
  wings that beat in opposition, instead of one static flock photo.
- **The Timeline's photo-stack reveal is snappier** — same smooth,
  continuous feel as before (not a hard per-swipe snap), just
  noticeably quicker to respond as you scroll/swipe.

## Everything you'll want to edit lives in one file

Open **`js/data.js`**. At the top:

```js
const YEAR = 2024;                          // <- set the real year
const COUPLE_NAMES = "Your Name & Fiancé's Name";  // <- your names
const CLOSING_NOTE = "...";                 // <- footer message
const SITE_PASSCODE = "0101";               // <- her birthday, digits only
```

The site opens on a lock screen (numeric keypad, like an iPhone) and asks
for `SITE_PASSCODE` before revealing anything. Set it to her birthday as
digits — `"0517"` for May 17th, or `"05171998"` if you'd rather use the
full month+day+year. Once someone enters it correctly, that device/
browser won't be asked again (remembered via localStorage) — delete the
`site-unlocked` entry in the browser's localStorage, or use a private/
incognito window, if you want to test the lock screen again yourself.

**Heads up:** this is a cute lock screen, not real security — the
passcode sits in plain text in `js/data.js`, which anyone can read via
"View Page Source." Fine for a private gift link you're texting to one
person; don't rely on it if that matters more than that.

Then below that, `MOMENTS` is a list of 34 entries (one per photo), each like:

```js
{
  "id": 6,
  "image": "photos/06.jpg",
  "day": 8,
  "month": 5,
  "monthName": "May",
  "title": "Engagement Day",
  "blurb": "Short line shown on the back of the card.",
  "story": "The longer story shown on the full diary page. Can be as long as you want — line breaks are kept."
}
```

- `title` / `blurb` / `story` are the only fields you should need to touch.
- Entries marked `✏️` are placeholders — fill those in.
- Order doesn't matter in this file — the Timeline page sorts everything
  by `month`/`day` automatically, and the Table page scatters them
  randomly (but consistently) either way.

## Structure

- `index.html` — the app shell: nav pill, `<main id="view-root">`
  (where every view gets rendered), and the footer. This is the only
  HTML page in the whole site now.
- `js/router.js` — reads the URL hash and swaps the right view into
  `#view-root` with a quick cross-fade. `#/` = Table, `#/timeline` =
  Timeline, `#/story/6` = the diary page for moment id 6.
- `js/table-view.js`, `js/timeline-view.js`, `js/story-view.js` — the
  three views themselves (this is where `table.js`/`scrollalbum.js`/
  `story.js` went).
- `js/app.js` — shared helpers used by every view (building a photo
  card, grouping moments by day, etc.) plus the PWA service-worker
  registration.
- `manifest.json` / `sw.js` — what makes "Add to Home Screen" behave
  like a real installed app, and lets the app shell work offline.
- `story.html` / `timeline.html` — tiny redirect stubs, only so any old
  bookmarks/links to the previous multi-page version still land in the
  right place. Safe to ignore.
- `css/` — one shared stylesheet (`style.css`) plus one per view.
- `props/` — the coffee, cookie, and flower photos, used by the
  floating companions on every page.
- `photos/` — your 34 photos.

## iPhone / iOS polish

- Respects the notch/Dynamic Island and home-indicator safe areas.
- Fixes the classic iOS "100vh is taller than the visible screen"
  address-bar bug on the Timeline's scroll-jacked album sections.
- Disables the long-press "Save Photo" menu that would otherwise
  interrupt dragging a photo card or a floating companion.
- No gray tap-flash on buttons/links, no accidental double-tap-zoom.
- Real `apple-touch-icon` + `manifest.json`, so **Add to Home Screen**
  gives it a proper icon and opens full-screen with no Safari chrome
  at all — which is also what makes the edge-swipe-back gesture a
  non-issue once it's installed that way, since there's no browser UI
  left for that gesture to act on.

It should also work fine on Android and desktop browsers — none of
these changes are iPhone-only, they just matter most there.

## Adding your music

The floating gramophone companion near the top of the page is a
play/pause button for background music. Drop your mp3 into
`music/theme.mp3` — or point `MUSIC_SRC` in `js/data.js` at a
different filename if you'd rather call it something else. Leave
`MUSIC_SRC` blank (`""`) and the companion just won't appear.

**If you're uploading via the GitHub website (not git):** its
drag-and-drop uploader caps individual files around 25MB. If your mp3
is bigger than that, re-export/compress it to ~128kbps MP3 first
(typically shrinks a 4–5 minute song down to 4–5MB, plenty good for
background music) — most editors and free online mp3 compressors can
do this in one step.

## Hosting on GitHub Pages (no git required)

You said you'd rather make a **new GitHub account** and get the URL
`the24thedition.github.io`. For that exact URL to work, your GitHub
**username itself** has to be `the24thedition` — GitHub Pages serves a
personal site at `https://<your-username>.github.io/`, tied to a repo
that must be named *exactly* that too.

1. **Create the account.** Go to github.com → Sign up → use the
   username `the24thedition` (if it's taken, you'll need a variant,
   and your site URL will match whatever username you land on).
2. **Create the repo.** Click **+ → New repository**. Name it *exactly*
   `the24thedition.github.io` (must match your username, all
   lowercase). Leave it Public. Don't add a README/gitignore — you're
   uploading files directly.
3. **Upload the files.** Open the new repo → **Add file → Upload
   files** → drag in everything *inside* this `site` folder (not the
   folder itself — the contents: `index.html`, `css/`, `js/`, `photos/`,
   etc. should sit at the repo's root). GitHub's uploader supports
   dragging whole folders in most browsers. Commit the upload.
4. **Turn on Pages.** Repo → **Settings → Pages** → under "Build and
   deployment," Source should already be "Deploy from a branch" →
   Branch: `main` / `root` → Save. (For a repo named
   `<username>.github.io`, this is often already on by default.)
5. **Wait ~1 minute, then visit** `https://the24thedition.github.io/`.
   It should ask for the passcode right away.

Whenever you want to update text, add photos, or fix anything: edit
the file locally, then go back to **Add file → Upload files** and drop
in the changed file(s) again — GitHub will ask if you want to replace
the existing one. It republishes automatically within a minute or two.

**One thing to remember when you push a real update later:** open
`sw.js` and bump `CACHE_VERSION` (e.g. `'v1'` → `'v2'`). That tells
returning visitors' phones to fetch the new files instead of serving
the old cached version. If you skip this, updates can take longer to
show up for someone who already installed the app.

## Ideas for later (optional)

- The Timeline currently keeps a background animation loop running
  while you're on that view (it's what drives the scroll-tied photo
  stack) — it already pauses when the tab isn't visible, but if you
  ever add more views like it, worth keeping an eye on battery use on
  older phones.
- Group multiple photos from the same day into one flip-card carousel
  instead of separate cards, if you'd rather browse a day as one card
  that cycles through its photos.
