var questionEl = document.getElementById("question");
var answerEl = document.getElementById("answer");
var timerEl = document.getElementById("timer");
var scoreEl = document.getElementById("score");
var startBtn = document.getElementById("start-btn");
var gameOverEl = document.getElementById("game-over");

var score = 0;
var timeLeft = 10;
var timer;
var correctAnswer;

function generateQuestion() {
  var ops = ["+", "-", "*", "/"];
  var op = ops[Math.floor(Math.random() * ops.length)];

  var num1, num2, ans;

  if (op === "/") {
    num2 = Math.floor(Math.random() * 9) + 1;
    ans = Math.floor(Math.random() * 10);
    num1 = num2 * ans;
  } else {
    num1 = Math.floor(Math.random() * 20) + 1;
    num2 = Math.floor(Math.random() * 20) + 1;
    if (op === "+") ans = num1 + num2;
    if (op === "-") ans = num1 - num2;
    if (op === "*") ans = num1 * num2;
  }

  questionEl.innerHTML = num1 + " " + op + " " + num2 + " = ?";
  correctAnswer = ans;
}

function startTimer() {
  timeLeft = 10;
  timerEl.innerHTML = "Time left: " + timeLeft + "s";
  timer = setInterval(function () {
    timeLeft--;
    timerEl.innerHTML = "Time left: " + timeLeft + "s";
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame("Time's up!");
    }
  }, 1000);
}

function nextQuestion() {
  answerEl.value = "";
  answerEl.focus();
  generateQuestion();
  startTimer();
}

function endGame(message) {
  clearInterval(timer);
  questionEl.innerHTML = "Game Over!";
  gameOverEl.innerHTML = message;
  answerEl.disabled = true;
  startBtn.disabled = false;
}

answerEl.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    var userAnswer = Number(answerEl.value.trim());
    if (userAnswer === correctAnswer) {
      score++;
      scoreEl.innerHTML = "Score: " + score;
      clearInterval(timer);
      nextQuestion();
    } else {
      clearInterval(timer);
      endGame("Wrong answer!");
    }
  }
});

startBtn.addEventListener("click", function () {
  score = 0;
  scoreEl.innerHTML = "Score: " + score;
  gameOverEl.innerHTML = "";
  answerEl.disabled = false;
  startBtn.disabled = true;
  nextQuestion();
});

