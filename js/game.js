import { quizzes } from "./questions.js";


// init variables

const navTitle = document.querySelector('#title');
const infoContainer = document.querySelector('#info-container');
const message = document.querySelector('#message');
const choicesContainer = document.querySelector('#choices-container');
const nextButton = document.querySelector('#next-button');
const replayButton = document.querySelector('#replay-button');
const progressContainer = document.querySelector('#progress-container');
const whichQuestion = document.querySelector('#current-question');
const timer = document.querySelector('#timer');
const progress = document.querySelector('#progress');
let currentQuiz;
let currentQuestionIndex = 0;
let score = 0;
let quizName;
const scores = {
    score_RRRrrrr: [],
    score_Oss117: [],
    score_CitéDeLaPeur: [],
};


// init functions

function loadQuiz() {
    switch (localStorage.getItem("currentQuiz")) {
        case "quiz_RRRrrrr":
            navTitle.innerText = "RRRrrrr";
            quizName = "RRRrrrr";
            break;
        case "quiz_Oss117":
            navTitle.innerText = "OSS 117";
            quizName = "Oss117";
            break;
        case "quiz_CitéDeLaPeur":
            navTitle.innerText = "La Cité de la Peur";
            quizName = "CitéDeLaPeur";
            break;
    }
    currentQuiz = quizzes[localStorage.getItem("currentQuiz")];
}

function loadQuestion() {
    // checking pbs of refreshing nav
    if (currentQuestionIndex === currentQuiz.questions.length) {
        currentQuestionIndex = 0;
        score = 0;
    }

    const currentQuestion = currentQuiz.questions[currentQuestionIndex];

    message.style.display = "none";
    choicesContainer.textContent = "";
    whichQuestion.innerText = `Question ${currentQuestionIndex + 1}`;
    progress.value = (currentQuestionIndex / currentQuiz.questions.length) * 100;
    nextButton.disabled = true;
    infoContainer.innerText = currentQuestion.text;
    createTimer();
    createButton(currentQuestion);
    answering();
}

function createTimer() {
    let time = 15;

    timer.innerText = `Temps restant = ${time} secondes`;
    let intervalID = setInterval(() => {
        timer.innerText = `Temps restant = ${time} secondes`;
        if (time === 0) {
            timeUpMessage();
            localStorage.setItem(`currentQuestionIndex_${quizName}`, currentQuestionIndex + 1);
            clearInterval(intervalID);
        }
        if (!nextButton.disabled) {
            localStorage.setItem(`currentQuestionIndex_${quizName}`, currentQuestionIndex + 1);
            clearInterval(intervalID);
        }
        time--;
    }, 1000);
}

function createButton(currentQuestion) {
    currentQuestion.choices.forEach((element) => {
        const choice = document.createElement('button');
        choice.innerText = element;
        choice.classList.add('choice');
        choicesContainer.appendChild(choice);
    });
}

function answering() {
    const choicesArray = document.querySelectorAll('.choice');

    choicesArray.forEach((element) => {
        element.addEventListener("click", () => {
            checkAnswer(element);
            nextButton.disabled = false;
            choicesArray.forEach((element) => {
                element.disabled = true;
            })
        })
    });
}

function checkAnswer(selectedChoice) {
    if (selectedChoice.innerText === currentQuiz.questions[currentQuestionIndex].answer) {
        selectedChoice.classList.add('correct');
        score++;
    }
    else {
        selectedChoice.classList.add('wrong');
    }
}

function showMessage(score) {
    if (score < (currentQuiz.questions.length / 3)) {
        message.innerText = "Bon, au moins, t'as essayé. C'est déjà pas mal.😆";
    }
    else if (score > (currentQuiz.questions.length / 3) && score < (currentQuiz.questions.length * 2 / 3)) {
        message.innerText = "C'est correct, mais un petit conseil : regarde le film de nouveau.😏";
    }
    else {
        message.innerText = "Bravo! Un niveau aussi haut, c'est presque suspect...😎";
    }
}

function timeUpMessage() {
    const choicesArray = document.querySelectorAll('.choice');

    timer.innerText = "Trop lent !";
    nextButton.disabled = false;
    choicesArray.forEach((element) => {
        element.disabled = true;
    })
}

function updateLocalStorage() {
    if (localStorage.getItem(`currentQuestionIndex_${quizName}`)) {
        currentQuestionIndex = Number(localStorage.getItem(`currentQuestionIndex_${quizName}`));
        score = Number(localStorage.getItem(`score_${quizName}`));
    }
}

function stockScore() {
    // first localStorage of scores
    if (!localStorage.getItem("scores")) {
        localStorage.setItem("scores", JSON.stringify(scores));
    }
    let scoresLS = JSON.parse(localStorage.getItem("scores"));

    switch (quizName) {
        case "RRRrrrr":
            scoresLS.score_RRRrrrr.push(score);
            break;
        case "Oss117":
            scoresLS.score_Oss117.push(score);
            break;
        case "CitéDeLaPeur":
            scoresLS.score_CitéDeLaPeur.push(score);
            break;
    }
    localStorage.setItem("scores", JSON.stringify(scoresLS));
}

// execute code

loadQuiz();
updateLocalStorage();
loadQuestion();
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    localStorage.setItem(`currentQuestionIndex_${quizName}`, currentQuestionIndex);
    localStorage.setItem(`score_${quizName}`, score);
    if (currentQuestionIndex < currentQuiz.questions.length) {
        loadQuestion();
    }
    else {
        infoContainer.innerText = `Fin du game ! Ton Score = ${score}/${currentQuiz.questions.length}`;
        showMessage(score);
        choicesContainer.textContent = "";
        message.style.display = "block"
        nextButton.style.display = "none";
        replayButton.style.display = "flex";
        progressContainer.style.display = "none";
        stockScore();
        localStorage.removeItem(`currentQuestionIndex_${quizName}`);
        localStorage.removeItem(`score_${quizName}`);
    }
})
replayButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    replayButton.style.display = "none";
    nextButton.style.display = "flex";
    progressContainer.style.display = "flex";
    loadQuestion();
})