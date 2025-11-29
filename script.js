

/* ----------- RANDOM SLIDE ANIMATIONS ----------- */
const animations = [
  "slideLeft",
  "slideRight",
  "slideUp",
  "slideDown",
  "rollIn",
  "zoomIn",
  "fadeIn"
];
const slides = document.querySelectorAll(".slide");

let lastActive = null;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // Fade out the old slide
      if (lastActive && lastActive !== entry.target) {
        lastActive.classList.remove("active");
      }

      // Fade in the new slide
      entry.target.classList.add("active");

      // Trigger random polaroid animation
      const polaroid = entry.target.querySelector(".polaroid");
      const anim = animations[Math.floor(Math.random() * animations.length)];
      polaroid.style.animation = `${anim} 1.2s ease forwards`;

      lastActive = entry.target;
    }
  });
}, { threshold: 0.55 });

slides.forEach(s => observer.observe(s));


/* ----------- FINAL MESSAGE FADE-IN ----------- */
window.addEventListener("scroll", () => {
  const final = document.getElementById("finalMessage");
  const pos = window.scrollY + window.innerHeight;
  const height = document.body.scrollHeight;

  if (pos > height - 600) {
    final.style.opacity = 1;
  }
});

/* SETTINGS YOU CAN CHANGE */
let HEART_SPEED_MIN = 6;
let HEART_SPEED_MAX = 12;
let HEART_SPAWN_DELAY = 300;

const heartLayer = document.getElementById("heartLayer");

/* SPAWNER */
function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  // Random X within viewport
  const x = Math.random() * window.innerWidth;

  // Start Y based on absolute scroll position
  const startY = window.scrollY + window.innerHeight;

  // Random movement duration
  const duration = Math.random() * (HEART_SPEED_MAX - HEART_SPEED_MIN) + HEART_SPEED_MIN;
  heart.style.animationDuration = `${duration}s`;

  // Position heart
  heart.style.left = `${x}px`;
  heart.style.top = `${startY}px`;

  // Add heart
  heartLayer.appendChild(heart);

  // remove after finished
  setTimeout(() => heart.remove(), duration * 1000);
}

/* spawn continuously no matter where you are */
setInterval(spawnHeart, HEART_SPAWN_DELAY);


const music = document.getElementById("bgMusic");
music.volume = 0.45;

// List of songs to play in order
const playlist = [
  "music/Journey.mp3",
  "music/be_my_princess.mp3",
  "music/autumn.mp3",
  "music/Raban_-_Mariage_d'Amour_(Paul_de_Senneville).mp3",
  "music/rose_waltz.mp3"

];

let currentTrack = 0;

// Load first song
music.src = playlist[currentTrack];

// Needed for autoplay restrictions
function startMusic() {
  music.play().catch(() => {});
}
window.addEventListener("click", startMusic, { once: true });
window.addEventListener("touchstart", startMusic, { once: true });

// When a song ends, go to the next one
music.addEventListener("ended", () => {
  currentTrack++;
  if (currentTrack < playlist.length) {
    music.src = playlist[currentTrack];
    music.play();
  } else {
    // Optional: stop after last song
    // Or restart playlist:
    // currentTrack = 0;
    // music.src = playlist[currentTrack];
    // music.play();
  }
});

