class Snake {
    constructor() {
        this.segments = [
            { x: 20, y: 20 },
            { x: 20, y: 21 },
            { x: 20, y: 22 }
        ];
        this.direction = 'UP'; // Initial direction
        this.growing = false;
        this.segmentSize = 20;
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
                                                

        move() {                                    // Move the snake forward                                              
        const head = { ...this.segments[0] };        // copy of the array
        switch (this.direction) {                   // Determine the new head position based on the direction
            case 'UP':
                head.y -= 1;
                break;
            case 'DOWN':
                head.y += 1;
                break;
            case 'LEFT':
                head.x -= 1;
                break;
            case 'RIGHT':
                head.x += 1;
                break; 
        }
           
        this.segments.unshift(head);                       // Add the new element to the front of the array
            if (!this.growing) {
            this.segments.pop();                          //pop() deletes the last element of the arrays.
        }                                      
            this.growing = false;                       // Reset growing status after moving
    };
        checkCollision() {
        const head = this.segments[0];
        for (let i = 1; i < this.segments.length; i++) {                               // Check if the head collides with any other segment
            if (this.segments[i].x === head.x && this.segments[i].y === head.y) {
                return true;
            }
        }

        return false;
    }

    grow() {                                            // Grow the snake 
        this.growing = true;
    }

    
    drawSnake(ctx) {
        let segmentSize = this.segmentSize;
        for (let i = 0; i < this.segments.length; i++) {
            let segment = this.segments[i];
            ctx.fillStyle = 'green'; 
            ctx.fillRect(segment.x * segmentSize, segment.y * segmentSize, segmentSize, segmentSize); 
    }

}

}
export default Snake;