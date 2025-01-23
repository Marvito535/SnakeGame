// import other classes to access them
import Food from './food.js';
import Snake from './snake.js';
import Rabbit from './rabbit.js';
import Rat from './rat.js';
import GameOverScreen from './gameOverScreen.js';
import StartScreen from './startScreen.js';
import Border from './border.js';

const canvas = document.getElementById('gameCanvas'); // find id using the DOM model, assign gameCanvas(canvas from .html) to a variable canvas
const ctx = canvas.getContext('2d'); // request 2d context, declare this as variable ctx
let boardWidth, boardHeight, blockSize, snake, border, food, rabbit, rat, gameOverScreen, startScreen; // declare variables

let imagesLoaded = 0; //declare variable and assign value
const totalImages = 20; //declare constant variable and assign value

let isEating = false; // Boolean to check if the dog eats food (for mouth animation)
let isGameStarted = false; // Boolean to check if the game has started
let isGameOver = false; // Boolean for Game Over
let isPaused = false; // Boolean to check if the game is paused

/* Here images are declared and assigned to a variable. The images are stored in the assets folder.
 The .onload event ensures that an image is completely loaded before further code is executed. 
 This is assigned to the function checkAllImagesLoaded. checkAllImagesLoaded is excuted in line 122 */
const backgroundImage = new Image();
backgroundImage.src = './assets/background.png';
backgroundImage.onload = checkAllImagesLoaded;

const dachshundHeadLeft = new Image();
dachshundHeadLeft.src = './assets/dachshund_front_left.png';
dachshundHeadLeft.onload = checkAllImagesLoaded;

const dachshundRearLeft = new Image();
dachshundRearLeft.src = './assets/dachshund_rear_left.png';
dachshundRearLeft.onload = checkAllImagesLoaded;

const dachshundHeadRight = new Image();
dachshundHeadRight.src = './assets/dachshund_front_right.png';
dachshundHeadRight.onload = checkAllImagesLoaded;

const dachshundRearRight = new Image();
dachshundRearRight.src = './assets/dachshund_rear_right.png';
dachshundRearRight.onload = checkAllImagesLoaded;

const dachshundHeadUp = new Image();
dachshundHeadUp.src = './assets/dachshund_front_up.png';
dachshundHeadUp.onload = checkAllImagesLoaded;

const dachshundRearUp = new Image();
dachshundRearUp.src = './assets/dachshund_rear_up.png';
dachshundRearUp.onload = checkAllImagesLoaded;

const dachshundHeadDown = new Image();
dachshundHeadDown.src = './assets/dachshund_front_down.png';
dachshundHeadDown.onload = checkAllImagesLoaded;

const dachshundRearDown = new Image();
dachshundRearDown.src = './assets/dachshund_rear_down.png';
dachshundRearDown.onload = checkAllImagesLoaded;

const dachshundBody = new Image();
dachshundBody.src = './assets/dachshund_middle_down.png';
dachshundBody.onload = checkAllImagesLoaded;

const strawberryImage = new Image();
strawberryImage.src = './assets/strawberry.png';
strawberryImage.onload = checkAllImagesLoaded;

const angle = new Image();
angle.src = './assets/angle.png';
angle.onload = checkAllImagesLoaded;

const borderImage = new Image();
borderImage.src = './assets/hedge.png'; 
borderImage.onload = checkAllImagesLoaded;

const dachshundMouthOpen = new Image();
dachshundMouthOpen.src = './assets/dachshund_mouth_open.png';
dachshundMouthOpen.onload = checkAllImagesLoaded;

const rabbitImage = new Image();
rabbitImage.src = './assets/rabbit_part1.png';
rabbitImage.onload = checkAllImagesLoaded;

const rabbitImageTwo = new Image();
rabbitImageTwo.src = './assets/rabbit_part2.png';
rabbitImageTwo.onload = checkAllImagesLoaded;

