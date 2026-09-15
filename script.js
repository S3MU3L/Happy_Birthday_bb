const screens = document.querySelectorAll(".screen");
const buttons = document.querySelectorAll(".enter-btn, .continue-btn");
const progressBar = document.querySelector(".progress span");

let currentScreen = 0;
let isAnimating = false;

/* =========================
   NAVIGATION
========================= */

function goToScreen(index) {
  if (isAnimating) return;
  if (index < 0 || index >= screens.length) return;

  isAnimating = true;

  screens.forEach((screen, i) => {
    screen.classList.toggle("active", i === index);
  });

  currentScreen = index;

  updateProgress();
  createTransitionBurst();

  setTimeout(() => {
    isAnimating = false;
  }, 850);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 10);

    goToScreen(currentScreen + 1);
  });
});

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

    star.style.animationDelay = `${Math.random() * 4}s`;

    star.style.animationDuration = `${2 + Math.random() * 3}s`;

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

  heart.style.animationDuration = `${7 + Math.random() * 7}s`;

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 15000);
}

setInterval(createFloatingHeart, 1100);

/* =========================
   HEART BURST
========================= */

function createHeartBurst(x, y, amount = 10) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("div");

    heart.textContent = Math.random() > 0.4 ? "♥" : "♡";

    heart.style.position = "fixed";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.zIndex = "500";
    heart.style.pointerEvents = "none";

    heart.style.color = Math.random() > 0.5 ? "#ff86ac" : "#ffd1df";

    heart.style.fontSize = `${10 + Math.random() * 14}px`;

    heart.style.textShadow = "0 0 15px rgba(255,60,130,.9)";

    document.body.appendChild(heart);

    const angle = Math.random() * Math.PI * 2;

    const distance = 50 + Math.random() * 120;

    const xMove = Math.cos(angle) * distance;

    const yMove = Math.sin(angle) * distance;

    const rotation = -40 + Math.random() * 80;

    heart.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0,
        },
        {
          transform: "translate(-50%, -50%) scale(1.2)",
          opacity: 1,
        },
        {
          transform: `translate(
              calc(-50% + ${xMove}px),
              calc(-50% + ${yMove}px)
            )
            rotate(${rotation}deg)
            scale(.2)`,
          opacity: 0,
        },
      ],
      {
        duration: 850 + Math.random() * 550,
        easing: "cubic-bezier(.16,1,.3,1)",
      },
    );

    setTimeout(() => {
      heart.remove();
    }, 1500);
  }
}

/* =========================
   SCREEN TRANSITION
========================= */

function createTransitionBurst() {
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;

  for (let i = 0; i < 5; i++) {
    const light = document.createElement("div");

    light.style.position = "fixed";
    light.style.left = `${x}px`;
    light.style.top = `${y}px`;

    light.style.width = "5px";
    light.style.height = "5px";

    light.style.borderRadius = "50%";

    light.style.background = "#ff86ac";

    light.style.boxShadow = "0 0 20px #ff4f87";

    light.style.pointerEvents = "none";
    light.style.zIndex = "400";

    document.body.appendChild(light);

    const angle = (Math.PI * 2 * i) / 5;

    const distance = 80 + Math.random() * 70;

    const moveX = Math.cos(angle) * distance;

    const moveY = Math.sin(angle) * distance;

    light.animate(
      [
        {
          transform: "translate(-50%,-50%) scale(0)",
          opacity: 0,
        },
        {
          transform: "translate(-50%,-50%) scale(1)",
          opacity: 1,
        },
        {
          transform: `translate(
              calc(-50% + ${moveX}px),
              calc(-50% + ${moveY}px)
            )
            scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 850,
        easing: "ease-out",
      },
    );

    setTimeout(() => {
      light.remove();
    }, 950);
  }
}

/* =========================
   CLICK EFFECT
========================= */

document.addEventListener("click", (event) => {
  if (
    event.target.closest(".play-btn") ||
    event.target.closest(".continue-btn") ||
    event.target.closest(".enter-btn")
  ) {
    return;
  }

  createHeartBurst(event.clientX, event.clientY, 4);
});

/* =========================
   MUSIC PLAYER
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
    createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 35);
  }, 500);
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
   INITIAL STATE
========================= */

updateProgress();

console.log("For Israa ♡ — Happy Birthday");
