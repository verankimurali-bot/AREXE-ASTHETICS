// ===== CREATE FLOATING HEARTS =====
function createHearts() {
    const container = document.getElementById('heartsContainer');
    container.innerHTML = '';
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💘', '💝', '🌹', '✨', '🤍'];
    for (let i = 0; i < 18; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 4 + 's';
        heart.style.animationDuration = (3 + Math.random() * 3) + 's';
        heart.style.fontSize = (14 + Math.random() * 18) + 'px';
        container.appendChild(heart);
    }
}

// ===== CREATE SPARKLES =====
function createSparkles(parentId, count, color) {
    const parent = document.getElementById(parentId);
    parent.querySelectorAll('.sparkle, .mini-sparkle').forEach(s => s.remove());
    const cls = color ? 'mini-sparkle' : 'sparkle';
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = cls;
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2.5 + 's';
        sparkle.style.animationDuration = (1.5 + Math.random() * 2) + 's';
        parent.appendChild(sparkle);
    }
}

// ===== CREATE EMOJI RAIN =====
function createEmojiRain(containerId) {
    containerId = containerId || 'emojiRain';
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    const emojis = ['😂', '🤣', '💀', '😜', '🫠', '😝', '🤪', '👻', '🤡', '🫣'];
    for (let i = 0; i < 30; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'rain-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDelay = (Math.random() * 4) + 's';
        emoji.style.animationDuration = (2.5 + Math.random() * 2) + 's';
        emoji.style.fontSize = (18 + Math.random() * 22) + 'px';
        container.appendChild(emoji);
    }
}

// ===== PRANK SOUND (fahhhhh.mp3) =====
const prankAudio = new Audio('fahhhhh.mp3');
prankAudio.preload = 'auto';

// ===== GLITCH SOUND (kave_msri-glitch-sfx-312910.mp3) =====
const glitchAudio = new Audio('kave_msri-glitch-sfx-312910.mp3');
glitchAudio.preload = 'auto';

function initAudio() {
    prankAudio.load();
    glitchAudio.load();
}

function playGlitchSound() {
    glitchAudio.currentTime = 0;
    glitchAudio.play().catch(() => {});
}

function playFahhhh() {
    prankAudio.currentTime = 0;
    prankAudio.play().catch(() => {});
}

function playPrankSound() {
    playFahhhh();
}

