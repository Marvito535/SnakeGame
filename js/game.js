import Food from './food.js';
import Snake from './snake.js';

let imagesLoaded = 0;
const totalImages = 14; 

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

const gardenerImage = new Image();
gardenerImage.src = 'gardener.png'; 
gardenerImage.onload = checkAllImagesLoaded;

const dachshundMouthOpen = new Image();
dachshundMouthOpen.src = 'dachshund_mouth_open.png';
dachshundMouthOpen.onload = checkAllImagesLoaded;


let snake;
function onImagesLoaded() {
    snake = new Snake(boardWidth, boardHeight, blockSize, ctx, 
                      dachshundHeadLeft, dachshundRearLeft,
                      dachshundHeadRight, dachshundRearRight,
                      dachshundHeadUp, dachshundRearUp,
                      dachshundHeadDown, dachshundRearDown,
                      dachshundBody, winkel, dachshundMouthOpen);

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
    const borderWidth = blockSize *6; // Randbild soll 5 Blöcke breit sein
    const borderHeight = blockSize*1; // Randbild soll 2 Blöcke hoch sein

    // Obere Kante
    for (let x = 0; x < canvas.width; x += borderWidth) {
        ctx.drawImage(borderImage, x, 0, borderWidth, borderHeight);
    }

    // Untere Kante
    for (let x = 0; x < canvas.width; x += borderWidth) {
        ctx.drawImage(borderImage, x, canvas.height - borderHeight, borderWidth, borderHeight);
    }
}

function drawGardener() {
    const gardenerWidth = blockSize * 3;  // Gärtner soll 2 Blöcke breit sein
    const gardenerHeight = blockSize * 3; // Gärtner soll 2 Blöcke hoch sein
    const x = (canvas.width / 2) - (gardenerWidth / 2); // Zentriere den Gärtner horizontal
    const y = (canvas.height / 2) - (gardenerHeight / 2); // Zentriere den Gärtner vertikal
    ctx.drawImage(gardenerImage, x, y, gardenerWidth, gardenerHeight); // Zeichne das Gärtner-Bild
}

let isEating = false;

function gameLoop(timestamp) {
    if (timestamp - lastFrameTime > frameInterval) {
        lastFrameTime = timestamp;

        drawBackground(); // Draw the background first
        drawBorder(); // Rahmen zeichnen
        drawGardener(); //drawGardener

        if (food.isEaten(snake.segments[0])) {
            food.relocate();
            snake.grow();
            isEating = true;  // Setze den Essstatus auf true
            setTimeout(() => {
                isEating = false; // Nach 500 ms den Essstatus wieder zurücksetzen
            }, 250);
        }
        

        snake.move();
        snake.checkCollision();
        snake.drawSnake(isEating);
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
    snake.drawSnake();

    drawBackground();  // Neu zeichnen nach dem Resize
    //snake.drawSnake(); // Snake neu zeichnen
});


