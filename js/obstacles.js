class Obstacles {
    constructor(boardWidth, boardHeight, blockSize, obstacleImage) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.position = this.generatePosition();
        this.obstacleImage = obstacleImage; // Save the obstacle image
        this.width = 3 * this.blockSize; // Set width to 3 blocks
        this.height = this.blockSize; // Height remains 1 block
    }

    generatePosition() {
        const x = this.boardWidth - this.blockSize *20; 
        const y = this.boardHeight - this.blockSize * 6; 
        return { x: x, y: y };
    }

    drawObstacle(ctx) {
        console.log(`Drawing obstacle at (${this.position.x}, ${this.position.y}) with size ${this.width}x${this.height}`);
        
        // Zeichne das Bild 3-mal nebeneinander
        for (let i = 0; i < 3; i++) {
            ctx.drawImage(this.obstacleImage, this.position.x + i * this.blockSize, this.position.y, this.blockSize, this.height);
        }
    }

    isColliding(snakePosition) {
        // Check if snake's head collides with any part of the obstacle
        return (
            snakePosition.x >= this.position.x &&
            snakePosition.x < this.position.x + this.width &&
            snakePosition.y === this.position.y
        );
    }

}

export default Obstacles;