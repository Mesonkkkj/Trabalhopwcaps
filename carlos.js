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
    question: 'Qual professor Vinix mais gosta?',
    answers: [
      { text: 'A. Cisinha', correct: false },
      { text: 'B. Adalberto', correct: false },
      { text: 'C. Ray', correct: false },
      { text: 'D. Dociana', correct: true }
    ]
  },
  {
    question: 'Qual o talento de Vinix?',
    answers: [
      { text: 'A. Amaigar', correct: true },
      { text: 'B. Fazer raiva', correct: true },
      { text: 'C. Conversar', correct: true },
      { text: 'D. Todas as alternativas', correct: true }
    ]
  },
  {
    question: 'O que Vinix mais gosta de fazer na escola?',
    answers: [
      { text: 'A. Conversar', correct: true },
      { text: 'B. Amaigar', correct: true },
      { text: 'C. Estudar', correct: false },
      { text: 'D. Costurar', correct: true }
    ]
  },
  {
    question: 'Qual a cor favorita de Vinix?',
    answers: [
      { text: 'A. Rosa', correct: false },
      { text: 'B. Preto', correct: true },
      { text: 'C. Verde', correct: false },
      { text: 'D. Branco', correct: false }
    ]
  },
  {
    question: 'Quem é melhor amigo de Vinix?',
    answers: [
      { text: 'A. Mesonkkj', correct: false },
      { text: 'B. Ian', correct: false },
      { text: 'C. Felipadas', correct: false },
      { text: 'D. Teteu du grau', correct: true }
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
  alert('Sua pontuação: ' + score + '/' + (questions.length * 10));
}