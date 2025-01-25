class StartScreen {
    display(context, canvasWidth, canvasHeight) {
        // Background
        context.fillStyle = "black";
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        // Title Text
        context.fillStyle = "green";
        context.font = "48px Arial";
        context.textAlign = "center";
        context.fillText("Welcome to the Game!", canvasWidth / 2, canvasHeight / 2 - 50);

        // Instructions
        context.fillStyle = "white";
        context.font = "24px Arial";
        context.fillText("Press 'Space' to Start", canvasWidth / 2, canvasHeight / 2);

        // Other instructions or credits
        context.font = "18px Arial";
        context.fillText("Use Arrow keys to control", canvasWidth / 2, canvasHeight / 2 + 50);
    }
}

export default StartScreen;