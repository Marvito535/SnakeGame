const { exec } = require('child_process');
const { platform } = require('os');
const path = require('path');

// start server
const serverProcess = exec('node ' + path.join(__dirname, '..', 'server.js'));

// show issues
serverProcess.stderr.on('data', (data) => {
    console.error(`Server Error: ${data}`);
});

// server successfully started
serverProcess.stdout.on('data', (data) => {
    console.log(`Server: ${data}`);
});

// delay
const delay = 3000; // 3 Sekunden Verzögerung für den Browser-Start

// wait with setTimeout before open the browser
setTimeout(() => {
    if (platform() === 'win32') {
        exec('start http://localhost:3000');  // Windows
    } else if (platform() === 'darwin') {
        exec('open http://localhost:3000');  // macOS
    } else {
        exec('xdg-open http://localhost:3000');  // Linux
    }
}, delay);

// stop  the server when the process is stopped
process.on('exit', () => {
    serverProcess.kill();
});



