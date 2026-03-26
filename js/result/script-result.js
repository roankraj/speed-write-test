const progressBar = document.getElementById("progress"),
  progressTrack = document.getElementById("progress-track"),
  wpmBox = document.getElementById("wpm"),
  wrongBox = document.getElementById("wrong-keys"),
  correctBox = document.getElementById("correct-keys"),
  totalBox = document.getElementById("total-keys"),
  percent = document.getElementById("percent"),
  difficulty = document.getElementById("difficulty"),
  lang = document.getElementById("lang"),
  timeSpan = document.getElementById("time"),
  playAgain = document.getElementById("play-again"),
  download = document.getElementById("download"),
  totalTime = Number(localStorage.getItem("total-time")),
  remainingTime = Number(localStorage.getItem("time")),
  time = totalTime - remainingTime,
  wrong = Number(localStorage.getItem("wrong")),
  totalKeys = Number(localStorage.getItem("totalKeys")),
  redCount = Number(localStorage.getItem("redCount")),
  index = Number(localStorage.getItem("index")),
  wpm = time > 0 ? Math.round(totalKeys / ((time / 60) * 5)) : 0,
  correct = totalKeys - wrong,
  accuracy = Math.round(100 * (1 - redCount / (index - 1)));
((wrongBox.innerText = wrong),
  (correctBox.innerText = correct),
  (totalBox.innerText = totalKeys));
let diffStr,
  langStr,
  wpmNow = 0,
  progressNow = 0,
  statsFinished = !1;
function animateStats() {
  let e = !1;
  (wpmNow < wpm && (wpmNow++, (wpmBox.innerText = wpmNow), (e = !0)),
    progressNow < accuracy &&
      (progressNow++,
      (progressBar.style.width = progressNow + "%"),
      (percent.innerText = progressNow + "%"),
      (e = !0)),
    e
      ? requestAnimationFrame(animateStats)
      : ((wpmBox.innerText = wpm),
        (progressBar.style.width = accuracy + "%"),
        (percent.innerText = accuracy + "%"),
        (statsFinished = !0)));
}
switch (
  ((wpmBox.innerText = 0),
  (percent.innerText = "0%"),
  (progressBar.style.width = "0%"),
  animateStats(),
  Number(localStorage.getItem("difficulty")))
) {
  case 0:
    diffStr = "easy";
    break;
  case 1:
    diffStr = "medium";
    break;
  case 2:
    diffStr = "hard";
}
switch (Number(localStorage.getItem("lang"))) {
  case 0:
    langStr = "english";
    break;
  case 1:
    langStr = "hindi";
}
((timeSpan.innerText = `${totalTime}s`),
  (difficulty.innerText = diffStr),
  (lang.innerText = langStr),
  playAgain.addEventListener("click", function () {
    window.location.href = "index.html";
  }),
  download.addEventListener("click", async function () {
    ((wpmBox.innerText = wpm),
      (progressBar.style.width = accuracy + "%"),
      (percent.innerText = accuracy + "%"),
      await new Promise((e) => setTimeout(e, 80)));
    const e = document.querySelector("main"),
      t = await html2canvas(e, {
        useCORS: !0,
        backgroundColor: "#182926",
        scale: window.devicePixelRatio,
      }),
      n = document.createElement("a");
    ((n.download = "result-card.png"), (n.href = t.toDataURL()), n.click());
  }));
