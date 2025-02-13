var Quiz = /** @class */ (function () {
    function Quiz(questions) {
        var _this = this;
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.questions = questions;
        this.questionElement = document.getElementById("question-text");
        this.choicesElement = document.getElementById("choices");
        this.nextButton = document.getElementById("next-btn");
        this.scoreElement = document.getElementById("score-display");
        this.nextButton.addEventListener("click", function () { return _this.nextQuestion(); });
        this.displayQuestion();
    }
    Quiz.prototype.displayQuestion = function () {
        var _this = this;
        if (this.currentQuestionIndex >= this.questions.length) {
            this.questionElement.textContent = "Quiz Finished!";
            this.choicesElement.innerHTML = "";
            this.nextButton.style.display = "none";
            this.scoreElement.textContent = "Final Score: ".concat(this.score);
            return;
        }
        var q = this.questions[this.currentQuestionIndex];
        this.questionElement.textContent = q.question;
        this.choicesElement.innerHTML = "";
        q.choices.forEach(function (choice) {
            var btn = document.createElement("button");
            btn.textContent = choice;
            btn.onclick = function () { return _this.checkAnswer(choice); };
            _this.choicesElement.appendChild(btn);
        });
        this.nextButton.disabled = true; // Disable "Next" button until an answer is selected
    };
    Quiz.prototype.checkAnswer = function (answer) {
        if (answer === this.questions[this.currentQuestionIndex].correctAnswer) {
            this.score++;
            alert("Correct!");
        }
        else {
            alert("Wrong!");
        }
        this.nextButton.disabled = false; // Enable "Next" button after selecting an answer
    };
    Quiz.prototype.nextQuestion = function () {
        this.currentQuestionIndex++;
        this.displayQuestion();
    };
    return Quiz;
}());
// Example Quiz Data
var quiz = new Quiz([
    { question: "What is the largest number here?", choices: ["1", "2", "3", "4"], correctAnswer: "4" },
    { question: "Capital of France?", choices: ["Berlin", "Paris", "Rome"], correctAnswer: "Paris" }
]);
