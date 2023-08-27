function printHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    highScores.sort(function (a, b) {
        return b.score - a.score;
    });

    highScores.forEach(function(score) {
        let liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;

        let olEl = document.getElementById("high-scores");
        olEl.appendChild(liTag);
    });
}

function clearHighScores() {
    localStorage.removeItem("highScores");
    window.location.reload();
}