// Elements
const canvas            = document.getElementById("game-console");
const context           = canvas.getContext("2d");
const snakeLenght       = document.getElementById("snake-length");
const applesEaten       = document.getElementById("apples-eaten");
const locSubjectSize    = document.getElementById("subject-size");
const locPlaygourndSize = document.getElementById("playground-size");
const snakeX = document.getElementById("snake-x");
const snakeY = document.getElementById("snake-y");
const appleX = document.getElementById("apple-x");
const appleY = document.getElementById("apple-y");
const dUp = document.getElementById("d-up");
const dDown = document.getElementById("d-down");
const dLeft = document.getElementById("d-left");
const dRight = document.getElementById("d-right");

canvas.height   = window.innerWidth;
canvas.width    = window.innerWidth; 

// Event Listners
dUp.addEventListener("mousedown",dPadPressed);
dDown.addEventListener("mousedown",dPadPressed);
dLeft.addEventListener("mousedown",dPadPressed);
dRight.addEventListener("mousedown",dPadPressed);

document.addEventListener("keydown",keyPush);
window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
})

//Creating a canvas and event listener refresh game frames
// window.onload = function() {
//     this.setInterval(game,1000/10);
// }

//
//  Initial Properties
//
const grid = 20;
let subjectSize = canvas.width / grid;
let snake = new MovingObject(context,subjectSize,subjectSize,20,10,"yellow");
let apple = new StandingObject(context,subjectSize,subjectSize,50,50,"red");
let scoreBoard = {
    snakeLenght : 5,
    applesEaten : 0,
    isGameOver : false
}

snake.trail = [];
snake.tail  = 5;
snake.isMoving = function () {
    return this.velocityX !== 0 || this.velocityY !==0
}
snake.pause = function(){
    this.velocityX = 0;
    this.velocityY = 0;
}
snake.updateBody = function(){
    //records previous location    
    this.trail.push({x:this.x, y:this.y});
    if (this.trail.length > this.tail * 20) {
        this.trail.shift();
    }
    //renders previous location
    for (let index = 0; index < this.trail.length; index++) {
        const element = this.trail[index];        
        this.context.fillRect(element.x, element.y, this.width, this.height);

        if (this.isMoving && index < this.trail.length - 1) {
            checkGameStatus(element);        
        }
    }
}

//Initiallize Canvas
function initializeContext(context, canvas) {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

//Game Resets when snake touches it's body
function checkGameStatus (arrObject){
    if (arrObject.x == snake.x && arrObject.y == snake.y) {
      snake.tail = 5;
      snake.trail = [];
      snake.pause();
      scoreBoard.applesEaten = 0;
      scoreBoard.isGameOver = true;
    }
}

function checkRange(position, min, max) {
    return position >= min && position <= max;
}

function getRange(subjectSize, position, rangeType) {
    let ret = 0;
    switch (rangeType) {
        case "min":
            ret = position - subjectSize;
            break;
        case "max":
            ret = position + subjectSize;
            break;
        default:
            ret = 23;
            break;
    }
    return ret; 
}

//Check if the snake has eaten an apple
function hasSnakeEatenApple (){
    const xMin = getRange(subjectSize, apple.x, "min");
    const xMax = getRange(subjectSize, apple.x, "max");
    const yMin = getRange(subjectSize, apple.y, "min");
    const yMax = getRange(subjectSize, apple.y, "max");
    //Returns Boolean
    const checkXrange = checkRange(snake.x, xMin, xMax);
    const checkYrange = checkRange(snake.y, yMin, yMax);

    return (checkXrange && checkYrange);
}

//Repopulate new apple. Populates by number of grids times subject size
function makeNewApple(){
    const newAppleX = Math.floor(Math.random() * grid) * Math.floor(subjectSize);
    const newAppleY = Math.floor(Math.random() * grid) * Math.floor(subjectSize);
    apple.x = newAppleX;
    apple.y = newAppleY;
}

//Loads Scores on the game board
function loadScoreBoard() {
    scoreBoard.snakeLenght = snake.tail;
    snakeLenght.innerHTML = scoreBoard.snakeLenght;
    applesEaten.innerHTML = scoreBoard.applesEaten;
    snakeX.innerHTML = snake.x;
    snakeY.innerHTML = snake.y;
    appleX.innerHTML = apple.x;
    appleY.innerHTML = apple.y;
}

//Snake returns back to playground when escapes
function returnSnakeBackToScreen() {
    if(snake.x < 0) {
        snake.x = canvas.width - 1;
    }
    if(snake.x > canvas.width - 1) {
        snake.x = 0;
    }
    if(snake.y < 0) {
        snake.y = canvas.height - 1;
    }
    if(snake.y > canvas.height - 1) {
        snake.y = 0;
    }
}

//Keyboard Event Listener
function keyPush(event) {
    switch (event.keyCode) {
        //Left
        case 37:
            snake.velocityX = -2;
            snake.velocityY = 0;
            break;
        //Down
        case 38:
            snake.velocityX = 0;
            snake.velocityY = -2;
            break;
        //Right
        case 39:
            snake.velocityX = 2;
            snake.velocityY = 0;
            break;
        //Up
        case 40:
            snake.velocityX = 0;
            snake.velocityY = 2;
            break;
    }
}

function dPadPressed(event){
    switch (event.currentTarget.text) {
        //Left
        case "arrow_back":
            snake.velocityX = -2;
            snake.velocityY = 0;
            break;
        //Up
        case "arrow_upward":
            snake.velocityX = 0;
            snake.velocityY = -2;
            break;
        //Right
        case "arrow_forward":
            snake.velocityX = 2;
            snake.velocityY = 0;
            break;
        //Down
        case "arrow_downward":
            snake.velocityX = 0;
            snake.velocityY = 2;
            break;
    }
}

//Start the Game
function game() {

    loadScoreBoard();    
    initializeContext(context, canvas);

    snake.update();
    snake.updateBody();
    apple.render();   

    returnSnakeBackToScreen();

    if (hasSnakeEatenApple()) {
        scoreBoard.applesEaten++;
        snake.tail++;
        makeNewApple();
    }

    window.requestAnimationFrame(game); 
}

game();