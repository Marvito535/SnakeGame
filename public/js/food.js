import Rabbit from './rabbit.js';
import Rat from './rat.js';

class Food {
    constructor(boardWidth, boardHeight, blockSize, strawberryImage, pointsPerFood = 10, border) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.strawberryImage = strawberryImage;
        this.pointsPerFood = pointsPerFood;
        this.totalPoints = 0;
        this.border = border;
        this.ratInstance = new Rat(); 
        this.rabbitInstance = new Rabbit();  
        this.position = this.generatePosition();
    }

    generatePosition() {
        let position;
        do {
            const x = Math.floor(Math.random() * (this.boardWidth / this.blockSize)) * this.blockSize;
            const y = Math.floor(Math.random() * (this.boardHeight / this.blockSize)) * this.blockSize;
            position = { x, y };
        } while (this.isCollidingWithObstacle(position));
        return position;
    }

    isCollidingWithObstacle(position) {
        const ratPos = this.ratInstance.getPosition(); 
        const rabPos = this.rabbitInstance.getPosition();
    
        // Kollision mit der Ratte (ratInstance)
        if (
            position.x >= ratPos.x &&
            position.x < ratPos.x + this.blockSize &&
            position.y >= ratPos.y &&
            position.y < ratPos.y + 3 * this.blockSize
        ) {
            return true;
        }
    
        // Kollision mit dem Kaninchen (rabbitInstance)
        if (
            position.x >= rabPos.x && 
            position.x < rabPos.x + 3 * this.blockSize &&
            position.y >= rabPos.y && 
            position.y < rabPos.y + this.blockSize
        ) {
            return true;
        }
    
        // Kollision mit Hecken (Spielfeldrand)
        const hedgeHeight = this.blockSize;
        if (position.y < hedgeHeight || position.y >= this.boardHeight - hedgeHeight) {
            return true;
        }
    
        return false;
    }
    

    drawFood(ctx) {
        console.log(`Drawing food at (${this.position.x}, ${this.position.y}) with size ${this.blockSize}`);
        ctx.drawImage(this.strawberryImage, this.position.x, this.position.y, this.blockSize, this.blockSize);
    }

    isEaten(snakePosition) {
        return snakePosition.x === this.position.x && snakePosition.y === this.position.y;
    }

    eatFood() {
        this.totalPoints += this.pointsPerFood;
        console.log(`Food eaten! Total points: ${this.totalPoints}`);
    }

    relocate() {
        this.position = this.generatePosition();
        console.log(`Food relocated to (${this.position.x}, ${this.position.y})`);
    }
}

export default Food;

