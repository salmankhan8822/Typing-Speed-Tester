// Sentences the user will type
const quotes = [
  "JavaScript is the language of the web.",
  "Typing speed test helps you improve your skills.",
  "Practice makes a man perfect.",
  "Web development is fun and creative.",
  "Code, sleep, repeat.",
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");

let timer = 0;
let currentQuote = "";
correctChars = 0;
let interval = null;

function startTest() {
  timer = 0;
  inputEl.value = "";
  inputEl.disabled = false;
  correctChars = 0;
  inputEl.focus();

  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.innerText = currentQuote;

  timerEl.innerText = "0";
  wpmEl.innerText = "0";
  accuracyEl.innerText = "0";

  clearInterval(interval);

  interval = setInterval(() => {
    timer++;
    timerEl.innerText = timer;

    let wordsTyped = inputEl.value.trim().split(/\s+/).length;
    let wpm = Math.round((wordsTyped / timer) * 60) || 0;
    wpmEl.innerText = wpm;
  }, 1000);
}

inputEl.addEventListener("input", () => {
  let typedText = inputEl.value;
  let correct = 0;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentQuote[i]) {
      correct++;
    }
  }

  correctChars = correct;
  let accuracy = Math.round((correct / typedText.length) * 100) || 0;
  accuracyEl.innerText = accuracy;

  if (typedText === currentQuote) {
    clearInterval(interval);
    let words = currentQuote.split(" ").length;
    let wpm = Math.round((words / timer) * 60);
    wpmEl.innerText = wpm;
    inputEl.disabled = true;
  }
});

startBtn.addEventListener("click", startTest);
