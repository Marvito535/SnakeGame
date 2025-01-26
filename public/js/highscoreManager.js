import HighscoreScreen from './highscoreScreen.js'; 

class HighscoreManager {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.highscoreScreen = new HighscoreScreen(); // Instanziiere HighscoreScreen korrekt
    }

    // Methode zum Abrufen der Highscores
    fetchHighscores() {
        fetch(`${this.apiUrl}/api/highscores`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Logge die erhaltenen Daten
                if (data.highscores) {
                    this.highscoreScreen.displayHighscores(data.highscores); 
                } else {
                    console.error('Fehler: Highscores konnten nicht abgerufen werden');
                }
            })
            .catch(error => {
                console.error('Fehler beim Abrufen der Highscores:', error);
            });
    }

    // Methode zum Speichern eines neuen Highscores
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
                    this.highscoreScreen.displayHighscores(data.highscores); // Nutze die Instanz
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
