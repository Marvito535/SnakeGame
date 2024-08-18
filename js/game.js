const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// Jetzt kann `ctx` verwendet werden, um auf dem Canvas zu zeichnen
canvas.width = 400;
canvas.height = 400;

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Spielstatus aktualisieren
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Spielobjekte zeichnen
}

gameLoop();
