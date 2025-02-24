import { quiz } from "./questions.js";


// init variables

let infoContainer = document.querySelector('#info-container');
let choicesContainer = document.querySelector('#choices-container');
let nextButton = document.querySelector('#next-button');
let replayButton = document.querySelector('#replay-button');
let progressContainer = document.querySelector('#progress-container');
let whichQuestion = document.querySelector('#current-question');
let progress = document.querySelector('#progress');
let timer = document.querySelector('#timer');
let currentQuestionIndex = 0;
let score = 0;


// init functions

function loadQuestion() {
    let currentQuestion = quiz.questions[currentQuestionIndex];

    choicesContainer.innerHTML = "";
    whichQuestion.innerText = `Question ${currentQuestionIndex + 1}`;
    progress.value = (currentQuestionIndex / quiz.questions.length) * 100;
    nextButton.disabled = true;
    infoContainer.innerText = currentQuestion.text;

    createTimer();
    createButton(currentQuestion);
    answering();
}

function createTimer() {
    let time = 10;
    let intervalID = setInterval(() => {
        timer.innerText = time;
        if (time == 0) {
            clearInterval(intervalID);
            timeUpMessage();
        }
        if (!nextButton.disabled) {
            clearInterval(intervalID);
        }
        time--;
    }, 1000);
}

function createButton(currentQuestion) {
    currentQuestion.choices.forEach((element) => {
        const choice = document.createElement('button');
        choice.innerText = element;
        if (choice.innerText == currentQuestion.answer) {
            choice.setAttribute("id", "answer");
        }
        choice.classList.add('choice');
        choicesContainer.appendChild(choice);
    });
}

function answering() {
    let choicesArray = document.querySelectorAll('.choice');
    let answer = document.querySelector('#answer');
    
    choicesArray.forEach((element) => {
        element.addEventListener("click", () => {
            checkAnswer(element, answer);
            nextButton.disabled = false;
            choicesArray.forEach((element) => {
                element.disabled = true;
            })
        })
    });
}

function checkAnswer(selectedChoice, answerChoice) {
    if (selectedChoice.innerText === quiz.questions[currentQuestionIndex].answer) {
        score++;
    }
    else {
        selectedChoice.classList.add('wrong');
    }
    answerChoice.classList.add('correct');
}

function showMessage(number) {
    let message = document.createElement('div');

    message.classList.add('message');
    infoContainer.after(message);
    if (number < (quiz.questions.length/3)) {
        message.innerText = "Pas terrible comme score !";
    }
    else if (number > (quiz.questions.length/3) && number < (quiz.questions.length*2/3)) {
        message.innerText = "Pas mal, t'y es presque !";
    }
    else {
        message.innerText = "Quelle encyclopédie !";
    }
}

function timeUpMessage() {
    let answer = document.querySelector('#answer');
    let choicesArray = document.querySelectorAll('.choice');

    alert("Trop long!");
    nextButton.disabled = false;
    choicesArray.forEach((element) => {
        element.disabled = true;
    })
    answer.classList.add('correct');
}


// execute code

loadQuestion();
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.questions.length) {
        loadQuestion();
    }
    else {
        infoContainer.innerText = `Fin du game ! Ton Score = ${score}/${quiz.questions.length}`;
        showMessage(score);
        // localStorage.setItem("score", score);
        // alert(localStorage.getItem("score"));
        choicesContainer.innerHTML = "";
        progressContainer.style.display = "none";
        nextButton.style.display = "none";
        replayButton.style.display = "inline-block";
    }
})
replayButton.addEventListener("click", () => {
    let message = document.querySelector(".message");
    message.remove();
    currentQuestionIndex = 0;
    score = 0;
    progressContainer.style.display = "inline-block";
    replayButton.style.display = "none";
    nextButton.style.display = "inline-block";
    loadQuestion();
})