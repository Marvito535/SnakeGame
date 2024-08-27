
class Snake {
    constructor(boardWidth, boardHeight, blockSize,ctx,dachshundHead, dachshundMiddle,dachshundRear ) {

        const startX = Math.floor(boardWidth / (2 * blockSize)) * blockSize;
        const startY = Math.floor(boardHeight / (2 * blockSize)) * blockSize;

        this.segments = [
        { x: startX, y: startY },
        { x: startX - blockSize, y: startY },
        { x: startX - 2 * blockSize, y: startY }
    ];
        this.direction = 'UP'; // Initial direction
        this.growing = false;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.isGameOver = false;
        this.ctx = ctx;

        this.dachshundHead = dachshundHead; 
        this.dachshundMiddle = dachshundMiddle; 
        this.dachshundRear = dachshundRear; 
    }
    setDirection(newDirection) {
        switch (newDirection) {
            case 'UP':
                if (this.direction !== 'DOWN') {
                    this.direction = 'UP';
                }
                break;
            case 'DOWN':
                if (this.direction !== 'UP') {
                    this.direction = 'DOWN';
                }
                break;
            case 'LEFT':
                if (this.direction !== 'RIGHT') {
                    this.direction = 'LEFT';
                }
                break;
            case 'RIGHT':
                if (this.direction !== 'LEFT') {
                    this.direction = 'RIGHT';
                }     break;
        }
    }                                      
                                                

    move() {
        const head = { ...this.segments[0] };
        switch (this.direction) {
            case 'UP':
                head.y -= this.blockSize;
                break;
            case 'DOWN':
                head.y += this.blockSize;
                break;
            case 'LEFT':
                head.x -= this.blockSize;
                break;
            case 'RIGHT':
                head.x += this.blockSize;
                break;
        }
    
        this.segments.unshift(head); // Add the new head to the front of the array
        if (!this.growing) {
            this.segments.pop(); // Remove the last segment of the snake
        }
            this.growing = false; // Reset growing status after moving
    }
    
        checkCollision() {
        const head = this.segments[0];
        for (let i = 1; i < this.segments.length; i++) {                               // Check if the head collides with any other segment
            if (this.segments[i].x === head.x && this.segments[i].y === head.y) {
                this.gameOver();
                return true;
            }
        }

        if (head.x < 0 || head.y < 0 || head.x >= this.boardWidth || head.y >= this.boardHeight) {
            this.gameOver();
            return true;
        }

        return false;
    }

    grow() {  
        this.growing = true;                                         
    }

     drawSegment(image, x, y, width, height) {
        this.ctx.drawImage(image, x, y, width, height);
    }
    
    drawSnake() {
        const segmentSize = this.blockSize;
        this.drawSegment (this.dachshundHead, this.segments[0].x, this.segments[0].y, segmentSize, segmentSize);

        for (let i = 1; i < this.segments.length - 1; i++) {
            this.drawSegment(this.dachshundMiddle, this.segments[i].x,this.segments[i].y, segmentSize, segmentSize);
        }

        this.drawSegment(this.dachshundRear, this.segments[this.segments.length - 1].x, this.segments[this.segments.length - 1].y, segmentSize, segmentSize);
    }

    gameOver() {
        alert("Game Over!"); 
        this.isGameOver = true; 
    }
}
export default Snake;