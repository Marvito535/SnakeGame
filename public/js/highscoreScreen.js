class HighscoreScreen {
    displayHighscores(highscores) {
        const highscoreList = document.getElementById('highscore-list');
        highscoreList.innerHTML = ''; // Lösche die bestehende Liste

        const topScores = highscores
            .slice(0, 10); // Nur die ersten 10 Einträge

        topScores.forEach(score => {
            const li = document.createElement('li');
            li.textContent = `${score.name}: ${score.score}`;
            highscoreList.appendChild(li);
        });
    }
}

export default HighscoreScreen;
