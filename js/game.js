import Food from './food.js';
import Snake from './snake.js';
import Obstacles from './obstacles.js';
import Tree from './tree.js';
import GameOverScreen from './gameOverScreen.js';
import StartScreen from './startScreen.js';
import Border from './border.js';


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

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let boardWidth, boardHeight, blockSize, snake, border;

function onImagesLoaded() {
    resizeCanvas(); // Canvas direkt anpassen

    border = new Border(canvas, blockSize, borderImage, boardWidth, boardHeight);

    snake = new Snake(boardWidth, boardHeight, blockSize, ctx, 
                      dachshundHeadLeft, dachshundRearLeft,
                      dachshundHeadRight, dachshundRearRight,
                      dachshundHeadUp, dachshundRearUp,
                      dachshundHeadDown, dachshundRearDown,
                      dachshundBody, winkel, dachshundMouthOpen, border);

    document.addEventListener('keydown', handleKeyDown);
    requestAnimationFrame(gameLoop); // Start des Spiels
}

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

let food = new Food(boardWidth, boardHeight, blockSize, strawberryImage );
let obstacles = new Obstacles(boardWidth, boardHeight, blockSize, obstacleImage);
let tree = new Tree(boardWidth, boardHeight, blockSize, treeImage);
const gameOverScreen = new GameOverScreen();
const startScreen = new StartScreen();

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

function drawScore() {
    ctx.font = `${blockSize/2}px Arial`; // Schriftgröße basierend auf Blockgröße
    ctx.fillStyle = 'red'; 
    ctx.textAlign = 'left'; 
    const scoreText = `Points: ${food.totalPoints}`;
    ctx.fillText(scoreText, blockSize, blockSize / 1.5); // Punkte oben links zeichnen
}

let isEating = false;
let isGameStarted = false; // Boolean to check if the game has started
let gameEndAlert = false;
let isGameOver = false; // Status for Game Over

function gameOver() {
    alert("Game Over!"); 
    gameEndAlert = true; 
}

function gameLoop(timestamp) {
    if (!isGameStarted) {
        // Show the start screen before the game starts
        startScreen.display(ctx, canvas.width, canvas.height);
        return; // Wait for the player to start the game
    }

    if (isGameOver) {
        gameOverScreen.display(ctx, canvas.width, canvas.height, food.totalPoints); // Show game over screen
        return; // Stop game loop
    }

    if (timestamp - lastFrameTime > frameInterval) {
        lastFrameTime = timestamp;

        drawBackground();
        if (food.isEaten(snake.segments[0])) {
            food.eatFood();
            food.relocate();
            snake.grow();
            isEating = true;
            setTimeout(() => {
                isEating = false;
            }, 250);
        }

        snake.move();
        snake.isColliding();
        border.draw(ctx);
        drawScore();
        snake.drawSnake(isEating);
        obstacles.drawObstacle(ctx);
        tree.drawTree(ctx);
        food.drawFood(ctx);

        // check collision
        if (obstacles.isColliding(snake.segments[0]) || tree.isColliding(snake.segments[0]) || border.isColliding(snake.segments[0]) || snake.isColliding(snake.segments[0]))
             {
            gameOver(); // stop game
            isGameOver = true; // set status
        }
    }

    requestAnimationFrame(gameLoop);
}

// Event listener to start the game when the player presses 'Space'
window.addEventListener('keydown', (event) => {
    if (event.key === ' ' && !isGameStarted) { // Check for space bar
        isGameStarted = true;
        gameLoop(); // Start game immediately when space is pressed
    }
});   

// Resizing the canvas and re-setting game objects
window.addEventListener('resize', () => {
    resizeCanvas();
    snake.resize(boardWidth, boardHeight, blockSize);
    food.resize(boardWidth, boardHeight, blockSize);
    obstacles.resize(boardWidth, boardHeight, blockSize);
    tree.resize(boardWidth, boardHeight, blockSize);
    border.resize(boardWidth, boardHeight, blockSize);
    drawBackground();
    snake.drawSnake();  
});

