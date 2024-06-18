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
    question: 'Qual a cor que Lalacta mais odeia?',
    answers: [
      { text: 'A. Azul', correct: false },
      { text: 'B. Rosa', correct: false },
      { text: 'C. Verde', correct: false },
      { text: 'D. Vermelho', correct: true }
    ]
  },
  {
    question: 'O que Lalacta gosta de colecionar?',
    answers: [
      { text: 'A. Bonecos/as', correct: false },
      { text: 'B. Folha de Materia', correct: true },
      { text: 'C. Livros', correct: false },
      { text: 'D. Mangás', correct: false }
    ]
  },
  {
    question: 'Qual o animal favorito de Lalacta?',
    answers: [
      { text: 'A. Cachorro', correct: false },
      { text: 'B. Piriquito', correct: false },
      { text: 'C. Pinguim', correct: true },
      { text: 'D. Raposa', correct: false }
    ]
  },
  {
    question: 'Qual o sabor de pizza favorito de Lalacta?',
    answers: [
      { text: 'A. Calabresa', correct: false },
      { text: 'B. Frango catupiry', correct: true },
      { text: 'C. Moda da casa', correct: false },
      { text: 'D. Marguerita', correct: false }
    ]
  },
  {
    question: 'Qual o hobby de Lalacta?',
    answers: [
      { text: 'A. Correr', correct: false },
      { text: 'B. Estudar', correct: false },
      { text: 'C. Ler', correct: false },
      { text: 'D. Desenhar', correct: true }
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