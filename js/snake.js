class Snake {
    constructor(boardWidth, boardHeight, blockSize, ctx, 
                dachshundHeadLeft, dachshundRearLeft,
                dachshundHeadRight, dachshundRearRight,
                dachshundHeadUp, dachshundRearUp,
                dachshundHeadDown, dachshundRearDown, dachshundBody, winkel, dachshundMouthOpen, border) 
                {

        const startX = Math.floor(boardWidth / (2 * blockSize)) * blockSize;
        const startY = Math.floor(boardHeight / (2 * blockSize)) * blockSize;    

        this.segments = [
            { x: startX, y: startY, direction: 'RIGHT' }, // Head with direction
            { x: startX - blockSize, y: startY, direction: 'RIGHT' },
            { x: startX - 2 * blockSize, y: startY, direction: 'RIGHT' }
        ];

        this.growing = false;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.blockSize = blockSize;
        this.ctx = ctx;
        this.border = border;

        this.dachshundHeadLeft = dachshundHeadLeft; 
        this.dachshundHeadDown = dachshundHeadDown;
        this.dachshundHeadRight = dachshundHeadRight;
        this.dachshundHeadUp = dachshundHeadUp;
 
        this.dachshundRearLeft = dachshundRearLeft; 
        this.dachshundRearUp = dachshundRearUp;
        this.dachshundRearRight = dachshundRearRight;
        this.dachshundRearDown = dachshundRearDown;

        this.dachshundBody = dachshundBody;
        this.winkel = winkel;

        this.dachshundMouthOpen = dachshundMouthOpen;
      
    }

    setDirection(newDirection) {
        const oppositeDirections = {
            'UP': 'DOWN',
            'DOWN': 'UP',
            'LEFT': 'RIGHT',
            'RIGHT': 'LEFT'
        };

        if (newDirection !== oppositeDirections[this.segments[0].direction]) {
            this.segments[0].direction = newDirection;
        }
    }

    move() {
        const newHead = { ...this.segments[0] };

        // Move head in the current direction
        switch (newHead.direction) {
            case 'UP':
                newHead.y -= this.blockSize;
                break;
            case 'DOWN':
                newHead.y += this.blockSize;
                break;
            case 'LEFT':
                newHead.x -= this.blockSize;
                break;
            case 'RIGHT':
                newHead.x += this.blockSize;
                break;
        }

        // Log the current direction of the head
         console.log(`Current direction head: ${newHead.direction}`);

        this.segments.unshift(newHead);

        if (!this.growing) {
            this.segments.pop();
        }
        this.growing = false;

        console.log(`Current direction body: ${this.segments[this.segments.length -1].direction}`);
    }
    
    isColliding() {
        const head = this.segments[0]; // Kopf der Schlange
    
        // Überprüfe Selbstkollision
        for (let i = 1; i < this.segments.length; i++) {
            if (this.segments[i].x === head.x && this.segments[i].y === head.y) {
                return true;
            }
        }

        return false; // Keine Kollision
    }

    grow() {  
        this.growing = true;                                         
    }
    drawSegment(image, x, y, width, height, rotationAngle = 0, flipHorizontally = false, flipVertically = false) {
        if (!(image instanceof HTMLImageElement)) {
            console.error('Invalid image:', image);
            return;
        }
    
        this.ctx.save(); // Save the current state of the canvas context
        this.ctx.translate(x + width / 2, y + height / 2); // Move the context to the point where the image will be drawn

        // Apply rotation if necessary
        if (rotationAngle) {
            this.ctx.rotate(rotationAngle * Math.PI / 180);
        }
        
        // Apply flipping if necessary
        if (flipHorizontally) {
            this.ctx.scale(-1, 1); // Flip horizontally
        }
        if (flipVertically) {
            this.ctx.scale(1, -1); // Flip vertically
        }

        // Draw the image with the appropriate transformations
        this.ctx.drawImage(image, -width / 2, -height / 2, width, height); 

        this.ctx.restore(); // Restore the previous context state
    }
    
    drawSnake(isEating) {
        const segmentSize = this.blockSize;
    
        // Draw head
        const head = this.segments[0];
        let headImage;
        let flipVertically = false;
        let flipHorizontally = false;
        let headRotation = 0;

        if (isEating && head.direction === 'LEFT') {
            headImage = this.dachshundMouthOpen;
        } else if (isEating && head.direction === 'RIGHT') {
            headImage = this.dachshundMouthOpen;
            flipHorizontally = true;
        } else {
             
        switch (head.direction) {
            case 'RIGHT':
                headImage = this.dachshundHeadRight;
                break;
            case 'LEFT':
                headImage = this.dachshundHeadLeft;
                break;
            case 'UP':
                headImage = this.dachshundHeadUp;
                break;
            case 'DOWN':
                headImage = this.dachshundHeadDown;
                break;
        }
    }
        this.drawSegment(headImage, head.x, head.y, segmentSize, segmentSize, headRotation, flipHorizontally, flipVertically);
    
        // Draw rear
        if (this.segments.length > 1) {
            const rearSegment = this.segments[this.segments.length - 1];
            let rearImage;
            switch (rearSegment.direction) {
                case 'RIGHT':
                    rearImage = this.dachshundRearRight;
                    break;
                case 'LEFT':
                    rearImage = this.dachshundRearLeft;
                    break;
                case 'UP':
                    rearImage = this.dachshundRearUp;
                    break;
                case 'DOWN':
                    rearImage = this.dachshundRearDown;
                    break;
            }
            this.drawSegment(rearImage, rearSegment.x, rearSegment.y, segmentSize, segmentSize);
        }

        for (let i = 1; i < this.segments.length - 1; i++) {
            let currentSegment = this.segments[i];
            let nextSegment = this.segments[i + 1];
        
            // Check for a turn/corner
            let segmentImage = this.dachshundBody; // Default to straight body segment
            let bodyRotation = 0;
            let flipVertically = false;
            let flipHorizontally = false;

        
            if (
                (currentSegment.direction === 'LEFT' && nextSegment.direction === 'DOWN') ||
                (currentSegment.direction === 'UP' && nextSegment.direction === 'RIGHT')
            ) {
                segmentImage = this.winkel;
                flipHorizontally = true;
            } else if (
                (currentSegment.direction === 'RIGHT' && nextSegment.direction === 'DOWN') ||
                (currentSegment.direction === 'UP' && nextSegment.direction === 'LEFT')
            ) {
                segmentImage = this.winkel;

            } else if (
                (currentSegment.direction === 'LEFT' && nextSegment.direction === 'UP') ||
                (currentSegment.direction === 'DOWN' && nextSegment.direction === 'RIGHT')
            ) {
                segmentImage = this.winkel;
                bodyRotation = 180; 
            } else if (
                (currentSegment.direction === 'DOWN' && nextSegment.direction === 'LEFT') ||
                (currentSegment.direction === 'RIGHT' && nextSegment.direction === 'UP')
            ) { 
                segmentImage = this.winkel;
                flipVertically = true;
        
            }  else if (currentSegment.direction === 'RIGHT' || currentSegment.direction === 'LEFT')
                { segmentImage = this.dachshundBody;
                bodyRotation = 90; 
            }

                
            this.drawSegment(segmentImage, currentSegment.x, currentSegment.y, segmentSize, segmentSize, bodyRotation, flipHorizontally, flipVertically);
        }
            
    }
}

export default Snake;


