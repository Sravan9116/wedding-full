# 💍 Deepthi Sri ♥ Teja Reddy — Cinematic Wedding Invitation
## Full Setup Guide + PowerShell Commands

---

## 📁 PROJECT STRUCTURE

```
wedding-invite/
│
├── index.html              ← Main cinematic experience
├── css/
│   └── style.css           ← All styles + animations
├── js/
│   └── script.js           ← Cinematic engine + timer + petals
├── assets/
│   └── shlokam.mp3         ← Telugu wedding shloka music
└── images/
    ├── hero-bg.jpg         ← Temple sunrise / misty scene
    ├── ganesha.png         ← Golden Ganesha (transparent PNG preferred)
    ├── invite-bg.jpg       ← Wedding garland / decor background
    ├── title-bg.jpg        ← Royal red + gold mandala
    ├── bride.jpg           ← Bride Deepthi Sri portrait
    ├── groom.jpg           ← Groom Teja Reddy portrait
    ├── img1.jpg            ← Gallery: wedding rituals
    ├── img2.jpg            ← Gallery: bangles / mehndi
    ├── img3.jpg            ← Gallery: sacred fire
    ├── img4.jpg            ← Gallery: family emotions
    ├── img5.jpg            ← Gallery: flower decor
    ├── img6.jpg            ← Gallery: candid moments
    ├── save-date.jpg       ← Rangoli / festive setup
    ├── details-bg.jpg      ← Minimal mandala / gold pattern
    ├── venue.jpg           ← Macherla / temple town
    ├── varmala.jpg         ← Couple with flower garlands
    ├── petal1.png          ← Rose/marigold petal (transparent)
    ├── petal2.png          ← Jasmine petal (transparent)
    └── petal3.png          ← Marigold petal (transparent)
```

---

## ⚡ POWERSHELL COMMANDS (Run in order)

```powershell
# ── Step 1: Create root folder ──────────────────────
New-Item -ItemType Directory -Path "wedding-invite"
Set-Location "wedding-invite"

# ── Step 2: Create sub-folders ──────────────────────
New-Item -ItemType Directory -Path "css"
New-Item -ItemType Directory -Path "js"
New-Item -ItemType Directory -Path "assets"
New-Item -ItemType Directory -Path "images"

# ── Step 3: Create code files ───────────────────────
New-Item -ItemType File -Path "index.html"
New-Item -ItemType File -Path "css\style.css"
New-Item -ItemType File -Path "js\script.js"

# ── Step 4: Create image placeholders ───────────────
New-Item -ItemType File -Path "images\hero-bg.jpg"
New-Item -ItemType File -Path "images\ganesha.png"
New-Item -ItemType File -Path "images\invite-bg.jpg"
New-Item -ItemType File -Path "images\title-bg.jpg"
New-Item -ItemType File -Path "images\bride.jpg"
New-Item -ItemType File -Path "images\groom.jpg"
New-Item -ItemType File -Path "images\img1.jpg"
New-Item -ItemType File -Path "images\img2.jpg"
New-Item -ItemType File -Path "images\img3.jpg"
New-Item -ItemType File -Path "images\img4.jpg"
New-Item -ItemType File -Path "images\img5.jpg"
New-Item -ItemType File -Path "images\img6.jpg"
New-Item -ItemType File -Path "images\save-date.jpg"
New-Item -ItemType File -Path "images\details-bg.jpg"
New-Item -ItemType File -Path "images\venue.jpg"
New-Item -ItemType File -Path "images\varmala.jpg"
New-Item -ItemType File -Path "images\petal1.png"
New-Item -ItemType File -Path "images\petal2.png"
New-Item -ItemType File -Path "images\petal3.png"
New-Item -ItemType File -Path "assets\shlokam.mp3"

# ── Step 5: Open folder ─────────────────────────────
explorer .
```

---

## 🎬 11 CINEMATIC SCENES

| # | Scene | Duration |
|---|-------|----------|
| 0 | **HERO** — Opening title with OM, names, date | 5.5s |
| 1 | **DIVINE BLESSINGS** — Ganesha shloka | 5s |
| 2 | **INVITATION** — Family invite card | 6s |
| 3 | **GRAND COUPLE TITLE** — Shimmer names + mandala | 5s |
| 4 | **BRIDE & GROOM** — Side-by-side portraits | 6s |
| 5 | **GALLERY** — 6-photo sacred moments grid | 6s |
| 6 | **SAVE THE DATE** — Big date reveal | 6s |
| 7 | **EVENT DETAILS** — Muhurtham + live countdown | 7s |
| 8 | **VENUE** — Macherla, Palnadu | 5.5s |
| 9 | **FINAL INVITATION** — Request + blessing | 6s |
| 10 | **VARMALA FINALE** — Climax + burst | ∞ |

---

## ✨ FEATURES

| Feature | Description |
|---|---|
| 🎬 Auto-cinematic | Advances automatically, no scrolling needed |
| 🌸 3D Petals | 32 petals with rotateX/Y/Z, depth blur |
| 🔠 Seq reveal | Text appears line-by-line cinematically |
| 🔆 Gold shimmer | Animated gradient sweep on names |
| 🪔 Swinging diyas | 7 diyas swing at top of every scene |
| 🌀 Ken Burns | Background images zoom slowly |
| 🌺 Varmala burst | Flower explosion on finale |
| ⏳ Countdown | Live ticking to May 1, 2026 |
| 🎵 Audio | Telugu shlokam ambient loop |
| ⌨️ Navigation | Arrow keys, touch swipe, nav dots |

---

## 📱 CONTROLS

- **Auto-play** — runs on its own
- **Arrow Right / Space** — next scene
- **Arrow Left** — previous scene
- **Swipe up/down** — mobile navigation
- **Dots (right side)** — click to jump
- **🔔 Button (top left)** — toggle music

---

*Made with devotion for Deepthi Sri ♥ Teja Reddy — May 1, 2026, Macherla, Palnadu*
