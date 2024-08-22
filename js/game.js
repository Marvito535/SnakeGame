import Food from './food.js';
import Snake from './snake.js';

document.addEventListener('keydown', handleKeyDown);
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const blockSize = 20;
const boardWidth = canvas.width;
const boardHeight = canvas.height;

let speed = 20; 
let frameCounter = 0;
let food = new Food(boardWidth, boardHeight, blockSize);
let snake = new Snake();

function handleKeyDown(event) {
    switch (event.key) {
        case 'ArrowUp':
            snake.setDirection('UP');
            break;
        case 'ArrowDown':
            snake.setDirection('DOWN');
            break;
        case 'ArrowLeft':
            snake.setDirection('LEFT');
            break;
        case 'ArrowRight':
            snake.setDirection('RIGHT');
            break;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const snakePosition = snake.segments[0];

    console.log('Snake Position:', snakePosition);
    console.log('Food Position:', food.position);

    if (food.isEaten(snakePosition)) {
     console.log('Food eaten, relocating...');
    food.relocate(); // Nahrung an eine neue Position setzen
    }

    frameCounter++;
    if (frameCounter >= speed) {
        snake.move(); 
        frameCounter = 0; }

    snake.drawSnake(ctx); 
    food.drawFood(ctx);
   
  
    requestAnimationFrame(gameLoop); 
}                                              
gameLoop();
