interface Question {
  question: string;
  choices: string[];
  correctAnswer: string;
}

class Quiz {
  private questions: Question[];
  private score: number = 0;
  private currentQuestionIndex: number = 0;

  private questionElement: HTMLParagraphElement;
  private choicesElement: HTMLDivElement;
  private nextButton: HTMLButtonElement;
  private scoreElement: HTMLParagraphElement;

  constructor(questions: Question[]) {
    this.questions = questions;

    this.questionElement = document.getElementById("question-text") as HTMLParagraphElement;
    this.choicesElement = document.getElementById("choices") as HTMLDivElement;
    this.nextButton = document.getElementById("next-btn") as HTMLButtonElement;
    this.scoreElement = document.getElementById("score-display") as HTMLParagraphElement;

    this.nextButton.addEventListener("click", () => this.nextQuestion());

    this.displayQuestion();
  }

  displayQuestion(): void {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.questionElement.textContent = "Quiz Finished!";
      this.choicesElement.innerHTML = "";
      this.nextButton.style.display = "none";
      this.scoreElement.textContent = `Final Score: ${this.score}`;
      return;
    }

    const q = this.questions[this.currentQuestionIndex];
    this.questionElement.textContent = q.question;
    this.choicesElement.innerHTML = "";

    q.choices.forEach(choice => {
      let btn = document.createElement("button");
      btn.textContent = choice;
      btn.onclick = () => this.checkAnswer(choice);
      this.choicesElement.appendChild(btn);
    });

    this.nextButton.disabled = true; 
  }

  checkAnswer(answer: string): void {
    if (answer === this.questions[this.currentQuestionIndex].correctAnswer) {
      this.score++;
      alert("Correct!");
    } else {
      alert("Wrong!");
    }

    this.nextButton.disabled = false;
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;
    this.displayQuestion();
  }
}

// Example Quiz Data
const quiz = new Quiz([
  { question: "What is the largest number here?", choices: ["1", "2", "3", "4"], correctAnswer: "4" },
  { question: "Capital of France?", choices: ["Berlin", "Paris", "Rome"], correctAnswer: "Paris" }
]);
