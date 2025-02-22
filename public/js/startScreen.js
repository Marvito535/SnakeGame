class StartScreen {
    display(context, canvasWidth, canvasHeight) {
        // Background
        context.fillStyle = "black";
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        // Title Text
        context.fillStyle = "green";
        context.font = `${Math.floor(canvasHeight * 0.07)}px Arial`; // Adjust font size based on canvas height
        context.textAlign = "center";
        context.fillText("Welcome to the Game!", canvasWidth / 2, canvasHeight / 2 - canvasHeight * 0.1);

        // Instructions
        context.fillStyle = "white";
        context.font = `${Math.floor(canvasHeight * 0.05)}px Arial`; // Adjust font size based on canvas height
        context.fillText("Press 'Space' to Start", canvasWidth / 2, canvasHeight / 2);

        // Other instructions 
        context.font = `${Math.floor(canvasHeight * 0.04)}px Arial`; // Adjust font size based on canvas height
        context.fillText("Use Arrow keys to control", canvasWidth / 2, canvasHeight / 2 + canvasHeight * 0.1);

        // Music instruction
        context.font = `${Math.floor(canvasHeight * 0.04)}px Arial`; // Adjust font size based on canvas height
        context.fillText("'Click' for music", canvasWidth / 2, canvasHeight / 2 + canvasHeight * 0.2);
    }
}

export default StartScreen;