const { exec } = require('child_process');
const { platform } = require('os');
const path = require('path');

// Server starten
const serverProcess = exec('node ' + path.join(__dirname, '..', 'server.js'));

// Server-Fehler anzeigen
serverProcess.stderr.on('data', (data) => {
    console.error(`Server Error: ${data}`);
});

// Erfolgreich gestarteter Server
serverProcess.stdout.on('data', (data) => {
    console.log(`Server: ${data}`);
});

// Verzögerung (in Millisekunden)
const delay = 3000; // 3 Sekunden Verzögerung für den Browser-Start

// Warte mit setTimeout, bevor der Browser geöffnet wird
setTimeout(() => {
    if (platform() === 'win32') {
        exec('start http://localhost:3000');  // Windows
    } else if (platform() === 'darwin') {
        exec('open http://localhost:3000');  // macOS
    } else {
        exec('xdg-open http://localhost:3000');  // Linux
    }
}, delay);

// Beende den Server, wenn der Prozess gestoppt wird
process.on('exit', () => {
    serverProcess.kill();
});



