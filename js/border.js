class Border {
    constructor(canvas, blockSize, borderImage, boardWidth, boardHeight) {
        this.canvas = canvas;
        this.blockSize = blockSize;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.borderImage = borderImage;
    }

    draw(ctx) {
        const borderWidth = this.blockSize * 6; // Randbreite
        const borderHeight = this.blockSize; // Randhöhe

        // Obere Kante
        for (let x = 0; x < this.canvas.width; x += borderWidth) {
            ctx.drawImage(this.borderImage, x, 0, borderWidth, borderHeight);
        }

        // Untere Kante
        for (let x = 0; x < this.canvas.width; x += borderWidth) {
            ctx.drawImage(this.borderImage, x, this.canvas.height - borderHeight, borderWidth, borderHeight);
        }
    }

    isColliding(snakePosition) {
        const hedgeHeight = this.blockSize;

        // Überprüfe Wandkollision (inklusive Hecke)
        if (
            snakePosition.y < hedgeHeight || // Obere Hecke
            snakePosition.y >= this.boardHeight - hedgeHeight // Untere Hecke
        ) {
            return true; // Kollision mit der Grenze
        }

        // Wrap-Around für die linke und rechte Seite
        if (snakePosition.x < 0) {
            snakePosition.x = this.boardWidth - this.blockSize; // Links raus -> Rechts wieder rein
         } 
         else if (snakePosition.x >= this.boardWidth) {
         snakePosition.x = 0; // Rechts raus -> Links wieder rein
     }
    }

    resize(newBlockSize) {
        this.blockSize = newBlockSize;
    }
}
export default Border;
