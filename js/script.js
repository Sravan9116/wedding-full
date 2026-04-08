/* ════════════════════════════════════════════════════════════
   CINEMATIC WEDDING ENGINE  |  script.js
   Deepthi Sri ♥ Teja Reddy  |  May 1, 2026
════════════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════
   CONFIG
══════════════════════════════════════════ */
const CONFIG = {
  SCENE_DURATIONS: [5500, 5000, 6000, 5000, 6000, 6000, 6000, 7000, 5500, 6000, 0],
  SEQ_DELAY:        280,   // ms between sequential elements
  SEQ_BASE_DELAY:   400,   // initial offset after scene enters
  PETAL_COUNT:       32,
  WEDDING_DATE:    new Date('2026-05-01T00:00:00'),
};

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
let currentScene = 0;
let sceneTimer   = null;
let isTransiting = false;
let audioPlaying = false;

const totalScenes = document.querySelectorAll('.scene').length;

/* ══════════════════════════════════════════
   DOM REFS
══════════════════════════════════════════ */
const scenes      = [...document.querySelectorAll('.scene')];
const navDots     = [...document.querySelectorAll('.cnav-dot')];
const progressBar = document.getElementById('progressBar');
const audioEl     = document.getElementById('bgAudio');
const audioBtn    = document.getElementById('audioBtn');
const restartBtn  = document.getElementById('restartBtn');

/* ════════════════════════════════════════════════════════════
   SCENE MANAGER
════════════════════════════════════════════════════════════ */
function goToScene(index) {
  if (isTransiting) return;
  if (index < 0 || index >= totalScenes) return;
  isTransiting = true;

  const prevScene = scenes[currentScene];
  const nextScene = scenes[index];

  // Clear old seq elements
  prevScene.querySelectorAll('.seq.shown').forEach(el => el.classList.remove('shown'));

  // Fade out current
  prevScene.classList.add('fade-out');
  prevScene.classList.remove('active');

  setTimeout(() => {
    prevScene.classList.remove('fade-out');
    currentScene = index;

    // Activate next
    nextScene.classList.add('active');
    updateNav();
    startSeqReveal(nextScene);
    startSceneTimer();

    isTransiting = false;
  }, 900);
}

function nextScene() {
  const next = (currentScene + 1) % totalScenes;
  goToScene(next);
}

function startSceneTimer() {
  clearTimeout(sceneTimer);
  const dur = CONFIG.SCENE_DURATIONS[currentScene];
  if (dur > 0) {
    animateProgress(dur);
    sceneTimer = setTimeout(() => {
      if (currentScene < totalScenes - 1) nextScene();
    }, dur);
  } else {
    // Final scene — reset progress
    progressBar.style.width = '100%';
  }
}

/* ════════════════════════════════════════════════════════════
   SEQUENTIAL TEXT REVEAL
════════════════════════════════════════════════════════════ */
function startSeqReveal(scene) {
  const seqEls = [...scene.querySelectorAll('.seq')].sort(
    (a, b) => (+a.dataset.seq || 0) - (+b.dataset.seq || 0)
  );

  seqEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('shown');
    }, CONFIG.SEQ_BASE_DELAY + i * CONFIG.SEQ_DELAY);
  });
}

/* ════════════════════════════════════════════════════════════
   NAV & PROGRESS
════════════════════════════════════════════════════════════ */
function updateNav() {
  navDots.forEach((dot, i) => dot.classList.toggle('active', i === currentScene));
}

let progressRAF = null;
let progressStart = null;
let progressDur = 0;

function animateProgress(dur) {
  cancelAnimationFrame(progressRAF);
  progressStart = null;
  progressDur   = dur;
  progressBar.style.width = '0%';

  function tick(ts) {
    if (!progressStart) progressStart = ts;
    const pct = Math.min(((ts - progressStart) / progressDur) * 100, 100);
    progressBar.style.width = pct + '%';
    if (pct < 100) progressRAF = requestAnimationFrame(tick);
  }
  progressRAF = requestAnimationFrame(tick);
}

