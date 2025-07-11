class QuizGame {
  constructor(questions, dom) {
    this.questions = questions;
    this.dom = dom;
    this.index = 0;
    this.score = 0;
    this.init();
  }

  init() {
    this.changeQuestion();
    this.dom.options.forEach((o) => {
      o.addEventListener("click", this.checkOption.bind(this));
    });
  }

  changeQuestion() {
    this.updateProgress();
    const q = this.questions[this.index];
    this.dom.question.innerText = `${this.index + 1}. ${q.question}`;
    this.dom.options.forEach((option, i) => {
      option.disabled = false;

      option.innerText = q.options[i];
    });
  }

  updateProgress() {
    const percentage = (this.index / this.questions.length) * 100;
    this.dom.progress.style.width = percentage + "%";
  }

  checkOption(event) {
    const selectedOption = event.target;
    this.dom.options.forEach((option) => (option.disabled = true));
    const clickedOption = selectedOption.innerText;
    const rightOption = this.questions[this.index].answer;

    selectedOption.classList.add("correct");
    if (clickedOption === rightOption) {
      this.score++;
      console.log("right");
    } else {
      console.log("wrong");
    }
    setTimeout(() => {
      selectedOption.classList.remove("correct");
      this.index++;
      if (this.index <= this.questions.length - 1) {
        this.changeQuestion();
      } else {
        this.updateProgress();
        alert(this.score);
        this.resetGame();
      }
    }, 300);
  }

  resetGame() {
    this.index = 0;
    this.score = 0;
    this.changeQuestion();
  }
}

function getDOM() {
  return {
    question: document.getElementById("question"),
    options: document.querySelectorAll(".options"),
    progress: document.getElementById("progress"),
  };
}

async function loadQuestions(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) {
      throw new Error("error");
    }
    return await res.json();
  } catch (err) {
    console.error("failed to load questions:", err);
    return [];
  }
}

async function initQuiz() {
  const questions = await loadQuestions("question.json");
  if (questions.length === 0) {
    alert("could not load quiz questions");
    return;
  }

  const dom = getDOM();

  new QuizGame(questions, dom);
}

initQuiz();
