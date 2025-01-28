// import other classes to access them
import Food from './food.js';
import Snake from './snake.js';
import Rabbit from './rabbit.js';
import Rat from './rat.js';
import GameOverScreen from './gameOverScreen.js';
import StartScreen from './startScreen.js';
import Border from './border.js';
import HighscoreManager from './highscoreManager.js';
import HighscoreScreen from './highscoreScreen.js';

const canvas = document.getElementById('gameCanvas'); // find id using the DOM model, assign gameCanvas(canvas from .html) to a variable canvas
const ctx = canvas.getContext('2d'); // request 2d context, declare this as variable ctx
let boardWidth, boardHeight, blockSize, snake, border, food, rabbit, rat, gameOverScreen, startScreen, playerName, highscores = []; // declare variables

let imagesLoaded = 0; //declare variable and assign value
const totalImages = 20; //declare constant variable and assign value

let isEating = false; // Boolean to check if the dog eats food (for mouth animation)
let isGameStarted = false; // Boolean to check if the game has started
let isGameOver = false; // Boolean for Game Over
let isPaused = false; // Boolean to check if the game is paused

/* Here images are declared and assigned to a variable. The images are stored in the assets folder.
 The .onload event ensures that an image is completely loaded before further code is executed. 
 This is assigned to the function checkAllImagesLoaded.*/
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

const highscoreManager = new HighscoreManager('http://localhost:3000');
const highscoreScreen = new HighscoreScreen();
const backgroundMusic = new Audio('./assets/sounds/soft-guitar.mp3');

function onImagesLoaded() { // This function will only be executed if all 20 images are loaded
    resizeCanvas(); // executes function 

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
    

    document.addEventListener('keydown', handleKeyDown); // keydown event is registered 
    requestAnimationFrame(gameLoop); // start the loop(frame update), is needed at this point to display the start screen
}

function checkAllImagesLoaded() {
    imagesLoaded++;  // increases images by 1
    if (imagesLoaded === totalImages) { //The function onImagesLoaded only executes when all 20 images have been loaded
        onImagesLoaded(); 
    }
}

function resizeCanvas() { //Adjust playing field to screen size
    const sizeFactor = 10; // Number of blocks for the smaller dimension
    const margin = 2; // Subtract a small margin from the block size 

   
    canvas.width = window.innerWidth; //set the width and height of the canvas to the current size of the browser window 
    canvas.height = window.innerHeight;

    // the size of a single block
    blockSize = Math.floor(Math.min(canvas.width, canvas.height) / sizeFactor) - margin; //the playing field remains square

    // Recalculated width and height of the playing field in blocks
    boardWidth = Math.floor(canvas.width / blockSize) * blockSize; //Calculates how many whole blocks fit in the width/height of the canvas.
    boardHeight = Math.floor(canvas.height / blockSize) * blockSize;

    // Clean current canvas with border
    canvas.width = boardWidth;
    canvas.height = boardHeight;
}

function handleKeyDown(event) { //Assign a direction to arrow keys
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
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas, prevents flickering in the game
    const pattern = ctx.createPattern(backgroundImage, 'repeat'); //the image is repeated
    ctx.fillStyle = pattern; //the pattern is used as a fill color
    ctx.fillRect(0, 0, canvas.width, canvas.height); //draw rectangles starting at o,o
}

function drawScore() {
    ctx.font = `${blockSize/2}px Arial`; //Font size based on block size
    ctx.fillStyle = 'red'; 
    ctx.textAlign = 'left'; 
    const scoreText = `Points: ${food.totalPoints}`;
    ctx.fillText(scoreText, blockSize, blockSize / 1.5); //Draw points at the top left
}

const frameRate = 5 // Number of movements per second
const frameInterval = 1000 / frameRate; //This calculates the time interval between two consecutive frames in milliseconds.
let lastFrameTime = 0; //This determines whether enough time has passed since the last frame to render the next frame.

backgroundMusic.loop = true; // repeat the music
backgroundMusic.volume = 1; // volume
backgroundMusic.play(); // start music

function gameLoop(timestamp) {
  
    if (!isGameStarted) {
        // Show the start screen before the game starts
        startScreen.display(ctx, canvas.width, canvas.height);
        return; // Wait for the player to start the game
    }

    if (isPaused) {
        return; // Wait for the player to continue the game
    }
    if (isGameOver) {
        if (!gameOverScreen.shown) {
            gameOverScreen.shown = true;
            gameOverScreen.display(ctx, canvas.width, canvas.height, food.totalPoints); // Zeige den Game-Over-Bildschirm an
    
            // Verzögere die Anzeige des Prompts
            setTimeout(() => {
                const playerName = prompt("Enter your name:"); // Warte auf die Eingabe des Namens
    
                if (playerName) {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Lösche den Canvas erst nach der Eingabe
                document.getElementById('highscore-screen').style.display = 'flex';
                highscoreManager.saveHighscore(playerName, food.totalPoints);
                highscoreScreen.displayHighscores(highscores); // Überprüfe, ob der Spieler tatsächlich einen Namen eingegeben hat
                }
            }, 100); // Warte 100ms, damit der Game-Over-Bildschirm sichtbar ist
        }
        return;
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

    document.addEventListener('click', () => {
        backgroundMusic.play().catch(error => {
            console.error('Audio konnte nicht abgespielt werden:', error);
        });
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