/* ════════════════════════════════════════════════════════════
   COUNTDOWN TIMER
════════════════════════════════════════════════════════════ */
function tickCountdown() {
  const now  = Date.now();
  const diff = CONFIG.WEDDING_DATE.getTime() - now;

  if (diff <= 0) {
    ['cd-d','cd-h','cd-m','cd-s'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '00';
    });
    return;
  }

  const p = n => String(Math.floor(n)).padStart(2, '0');
  const d = document.getElementById('cd-d');
  const h = document.getElementById('cd-h');
  const m = document.getElementById('cd-m');
  const s = document.getElementById('cd-s');

  if (d) d.textContent = p(diff / 86400000);
  if (h) h.textContent = p((diff % 86400000) / 3600000);
  if (m) m.textContent = p((diff % 3600000) / 60000);
  if (s) s.textContent = p((diff % 60000) / 1000);
}
setInterval(tickCountdown, 1000);
tickCountdown();

/* ════════════════════════════════════════════════════════════
   3D FALLING PETALS
════════════════════════════════════════════════════════════ */
const PETAL_EMOJIS = ['🌸', '🌺', '🌼', '🌷', '🪷', '🏵️'];

function spawnPetals() {
  const layer = document.getElementById('petalsLayer');
  if (!layer) return;

  for (let i = 0; i < CONFIG.PETAL_COUNT; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    // Try image first, fallback to emoji
    const imgNum = (i % 3) + 1;
    const inner  = document.createElement('span');
    inner.classList.add('petal-emoji');
    inner.textContent = PETAL_EMOJIS[i % PETAL_EMOJIS.length];
    petal.appendChild(inner);

    // Random properties
    const size    = 12 + Math.random() * 22;        // px
    const left    = Math.random() * 105 - 2;        // vw
    const dur     = 7 + Math.random() * 11;         // s
    const delay   = Math.random() * 14;             // s
    const blur    = Math.random() < 0.35 ? `blur(${(Math.random() * 1.5).toFixed(1)}px)` : '';

    // 3D rotation endpoints
    const rx = 200 + Math.random() * 400;
    const ry = 200 + Math.random() * 400;
    const rz = 100 + Math.random() * 360;
    const drift = (-60 + Math.random() * 120).toFixed(0) + 'px';

    petal.style.cssText = `
      left: ${left}vw;
      font-size: ${size}px;
      animation-duration: ${dur}s;
      animation-delay: -${delay}s;
      filter: ${blur};
      --drift: ${drift};
      --rx: ${rx}deg;
      --ry: ${ry}deg;
      --rz: ${rz}deg;
    `;

    layer.appendChild(petal);
  }
}

/* ════════════════════════════════════════════════════════════
   VARMALA BURST (extra petals on finale)
════════════════════════════════════════════════════════════ */
function triggerVarmalaBurst() {
  const burst = document.getElementById('varmalaBurst');
  if (!burst) return;
  burst.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const span = document.createElement('span');
    span.textContent = PETAL_EMOJIS[i % PETAL_EMOJIS.length];
    const angle = (i / 20) * 360;
    const dist  = 80 + Math.random() * 140;
    span.style.cssText = `
      position: absolute;
      font-size: ${14 + Math.random() * 16}px;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      animation: burstOut 2.5s ease-out forwards;
      animation-delay: ${Math.random() * 0.8}s;
      --bx: ${(Math.cos(angle * Math.PI / 180) * dist).toFixed(0)}px;
      --by: ${(Math.sin(angle * Math.PI / 180) * dist).toFixed(0)}px;
    `;
    burst.appendChild(span);
  }
}

// Inject burst keyframe
const burstStyle = document.createElement('style');
burstStyle.textContent = `
  @keyframes burstOut {
    0%   { transform: translate(-50%,-50%) scale(0); opacity:1; }
    100% { transform: translate(calc(-50% + var(--bx)), calc(-50% + var(--by))) scale(1.2); opacity:0; }
  }
  #varmalaBurst { position:absolute; inset:0; pointer-events:none; z-index:0; }
`;
document.head.appendChild(burstStyle);

/* ════════════════════════════════════════════════════════════
   AUDIO
════════════════════════════════════════════════════════════ */
function tryAutoPlay() {
  if (!audioEl) return;
  audioEl.volume = 0.28;
  const p = audioEl.play();
  if (p !== undefined) {
    p.then(() => {
      audioPlaying = true;
      audioBtn.textContent = '🔔';
    }).catch(() => {
      // Needs user gesture — button will handle
      audioPlaying = false;
      audioBtn.textContent = '🔕';
    });
  }
}

