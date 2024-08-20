import Food from './food.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// Jetzt kann `ctx` verwendet werden, um auf dem Canvas zu zeichnen

const blockSize = 20;
const boardWidth = canvas.width;
const boardHeight = canvas.height;

let food = new Food(boardWidth, boardHeight, blockSize);

food.draw(ctx);                                                 //draw food

if (food.isEaten(snake.segment[0])) {
    food.relocate();
    snake.grow();                                             

}

/* function gameLoop() {
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

// gameLoop();*/


console.log('game.js ist geladen und funktioniert!');

// Teste, ob das Canvas-Element gefunden wird

if (canvas) {
    console.log('Canvas gefunden:', canvas);
} else {
    console.log('Canvas nicht gefunden');
}

