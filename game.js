
var questionBox = document.getElementById("question");
var answerBox = document.getElementById("answer");
var timerBox = document.getElementById("timer");
var scoreBox = document.getElementById("score");
var startButton = document.getElementById("start-btn");
var gameOverBox = document.getElementById("game-over");

var score = 0;
var timeLeft = 10;
var timer; 
var correctAnswer; 
function makeQuestion() {
  var arr = ["+", "-", "*", "/"];
  var sign = arr[Math.floor(Math.random() * 4)]; // Randomly select an operator

  var num1;
  var num2;
  var ans;

  if (sign === "/") {
    num2 = Math.floor(Math.random() * 9) + 1; 
    ans = Math.floor(Math.random() * 10);     
    num1 = num2 * ans;
  } else {
    num1 = Math.floor(Math.random() * 20) + 1;
    num2 = Math.floor(Math.random() * 20) + 1;

    if (sign === "+") {
      ans = num1 + num2;
    } else if (sign === "-") {
      ans = num1 - num2;
    } else if (sign === "*") {
      ans = num1 * num2;
    }
  }

  var questionText = num1 + " " + sign + " " + num2 + " = ?";
  questionBox.innerHTML = questionText;
  correctAnswer = answer;
}
function startTime() {
  timeLeft = 10;
  timerBox.innerHTML = "Time left: " + timeLeft + "s";
  timer = setInterval(function () {
    timeLeft--;
    timerBox.innerHTML = "Time left: " + timeLeft + "s";

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame("Time's up!");
    }
  }, 1000);
}
function showNext() {
  answerBox.value = "";
  answerBox.focus();
  makeQuestion();
  startTime();
}

function endGame(msg) {
  clearInterval(timer);
  questionBox.innerHTML = "Game Over!";
  gameOverBox.innerHTML = msg;
  answerBox.disabled = true;
  startButton.disabled = false;
}
answerBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    var userAnswer = Number(answerBox.value.trim());
    if (usernswer === correctAnswer) {
      score++; 
      makeQuestion(); 
      scoreBox.innerHTML = "Score: " + score;
      clearInterval(timer);
      showNext();
    } else {
      clearInterval(timer);
      endGame("Wrong answer!");
    }
  }
});
startButton.addEventListener("click", function () {
  score = 0;
  scoreBox.innerHTML = "Score: " + score;
  gameOverBox.innerHTML = "";
  answerBox.disabled = false;
  startButton.disabled = true;
  showNext();
});
