var qBox = document.getElementById("question");
var aBox = document.getElementById("answer");
var tBox = document.getElementById("timer");
var sBox = document.getElementById("score");
var startBtn = document.getElementById("start-btn");
var endBox = document.getElementById("game-over");

var score = 0;
var timeLeft = 10;
var timer;
var rightAns;

function makeQ() {
  var ops = ["+", "-", "*", "/"];
  var op = ops[Math.floor(Math.random() * 4)];

  var n1, n2, ans;

  if (op === "/") {
    n2 = Math.floor(Math.random() * 9) + 1;
    ans = Math.floor(Math.random() * 10);
    n1 = n2 * ans;
  } else {
    n1 = Math.floor(Math.random() * 20) + 1;
    n2 = Math.floor(Math.random() * 20) + 1;
    if (op === "+") ans = n1 + n2;
    else if (op === "-") ans = n1 - n2;
    else if (op === "*") ans = n1 * n2;
  }

  qBox.innerHTML = n1 + " " + op + " " + n2 + " = ?";
  rightAns = ans;
}

function startTime() {
  timeLeft = 10;
  tBox.innerHTML = "Time left: " + timeLeft + "s";
  timer = setInterval(function () {
    timeLeft--;
    tBox.innerHTML = "Time left: " + timeLeft + "s";
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame("Time's up!");
    }
  }, 1000);
}

function nextQ() {
  aBox.value = "";
  aBox.focus();
  makeQ();
  startTime();
}

function endGame(msg) {
  clearInterval(timer);
  qBox.innerHTML = "Game Over!";
  endBox.innerHTML = msg;
  aBox.disabled = true;
  startBtn.disabled = false;
}

aBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    var userAns = Number(aBox.value.trim());
    if (userAns === rightAns) {
      score++;
      sBox.innerHTML = "Score: " + score;
      clearInterval(timer);
      nextQ();
    } else {
      clearInterval(timer);
      endGame("Wrong answer!");
    }
  }
});

startBtn.addEventListener("click", function () {
  score = 0;
  sBox.innerHTML = "Score: " + score;
  endBox.innerHTML = "";
  aBox.disabled = false;
  startBtn.disabled = true;
  nextQ();
});
