

    document.addEventListener("DOMContentLoaded", function () {
      const questionEl = document.getElementById("question");
      const answerEl = document.getElementById("answer");
      const timerEl = document.getElementById("timer");
      const scoreEl = document.getElementById("score");
      const startBtn = document.getElementById("start-btn");
      const gameOverEl = document.getElementById("game-over");
      const submitBtn = document.getElementById("submit-btn");
      let score = 0;
      let timeLeft = 10;
      let timer;
      let correctAnswer;
      function generateQuestion() {
        const ops = ["+", "-", "*", "/"];
        const op = ops[Math.floor(Math.random() * ops.length)];
        let num1, num2, ans;
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
        questionEl.innerHTML = `${num1} ${op} ${num2} = ?`;
        correctAnswer = ans;
      }
      function startTimer() {
        timeLeft = 10;
        timerEl.textContent = "Time left: " + timeLeft + "s";
        timer = setInterval(() => {
          timeLeft--;
          timerEl.textContent = "Time left: " + timeLeft + "s";
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
        questionEl.textContent = "Game Over!";
        gameOverEl.textContent = message;
        answerEl.disabled = true;
        submitBtn.disabled = true;
        startBtn.disabled = false;
      }
      function checkAnswer() {
        const userAnswer = Number(answerEl.value.trim());
        if (userAnswer === correctAnswer) {
          score++;
          scoreEl.textContent = "Score: " + score;
          clearInterval(timer);
          nextQuestion();
        } else {
          clearInterval(timer);
          endGame("Wrong answer!");
        }
      }
      answerEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !answerEl.disabled) {
          checkAnswer();
        }
      });

      submitBtn.addEventListener("click", function () {
        if (!answerEl.disabled) {
          checkAnswer();
        }
      });
      startBtn.addEventListener("click", function () {
        score = 0;
        scoreEl.textContent = "Score: " + score;
        gameOverEl.textContent = "";
        answerEl.disabled = false;
        submitBtn.disabled = false;
        answerEl.focus();
        startBtn.disabled = true;
        nextQuestion();
      });
    });
