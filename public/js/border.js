class Border {
    constructor(canvas, blockSize, borderImage, boardWidth, boardHeight) {
        this.canvas = canvas;
        this.blockSize = blockSize;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.borderImage = borderImage;
    }

    draw(ctx) {
        const borderWidth = this.blockSize * 6; // Edge width
        const borderHeight = this.blockSize; // Edge height

        // Top edge
        for (let x = 0; x < this.canvas.width; x += borderWidth) {
            ctx.drawImage(this.borderImage, x, 0, borderWidth, borderHeight);
        }

        // lower edge
        for (let x = 0; x < this.canvas.width; x += borderWidth) {
            ctx.drawImage(this.borderImage, x, this.canvas.height - borderHeight, borderWidth, borderHeight);
        }
    }

    isColliding(snakePosition) {
        const hedgeHeight = this.blockSize;

        // Check wall collision (including hedge)
        if (
            snakePosition.y < hedgeHeight || // top hedge
            snakePosition.y >= this.boardHeight - hedgeHeight // Lower hedge
        ) {
            return true; // Kollision mit der Grenze
        }

        // Wrap-around for the left and right sides
        if (snakePosition.x < 0) {
            snakePosition.x = this.boardWidth - this.blockSize; //Out on the left -> back in on the right
         } 
         else if (snakePosition.x >= this.boardWidth) {
         snakePosition.x = 0; // Out on the right -> back in to the left
     }
    }
}
export default Border;
