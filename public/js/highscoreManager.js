import HighscoreScreen from './highscoreScreen.js'; 

class HighscoreManager {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.highscoreScreen = new HighscoreScreen(); 
    }

    // Method to save a new hoghscore
    saveHighscore(name, score) {
        fetch(`${this.apiUrl}/save-highscore`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, score })
        })
            .then(response => response.json())
            .then(data => {
                if (data.highscores) {
                    this.highscoreScreen.displayHighscores(data.highscores); // use the instance
                } else {
                    console.error('Fehler: Highscore konnte nicht gespeichert werden');
                }
            })
            .catch(error => {
                console.error('Fehler beim Speichern des Highscores:', error);
            });
    }
}

export default HighscoreManager;
