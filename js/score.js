import { score, quizName } from "./game.js";

export const scores = {
    score_RRRrrrr: [],
    score_Oss117: [],
    score_CitéDeLaPeur: [],
}

export function stockScore() {
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

// function printScores() {
//     let scoresLS = JSON.parse(localStorage.getItem("scores"));

//     scoresLS.forEach((quiz) => {
//         quiz.forEach((element, index) => {
//             console.log(`Tentative n°${index} => Score${element}`);
//         })
//     });
// }

// printScores();