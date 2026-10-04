# 🎭 Romantic Prank Reel

> A lightweight, highly dynamic, web-based interactive prank reel built with modern HTML5, CSS3 animations, and vanilla JavaScript. Features smooth scene transitions, ambient glowing visuals, continuous emoji rain, audio feedback, and a hilarious double-prank reveal sequence.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Features

- **🕯️ Scene 1: Captivating Hook:** Deep velvet rose gradients, soft bokeh light orbs, and glowing typography designed to instantly grab attention.
- **⏳ Scene 2: Cinematic Countdown:** Suspenseful `3... 2... 1...` animated countdown with pop & scale effects.
- **🤣 Scene 3: Prank Reveal:** Dynamic glitch flash transition, custom springy text-pop animations (`prankPopIn`), audio SFX, and continuous infinite emoji rain.
- **🤡 Scene 4: Final Troll:** High-energy elastic rubber-wobble text reveal (`trollRubberPop`) with glowing neon gold & pink highlights.
- **🔊 Audio Integration:** Synchronized sound effects (`glitch` and `fahhhhh`) triggered seamlessly on user interaction.
- **📱 Fully Responsive:** Optimized for both mobile vertical reel view (9:16 aspect ratios) and desktop viewports.

---

## 📂 Project Architecture

```
New folder/
├── index.html                       # Core HTML structure & semantic layout
├── style.css                        # Modern CSS styling, keyframe animations & themes
├── script.js                        # Event listeners, audio handlers & timeline logic
├── README.md                        # Documentation & project guide
├── fahhhhh.mp3                      # Prank reveal sound effect
└── kave_msri-glitch-sfx-312910.mp3  # Glitch transition sound effect
```

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic web layout, overlays, and audio triggers |
| **CSS3** | Hardware-accelerated animations (`keyframes`, `clamp()`, `flexbox`, `gradients`) |
| **JavaScript (ES6+)** | Dynamic DOM manipulation, particle generators, audio preloading & scene timeline orchestration |
| **Web Audio API** | Synchronized audio playback unlocked via touch gestures |

---

## 🚀 Quick Start Guide

### Option 1: Direct Browser Playback
1. Clone or download the repository files.
2. Open `index.html` directly in any web browser (Chrome, Edge, Safari, Firefox).
3. Click/Tap **"Tap to Play"** on the overlay to start the reel with audio!

### Option 2: Live Server Setup (VS Code)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (`ms-vscode.live-server`).
3. Click **Go Live** at the bottom right corner of VS Code to launch at `http://127.0.0.1:5500/`.

---

## 🎨 Customization Guide

### 1. Changing Scene Texts
Modify the text inside `index.html`:
```html
<div class="troll-line troll-line-2" id="trollLine2">
    Ab kya karu...<br>
    <span class="troll-highlight-pink">dil cheer ke rakh du? 🫀</span><br>
    tabhi jaoge kya?
</div>
```

### 2. Adjusting Scene Timings
In `script.js`, tweak the `setTimeout` delays in `startAnimation()`:
```javascript
// Scene 1 -> Scene 2 (at 5.5 seconds)
setTimeout(() => { ... }, 5500);

// Scene 2 -> Scene 3 (at 10.5 seconds)
setTimeout(() => { ... }, 10500);
```

### 3. Modifying Audio Effects
Replace `fahhhhh.mp3` or `kave_msri-glitch-sfx-312910.mp3` in the root folder with your preferred `.mp3` files.

---

## 📄 License

Distributed under the **MIT License**. Free to use, modify, and distribute for personal or commercial projects.

---
*Created with ❤️ & 🤣 for fun social media reels!*
