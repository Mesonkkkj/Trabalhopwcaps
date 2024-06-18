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
                  question: 'Qual a comida favorita de Crispim?',
                  answers: [
                      { text: 'A. Pizza', correct: false },
 {
   text: 'B. Jujuba', correct: false },
        { text: 'C. Abacate', correct: false },
        { text: 'D. Azeitona', correct: true  }
    ]
},
{
    question: ' O que Crispim mais gosta de fazer?',
    answers: [
        { text: 'A. Atividades', correct: false },
        { text: 'B. Ir a praia', correct: true },
        { text: 'C. Arranhar Vinix', correct: false },
        { text: 'D. Sair com o CAPS', correct: false }
    ]
},
  {
     question: 'Qual a cor favorita de Crispim?',
     answers: [ { text: 'A. Rosa pink', correct: false },
 {
   text: 'B. Azul Ciano', correct: false },
        { text: 'C. Azul índigo', correct: true },
        { text: 'D. Vermelho Escalarte', correct: false }
    ]
},
{
    question: 'Qual o nome do animal de estimação de Crispim?',
    answers: [
        { text: 'A. Bartholomeu', correct: false },
        { text: 'B. Lady Laura', correct: true },
        { text: 'C. Sandy', correct: false },
        { text: 'D. Samantha', correct: false }
    ]
},

{
    question: 'Quando crispim era criança qual curso da EEEP ela queria entrar?',
    answers: [
        { text: 'A. Administração', correct: false },
        { text: 'B. Eletrotécnica', correct: false },
        { text: 'C. Informática', correct: false },
        { text: 'D. Secretaria Escolar', correct: true }
    ]
},
];function startGame() { startButton.classList.add('hide'); scoreButton.classList.add('hide'); shuffledQuestions = questions.sort(() => Math.random() - .5); currentQuestionIndex = 0; questionContainerElement.classList.remove('hide'); setNextQuestion(); }function setNextQuestion() { resetState(); showQuestion(shuffledQuestions[currentQuestionIndex]); }function showQuestion(question) { questionElement.innerText = question.question; question.answers.forEach(answer => { const button = document.createElement('button'); button.innerText = answer.text; button.classList.add('btn'); if (answer.correct) { button.dataset.correct = answer.correct; } button.addEventListener('click', selectAnswer); answerButtonsElement.appendChild(button); }); }function resetState() { clearStatusClass(document.body); nextButton.classList.add('hide'); while (answerButtonsElement.firstChild) { answerButtonsElement.removeChild(answerButtonsElement.firstChild); } }function selectAnswer(e) { const selectedButton = e.target; const correct = selectedButton.dataset.correct; setStatusClass(document.body, correct); Array.from(answerButtonsElement.children).forEach(button => { setStatusClass(button, button.dataset.correct); }); if (correct) { score++; } if (shuffledQuestions.length > currentQuestionIndex + 1) { nextButton.classList.remove('hide'); } else { startButton.innerText = 'Reiniciar'; startButton.classList.remove('hide'); scoreButton.classList.remove('hide'); } }function setStatusClass(element, correct) { clearStatusClass(element); if (correct) { element.classList.add('correct'); } else { element.classList.add('wrong'); } }function clearStatusClass(element) { element.classList.remove('correct'); element.classList.remove('wrong'); }function showScore() { alert('Sua pontuação: ' + score + '/' + questions.length); }