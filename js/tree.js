class Tree {
    constructor(boardWidth, boardHeight, blockSize, treeImage) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.position = this.generatePosition();
        this.treeImage = treeImage; // Save the obstacle image
        this.width = this.blockSize; // Width remains 1 block
        this.height = 3 * this.blockSize; // Set height to 3 blocks
    }

    generatePosition() {
        const x = Math.floor(Math.random() * (Math.floor(this.boardWidth / this.blockSize) - 3)) * this.blockSize; // Ensure space for 3 blocks
        const y = Math.floor(Math.random() * (Math.floor(this.boardHeight / this.blockSize))) * this.blockSize;
        return { x: x, y: y };
    }

    drawTree(ctx) {
        console.log(`Drawing tree at (${this.position.x}, ${this.position.y}) with size ${this.width}x${this.height}`);
        
        // Zeichne das Bild 3-mal nebeneinander
        for (let i = 0; i < 3; i++) {
            ctx.drawImage(this.treeImage, this.position.x, this.position.y + i * this.blockSize, this.blockSize, this.width);
        }
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