const startButton = document.getElementById('start-btn');
const scoreButton = document.getElementById('score-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

startButton.addEventListener('click', startGame);
scoreButton.addEventListener('click', showScore);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

const questions = [
  {
    question: 'Qual treino Mesonkkj mais gosta de fazer?',
    answers: [
      { text: 'A. Peito', correct: false },
      { text: 'B. Tríceps', correct: false },
      { text: 'C. Costas', correct: false },
      { text: 'D. Bíceps', correct: true }
    ]
  },
  {
    question: 'Qual a comida favorita de Mesonkkj?',
    answers: [
      { text: 'A. Pizza', correct: false },
      { text: 'B. Whey Protein', correct: true },
      { text: 'C. Pastel', correct: false },
      { text: 'D. Frango', correct: false }
    ]
  },
  {
    question: 'Qual línguagem de programação Mesonkkj mais domina?',
    answers: [
      { text: 'A. Javascript', correct: false },
      { text: 'B. Python', correct: false },
      { text: 'C. Html', correct: true },
      { text: 'D. Css', correct: false }
    ]
  },
  {
    question: 'Qual o hobby de Mesonkkj?',
    answers: [
      { text: 'A. Treinar', correct: true },
      { text: 'B. Programar', correct: true },
      { text: 'C. Jogar ', correct: false },
      { text: 'D. Correr', correct: false }
    ]
  },
  {
    question: 'qual time Mesonkkj torce?',
    answers: [
      { text: 'A. Flamengo', correct: false },
      { text: 'B. Palmeiras', correct: false },
      { text: 'C. Santos', correct: false },
      { text: 'D. Corinthians', correct: true }
    ]
  },
];

function startGame() {
  startButton.classList.add('hide');
  scoreButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  score = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  setStatusClass(selectedButton, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === 'true');
  });
  if (correct) {
    score += 10;
  } else {
    score -= 5;
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Reiniciar';
    startButton.classList.remove('hide');
    scoreButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function showScore() {
  alert('Sua pontuação: ' + score);
}