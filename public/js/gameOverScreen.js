class GameOverScreen {                                                       //draw backscreen
    display(context, canvasWidth, canvasHeight, totalPoints) {
        // draw backgorund
        context.fillStyle = "black";
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        // "Game Over"-Text
        context.fillStyle = "red";
        context.font = `${Math.floor(canvasHeight * 0.05)}px Arial`; // Adjust font size based on canvas height
        context.textAlign = "center";
        context.fillText("GAME OVER", canvasWidth / 2, canvasHeight / 2 - 50);

        // display points
        context.fillStyle = "white";
        context.font = `${Math.floor(canvasHeight * 0.03)}px Arial`; // Adjust font size based on canvas height
        context.fillText(`Your Score: ${totalPoints}`, canvasWidth / 2, canvasHeight / 2);
    }
}

export default GameOverScreen;

