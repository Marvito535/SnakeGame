const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Snake initialisieren
let snake = [{x: 200, y: 200}];
let dx = 10;
let dy = 0;

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'green';
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function main() {
    setTimeout(function onTick() {
        clearCanvas();
        drawSnake();
        // Snake Bewegung logik hier
        main();
    }, 100);
}

main();
