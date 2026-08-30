// A little celebration every time you reach the end of any view: real
// rockets launch from the bottom of the screen, arc up with a trail,
// and burst into colored sparks (matching the site's sunset palette)
// with layered synthesized launch/boom/crackle audio — no external
// assets, built entirely from canvas + Web Audio.
//
// Unlike a one-shot effect, this re-arms itself: once you scroll away
// from the bottom and come back (on this view or after switching to
// another one), it fires again.

(function () {
  let audioCtx = null;
  let armed = true;
  let firing = false;
  let noiseBuffer = null;

  const REARM_DISTANCE = 260; // px you must scroll away from the bottom before it can fire again

  function unlockAudio() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        try { audioCtx = new Ctx(); } catch (e) { /* no Web Audio support — visuals still work */ }
      }
    } else if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }
  document.addEventListener('pointerdown', unlockAudio);

  function getNoiseBuffer() {
    if (noiseBuffer || !audioCtx) return noiseBuffer;
    const bufferSize = audioCtx.sampleRate * 1; // 1s of white noise, reused/sliced as needed
    noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    return noiseBuffer;
  }

  // rising "whoosh" as a rocket launches
  function playWhoosh(t0, duration) {
    if (!audioCtx) return;
    const buf = getNoiseBuffer();
    if (!buf) return;
    const src = audioCtx.createBufferSource();
    src.buffer = buf;
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 0.8;
    filter.frequency.setValueAtTime(500, t0);
    filter.frequency.exponentialRampToValueAtTime(2600, t0 + duration);
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.09, t0 + duration * 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    src.connect(filter).connect(gain).connect(audioCtx.destination);
    src.start(t0);
    src.stop(t0 + duration + 0.05);
  }

  // low thump + noise crack, at the moment a rocket explodes
  function playBoom(t0, big) {
    if (!audioCtx) return;
    const buf = getNoiseBuffer();
    if (buf) {
      const src = audioCtx.createBufferSource();
      src.buffer = buf;
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(big ? 1400 : 900, t0);
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(big ? 0.28 : 0.16, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.35);
      src.connect(filter).connect(gain).connect(audioCtx.destination);
      src.start(t0);
      src.stop(t0 + 0.4);
    }

    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(big ? 120 : 90, t0);
    osc.frequency.exponentialRampToValueAtTime(30, t0 + 0.3);
    const oscGain = audioCtx.createGain();
    oscGain.gain.setValueAtTime(big ? 0.22 : 0.12, t0);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.32);
    osc.connect(oscGain).connect(audioCtx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.35);
  }

  // sparse random crackle/pop clicks trailing after a burst, like real
  // firework embers snapping as they fade
  function playCrackleTail(t0, count) {
    if (!audioCtx) return;
    const buf = getNoiseBuffer();
    if (!buf) return;
    for (let i = 0; i < count; i++) {
      const delay = t0 + 0.1 + Math.random() * 0.9;
      const src = audioCtx.createBufferSource();
      src.buffer = buf;
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 2200 + Math.random() * 1800;
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.05 + Math.random() * 0.05, delay);
      gain.gain.exponentialRampToValueAtTime(0.001, delay + 0.06);
      src.connect(filter).connect(gain).connect(audioCtx.destination);
      src.start(delay);
      src.stop(delay + 0.08);
    }
  }

  function launchFireworks() {
    if (firing) return;
    firing = true;
    armed = false;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { firing = false; return; }

    const canvas = document.createElement('canvas');
    canvas.id = 'fireworks-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#ef6a4c', '#ef7d8a', '#f0ad2e', '#3fa66d', '#3fb6c9', '#fff4d6'];
    let sparks = [];
    let rockets = [];

    function burst(x, y, big) {
      const count = big ? 70 : 46;
      const speedMax = big ? 5.2 : 3.6;
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      const mixed = Math.random() < 0.5;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
        const speed = 1.4 + Math.random() * speedMax;
        sparks.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.009 + Math.random() * 0.012,
          color: mixed ? colors[Math.floor(Math.random() * colors.length)] : baseColor,
          size: 1.6 + Math.random() * 2.4,
          drag: 0.985
        });
      }
      playBoom(audioCtx ? audioCtx.currentTime : 0, big);
      playCrackleTail(audioCtx ? audioCtx.currentTime : 0, big ? 10 : 6);
    }

    function launchRocket(x, targetY, delay, big) {
      setTimeout(() => {
        const t0 = audioCtx ? audioCtx.currentTime : 0;
        const riseDuration = 0.55 + Math.random() * 0.25;
        playWhoosh(t0, riseDuration);
        rockets.push({
          x, y: canvas.height + 10,
          targetY,
          vy: -(canvas.height - targetY) / (riseDuration * 60), // rough px/frame to arrive on time
          vx: (Math.random() - 0.5) * 0.6,
          trail: [],
          big
        });
      }, delay);
    }

    // 3–4 rockets staggered over ~2.2s, alternating sides of the screen
    const rocketCount = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < rocketCount; i++) {
      const x = canvas.width * (0.2 + Math.random() * 0.6);
      const targetY = canvas.height * (0.22 + Math.random() * 0.24);
      const delay = i * (420 + Math.random() * 260);
      const big = i === rocketCount - 1; // finale rocket is the biggest burst
      launchRocket(x, targetY, delay, big);
    }

    const startedAt = Date.now();
    let rafId;

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // rockets: draw trail, rise, then explode on arrival
      rockets.forEach((r) => {
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 10) r.trail.shift();
        r.x += r.vx;
        r.y += r.vy;

        ctx.lineWidth = 2;
        for (let i = 0; i < r.trail.length - 1; i++) {
          const a = i / r.trail.length;
          ctx.strokeStyle = `rgba(255, 230, 180, ${a * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(r.trail[i].x, r.trail[i].y);
          ctx.lineTo(r.trail[i + 1].x, r.trail[i + 1].y);
          ctx.stroke();
        }
        ctx.fillStyle = '#fff4d6';
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.4, 0, Math.PI * 2);
        ctx.fill();

        if (r.y <= r.targetY) {
          burst(r.x, r.y, r.big);
          r.dead = true;
        }
      });
      rockets = rockets.filter((r) => !r.dead);

      // sparks: gravity + drag + fade
      sparks.forEach((p) => {
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.045;
        p.life -= p.decay;
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      sparks = sparks.filter((p) => p.life > 0);
      ctx.globalAlpha = 1;

      const stillGoing = rockets.length > 0 || sparks.length > 0 || Date.now() - startedAt < 3200;
      if (stillGoing) {
        rafId = requestAnimationFrame(tick);
      } else {
        cleanup();
      }
    }

    function cleanup() {
      cancelAnimationFrame(rafId);
      canvas.style.opacity = '0';
      window.removeEventListener('resize', resize);
      setTimeout(() => canvas.remove(), 650);
      firing = false;
    }

    tick();
  }

  function distanceFromBottom() {
    const scrollBottom = window.scrollY + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    return docHeight - scrollBottom;
  }

  function checkBottom() {
    const dist = distanceFromBottom();
    if (!armed && dist > REARM_DISTANCE) {
      armed = true; // scrolled away far enough — ready to fire again next time
    }
    if (armed && !firing && dist < 40) {
      launchFireworks();
    }
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      checkBottom();
      ticking = false;
    });
  }, { passive: true });

  window.addEventListener('load', checkBottom);

  // the SPA router swaps views without a page reload/'load' event — a
  // freshly mounted view (e.g. a short story page) might already be "at
  // the bottom", so re-check shortly after each route change too
  window.addEventListener('viewchanged', () => {
    armed = true;
    setTimeout(checkBottom, 80);
  });
})();