const rabbitImageThree = new Image();
rabbitImageThree.src = './assets/rabbit_part3.png';
rabbitImageThree.onload = checkAllImagesLoaded;

const ratImage = new Image();
ratImage.src = './assets/rat_part1.png';
ratImage.onload = checkAllImagesLoaded;

const ratImageTwo = new Image();
ratImageTwo.src = './assets/rat_part2.png';
ratImageTwo.onload = checkAllImagesLoaded;

const ratImageThree = new Image();
ratImageThree.src = './assets/rat_part3.png';
ratImageThree.onload = checkAllImagesLoaded;

function onImagesLoaded() { // This function will only be executed if all 20 images are loaded, see line 125.
    resizeCanvas(); // executes function on line 131.

    // create constructors to initialize starting values for ojects 
    border = new Border(canvas, blockSize, borderImage, boardWidth, boardHeight);
    snake = new Snake(boardWidth, boardHeight, blockSize, ctx, 
                      dachshundHeadLeft, dachshundRearLeft,
                      dachshundHeadRight, dachshundRearRight,
                      dachshundHeadUp, dachshundRearUp,
                      dachshundHeadDown, dachshundRearDown,
                      dachshundBody, angle, dachshundMouthOpen, border);
    food = new Food(boardWidth, boardHeight, blockSize, strawberryImage );
    rabbit = new Rabbit(boardWidth, boardHeight, blockSize, rabbitImage, rabbitImageTwo, rabbitImageThree);
    rat = new Rat(boardWidth, boardHeight, blockSize, ratImage, ratImageTwo, ratImageThree);
    gameOverScreen = new GameOverScreen();
    startScreen = new StartScreen();

    document.addEventListener('keydown', handleKeyDown); // set arrow keys to which the dog/snake should react, 
    requestAnimationFrame(gameLoop); // start the loop(frame update), is needed at this point to display the start screen
}

function checkAllImagesLoaded() {
    imagesLoaded++;  // increases images by 1
    if (imagesLoaded === totalImages) { //The function onImagesLoaded only executes when all 20 images have been loaded
        onImagesLoaded(); 
    }
}

function resizeCanvas() {
    const sizeFactor = 10; // Number of blocks for the smaller dimension
    const margin = 0.5; // Sicherheitsabstand 

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

const frameRate = 5 // Anzahl der Bewegungen pro Sekunde
const frameInterval = 1000 / frameRate;
let lastFrameTime = 0;

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

function gameLoop(timestamp) {
  
    if (!isGameStarted) {
        // Show the start screen before the game starts
        startScreen.display(ctx, canvas.width, canvas.height);
        return; // Wait for the player to start the game
    }

    if (isPaused) {
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
        rabbit.drawRabbit(ctx);
        rat.drawRat(ctx);
        food.drawFood(ctx);

        // check collision
        if (rabbit.isColliding(snake.segments[0]) || rat.isColliding(snake.segments[0]) || border.isColliding(snake.segments[0]) || snake.isColliding(snake.segments[0]))
             {
            isGameOver = true; // set status
        }
    }

  requestAnimationFrame(gameLoop);
}

function initializeEventListeners() {
    window.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            isGameStarted = true;
            gameLoop();
        } else if (event.key === 'p') {
            isPaused = !isPaused;
            if (!isPaused) {
                lastFrameTime = performance.now();
                requestAnimationFrame(gameLoop);
            }
        }
    });

    window.addEventListener('resize', () => {
        resizeCanvas();
        snake.resize(boardWidth, boardHeight, blockSize);
        food.resize(boardWidth, boardHeight, blockSize);
        rabbit.resize(boardWidth, boardHeight, blockSize);
        rat.resize(boardWidth, boardHeight, blockSize);
        border.resize(boardWidth, boardHeight, blockSize);
        drawBackground();
        snake.drawSnake();
    });
}
initializeEventListeners();

