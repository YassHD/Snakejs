//interface

var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;


//Snake tete
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;


var vitesseX = 0;
var vitesseY = 0;


var snakeBody = [];

//Pomme
var pommeX;
var pommeY; 



var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blocksize;//500 
    board.width = cols * blocksize; //500
    context = board.getContext("2d");//used for drawing on the board

    placepomme();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10); //100miliseconde

}
function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle="grey";
    context.fillRect(0, 0, board.width, board.height);


    context.fillStyle="lime";
    snakeX += vitesseX * blocksize;//*blocksize pour boucher dans chaque block
    snakeY += vitesseY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }


    context.fillStyle="red";
    context.fillRect(pommeX, pommeY, blocksize, blocksize);

        if (snakeX == pommeX && snakeY == pommeY){
            snakeBody.push([pommeX, pommeY])
            placepomme();
        }

        for (let i = snakeBody.length-1; i> 0; i--){
            snakeBody[i] = snakeBody[i-1];
        }
        if (snakeBody.length) {
            snakeBody[0] = [snakeX, snakeY];
        }
    
        //gameOver
        if (snakeX < 0 || snakeX > cols*blocksize || snakeY < 0 || snakeY > rows*blockSize){
            gameOver = true;
            alert("Game Over");
        }
        for (let i = 0; i < snakeBody.length; i++) {
            if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
                gameOver = true;
                alert("Game Over");
            }
        }

}

function placepomme(){

    pommeX = Math.floor(Math.random() *cols) * blocksize;
    pommeY = Math.floor(Math.random() *rows) * blocksize;


}
function changeDirection(e){

    if (e.code == "ArrowUp" && vitesseY != 1){
        vitesseX = 0;
        vitesseY = -1;
    }
    else if (e.code == "ArrowDown" && vitesseY != -1){
        vitesseX = 0;
        vitesseY = 1;
    }
    else if (e.code == "ArrowLeft" && vitesseX != 1){
        vitesseX = -1;
        vitesseY = 0;
    }
    else if (e.code == "ArrowRight" && vitesseX != -1){
        vitesseX = 1;
        vitesseY = 0;
    }

}