function toggleAudio() {
  if (!audioEl) return;
  if (audioPlaying) {
    audioEl.pause();
    audioPlaying = false;
    audioBtn.textContent = '🔕';
    audioBtn.classList.add('muted');
  } else {
    audioEl.play().then(() => {
      audioPlaying = true;
      audioBtn.textContent = '🔔';
      audioBtn.classList.remove('muted');
    }).catch(() => {});
  }
}

/* ════════════════════════════════════════════════════════════
   KEYBOARD & NAV CLICKS
════════════════════════════════════════════════════════════ */
navDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const idx = +dot.dataset.s;
    if (idx !== currentScene) {
      clearTimeout(sceneTimer);
      goToScene(idx);
    }
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
    e.preventDefault();
    clearTimeout(sceneTimer);
    if (currentScene < totalScenes - 1) nextScene();
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    clearTimeout(sceneTimer);
    if (currentScene > 0) goToScene(currentScene - 1);
  }
});

// Touch swipe
let touchStartY = 0;
document.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
document.addEventListener('touchend', e => {
  const dy = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(dy) > 50) {
    clearTimeout(sceneTimer);
    if (dy > 0 && currentScene < totalScenes - 1) nextScene();
    else if (dy < 0 && currentScene > 0) goToScene(currentScene - 1);
  }
}, { passive: true });

audioBtn.addEventListener('click', toggleAudio);

restartBtn && restartBtn.addEventListener('click', () => {
  clearTimeout(sceneTimer);
  goToScene(0);
});

/* ════════════════════════════════════════════════════════════
   WATCH FOR VARMALA SCENE
════════════════════════════════════════════════════════════ */
const mutObs = new MutationObserver(() => {
  if (scenes[10] && scenes[10].classList.contains('active')) {
    triggerVarmalaBurst();
  }
});
if (scenes[10]) mutObs.observe(scenes[10], { attributes: true, attributeFilter: ['class'] });

/* ════════════════════════════════════════════════════════════
   INIT
════════════════════════════════════════════════════════════ */
function init() {
  spawnPetals();
  startSeqReveal(scenes[0]);
  startSceneTimer();
  updateNav();
  setTimeout(tryAutoPlay, 600);
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', init);  // fallback


/* ════════════════════════════════════════════════════════════
   PLAYBACK CONTROL (PAUSE / RESUME)
════════════════════════════════════════════════════════════ */

let isPaused = false;
let remainingTime = 0;
let sceneStartTime = 0;

/* Override scene timer to track time */
function startSceneTimer() {
  clearTimeout(sceneTimer);

  const dur = CONFIG.SCENE_DURATIONS[currentScene];

  if (dur > 0) {
    sceneStartTime = Date.now();
    remainingTime = dur;

    animateProgress(dur);

    sceneTimer = setTimeout(() => {
      if (!isPaused && currentScene < totalScenes - 1) {
        nextScene();
      }
    }, dur);
  } else {
    progressBar.style.width = '100%';
  }
}

/* Pause function */
function pausePlayback() {
  if (isPaused) return;

  isPaused = true;

  clearTimeout(sceneTimer);
  cancelAnimationFrame(progressRAF);

  // Calculate remaining time
  const elapsed = Date.now() - sceneStartTime;
  remainingTime = CONFIG.SCENE_DURATIONS[currentScene] - elapsed;

  document.body.classList.add('paused');
}

/* Resume function */
function resumePlayback() {
  if (!isPaused) return;

  isPaused = false;

  sceneStartTime = Date.now();

  animateProgress(remainingTime);

  sceneTimer = setTimeout(() => {
    if (currentScene < totalScenes - 1) {
      nextScene();
    }
  }, remainingTime);

  document.body.classList.remove('paused');
}

/* Toggle */
function togglePlayback() {
  if (isPaused) {
    resumePlayback();
  } else {
    pausePlayback();
  }
}

document.body.addEventListener('click', (e) => {
  // Ignore clicks on buttons
  if (
    e.target.closest('#audioBtn') ||
    e.target.closest('#restartBtn') ||
    e.target.closest('.cnav-dot')
  ) return;

  togglePlayback();
});

function openMap() {
  window.open("https://maps.app.goo.gl/9YPCjJy29fzmnHam9", "_blank");
}