// ===== ANIMATION TIMELINE =====
function startAnimation() {
    // Elements
    const sceneHook = document.getElementById('sceneHook');
    const sceneBuildup = document.getElementById('sceneBuildup');
    const scenePrank = document.getElementById('scenePrank');
    const sceneTroll = document.getElementById('sceneTroll');
    const glitchFlash = document.getElementById('glitchFlash');
    const scanlines = document.getElementById('scanlines');
    const replayBtn = document.getElementById('replayBtn');

    const hookLine1 = document.getElementById('hookLine1');
    const hookDivider = document.getElementById('hookDivider');
    const hookLine2 = document.getElementById('hookLine2');
    const hookDots = document.getElementById('hookDots');
    const hookEmoji = document.getElementById('hookEmoji');

    const buildupLine1 = document.getElementById('buildupLine1');
    const countdownNumber = document.getElementById('countdownNumber');
    const buildupLine3 = document.getElementById('buildupLine3');

    const prankLine1 = document.getElementById('prankLine1');
    const prankLine2 = document.getElementById('prankLine2');
    const prankLine3 = document.getElementById('prankLine3');
    const prankBigEmoji = document.getElementById('prankBigEmoji');
    const prankTextWrapper = document.getElementById('prankTextWrapper');
    const prankBottom = document.getElementById('prankBottom');

    const trollLine1 = document.getElementById('trollLine1');
    const trollLine2 = document.getElementById('trollLine2');
    const trollLine3 = document.getElementById('trollLine3');
    const trollBigEmoji = document.getElementById('trollBigEmoji');
    const trollBottom = document.getElementById('trollBottom');

    // Reset all
    const allAnimElements = [hookLine1, hookDivider, hookLine2, hookDots, hookEmoji,
        buildupLine1, countdownNumber, buildupLine3,
        prankLine1, prankLine2, prankLine3, prankBigEmoji, prankBottom,
        trollLine1, trollLine2, trollLine3, trollBigEmoji, trollBottom];
    allAnimElements.forEach(el => el.classList.remove('show', 'pop'));

    sceneHook.classList.remove('hide');
    sceneBuildup.classList.remove('show');
    scenePrank.classList.remove('show');
    sceneTroll.classList.remove('show');
    glitchFlash.classList.remove('flash');
    scanlines.classList.remove('show');
    prankTextWrapper.classList.remove('prank-shake');
    document.getElementById('trollTextWrapper').classList.remove('troll-shake');
    replayBtn.classList.remove('show');

    // Create particles
    createHearts();
    createSparkles('sceneHook', 25, false);

    // ---- SCENE 1: HOOK ----
    setTimeout(() => hookLine1.classList.add('show'), 600);
    setTimeout(() => hookDivider.classList.add('show'), 1200);
    setTimeout(() => hookLine2.classList.add('show'), 1800);
    setTimeout(() => hookDots.classList.add('show'), 3000);
    setTimeout(() => {
        hookEmoji.classList.add('show');
        hookEmoji.classList.add('heartbeat');
    }, 3800);

    // ---- Transition to SCENE 2: COUNTDOWN (at ~5.5s) ----
    setTimeout(() => {
        sceneHook.classList.add('hide');

        setTimeout(() => {
            sceneBuildup.classList.add('show');
            createSparkles('sceneBuildup', 20, true);

            setTimeout(() => buildupLine1.classList.add('show'), 300);

            // Countdown: 3
            setTimeout(() => {
                countdownNumber.textContent = '3';
                countdownNumber.classList.add('pop');
            }, 900);

            // Countdown: 2
            setTimeout(() => {
                countdownNumber.classList.remove('pop');
                void countdownNumber.offsetWidth;
                countdownNumber.textContent = '2';
                countdownNumber.classList.add('pop');
            }, 2100);

            // Countdown: 1
            setTimeout(() => {
                countdownNumber.classList.remove('pop');
                void countdownNumber.offsetWidth;
                countdownNumber.textContent = '1';
                countdownNumber.classList.add('pop');
            }, 3300);

            setTimeout(() => buildupLine3.classList.add('show'), 4200);
        }, 600);
    }, 5500);

    // ---- Transition to SCENE 3: PRANK (at ~10.5s) ----
    setTimeout(() => {
        // ⚡ Glitch sound on flash
        playGlitchSound();
        glitchFlash.classList.add('flash');
        scanlines.classList.add('show');
        sceneBuildup.classList.remove('show');

        setTimeout(() => {
            scenePrank.classList.add('show');
            createEmojiRain();
            prankTextWrapper.classList.add('prank-shake');

            // 🔊 Fahhhhh plays as first text appears
            playFahhhh();

            setTimeout(() => prankLine1.classList.add('show'), 300);
            setTimeout(() => prankLine2.classList.add('show'), 1200);
            setTimeout(() => prankLine3.classList.add('show'), 2200);
            setTimeout(() => prankBigEmoji.classList.add('show'), 3000);
            setTimeout(() => prankBottom.classList.add('show'), 4000);
        }, 300);
    }, 10500);

    // ---- Transition to SCENE 4: FINAL TROLL (at ~16s) ----
    setTimeout(() => {
        // ⚡ Glitch sound on flash
        playGlitchSound();
        glitchFlash.classList.remove('flash');
        scanlines.classList.remove('show');
        void glitchFlash.offsetWidth; // force reflow
        glitchFlash.classList.add('flash');
        scanlines.classList.add('show');

        scenePrank.classList.remove('show');

        setTimeout(() => {
            sceneTroll.classList.add('show');
            createEmojiRain('emojiRain2');
            document.getElementById('trollTextWrapper').classList.add('troll-shake');

            // 🔊 Fahhhhh plays as first text appears
            playFahhhh();

            setTimeout(() => trollLine1.classList.add('show'), 300);
            setTimeout(() => trollLine2.classList.add('show'), 1200);
            setTimeout(() => trollLine3.classList.add('show'), 2200);
            setTimeout(() => trollBigEmoji.classList.add('show'), 3000);
            setTimeout(() => trollBottom.classList.add('show'), 4000);
        }, 300);
    }, 16000);

    // ---- Show replay button ----
    setTimeout(() => {
        replayBtn.classList.add('show');
    }, 22000);
}

// ===== REPLAY =====
function replayAnimation() {
    startAnimation();
}

// ===== START =====
window.addEventListener('load', () => {
    const overlay = document.getElementById('startOverlay');

    overlay.addEventListener('click', () => {
        // Unlock audio on user gesture
        initAudio();

        // Hide overlay
        overlay.classList.add('hide');

        // Start animation after overlay fades
        setTimeout(() => {
            startAnimation();
        }, 400);
    });
});
