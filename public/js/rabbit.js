class Rabbit {
    constructor(boardWidth, boardHeight, blockSize, rabbitImage, rabbitImageTwo, rabbitImageThree) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.rabbitImage = rabbitImage;
        this.rabbitImageTwo = rabbitImageTwo;
        this.rabbitImageThree = rabbitImageThree;
        this.width = 3 * this.blockSize; // Set width to 3 blocks
        this.height = this.blockSize;   // Set height to 1 block
        this.position = this.generatePosition();
    }

    generatePosition() {   
        // Ensure the rabbit doesn't extend beyond the canvas
        const x = Math.min(this.boardWidth - this.width, this.boardWidth * 0.2);
        const y = Math.min(this.boardHeight - this.height, this.boardHeight * 0.5);
        return { x, y };
    }

    drawRabbit(ctx) {
        ctx.drawImage(this.rabbitImage, this.position.x, this.position.y, this.blockSize, this.blockSize);
        ctx.drawImage(this.rabbitImageTwo, this.position.x + this.blockSize, this.position.y, this.blockSize, this.blockSize);
        ctx.drawImage(this.rabbitImageThree, this.position.x + 2 * this.blockSize, this.position.y, this.blockSize, this.blockSize);
    }

    isColliding(snakePosition) {
        // Collision detection for all three blocks of the rabbit
        return (
            // Collision check for the first block (left block)
            (snakePosition.x >= this.position.x && snakePosition.x < this.position.x + this.blockSize &&
             snakePosition.y >= this.position.y && snakePosition.y < this.position.y + this.height) || 
            
            // Collision check for the second block (middle block)
            (snakePosition.x >= this.position.x + this.blockSize && snakePosition.x < this.position.x + 2 * this.blockSize &&
             snakePosition.y >= this.position.y && snakePosition.y < this.position.y + this.height) || 
            
            // Collision check for the third block (right block)
            (snakePosition.x >= this.position.x + 2 * this.blockSize && snakePosition.x < this.position.x + 3 * this.blockSize &&
             snakePosition.y >= this.position.y && snakePosition.y < this.position.y + this.height)
        );
    }
    
}

export default Rabbit;
