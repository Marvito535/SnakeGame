const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware, um statische Dateien zu bedienen (z.B. HTML, JS, CSS)
app.use(express.static('public'));
app.use(express.json());

// Pfad zur JSON-Datei
const highscoreFile = path.join(__dirname, 'highscores.json');

// API-Route zum Abrufen der Highscores
app.get('/api/highscores', (req, res) => {
    fs.readFile(highscoreFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading highscores' });
        }
        res.json(JSON.parse(data));
    });
});

// API-Route zum Speichern von Highscores
app.post('/save-highscore', (req, res) => {
    const { name, score } = req.body;

    if (!name || !score) {
        return res.status(400).json({ error: 'Name and score are required' });
    }

    // Lese die aktuellen Highscores
    fs.readFile(highscoreFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading highscores' });
        }

        const highscores = JSON.parse(data);

        // Füge den neuen Highscore hinzu
        highscores.push({ name, score });

        // Sortiere die Highscores absteigend nach Score
        highscores.sort((a, b) => b.score - a.score);

        // Speichere die aktualisierten Highscores zurück in die Datei
        fs.writeFile(highscoreFile, JSON.stringify(highscores, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving highscores' });
            }

            // Antwort mit den aktuellen Highscores
            res.json({ message: 'Highscore saved', highscores });
        });
    });
});

// Server starten
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
