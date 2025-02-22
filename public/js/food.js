class Food {
    constructor(boardWidth, boardHeight, blockSize, strawberryImage, pointsPerFood = 10, border, rat, rabbit) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.strawberryImage = strawberryImage;
        this.pointsPerFood = pointsPerFood;
        this.totalPoints = 0;
        this.border = border;
        this.rat = rat;  // An instance of the Rat class is expected here
        this.rabbit = rabbit;  // An instance of the Rabbit class is expected here
        this.position = this.generatePosition();
    }

    generatePosition() {
        let position;
        do {
            const x = Math.floor(Math.random() * (Math.floor(this.boardWidth / this.blockSize))) * this.blockSize;
            const y = Math.floor(Math.random() * (Math.floor(this.boardHeight / this.blockSize))) * this.blockSize;
            position = { x: x, y: y };
        } while (this.isCollidingWithObstacle(position)); 
        return position;
    }

    isCollidingWithObstacle(position) {
        const hedgeHeight = this.blockSize;
        
        // Check if the food collides with the edges
        if (position.y < hedgeHeight || position.y >= this.boardHeight - hedgeHeight) {
            return true;
        }
    
        // Check if the food collides with the rat, if rat exists
        if (this.rat && this.rat.isColliding(position)) {
            return true;
        }
    
        // Check if the food collides with the rabbit, if rabbit exists
        if (this.rabbit && this.rabbit.isColliding(position)) {
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

