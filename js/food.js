class Food {
    constructor(boardWidth, boardHeight, blockSize, strawberryImage, pointsPerFood) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.position = this.generatePosition();
        this.strawberryImage = strawberryImage; 
        this.pointsPerFood = pointsPerFood; 
        this.totalPoints = 0; 
    }

    generatePosition() {
        const x = Math.floor(Math.random() * (Math.floor(this.boardWidth / this.blockSize))) * this.blockSize;
        const y = Math.floor(Math.random() * (Math.floor(this.boardHeight / this.blockSize))) * this.blockSize;
        return { x: x, y: y };
    }

    drawFood(ctx) {
        console.log(`Drawing food at (${this.position.x}, ${this.position.y}) with size ${this.blockSize}`);
        ctx.drawImage(this.strawberryImage, this.position.x, this.position.y, this.blockSize, this.blockSize);
    }

    drawFoodNegative(ctx) {
        console.log(`Drawing food at (${this.position.x}, ${this.position.y}) with size ${this.blockSize}`);
        ctx.drawImage(this.strawberryImage, this.position.x, this.position.y, this.blockSize, this.blockSize);
    }

    isEaten(snakePosition) {
        return snakePosition.x === this.position.x && snakePosition.y === this.position.y;
    }

    eatFood() {
        this.totalPoints += this.pointsPerFood = 10; 
        console.log(`Food eaten! Total points: ${this.totalPoints}`);
    }

    relocate() {
        this.position = this.generatePosition();
        console.log(`Food relocated to (${this.position.x}, ${this.position.y})`);
    }
}

export default Food;
