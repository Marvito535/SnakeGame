class Snake {
    constructor() {
        this.segment = [
            { x: 10, y: 10 },
            { x: 10, y: 11 },
            { x: 10, y: 12 }
        ];  
        this.direction = 'UP'; // Initial direction
        this.growing = false;
    }
                                                        
       setDirection(newDirection)  {       // Set the direction of the snake
        const oppositeDirections = {
            'UP' : 'Down',
            'DOWN' : 'UP',
            'LEFT' : 'RIGHT',
            'RIGHT' : 'LEFT'
        };

            if(newDirection !== oppositeDirections[this.direction]) {    // Prevent the snake from reversing
                this.direction = newDirection;
            }
       }                                               

        move() {                                    // Move the snake forward                                              
        const head = { ...this.segment[0] };        // copy of the array
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
           
        this.segment.unshift(head);                       // Add the new element to the front of the array
            if (!this.growing) {
            this.segment.pop();                          //pop() deletes the last element of the arrays.
        }                                      
            this.growing = false;                       // Reset growing status after moving
    };
        checkCollision() {
        const head = this.segment[0];
        for (let i = 1; i < this.segment.length; i++) {                               // Check if the head collides with any other segment
            if (this.segment[i].x === head.x && this.segment[i].y === head.y) {
                return true;
            }
        }

        return false;
    }

    grow() {                                            // Grow the snake 
        this.growing = true;
    }
}

const snake = new Snake();