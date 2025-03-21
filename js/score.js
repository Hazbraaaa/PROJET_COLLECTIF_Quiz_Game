// init variables

const scoresContainer = document.querySelector("#scores-container");
const scoreRRRrrrr = document.querySelector("#score-RRRrrrr");
const scoreOss117 = document.querySelector("#score-Oss117");
const scoreCitéDeLaPeur = document.querySelector("#score-CitéDeLaPeur");

function printScores() {
    let scoresLS = JSON.parse(localStorage.getItem("scores"));

    if (!scoresLS) {
        scoresContainer.innerHTML = "Encore aucun score. Finissez un premier quiz.";
        return;
    }

    const quizzes = {
        score_RRRrrrr: scoreRRRrrrr,
        score_Oss117: scoreOss117,
        score_CitéDeLaPeur: scoreCitéDeLaPeur
    }

    for (let quiz in scoresLS) {
        let score = scoresLS[quiz];
        score.forEach((element, index) => {
            quizzes[quiz].innerText += `Tentative n°${index + 1} => Score ${element}\n`;
        })
    };
}

printScores();