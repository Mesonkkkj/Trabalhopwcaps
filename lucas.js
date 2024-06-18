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
                // Aqui você pode adicionar suas perguntas divididas em categorias
                // Exemplo de perguntas:
                 {
                  question: 'Qual a comida favorita de lucasiru?',
                  answers: [
                      { text: 'A. Pizza', correct: false },
 {
   text: 'B. Jujuba', correct: false },
        { text: 'C. Abacate', correct: false },
        { text: 'D. Bolo de festa', correct: true  }
    ]
},
{
    question: 'Qual o nome do animal de estimação de lucasiru?',
    answers: [
        { text: 'A. Rex', correct: false },
        { text: 'B. Marrone', correct: true },
        { text: 'C. Ralf', correct: false },
        { text: 'D. Sara', correct: false }
    ]
},
  {
     question: 'Qual o esporte que lucasiru pratica?',
     answers: [ { text: 'A. Handebol', correct: false },
 {
   text: 'B. Ping Pong', correct: false },
        { text: 'C. Vôlei', correct: true },
        { text: 'D. Beach Tênis', correct: false }
    ]
},
{
    question: 'Quantos minutos lucasiru nasceu antes de Teteu du grau?',
    answers: [
        { text: 'A. 2min', correct: false },
        { text: 'B. 5min', correct: true },
        { text: 'C. 10min', correct: false },
        { text: 'D. 20min', correct: false }
    ]
},

{
    question: 'Qual o lugar que lucasiru mais gosta?',
    answers: [
        { text: 'A. Lagoa', correct: false },
        { text: 'B. Praia', correct: false },
        { text: 'C. Casa', correct: false },
        { text: 'D. Casa da Vovó Mariinha', correct: true }
    ]
},
];function startGame() { startButton.classList.add('hide'); scoreButton.classList.add('hide'); shuffledQuestions = questions.sort(() => Math.random() - .5); currentQuestionIndex = 0; questionContainerElement.classList.remove('hide'); setNextQuestion(); }function setNextQuestion() { resetState(); showQuestion(shuffledQuestions[currentQuestionIndex]); }function showQuestion(question) { questionElement.innerText = question.question; question.answers.forEach(answer => { const button = document.createElement('button'); button.innerText = answer.text; button.classList.add('btn'); if (answer.correct) { button.dataset.correct = answer.correct; } button.addEventListener('click', selectAnswer); answerButtonsElement.appendChild(button); }); }function resetState() { clearStatusClass(document.body); nextButton.classList.add('hide'); while (answerButtonsElement.firstChild) { answerButtonsElement.removeChild(answerButtonsElement.firstChild); } }function selectAnswer(e) { const selectedButton = e.target; const correct = selectedButton.dataset.correct; setStatusClass(document.body, correct); Array.from(answerButtonsElement.children).forEach(button => { setStatusClass(button, button.dataset.correct); }); if (correct) { score++; } if (shuffledQuestions.length > currentQuestionIndex + 1) { nextButton.classList.remove('hide'); } else { startButton.innerText = 'Reiniciar'; startButton.classList.remove('hide'); scoreButton.classList.remove('hide'); } }function setStatusClass(element, correct) { clearStatusClass(element); if (correct) { element.classList.add('correct'); } else { element.classList.add('wrong'); } }function clearStatusClass(element) { element.classList.remove('correct'); element.classList.remove('wrong'); }function showScore() { alert('Sua pontuação: ' + score + '/' + questions.length); }