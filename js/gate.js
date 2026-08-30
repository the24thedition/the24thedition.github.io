// A lock-screen gate shown before the site reveals itself, styled like
// a phone lock screen. The passcode is SITE_PASSCODE, set in data.js.
// Once entered correctly, it's remembered on this device (localStorage)
// so it won't ask again.

(function () {
  const STORAGE_KEY = 'site-unlocked';
  if (localStorage.getItem(STORAGE_KEY) === 'yes') return; // already unlocked
  if (typeof SITE_PASSCODE === 'undefined') return; // data.js didn't load — fail open rather than lock someone out

  const overlay = document.createElement('div');
  overlay.id = 'lock-screen';
  overlay.innerHTML = `
    <div class="lock-top">
      <div class="lock-time" id="lock-time"></div>
      <div class="lock-date" id="lock-date"></div>
      <div class="lock-label">Enter her birthday to unlock</div>
      <div class="lock-dots" id="lock-dots"></div>
    </div>
    <div class="lock-keypad" id="lock-keypad"></div>
  `;
  document.body.insertBefore(overlay, document.body.firstChild);

  // --- dots, sized to match the passcode length ---
  const dotsEl = overlay.querySelector('#lock-dots');
  for (let i = 0; i < SITE_PASSCODE.length; i++) {
    const dot = document.createElement('span');
    dotsEl.appendChild(dot);
  }
  const dots = dotsEl.querySelectorAll('span');

  // --- keypad: 1-9, blank, 0, backspace ---
  const keypadEl = overlay.querySelector('#lock-keypad');
  const keys = ['1','2','3','4','5','6','7','8','9', '', '0', '\u232B'];
  keys.forEach((k) => {
    const btn = document.createElement('button');
    if (k === '') {
      btn.className = 'lock-key-empty';
      btn.tabIndex = -1;
    } else if (k === '\u232B') {
      btn.className = 'lock-key-back';
      btn.dataset.action = 'back';
      btn.textContent = k;
    } else {
      btn.dataset.digit = k;
      btn.textContent = k;
    }
    keypadEl.appendChild(btn);
  });

  // --- live time/date, like a real lock screen ---
  function pad(n) { return n.toString().padStart(2, '0'); }
  function renderClock() {
    const now = new Date();
    const h12 = ((now.getHours() + 11) % 12) + 1;
    overlay.querySelector('#lock-time').textContent = pad(h12) + ':' + pad(now.getMinutes());
    overlay.querySelector('#lock-date').textContent = now.toLocaleDateString(undefined, {
      weekday: 'long', month: 'long', day: 'numeric'
    });
  }
  renderClock();
  const clockTimer = setInterval(renderClock, 15000);

  // --- passcode entry ---
  let entered = '';

  function updateDots() {
    dots.forEach((d, i) => d.classList.toggle('filled', i < entered.length));
  }

  function checkCode() {
    if (entered.length < SITE_PASSCODE.length) return;
    if (entered === SITE_PASSCODE) {
      localStorage.setItem(STORAGE_KEY, 'yes');
      clearInterval(clockTimer);
      overlay.classList.add('unlocking');
      setTimeout(() => overlay.remove(), 550);
    } else {
      overlay.classList.add('shake');
      setTimeout(() => {
        overlay.classList.remove('shake');
        entered = '';
        updateDots();
      }, 420);
    }
  }

  keypadEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn || btn.classList.contains('lock-key-empty')) return;
    if (btn.dataset.action === 'back') {
      entered = entered.slice(0, -1);
    } else if (btn.dataset.digit !== undefined && entered.length < SITE_PASSCODE.length) {
      entered += btn.dataset.digit;
    }
    updateDots();
    checkCode();
  });

  // physical keyboard works too, for convenience on desktop
  document.addEventListener('keydown', (e) => {
    if (!document.body.contains(overlay)) return;
    if (/^[0-9]$/.test(e.key) && entered.length < SITE_PASSCODE.length) {
      entered += e.key;
      updateDots();
      checkCode();
    } else if (e.key === 'Backspace') {
      entered = entered.slice(0, -1);
      updateDots();
    }
  });
})();
