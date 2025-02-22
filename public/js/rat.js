class Rat {
    constructor(boardWidth, boardHeight, blockSize, ratImage, ratImageTwo, ratImageThree) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.ratImage = ratImage;
        this.ratImageTwo = ratImageTwo;
        this.ratImageThree = ratImageThree;
        this.height = 3 * this.blockSize; // Set height to 3 blocks
        this.width = this.blockSize; // Set width to 1 block
        this.position = this.generatePosition();
    }

    generatePosition() {   
        // Ensure the rat doesn't extend beyond the canvas
        const x = Math.min(this.boardWidth - this.width, this.boardWidth * 0.8);
        const y = Math.min(this.boardHeight - this.height, this.boardHeight * 0.2);
        return { x, y };
    }

    drawRat(ctx) {
        ctx.drawImage(this.ratImage, this.position.x, this.position.y, this.blockSize, this.blockSize);
        ctx.drawImage(this.ratImageTwo, this.position.x, this.position.y + this.blockSize, this.blockSize, this.blockSize);
        ctx.drawImage(this.ratImageThree, this.position.x, this.position.y + 2 * this.blockSize, this.blockSize, this.blockSize);
    }

    isColliding(snakePosition) {
        // Collision detection for all three blocks of the rat
        return (
            (snakePosition.x >= this.position.x && snakePosition.x < this.position.x + this.width &&
             snakePosition.y >= this.position.y && snakePosition.y < this.position.y + this.blockSize) || // Top block
            (snakePosition.x >= this.position.x && snakePosition.x < this.position.x + this.width &&
             snakePosition.y >= this.position.y + this.blockSize && snakePosition.y < this.position.y + 2 * this.blockSize) || // Middle block
            (snakePosition.x >= this.position.x && snakePosition.x < this.position.x + this.width &&
             snakePosition.y >= this.position.y + 2 * this.blockSize && snakePosition.y < this.position.y + 3 * this.blockSize) // Bottom block
        );
    }
}

export default Rat;

