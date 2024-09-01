import Food from './food.js';
import Snake from './snake.js';

let imagesLoaded = 0;
const totalImages = 18; 

function checkAllImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        onImagesLoaded();
    }
}

// Hintergrundbild laden
const backgroundImage = new Image();
backgroundImage.src = 'background.png';
backgroundImage.onload = checkAllImagesLoaded;

// Bestehende Dackelbilder
const dachshundHeadLeft = new Image();
dachshundHeadLeft.src = 'dachshund_front_left.png';
dachshundHeadLeft.onload = checkAllImagesLoaded;

const dachshundMiddleLeft = new Image();
dachshundMiddleLeft.src = 'dachshund_middle_left.png';
dachshundMiddleLeft.onload = checkAllImagesLoaded;

const dachshundRearLeft = new Image();
dachshundRearLeft.src = 'dachshund_rear_left.png';
dachshundRearLeft.onload = checkAllImagesLoaded;

const dachshundHeadRight = new Image();
dachshundHeadRight.src = 'dachshund_front_right.png';
dachshundHeadRight.onload = checkAllImagesLoaded;

const dachshundMiddleRight = new Image();
dachshundMiddleRight.src = 'dachshund_middle_right.png';
dachshundMiddleRight.onload = checkAllImagesLoaded;

const dachshundRearRight = new Image();
dachshundRearRight.src = 'dachshund_rear_right.png';
dachshundRearRight.onload = checkAllImagesLoaded;

const dachshundHeadUp = new Image();
dachshundHeadUp.src = 'dachshund_front_up.png';
dachshundHeadUp.onload = checkAllImagesLoaded;

const dachshundMiddleUp = new Image();
dachshundMiddleUp.src = 'dachshund_middle_up.png';
dachshundMiddleUp.onload = checkAllImagesLoaded;

const dachshundRearUp = new Image();
dachshundRearUp.src = 'dachshund_rear_up.png';
dachshundRearUp.onload = checkAllImagesLoaded;


const dachshundHeadDown = new Image();
dachshundHeadDown.src = 'dachshund_front_down.png';
dachshundHeadDown.onload = checkAllImagesLoaded;

const dachshundMiddleDown = new Image();
dachshundMiddleDown.src = 'dachshund_middle_down.png';
dachshundMiddleDown.onload = checkAllImagesLoaded;

const dachshundRearDown = new Image();
dachshundRearDown.src = 'dachshund_rear_down.png';
dachshundRearDown.onload = checkAllImagesLoaded;

const strawberryImage = new Image();
strawberryImage.src = 'strawberry.png';
strawberryImage.onload = checkAllImagesLoaded;

const dachshundCurveBL = new Image();
dachshundCurveBL.src = 'dachshund_curve_bl.png';
dachshundCurveBL.onload = checkAllImagesLoaded;

const dachshundCurveTL = new Image();
dachshundCurveTL.src = 'dachshund_curve_tl.png';
dachshundCurveTL.onload = checkAllImagesLoaded;

const dachshundCurveBR = new Image();
dachshundCurveBR.src = 'dachshund_curve_br.png';
dachshundCurveBR.onload = checkAllImagesLoaded;

const dachshundCurveTR = new Image();
dachshundCurveTR.src = 'dachshund_curve_tr.png';
dachshundCurveTR.onload = checkAllImagesLoaded;
let snake;

function onImagesLoaded() {
    snake = new Snake(boardWidth, boardHeight, blockSize, ctx, 
                      dachshundHeadLeft, dachshundMiddleLeft, dachshundRearLeft,
                      dachshundHeadRight, dachshundMiddleRight, dachshundRearRight,
                      dachshundHeadUp, dachshundMiddleUp, dachshundRearUp,
                      dachshundHeadDown, dachshundMiddleDown, dachshundRearDown,
                      backgroundImage, dachshundCurveBL, dachshundCurveTL, dachshundCurveBR, dachshundCurveTR);

    document.addEventListener('keydown', handleKeyDown);
    requestAnimationFrame(gameLoop); // Hier wird der timestamp übergeben
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let blockSize;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    blockSize = Math.floor(Math.min(canvas.width, canvas.height) / 10);
}

resizeCanvas();

let boardWidth = canvas.width;
let boardHeight = canvas.height;
let food = new Food(boardWidth, boardHeight, blockSize, strawberryImage);

const frameRate = 2 // Anzahl der Bewegungen pro Sekunde
const frameInterval = 1000 / frameRate;
let lastFrameTime = 0;

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

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    const pattern = ctx.createPattern(backgroundImage, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameLoop(timestamp) {
    if (timestamp - lastFrameTime > frameInterval) {
        lastFrameTime = timestamp;

        drawBackground(); // Draw the background first

        if (food.isEaten(snake.segments[0])) {
            food.relocate();
            snake.grow();
        }

        snake.move();
        snake.checkCollision();
        snake.drawSnake();
        food.drawFood(ctx); // Draw food only if needed
    }

    requestAnimationFrame(gameLoop);
}                                             

window.addEventListener('resize', () => {
    resizeCanvas();
    boardWidth = canvas.width;
    boardHeight = canvas.height;

    snake.boardWidth = boardWidth;
    snake.boardHeight = boardHeight;
    snake.blockSize = blockSize;

    food.boardWidth = boardWidth;
    food.boardHeight = boardHeight;
    food.blockSize = blockSize;

    food.relocate();

    drawBackground();  // Neu zeichnen nach dem Resize
    //snake.drawSnake(); // Snake neu zeichnen
});


