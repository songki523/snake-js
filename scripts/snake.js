//Creating a canvas and event listener refresh game frames
window.onload=function() {
    canvas = document.getElementById("game-console");
    context = canvas.getContext("2d");
    initializeContext(context, canvas);
    document.addEventListener("keydown",keyPush);
    setInterval(game,1000/10);
}

//
//  Initial Properties
//

let scoreBoard = {
    snakeLenght : 5,
    applesEaten : 0,
    isGameOver : false
}

let snake = {
    "color" : "lime",
    "xPosition" : 10,
    "yPosition" : 10,
    "trail" : [],
    "tail" : 5,
    "run" : function(velocity){
        this.xPosition += velocity.x;
        this.yPosition += velocity.y;
    },
    "update" : function(){
        this.trail.push({"x":this.xPosition, "y":this.yPosition});
        if (this.trail.length > this.tail) {
            this.trail.shift();
        }
    }
}

let apple = {
    "color" : "red",
    "xPosition" : 15,
    "yPosition" : 15
}

let velocity = {
    "x" : 0,
    "y" : 0
}

// Decides Size of the Subject
let subjectSize = 20; 
// Decides number of snake blocks can travel
let playgroundSize = 20;

//Initiallize Canvas
function initializeContext(context, canvas) {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

//Initialize Apple
function initializeApple (context) {
    context.fillStyle = "red";
    context.fillRect(apple.xPosition * subjectSize ,apple.yPosition * subjectSize, subjectSize - 2, subjectSize -2 );
}

//Rerender snake object
function renderObject (context, arrObject){
    context.fillStyle = "lime";
    context.fillRect(arrObject.x * subjectSize, arrObject.y * subjectSize , subjectSize - 2, subjectSize - 2);
}
//Game Resets when snake touches it's body
function checkGameStatus (arrObject){
    if (arrObject.x == snake.xPosition && arrObject.y == snake.yPosition) {
      snake.tail = 5;
      snake.trail = [];
      scoreBoard.applesEaten = 0;
      scoreBoard.isGameOver = true;
    }
}

//Check if the snake has eaten an apple
function hasSnakeEatenApple (){
    return (snake.xPosition == apple.xPosition && snake.yPosition == apple.yPosition);    
}

//Repopulate new apple
function makeNewApple(){
    const newAppleX = Math.floor(Math.random()*playgroundSize);
    const newAppleY = Math.floor(Math.random()*playgroundSize);
    apple.xPosition = newAppleX;
    apple.yPosition = newAppleY;
}

//Loads Scores on the game board
function loadScoreBoard() {
    const snakeLenght = document.getElementById("snake-length");
    const applesEaten = document.getElementById("apples-eaten");
    const locSubjectSize = document.getElementById("subject-size");
    const locPlaygourndSize = document.getElementById("playground-size");

    scoreBoard.snakeLenght = snake.tail;
    snakeLenght.innerHTML = scoreBoard.snakeLenght;
    applesEaten.innerHTML = scoreBoard.applesEaten;
    subjectSize = locSubjectSize.value;
    playgroundSize = locPlaygourndSize.value;
}

//Snake returns back to playground when escapes
function returnSnakeBackToScreen() {
    if(snake.xPosition < 0) {
        snake.xPosition = playgroundSize - 1;
    }
    if(snake.xPosition > playgroundSize - 1) {
        snake.xPosition = 0;
    }
    if(snake.yPosition < 0) {
        snake.yPosition = playgroundSize - 1;
    }
    if(snake.yPosition > playgroundSize - 1) {
        snake.yPosition = 0;
    }
}

//Start the Game
function game() {

    loadScoreBoard();    
    initializeContext(context, canvas);
    
    snake.run(velocity);

    returnSnakeBackToScreen();

    for (let index = 0; index < snake.trail.length; index++) {
        const element = snake.trail[index];
        renderObject(context, element);
        checkGameStatus(element);
    }

    snake.update();    

    if (hasSnakeEatenApple()) {
        scoreBoard.applesEaten++;
        snake.tail++;
        makeNewApple();
    }

    initializeApple(context);        
}

//Keyboard Event Listener
function keyPush(event) {
    switch (event.keyCode) {
        //Left
        case 37:
            velocity.x = -1;
            velocity.y = 0;
            break;
        //Down
        case 38:
            velocity.x = 0;
            velocity.y = -1;
            break;
        //Right
        case 39:
            velocity.x = 1;
            velocity.y = 0;
            break;
        //Up
        case 40:
            velocity.x = 0;
            velocity.y = 1;
            break;
    }
}