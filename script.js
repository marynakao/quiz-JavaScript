let currentQuestion = 0;
let correctAnswers = 0;

showQuestion()

// Evento botao de reiniciar
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        // Barra de evolução
        let percentual = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${percentual}%`;
        //------------------

        // Esconde o score e exibe questao
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        // Escolhe a pergunta
        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.options').innerHTML = '';

        // Manipula o DOM apenas uma vez p/ alternativas
        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div data-op ="${i}" class="option"><span>${[parseInt(i)+1]}</span>${q.options[i]}</div>`;
            
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        // Loop exibicao nas options e add evento de click
        document.querySelectorAll('.options .option').forEach(item => { item.addEventListener('click', optionClickEvent);
    });

    }
    else {
        finishQuiz();
    }
}
// Avanca questao e soma questoes corretas
function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion();

}

function finishQuiz() {
    //Calcula o score final
    let points = Math.floor((correctAnswers / questions.length) * 100);

    //Informa a pontuacao
    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim hein?!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    }
    else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bem!';
        document.querySelector('.scorePct').style.color = '#FF8000';
    }
    else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Você brilhou!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    // Mensagem final
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`

    // Exibe score e esconde questoes
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}