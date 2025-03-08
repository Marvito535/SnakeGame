class Rabbit {
    constructor(boardWidth, boardHeight, blockSize, rabbitImage, rabbitImageTwo, rabbitImageThree) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.rabbitImage = rabbitImage;
        this.rabbitImageTwo = rabbitImageTwo;
        this.rabbitImageThree = rabbitImageThree;
        this.width =  this.blockSize; 
        this.height = this.blockSize;   // Set height to 1 block
        this.position = this.generatePosition();
    }

    generatePosition() {
        const x = Math.floor(this.boardWidth * 0.2 / this.blockSize) * this.blockSize;
        const y = Math.floor(this.boardHeight * 0.5 / this.blockSize) * this.blockSize;
        return { x, y };
    }

    drawRabbit(ctx) {
        ctx.drawImage(this.rabbitImage, this.position.x, this.position.y, this.blockSize, this.blockSize);
        ctx.drawImage(this.rabbitImageTwo, this.position.x + this.blockSize, this.position.y, this.blockSize, this.blockSize);
        ctx.drawImage(this.rabbitImageThree, this.position.x + 2 * this.blockSize, this.position.y, this.blockSize, this.blockSize);
    }

    isColliding(snakePosition) {
        // Collsion detection for rabbits
        return (
            snakePosition.x >= this.position.x && 
            snakePosition.x < this.position.x + 3 * this.blockSize &&
            snakePosition.y >= this.position.y && 
            snakePosition.y < this.position.y + this.height
        )
    }
    
    getPosition() {
        return this.position;
    }
    
}

export default Rabbit;
