class Rabbit {
    constructor(boardWidth, boardHeight, blockSize, rabbitImage, rabbitImageTwo, rabbitImageThree) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.position = this.generatePosition();
        this.rabbitImage = rabbitImage;
        this.rabbitImageTwo = rabbitImageTwo;
        this.rabbitImageThree = rabbitImageThree;
        this.width = 3 * this.blockSize; // Set width to 3 blocks
    }

    generatePosition() {
        const x = this.boardWidth - this.blockSize *20; 
        const y = this.boardHeight - this.blockSize * 6; 
        return { x: x, y: y };
    }

    drawRabbit(ctx) {
        
            ctx.drawImage(this.rabbitImage, this.position.x, this.position.y, this.blockSize, this.blockSize);
            ctx.drawImage(this.rabbitImageTwo, this.position.x + 1 * this.blockSize, this.position.y, this.blockSize, this.blockSize);
            ctx.drawImage(this.rabbitImageThree, this.position.x + 2 * this.blockSize, this.position.y, this.blockSize, this.blockSize);
        }

    isColliding(snakePosition) {
        // Check if snake's head collides with any part of the obstacle
        return (
            snakePosition.x >= this.position.x &&
            snakePosition.x < this.position.x + this.width &&
            snakePosition.y === this.position.y
        );
    }

    resize(boardWidth, boardHeight, blockSize) {
        this.boardWidth = boardWidth;  // Neues Board-Breite
        this.boardHeight = boardHeight;  // Neues Board-Höhe
        this.blockSize = blockSize;  // Neue Blockgröße
    }

}

export default Rabbit;