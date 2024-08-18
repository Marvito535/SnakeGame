class Snake {
    constructor() {
        this.body = [{ x: 10, y: 10 }];  
        this.direction = { x: 1, y: 0 };  
    }

    update() {                                      // bewegt die Schlange vorwärts
        const head = {
            x: this.body[0].x + this.direction.x,  // this.body gibt das erste Segment der Schlange zurück, das als Kopf fungiert. this.direction gibt die aktuelle Bewegungsrichtung der Schlange an
            y: this.body[0].y + this.direction.y,  
        };
        this.body.unshift(head);                    // unshift() fügt ein neues Element am Anfang eines Arrays hinzu.
        this.body.pop();                            //pop() entfernt das letzte Element eines Arrays.
    }

    draw(ctx) {
        ctx.fillStyle = 'lime';
        this.body.forEach(segment => {             //callback ´function
            ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20); // 20x20 pix at position 20,20
        });
    }
}

const snake = new Snake();
