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

  if (index < 0 || index >= screens.length) {
    return;
  }

  isAnimating = true;

  /*
    Give the heart effect time to appear
    BEFORE changing the screen.
  */

  createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 18);

  setTimeout(() => {
    screens.forEach((screen, i) => {
      screen.classList.toggle("active", i === index);
    });

    currentScreen = index;

    updateProgress();
  }, 350);

  /*
    Keep navigation locked long enough
    for the slow transition to finish.
  */

  setTimeout(() => {
    isAnimating = false;
  }, 1900);
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

  for (let i = 0; i < 45; i++) {
    const star = document.createElement("div");

    star.className = "star";

    star.style.left = `${Math.random() * 100}%`;

    star.style.top = `${Math.random() * 100}%`;

    star.style.animationDelay = `${Math.random() * 5}s`;

    star.style.animationDuration = `${4 + Math.random() * 4}s`;

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

  heart.style.fontSize = `${9 + Math.random() * 16}px`;

  heart.style.animationDuration = `${9 + Math.random() * 7}s`;

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 18000);
}

setInterval(createFloatingHeart, 1600);

/* =========================
   HEART BURST
========================= */

function createHeartBurst(x, y, amount = 15) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("div");

    heart.textContent = Math.random() > 0.35 ? "♥" : "♡";

    heart.style.position = "fixed";

    heart.style.left = `${x}px`;

    heart.style.top = `${y}px`;

    heart.style.zIndex = "9999";

    heart.style.pointerEvents = "none";

    heart.style.color = Math.random() > 0.5 ? "#ff86ac" : "#ffd1df";

    heart.style.fontSize = `${12 + Math.random() * 18}px`;

    heart.style.textShadow = `
      0 0 8px #ff4f87,
      0 0 20px rgba(255,60,130,.9)
      `;

    document.body.appendChild(heart);

    const angle = Math.random() * Math.PI * 2;

    const distance = 70 + Math.random() * 170;

    const xMove = Math.cos(angle) * distance;

    const yMove = Math.sin(angle) * distance;

    const rotation = -60 + Math.random() * 120;

    const animation = heart.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(.2)",

          opacity: 0,
        },

        {
          transform: "translate(-50%, -50%) scale(1.2)",

          opacity: 1,

          offset: 0.2,
        },

        {
          transform: `translate(
                calc(-50% + ${xMove}px),
                calc(-50% + ${yMove}px)
              )
              rotate(${rotation}deg)
              scale(.8)`,

          opacity: 0.85,

          offset: 0.7,
        },

        {
          transform: `translate(
                calc(-50% + ${xMove * 1.15}px),
                calc(-50% + ${yMove * 1.15}px)
              )
              rotate(${rotation * 1.5}deg)
              scale(.1)`,

          opacity: 0,
        },
      ],

      {
        duration: 1500 + Math.random() * 900,

        easing: "cubic-bezier(.16,1,.3,1)",
      },
    );

    animation.finished
      .then(() => {
        heart.remove();
      })
      .catch(() => {
        heart.remove();
      });
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
   FINAL SCREEN
========================= */

let finalTriggered = false;

function finalMoment() {
  if (finalTriggered) return;

  finalTriggered = true;

  setTimeout(() => {
    createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 40);
  }, 1000);
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

console.log("For Israa ♡ — Happy Birthday");
