class Snake {
    constructor(boardWidth, boardHeight, blockSize, ctx, 
                dachshundHeadLeft, dachshundMiddleLeft, dachshundRearLeft,
                dachshundHeadRight, dachshundMiddleRight, dachshundRearRight,
                dachshundHeadUp, dachshundMiddleUp, dachshundRearUp,
                dachshundHeadDown, dachshundMiddleDown, dachshundRearDown,
                dachshundCurveBL, dachshundCurveTL, dachshundCurveBR, dachshundCurveTR ) {

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
        this.isGameOver = false;
        this.ctx = ctx;

        this.dachshundHeadLeft = dachshundHeadLeft; 
        this.dachshundMiddleLeft = dachshundMiddleLeft; 
        this.dachshundRearLeft = dachshundRearLeft; 
        this.dachshundHeadRight = dachshundHeadRight;
        this.dachshundMiddleRight = dachshundMiddleRight;
        this.dachshundRearRight = dachshundRearRight;
        this.dachshundHeadUp = dachshundHeadUp;
        this.dachshundMiddleUp = dachshundMiddleUp;
        this.dachshundRearUp = dachshundRearUp;
        this.dachshundHeadDown = dachshundHeadDown;
        this.dachshundMiddleDown = dachshundMiddleDown;
        this.dachshundRearDown = dachshundRearDown;
        this.dachshundCurveBL = dachshundCurveBL;
        this.dachshundCurveTL = dachshundCurveTL;
        this.dachshundCurveBR = dachshundCurveBR;
        this.dachshundCurveTR = dachshundCurveTR;;
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
    
    checkCollision() {
        const head = this.segments[0];
        for (let i = 1; i < this.segments.length; i++) { 
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
        if (!(image instanceof HTMLImageElement)) {
            console.error('Invalid image:', image);
            return;
        }
    
        this.ctx.drawImage(image, x, y, width, height);
    }

     clearSegment(ctx, segments, index) {
        if (index < 0 || index >= segments.length) {
            console.error('Index out of bounds');
            return;
        }
    
        const segment = segments[index];
        ctx.clearRect(segment.x, segment.y, segment.width, segment.height);
    }

    
    drawSnake() {
        const segmentSize = this.blockSize;
        
        // Kopf zeichnen
        const head = this.segments[0];
        let headImage;
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
        this.drawSegment(headImage, head.x, head.y, segmentSize, segmentSize);

       // draw body 
     console.log('Zeichne Segmente');
for (let i = 1; i < this.segments.length - 1; i++) {
    console.log(`Zeichne Segment ${i}`);
    const currentSegment = this.segments[i];
    const prevSegment = this.segments[i - 1];
    const nextSegment = this.segments[i + 1];

    let middleImage;

    if (i === 2) {
        // Spezielle Bedingung für das zweite Segment
        switch (nextSegment.direction) {
            case 'RIGHT':
                middleImage = this.dachshundMiddleRight;
                break;
            case 'LEFT':
                middleImage = this.dachshundMiddleLeft;
                break;
            case 'UP':
                middleImage = this.dachshundMiddleUp;
                break;
            case 'DOWN':
                middleImage = this.dachshundMiddleDown;
                break;
        }
    } else if (prevSegment.direction === nextSegment.direction) {
        // Gerade Segmente
        switch (prevSegment.direction) {
            case 'RIGHT':
                middleImage = this.dachshundMiddleRight;
                break;
            case 'LEFT':
                middleImage = this.dachshundMiddleLeft;
                break;
            case 'UP':
                middleImage = this.dachshundMiddleUp;
                break;
            case 'DOWN':
                middleImage = this.dachshundMiddleDown;
                break;
        }
    } else {
        // Kurven Segmente
        middleImage = this.getCurveImage(prevSegment.direction, nextSegment.direction);
    }

    this.drawSegment(middleImage, currentSegment.x, currentSegment.y, segmentSize, segmentSize);
}


        // Schwanzsegment zeichnen
        if (this.segments.length > 1) {
            const rearSegment = this.segments[this.segments.length - 1];
            const prevSegmentRear = this.segments[this.segments.length - 2];
            let rearImage;

            switch (prevSegmentRear.direction) {
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
    }

    getCurveImage(prevDirection, nextDirection) {
        if ((prevDirection === 'RIGHT' && nextDirection === 'UP') || 
            (prevDirection === 'UP' && nextDirection === 'RIGHT')) {
            return this.dachshundCurveTL;
        }
        if ((prevDirection === 'RIGHT' && nextDirection === 'DOWN') || 
            (prevDirection === 'DOWN' && nextDirection === 'RIGHT')) {
            return this.dachshundCurveTL;
        }
        if ((prevDirection === 'LEFT' && nextDirection === 'UP') || 
            (prevDirection === 'UP' && nextDirection === 'LEFT')) {
            return this.dachshundCurveTL;
        }
        if ((prevDirection === 'LEFT' && nextDirection === 'DOWN') || 
            (prevDirection === 'DOWN' && nextDirection === 'LEFT')) {
            return this.dachshundCurveTL;
        }
        return this.dachshundMiddleRight; // Default to straight if no curve
    }
    

    gameOver() {
        alert("Game Over!"); 
        this.isGameOver = true; 
    }
}

export default Snake;



