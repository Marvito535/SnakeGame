class Food {
    constructor(boardWidth, boardHeight, blockSize, strawberryImage, pointsPerFood = 10, border) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.strawberryImage = strawberryImage;
        this.pointsPerFood = pointsPerFood;
        this.totalPoints = 0;
        this.border = border; // Übergabe der Border-Instanz
        this.position = this.generatePosition();
    }

    generatePosition() {
        let position;
        do {
            const x = Math.floor(Math.random() * (Math.floor(this.boardWidth / this.blockSize))) * this.blockSize;
            const y = Math.floor(Math.random() * (Math.floor(this.boardHeight / this.blockSize))) * this.blockSize;
            position = { x: x, y: y };
        } while (this.isCollidingWithObstacle(position)); // Überprüfe Kollision mit Border
        return position;
    }

    isCollidingWithObstacle(position) {
        const hedgeHeight = this.blockSize;

        return position.y < hedgeHeight 
        || position.y >= this.boardHeight - hedgeHeight 
        || position.x == this.boardWidth - this.blockSize *5 && position.y == this.boardHeight - this.blockSize * 9 
        || position.x == this.boardWidth - this.blockSize *20 && position.y == this.boardHeight - this.blockSize * 6; 
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

    resize(newBoardWidth, newBoardHeight, newBlockSize) {
        this.boardWidth = newBoardWidth;
        this.boardHeight = newBoardHeight;
        this.blockSize = newBlockSize;
        this.position = this.generatePosition(); // Position nach Resize neu generieren
    }
}

export default Food;

