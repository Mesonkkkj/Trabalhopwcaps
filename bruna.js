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
    question: 'Qual o hobby de xoxo?',
    answers: [
      { text: 'A. Correr', correct: false },
      { text: 'B. Desenhar', correct: false },
      { text: 'C. Estudar', correct: false },
      { text: 'D. Fazer as unhas', correct: true }
    ]
  },
  {
    question: 'Qual a fruta favorita de Xoxo?',
    answers: [
      { text: 'A. Maçã', correct: false },
      { text: 'B. Cereja', correct: true },
      { text: 'C. Uva', correct: false },
      { text: 'D. Laranja', correct: false }
    ]
  },
  {
    question: 'Qual o gênero de filme que Xoxo gosta?',
    answers: [
      { text: 'A. Romance', correct: false },
      { text: 'B. Comédia', correct: false },
      { text: 'C. Terror', correct: true },
      { text: 'D. Drama', correct: false }
    ]
  },
  {
    question: 'Qual a série favorita de Xoxo?',
    answers: [
      { text: 'A. Stranfer Things', correct: false },
      { text: 'B. American Horror Story', correct: true },
      { text: 'C. Teen Wolf', correct: false },
      { text: 'D. Riverdale', correct: false }
    ]
  },
  {
    question: 'Qual o nome do cachorrinho de Xoxo?',
    answers: [
      { text: 'A. Hale', correct: false },
      { text: 'B. Rex', correct: false },
      { text: 'C. Carlos', correct: false },
      { text: 'D. Derick', correct: true }
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