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

// API-Route zum Speichern eines neuen Highscores
app.post('/api/highscores', (req, res) => {
    const { name, score } = req.body;

    if (!name || typeof score !== 'number') {
        return res.status(400).json({ error: 'Invalid data' });
    }

    fs.readFile(highscoreFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading highscores' });
        }

        const highscores = JSON.parse(data);
        highscores.push({ name, score });
        highscores.sort((a, b) => b.score - a.score); // Sortiere nach Highscore
        highscores.splice(10); // Begrenze auf die Top 10

        fs.writeFile(highscoreFile, JSON.stringify(highscores, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving highscores' });
            }
            res.status(201).json({ message: 'Highscore saved' });
        });
    });
});

// Server starten
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});