class Tree {
    constructor(boardWidth, boardHeight, blockSize, ratImage,ratImageTwo, ratImageThree) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.position = this.generatePosition();
        this.ratImage = ratImage;
        this.ratImageTwo = ratImageTwo;
        this.ratImageThree = ratImageThree;
        this.height = 3 * this.blockSize; // Set height to 3 blocks
    }

    generatePosition() {
        // Feste Position im oberen rechten Bereich
        const x = this.boardWidth - this.blockSize *5; 
        const y = this.boardHeight - this.blockSize * 9; 
        return { x: x, y: y };
    }

    drawTree(ctx) {

            ctx.drawImage(this.ratImage, this.position.x, this.position.y, this.blockSize, this.blockSize);
            ctx.drawImage(this.ratImageTwo, this.position.x, this.position.y + this.blockSize, this.blockSize, this.blockSize);
            ctx.drawImage(this.ratImageThree, this.position.x, this.position.y + 2*this.blockSize, this.blockSize, this.blockSize);
        }

    isColliding(snakePosition) {
        // Check if snake's head collides with any part of the obstacle
        return (
            snakePosition.y >= this.position.y &&
            snakePosition.y < this.position.y + this.height &&
            snakePosition.x === this.position.x
        );
    }

}

export default Tree;