// ── DOM refs ────────────────────────────────────────────────────────────────
const progressBar = document.getElementById("progress"); // the yellow fill div
const progressTrack = document.getElementById("progress-track"); // outer track (for snapshots)

const wpmBox = document.getElementById("wpm");
const wrongBox = document.getElementById("wrong-keys");
const correctBox = document.getElementById("correct-keys");
const totalBox = document.getElementById("total-keys");
const percent = document.getElementById("percent");
const difficulty = document.getElementById("difficulty");
const lang = document.getElementById("lang");
const timeSpan = document.getElementById("time");

const playAgain = document.getElementById("play-again");
const download = document.getElementById("download");

// ── Read saved data ──────────────────────────────────────────────────────────
const totalTime = Number(localStorage.getItem("total-time"));
const remainingTime = Number(localStorage.getItem("time"));
const time = totalTime - remainingTime;

const wrong = Number(localStorage.getItem("wrong"));
const totalKeys = Number(localStorage.getItem("totalKeys"));
const redCount = Number(localStorage.getItem("redCount"));
const index = Number(localStorage.getItem("index"));

// ── Computed stats ───────────────────────────────────────────────────────────
const wpm = time > 0 ? Math.round(totalKeys / (5 * (time / 60))) : 0;
const correct = totalKeys - wrong;
const accuracy = Math.round(100 * (1 - redCount / (index - 1)));

// ── Set static values immediately ───────────────────────────────────────────
wrongBox.innerText = wrong;
correctBox.innerText = correct;
totalBox.innerText = totalKeys;

// ── Animated counters ────────────────────────────────────────────────────────
let wpmNow = 0;
let progressNow = 0;
let statsFinished = false;

wpmBox.innerText = 0;
percent.innerText = "0%";
progressBar.style.width = "0%";

function animateStats() {
  let running = false;

  // Animate WPM counter
  if (wpmNow < wpm) {
    wpmNow++;
    wpmBox.innerText = wpmNow;
    running = true;
  }

  // Animate progress bar width + percent label
  if (progressNow < accuracy) {
    progressNow++;
    progressBar.style.width = progressNow + "%";
    percent.innerText = progressNow + "%";
    running = true;
  }

  if (running) {
    requestAnimationFrame(animateStats);
  } else {
    // Ensure final values are exact
    wpmBox.innerText = wpm;
    progressBar.style.width = accuracy + "%";
    percent.innerText = accuracy + "%";
    statsFinished = true;
  }
}

animateStats();

let diffStr;
switch (Number(localStorage.getItem("difficulty"))) {
  case 0:
    diffStr = "easy";
    break;
  case 1:
    diffStr = "medium";
    break;
  case 2:
    diffStr = "hard";
    break;
}

let langStr;
switch (Number(localStorage.getItem("lang"))) {
  case 0:
    langStr = "english";
    break;
  case 1:
    langStr = "hindi";
    break;
}

timeSpan.innerText = `${totalTime}s`;
difficulty.innerText = diffStr;
lang.innerText = langStr;

// ── Navigation ───────────────────────────────────────────────────────────────
playAgain.addEventListener("click", function () {
  window.location.href = "index.html";
});

// ── Download as image ────────────────────────────────────────────────────────
download.addEventListener("click", async function () {
  // Snap to final values before capture
  wpmBox.innerText = wpm;
  progressBar.style.width = accuracy + "%";
  percent.innerText = accuracy + "%";

  // Brief delay so the browser paints the final state
  await new Promise((r) => setTimeout(r, 80));

  const card = document.querySelector("main");

  const canvas = await html2canvas(card, {
    useCORS: true,
    backgroundColor: "#18272f",
    scale: window.devicePixelRatio,
  });

  const link = document.createElement("a");
  link.download = "result-card.png";
  link.href = canvas.toDataURL();
  link.click();
});
