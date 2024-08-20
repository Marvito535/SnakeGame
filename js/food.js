class Food {
    constructor(boardWidth, boardHeight, blockSize) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.position = this.generatePosition();
    }

    generatePosition() {                                                                                //generate random position for food
        const x = Math.floor(Math.random() * (this.boardWidth / this.blockSize)) * this.blockSize;
        const y = Math.floor(Math.random() * (this.boardHeight / this.blockSize)) * this.blockSize;
        return { x: x, y: y };
    }

    draw(ctx) {                                                                                         //draw food on canvas
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.blockSize, this.blockSize);
    }

    isEaten(snakePosition) {                                                                            //eating check 
        return snakePosition.x === this.position.x && snakePosition.y === this.position.y;
    }

    relocate() {
    this.position = this.generatePosition();
    }
}

export default Food;
