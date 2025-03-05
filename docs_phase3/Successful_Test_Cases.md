# Successful Test Cases

## Test Case 1: Image Loading
**Description: Check if all images are loaded correctly.

**Expected Result:**
- All 20 images should be loaded without errors.

**Result:**
```
Images loaded: 0 from 20
game.js:134 Images loaded: 1 from 20
game.js:134 Images loaded: 2 from 20
...
game.js:134 Images loaded: 19 from 20
game.js:137 All images loaded!

```
✅ Test passed: All images were successfully loaded.

---

## Test Case 2: Collision Detection
**Description: Check if a collision with the wall or other objects is correctly detected.

**Expected Result:**
- The game should detect a collision with the wall or an object and end the game.

**Result:**
```
Current direction head: RIGHT
snake.js:84 Current direction body: UP
food.js:47 Drawing food at (134, 469) with size 67
game.js:266 Collision with wall: undefined
game.js:267 Collision with rabbit: false
game.js:268 Collision with rat: true
game.js:272 The game is over! Collision detected.

```
✅ Test passed: The collision with the object was detected and the game ended correctly.
```
## Test Case 3: Snake Movement
**Description: Check if the snake moves in the correct direction without errors or unexpected positions.

**Expected Result:**
- The snake should move correctly in the specified direction.

**Result:**
```
snake.js:75 Current direction head: RIGHT
snake.js:84 Current direction body: RIGHT
food.js:47 Drawing food at (1273, 268) with size 67
game.js:259 New position after movement: X=804, Y=335
game.js:247 Initial position of the dog: X=804, Y=335
snake.js:75 Current direction head: RIGHT
snake.js:84 Current direction body: RIGHT
food.js:47 Drawing food at (1273, 268) with size 67
game.js:259 New position after movement: X=871, Y=335
game.js:247 Initial position of the dog: X=871, Y=335
snake.js:75 Current direction head: RIGHT
snake.js:84 Current direction body: RIGHT
food.js:47 Drawing food at (1273, 268) with size 67
game.js:259 New position after movement: X=938, Y=335

```
✅ Test passed: The snake moves correctly in the specified direction.

```

## Test Case 4: Pausing and Resuming the Game
**Description: Check if the game pauses and resumes correctly.

**Expected Result:**
- The game should pause correctly when stopped, and resume when the player resumes it.

**Result:**
Current direction body: RIGHT
food.js:47 Drawing food at (603, 469) with size 67
game.js:265 New position after movement: X=670, Y=335
game.js:215 Game continued: true
game.js:305 Game is paused: true
game.js:305 Game is paused: false
game.js:215 Game continued: true
game.js:253 Initial position of the dog: X=670, Y=335
snake.js:75 Current direction head: RIGHT
snake.js:84 Current direction body: RIGHT
food.js:47 Drawing food at (603, 469) with size 67

```
✅ Test passed: The game was correctly paused and resumed.

---

## Test Case 5: Check if the Game Starts When the Spacebar is Pressed  
**Description: Check if the game starts correctly when the spacebar is pressed. 

**Expected Result:**  
-- The game should start when the spacebar is pressed. 

**Result:**  
game.js:303 Game started before Keydown: false
game.js:303 Game started after Keydown: true

```
✅ Test passed: Check if the canvas is correctly resized when the window size changes.

---
## Test Case 6: Check Canvas Size After Window Resize
**Description: Check if the canvas is correctly resized when the window size changes.

**Expected Result:**  
- The canvas should be correctly adjusted to the new window size.

**Ergebnis:**
game.js:316 Canvas Size after Resize: 230x598
game.js:316 Canvas Size after Resize: 240x576
game.js:316 Canvas Size after Resize: 264x576
game.js:316 Canvas Size after Resize: 250x575
game.js:316 Canvas Size after Resize: 286x598
game.js:316 Canvas Size after Resize: 270x594
game.js:316 Canvas Size after Resize: 297x594
game.js:316 Canvas Size after Resize: 280x588

```
✅ Test passed: The canvas was correctly resized after each window size change. 
```
