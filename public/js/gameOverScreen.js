class GameOverScreen {                                                       //draw backscreen
    display(context, canvasWidth, canvasHeight, totalPoints) {
        // Hintergrund zeichnenS
        context.fillStyle = "black";
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        // "Game Over"-Text
        context.fillStyle = "red";
        context.font = "48px Arial";
        context.textAlign = "center";
        context.fillText("GAME OVER", canvasWidth / 2, canvasHeight / 2 - 50);

        // Punktestand anzeigen
        context.fillStyle = "white";
        context.font = "24px Arial";
        context.fillText(`Your Score: ${totalPoints}`, canvasWidth / 2, canvasHeight / 2);
    }
}

export default GameOverScreen;

