class Rat {
    constructor(boardWidth, boardHeight, blockSize, ratImage, ratImageTwo, ratImageThree) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.ratImage = ratImage;
        this.ratImageTwo = ratImageTwo;
        this.ratImageThree = ratImageThree;
        this.height =this.blockSize; 
        this.width = this.blockSize; // Set width to 1 block
        this.position = this.generatePosition();
    }

    generatePosition() {
        const x = Math.floor(this.boardWidth * 0.8 / this.blockSize) * this.blockSize;
        const y = Math.floor(this.boardHeight * 0.2 / this.blockSize) * this.blockSize;
        return { x, y };
    }

    drawRat(ctx) {
        ctx.drawImage(this.ratImage, this.position.x, this.position.y, this.blockSize, this.blockSize);
        ctx.drawImage(this.ratImageTwo, this.position.x, this.position.y + this.blockSize, this.blockSize, this.blockSize);
        ctx.drawImage(this.ratImageThree, this.position.x, this.position.y + 2 * this.blockSize, this.blockSize, this.blockSize);
    }

    isColliding(snakePosition) {
        // collision detection for rat
        return (
            snakePosition.x >= this.position.x && 
            snakePosition.x < this.position.x + this.width &&
            snakePosition.y >= this.position.y && 
            snakePosition.y < this.position.y + 3 * this.blockSize
        )
    }

    getPosition() {
        return this.position;
    }
}

export default Rat;

