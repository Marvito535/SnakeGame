import Food from './food.js';
import Snake from './snake.js';
import Obstacles from './obstacles.js';
import Tree from './tree.js';

let imagesLoaded = 0;
const totalImages = 16; 

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

const dachshundRearLeft = new Image();
dachshundRearLeft.src = 'dachshund_rear_left.png';
dachshundRearLeft.onload = checkAllImagesLoaded;

const dachshundHeadRight = new Image();
dachshundHeadRight.src = 'dachshund_front_right.png';
dachshundHeadRight.onload = checkAllImagesLoaded;


const dachshundRearRight = new Image();
dachshundRearRight.src = 'dachshund_rear_right.png';
dachshundRearRight.onload = checkAllImagesLoaded;

const dachshundHeadUp = new Image();
dachshundHeadUp.src = 'dachshund_front_up.png';
dachshundHeadUp.onload = checkAllImagesLoaded;

const dachshundRearUp = new Image();
dachshundRearUp.src = 'dachshund_rear_up.png';
dachshundRearUp.onload = checkAllImagesLoaded;

const dachshundHeadDown = new Image();
dachshundHeadDown.src = 'dachshund_front_down.png';
dachshundHeadDown.onload = checkAllImagesLoaded;

const dachshundRearDown = new Image();
dachshundRearDown.src = 'dachshund_rear_down.png';
dachshundRearDown.onload = checkAllImagesLoaded;

const dachshundBody = new Image();
dachshundBody.src = 'dachshund_middle_down.png';
dachshundBody.onload = checkAllImagesLoaded;

const strawberryImage = new Image();
strawberryImage.src = 'strawberry.png';
strawberryImage.onload = checkAllImagesLoaded;

const winkel = new Image();
winkel.src = 'winkel.png';
winkel.onload = checkAllImagesLoaded;

const borderImage = new Image();
borderImage.src = 'hedge.png'; // Bild für den Rand
borderImage.onload = checkAllImagesLoaded;

const dachshundMouthOpen = new Image();
dachshundMouthOpen.src = 'dachshund_mouth_open.png';
dachshundMouthOpen.onload = checkAllImagesLoaded;

const obstacleImage = new Image();
obstacleImage.src = 'TEST.png';
obstacleImage.onload = checkAllImagesLoaded;

const treeImage = new Image();
treeImage.src = 'TEST.png';
treeImage.onload = checkAllImagesLoaded;

let boardWidth, boardHeight, blockSize, snake;

function onImagesLoaded() {
    resizeCanvas(); // Canvas direkt anpassen

    snake = new Snake(boardWidth, boardHeight, blockSize, ctx, 
                      dachshundHeadLeft, dachshundRearLeft,
                      dachshundHeadRight, dachshundRearRight,
                      dachshundHeadUp, dachshundRearUp,
                      dachshundHeadDown, dachshundRearDown,
                      dachshundBody, winkel, dachshundMouthOpen);

    document.addEventListener('keydown', handleKeyDown);
    requestAnimationFrame(gameLoop); // Start des Spiels
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const sizeFactor = 10; // Anzahl der Blöcke für die kleinere Dimension
    const margin = 2; // Sicherheitsabstand 

    // Passe das Canvas an die Bildschirmgröße an
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Blockgröße so berechnen, dass es ins Verhältnis passt
    blockSize = Math.floor(Math.min(canvas.width, canvas.height) / sizeFactor) - margin;

    // Neu berechnete Breite und Höhe des Spielfelds in Blöcken
    boardWidth = Math.floor(canvas.width / blockSize) * blockSize;
    boardHeight = Math.floor(canvas.height / blockSize) * blockSize;

    // Aktuelles Canvas mit Rand bereinigen
    canvas.width = boardWidth;
    canvas.height = boardHeight;
}

resizeCanvas();

let food = new Food(boardWidth, boardHeight, blockSize, strawberryImage);
let obstacles = new Obstacles(boardWidth, boardHeight, blockSize, obstacleImage);
let tree = new Tree(boardWidth, boardHeight, blockSize, treeImage);

const frameRate = 3 // Anzahl der Bewegungen pro Sekunde
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

function drawBorder() {

    const borderWidth = blockSize * 6; // Randbreite
    const borderHeight = blockSize; // Randhöhe

    // Obere Kante
    for (let x = 0; x < canvas.width; x += borderWidth) {
        ctx.drawImage(borderImage, x, 0, borderWidth, borderHeight);
    }

    // Untere Kante
    for (let x = 0; x < canvas.width; x += borderWidth) {
        ctx.drawImage(borderImage, x, canvas.height - borderHeight, borderWidth, borderHeight);
    }
}

function drawScore() {
    ctx.font = `${blockSize/2}px Arial`; // Schriftgröße basierend auf Blockgröße
    ctx.fillStyle = 'red'; 
    ctx.textAlign = 'left'; 
    const scoreText = `Points: ${food.totalPoints}`;
    ctx.fillText(scoreText, blockSize, blockSize / 1.5); // Punkte oben links zeichnen
}

let isEating = false;

function gameLoop(timestamp) {
    if (timestamp - lastFrameTime > frameInterval) {
        lastFrameTime = timestamp;

        drawBackground(); // Draw the background first
        drawBorder(); // Rahmen zeichnen
        drawScore(); // Punkteanzeige zeichnen

        if (food.isEaten(snake.segments[0])) {
            food.eatFood();
            food.relocate();
            snake.grow();
            isEating = true;  // Setze den Essstatus auf true
            setTimeout(() => {

                isEating = false; // Nach 250 ms den Essstatus wieder zurücksetzen

            }, 250);
        }
        

        snake.move();
        snake.checkCollision();
        snake.drawSnake(isEating);
        food.drawFood(ctx); // Draw food only if needed
        obstacles.drawObstacle(ctx); //Draw obstacles
        tree.drawTree(ctx); //Draw tree

        if (obstacles.isColliding(snake.segments[0])) {
            snake.gameOver();
        }

        if (tree.isColliding(snake.segments[0])) {
            snake.gameOver();
        }

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
    snake.drawSnake();
    drawBackground();  
});


