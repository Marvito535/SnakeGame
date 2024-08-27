import Food from './food.js';
import Snake from './snake.js';

const dachshundHead = new Image();
const dachshundMiddle = new Image();
const dachshundRear = new Image();

dachshundHead.src = 'dachshund_front.png';
dachshundMiddle.src = 'dachshund_middle.png';
dachshundRear.src = 'dachshund_rear.png';

let imagesLoaded = 0;
const totalImages = 3;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const blockSize = 120;
const boardWidth = canvas.width;
const boardHeight = canvas.height;

let speed = 20; 
let frameCounter = 0;
let food = new Food(boardWidth, boardHeight, blockSize);
let snake;

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

function onImagesLoaded() {
    snake = new Snake(boardWidth, boardHeight, blockSize, ctx, dachshundHead, dachshundMiddle, dachshundRear);
    document.addEventListener('keydown', handleKeyDown);
    gameLoop(); // Start the game loop when all images are loaded
}


dachshundHead.onload = dachshundMiddle.onload = dachshundRear.onload = function() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        onImagesLoaded();
    }
};

dachshundHead.onerror = dachshundMiddle.onerror = dachshundRear.onerror = function() {
    console.error('Ein Fehler ist beim Laden der Bildern aufgetreten.');
};

function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const snakePosition = snake.segments[0];

    if (food.isEaten(snakePosition)) {
    food.relocate();
    snake.grow();
    }

    frameCounter++;
    if (frameCounter >= speed) {
        snake.move();
        frameCounter = 0; 
        if (snake.checkCollision()) {
            return; 
        } 
    }

    snake.drawSnake(); 
    food.drawFood(ctx);

    requestAnimationFrame(gameLoop); 
}                                              
