const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to serve static files (e.g. HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Hier wird die index.html Datei geladen
});


// API route for storing high scores
   app.post('/save-highscore', (req, res) => {
    const { name, score } = req.body;

    if (!name || !score) {
        return res.status(400).json({ error: 'Name and score are required' });
    }
 
    // Path to JSON file
    const highscoreFile = path.join(__dirname, 'highscores.json');

    // Read the current high scores
    fs.readFile(highscoreFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading highscores' });
        }

        const highscores = JSON.parse(data);

        // Add the new high score
        highscores.push({ name, score });

        // Sort the high scores in descending order by score
        highscores.sort((a, b) => b.score - a.score);

        // Save the updated high scores back to the file
        fs.writeFile(highscoreFile, JSON.stringify(highscores, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving highscores' });
            }

            // Answer with the current high scores
            res.json({ message: 'Highscore saved', highscores });
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
