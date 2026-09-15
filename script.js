const screens = document.querySelectorAll(".screen");
const buttons = document.querySelectorAll(".enter-btn, .continue-btn");
const progressBar = document.querySelector(".progress span");

let currentScreen = 0;
let isAnimating = false;

/* =========================
   SCREEN NAVIGATION
========================= */

function goToScreen(index) {
  if (isAnimating) return;
  if (index < 0 || index >= screens.length) return;

  isAnimating = true;

  // Gentle heart effect first
  createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 8);

  // Give the effect time to breathe
  setTimeout(() => {
    screens.forEach((screen, i) => {
      screen.classList.toggle("active", i === index);
    });

    currentScreen = index;
    updateProgress();
  }, 900);

  // Don't allow another transition immediately
  setTimeout(() => {
    isAnimating = false;
  }, 3300);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    goToScreen(currentScreen + 1);
  });
});

/* =========================
   PROGRESS
========================= */

function updateProgress() {
  if (!progressBar) return;

  const percentage = (currentScreen / (screens.length - 1)) * 100;

  progressBar.style.width = `${percentage}%`;
}

/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "Enter") {
    goToScreen(currentScreen + 1);
  }

  if (event.key === "ArrowLeft") {
    goToScreen(currentScreen - 1);
  }
});

/* =========================
   STARS
========================= */

const starsContainer = document.getElementById("stars");

function createStars() {
  if (!starsContainer) return;

  for (let i = 0; i < 35; i++) {
    const star = document.createElement("div");

    star.className = "star";

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    star.style.animationDelay = `${Math.random() * 8}s`;

    star.style.animationDuration = `${7 + Math.random() * 7}s`;

    starsContainer.appendChild(star);
  }
}

createStars();

/* =========================
   FLOATING HEARTS
========================= */

const heartsContainer = document.getElementById("hearts");

function createFloatingHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement("div");

  heart.className = "floating-heart";

  heart.textContent = Math.random() > 0.35 ? "♡" : "♥";

  heart.style.left = `${Math.random() * 100}%`;

  heart.style.fontSize = `${9 + Math.random() * 14}px`;

  heart.style.animationDuration = `${14 + Math.random() * 8}s`;

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 25000);
}

setInterval(createFloatingHeart, 2500);

/* =========================
   HEART BURST
========================= */

function createHeartBurst(x, y, amount = 8) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("div");

    heart.textContent = Math.random() > 0.35 ? "♥" : "♡";

    heart.style.position = "fixed";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    heart.style.zIndex = "9999";
    heart.style.pointerEvents = "none";

    heart.style.color = Math.random() > 0.5 ? "#ff86ac" : "#ffd1df";

    heart.style.fontSize = `${11 + Math.random() * 14}px`;

    heart.style.textShadow = "0 0 15px rgba(255,60,130,.8)";

    document.body.appendChild(heart);

    const angle = Math.random() * Math.PI * 2;

    const distance = 50 + Math.random() * 100;

    const xMove = Math.cos(angle) * distance;

    const yMove = Math.sin(angle) * distance;

    heart.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(.1)",
          opacity: 0,
        },

        {
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 0.9,
        },

        {
          transform: `translate(
              calc(-50% + ${xMove}px),
              calc(-50% + ${yMove}px)
            )
            rotate(20deg)
            scale(.3)`,
          opacity: 0,
        },
      ],
      {
        duration: 2800,
        easing: "ease-out",
      },
    );

    setTimeout(() => {
      heart.remove();
    }, 3000);
  }
}

/* =========================
   MUSIC
========================= */

const birthdaySong = document.getElementById("birthdaySong");

const playButton = document.getElementById("playButton");

if (birthdaySong && playButton) {
  playButton.addEventListener("click", async () => {
    try {
      if (birthdaySong.paused) {
        await birthdaySong.play();

        playButton.textContent = "Ⅱ";

        document.body.classList.add("music-playing");
      } else {
        birthdaySong.pause();

        playButton.textContent = "▶";

        document.body.classList.remove("music-playing");
      }
    } catch (error) {
      console.log("Music could not start:", error);
    }
  });

  birthdaySong.addEventListener("ended", () => {
    playButton.textContent = "▶";

    document.body.classList.remove("music-playing");
  });
}

/* =========================
   FINAL MOMENT
========================= */

let finalTriggered = false;

function finalMoment() {
  if (finalTriggered) return;

  finalTriggered = true;

  setTimeout(() => {
    createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 15);
  }, 2500);
}

const observer = new MutationObserver(() => {
  const finalScreen = document.querySelector(".final-screen");

  if (finalScreen && finalScreen.classList.contains("active")) {
    finalMoment();
  }
});

observer.observe(document.querySelector("main"), {
  attributes: true,
  subtree: true,
  attributeFilter: ["class"],
});

/* =========================
   INITIAL
========================= */

updateProgress();
