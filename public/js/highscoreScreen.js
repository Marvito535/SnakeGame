class HighscoreScreen {
    displayHighscores(highscores) {
        const highscoreList = document.getElementById('highscore-list');
        highscoreList.innerHTML = ''; // Delete the existing list

        const topScores = highscores
            .slice(0, 10); // Only the first 10 entries

        topScores.forEach(score => { 
            const li = document.createElement('li');  //list the scores
            li.textContent = `${score.name}: ${score.score}`;
            highscoreList.appendChild(li); //add element
        });
    }
}

export default HighscoreScreen;
