class Food {
    constructor() {
        this.position = this.randomPosition();
    }

    randomPosition() {
        return {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x * 20, this.position.y * 20, 20, 20);
    }
}

const food = new Food();
