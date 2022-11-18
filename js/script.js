var currentQuestionId = 0;
var answerButton = [];
var question = [];
var time = questions.length * 15;
var timer;

// DOM //
const startBtn = document.getElementById("start");
const startScrn = document.getElementById("start-screen");
const timeDisplay = document.getElementById("time");
const questionTitle = document.getElementById("question-title");
const choices = document.getElementById("choices");
const quizEnd = document.getElementById("end-screen");
const questionDisplay = document.getElementById("questions");
const finalScore = document.getElementById("highscore");
const initials = document.getElementById("initials");
const submit = document.getElementById("submit");
const results = document.getElementById("result");
startBtn.addEventListener("click", startQuiz);
submit.addEventListener("click", leaderboard);
// Start up the quiz
function startQuiz() {
  startScrn.classList.add("hidden");
  questionDisplay.classList.toggle("hidden");
  timeDisplay.textContent = time;
  timer = setInterval(function () {
    time--;
    timeDisplay.textContent = time;

    if (time <= 0) {
      time = 0;
      timeDisplay.textContent = 0;
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
  getQuestion();
}
// generate questions
function getQuestion() {
  var questionCurrent = questions[currentQuestionId];
  questionTitle.textContent = questionCurrent.title;
  choices.innerHTML = "";

  for (var i = 0; i < questionCurrent.option.length; i++) {
    var options = questionCurrent.option[i];
    var optionButton = document.createElement("option");
    optionButton.addEventListener("click", questionClick);
    optionButton.classList.add("btn", "btn-primary", "mx-auto");
    optionButton.setAttribute("value", questionCurrent.option[i]);
    optionButton.textContent = i + 1 + ". " + options;

    choices.appendChild(optionButton);
  }
}
// logic for answering questions
function questionClick(event) {
  const selected = event.target;
  if (!selected.matches(".btn-primary")) {
    return;
  }

  if (selected.value === questions[currentQuestionId].answer) {
    results.textContent = "Correct!";
  } else {
    time -= 15;
    results.textContent = "Wrong!";
    if (time < 0) {
      time = 0;
    }
    timeDisplay.textContent = time;
  }
  results.classList.toggle("hidden");
  setTimeout(function () {
    results.classList.toggle("hidden");
  }, 500);

  currentQuestionId++;
  if (time <= 0 || currentQuestionId === questions.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}
// End quiz logic
function endQuiz() {
  clearInterval(timer);
  quizEnd.classList.toggle("hidden");
  questionDisplay.classList.toggle("hidden");
  finalScore.textContent = time;
}
// store leaderboard scores
function leaderboard() {
  const initialsId = initials.value.trim();
  if (initialsId !== "") {
    var highscore = JSON.parse(window.localStorage.getItem("highscore")) || [];

    var scoreUpdate = {
      initials: initialsId,
      score: time,
    };
    highscore.push(scoreUpdate);
    window.localStorage.setItem("highscore", JSON.stringify(highscore));
  }
  window.location.href = "scores.html";
}
