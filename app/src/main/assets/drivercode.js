var versionCode = "Alpha 0.9";

var WIDTH = 1000;
var HEIGHT = 1100;

var COLORS = {white: "rgb(254, 250, 236)", black: "rgb(7, 5, 14)", blue: "rgb(36, 32, 95)", red: "rgb(129, 43, 56)"};

var boards = [

    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]

];


var mainBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

var mousePosX = 0;
var mousePosY = 0;
var clicked = false;



var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var currentTurn = 1;
var player = 1;
var ai = -1;
var currentBoard = 4;

var gameRunning = false;

var RUNS = 0;

var MOVES = 0;

var switchAroo = 1;

var AIACTIVE = true;

var playerNames = ["PLAYER", "AI"];


function checkWinCondition(map) {
    var a = 1;
    if (map[0] + map[1] + map[2] === a * 3 || map[3] + map[4] + map[5] === a * 3 || map[6] + map[7] + map[8] === a * 3 || map[0] + map[3] + map[6] === a * 3 || map[1] + map[4] + map[7] === a * 3 ||
        map[2] + map[5] + map[8] === a * 3 || map[0] + map[4] + map[8] === a * 3 || map[2] + map[4] + map[6] === a * 3) {
        return a;
    }
    a = -1;
    if (map[0] + map[1] + map[2] === a * 3 || map[3] + map[4] + map[5] === a * 3 || map[6] + map[7] + map[8] === a * 3 || map[0] + map[3] + map[6] === a * 3 || map[1] + map[4] + map[7] === a * 3 ||
        map[2] + map[5] + map[8] === a * 3 || map[0] + map[4] + map[8] === a * 3 || map[2] + map[4] + map[6] === a * 3) {
        return a;
    }
    return 0;
}


function evaluateGame(position, currentBoard) {
    var evale = 0;
    var mainBd = [];
    var evaluatorMul = [1.4, 1, 1.4, 1, 1.75, 1, 1.4, 1, 1.4];
    for (var eh = 0; eh < 9; eh++){
        evale += realEvaluateSquare(position[eh])*1.5*evaluatorMul[eh];
        if(eh === currentBoard){
            evale += realEvaluateSquare(position[eh])*evaluatorMul[eh];
        }
        var tmpEv = checkWinCondition(position[eh]);
        evale -= tmpEv*evaluatorMul[eh];
        mainBd.push(tmpEv);
    }
    evale -= checkWinCondition(mainBd)*5000;
    evale += realEvaluateSquare(mainBd)*150;
    return evale;
}






function realEvaluateSquare(pos){
    var evaluation = 0;
    var points = [0.2, 0.17, 0.2, 0.17, 0.22, 0.17, 0.2, 0.17, 0.2];

    for(var bw in pos){
        evaluation -= pos[bw]*points[bw];
    }

    var a = 2;
    if(pos[0] + pos[1] + pos[2] === a || pos[3] + pos[4] + pos[5] === a || pos[6] + pos[7] + pos[8] === a) {
        evaluation -= 6;
    }
    if(pos[0] + pos[3] + pos[6] === a || pos[1] + pos[4] + pos[7] === a || pos[2] + pos[5] + pos[8] === a) {
        evaluation -= 6;
    }
    if(pos[0] + pos[4] + pos[8] === a || pos[2] + pos[4] + pos[6] === a) {
        evaluation -= 7;
    }

    a = -1;
    if((pos[0] + pos[1] === 2*a && pos[2] === -a) || (pos[1] + pos[2] === 2*a && pos[0] === -a) || (pos[0] + pos[2] === 2*a && pos[1] === -a)
        || (pos[3] + pos[4] === 2*a && pos[5] === -a) || (pos[3] + pos[5] === 2*a && pos[4] === -a) || (pos[5] + pos[4] === 2*a && pos[3] === -a)
        || (pos[6] + pos[7] === 2*a && pos[8] === -a) || (pos[6] + pos[8] === 2*a && pos[7] === -a) || (pos[7] + pos[8] === 2*a && pos[6] === -a)
        || (pos[0] + pos[3] === 2*a && pos[6] === -a) || (pos[0] + pos[6] === 2*a && pos[3] === -a) || (pos[3] + pos[6] === 2*a && pos[0] === -a)
        || (pos[1] + pos[4] === 2*a && pos[7] === -a) || (pos[1] + pos[7] === 2*a && pos[4] === -a) || (pos[4] + pos[7] === 2*a && pos[1] === -a)
        || (pos[2] + pos[5] === 2*a && pos[8] === -a) || (pos[2] + pos[8] === 2*a && pos[5] === -a) || (pos[5] + pos[8] === 2*a && pos[2] === -a)
        || (pos[0] + pos[4] === 2*a && pos[8] === -a) || (pos[0] + pos[8] === 2*a && pos[4] === -a) || (pos[4] + pos[8] === 2*a && pos[0] === -a)
        || (pos[2] + pos[4] === 2*a && pos[6] === -a) || (pos[2] + pos[6] === 2*a && pos[4] === -a) || (pos[4] + pos[6] === 2*a && pos[2] === -a)){
        evaluation-=9;
    }

    a = -2;
    if(pos[0] + pos[1] + pos[2] === a || pos[3] + pos[4] + pos[5] === a || pos[6] + pos[7] + pos[8] === a) {
        evaluation += 6;
    }
    if(pos[0] + pos[3] + pos[6] === a || pos[1] + pos[4] + pos[7] === a || pos[2] + pos[5] + pos[8] === a) {
        evaluation += 6;
    }
    if(pos[0] + pos[4] + pos[8] === a || pos[2] + pos[4] + pos[6] === a) {
        evaluation += 7;
    }

    a = 1;
    if((pos[0] + pos[1] === 2*a && pos[2] === -a) || (pos[1] + pos[2] === 2*a && pos[0] === -a) || (pos[0] + pos[2] === 2*a && pos[1] === -a)
        || (pos[3] + pos[4] === 2*a && pos[5] === -a) || (pos[3] + pos[5] === 2*a && pos[4] === -a) || (pos[5] + pos[4] === 2*a && pos[3] === -a)
        || (pos[6] + pos[7] === 2*a && pos[8] === -a) || (pos[6] + pos[8] === 2*a && pos[7] === -a) || (pos[7] + pos[8] === 2*a && pos[6] === -a)
        || (pos[0] + pos[3] === 2*a && pos[6] === -a) || (pos[0] + pos[6] === 2*a && pos[3] === -a) || (pos[3] + pos[6] === 2*a && pos[0] === -a)
        || (pos[1] + pos[4] === 2*a && pos[7] === -a) || (pos[1] + pos[7] === 2*a && pos[4] === -a) || (pos[4] + pos[7] === 2*a && pos[1] === -a)
        || (pos[2] + pos[5] === 2*a && pos[8] === -a) || (pos[2] + pos[8] === 2*a && pos[5] === -a) || (pos[5] + pos[8] === 2*a && pos[2] === -a)
        || (pos[0] + pos[4] === 2*a && pos[8] === -a) || (pos[0] + pos[8] === 2*a && pos[4] === -a) || (pos[4] + pos[8] === 2*a && pos[0] === -a)
        || (pos[2] + pos[4] === 2*a && pos[6] === -a) || (pos[2] + pos[6] === 2*a && pos[4] === -a) || (pos[4] + pos[6] === 2*a && pos[2] === -a)){
        evaluation+=9;
    }

    evaluation -= checkWinCondition(pos)*12;

    return evaluation;
}


function sign(x){
    if(x > 0){
        return 1;
    }else if(x < 0){
        return -1;
    }else{
        return 0;
    }
}


var bestMove = -1;
var bestScore = [-Infinity, -Infinity, -Infinity, -Infinity, -Infinity, -Infinity, -Infinity, -Infinity, -Infinity];

function game(){
    ctx.fillStyle = COLORS.white;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.lineWidth = 3;
    var squareSize = WIDTH/4;



    shapeSize = squareSize/6;


    if(clicked === true && gameRunning) {
        for (var i in boards) {
            if(currentBoard !== -1){i = currentBoard;if(mainBoard[currentBoard] !== 0){continue;}}
            for (var j in boards[i]) {
                if(boards[i][j] === 0) {
                    if (mousePosX > (WIDTH / 3 - squareSize) / 2 + squareSize / 6 - shapeSize + (j % 3) * squareSize / 3 + (i % 3) * WIDTH / 3 && mousePosX < (WIDTH / 3 - squareSize) / 2 + squareSize / 6 + shapeSize + (j % 3) * squareSize / 3 + (i % 3) * WIDTH / 3) {
                        if (mousePosY > (WIDTH / 3 - squareSize) / 2 + squareSize / 6 - shapeSize + Math.floor(j / 3) * squareSize / 3 + Math.floor(i / 3) * WIDTH / 3 && mousePosY < (WIDTH / 3 - squareSize) / 2 + squareSize / 6 + shapeSize + Math.floor(j / 3) * squareSize / 3 + Math.floor(i / 3) * WIDTH / 3) {
                            boards[i][j] = currentTurn;
                            currentBoard = j;
                            currentTurn = -currentTurn;
                            MOVES++;
                            break;
                        }
                    }
                }
            }
        }
    }



    squareSize = WIDTH/4;
    var shapeSize = WIDTH/36;

    ctx.strokeStyle = COLORS.black;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(WIDTH/3, 0);
    ctx.lineTo(WIDTH/3, WIDTH);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(WIDTH/3*2, 0);
    ctx.lineTo(WIDTH/3*2, WIDTH);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, WIDTH/3);
    ctx.lineTo(WIDTH, WIDTH/3);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, WIDTH/3*2);
    ctx.lineTo(WIDTH, WIDTH/3*2);
    ctx.stroke();

    ctx.lineWidth = 3;
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            ctx.beginPath();
            ctx.moveTo(i*WIDTH/3 + (WIDTH/3-squareSize)/2 + squareSize/3, j*WIDTH/3 + (WIDTH/3 - squareSize)/2);
            ctx.lineTo(i*WIDTH/3 + (WIDTH/3-squareSize)/2 + squareSize/3, j*WIDTH/3 + (WIDTH/3 - squareSize)/2 + squareSize);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(i*WIDTH/3 + (WIDTH/3-squareSize)/2 + squareSize*2/3, j*WIDTH/3 + (WIDTH/3 - squareSize)/2);
            ctx.lineTo(i*WIDTH/3 + (WIDTH/3-squareSize)/2 + squareSize*2/3, j*WIDTH/3 + (WIDTH/3 - squareSize)/2 + squareSize);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(i*WIDTH/3 + (WIDTH/3 - squareSize)/2, j*WIDTH/3 + (WIDTH/3-squareSize)/2 + squareSize/3);
            ctx.lineTo(i*WIDTH/3 + (WIDTH/3 - squareSize)/2 + squareSize, j*WIDTH/3 + (WIDTH/3-squareSize)/2 + squareSize/3);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(i*WIDTH/3 + (WIDTH/3 - squareSize)/2, j*WIDTH/3 + (WIDTH/3-squareSize)/2 + squareSize*2/3);
            ctx.lineTo(i*WIDTH/3 + (WIDTH/3 - squareSize)/2 + squareSize, j*WIDTH/3 + (WIDTH/3-squareSize)/2 + squareSize*2/3);
            ctx.stroke();
        }
    }


    ctx.lineWidth = 5;

    for(var i in boards){
        if(mainBoard[i] === 0) {
            if (checkWinCondition(boards[i]) !== 0) {
                mainBoard[i] = checkWinCondition(boards[i]);
            }
        }
        for(var j in boards[i]){
            if(boards[i][j] === 1*switchAroo){
                ctx.strokeStyle = COLORS.red;
                ctx.beginPath();
                ctx.moveTo((WIDTH/3-squareSize)/2 + squareSize/6 - shapeSize + (j%3)*squareSize/3 + (i%3)*WIDTH/3, (WIDTH/3 - squareSize)/2 + squareSize/6 - shapeSize + Math.floor(j/3)*squareSize/3 + Math.floor(i/3)*WIDTH/3);
                ctx.lineTo((WIDTH/3-squareSize)/2 + squareSize/6 + shapeSize + (j%3)*squareSize/3 + (i%3)*WIDTH/3, (WIDTH/3 - squareSize)/2 + squareSize/6 + shapeSize + Math.floor(j/3)*squareSize/3 + Math.floor(i/3)*WIDTH/3);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo((WIDTH/3-squareSize)/2 + squareSize/6 - shapeSize + (j%3)*squareSize/3 + (i%3)*WIDTH/3, (WIDTH/3 - squareSize)/2 + squareSize/6 + shapeSize + Math.floor(j/3)*squareSize/3 + Math.floor(i/3)*WIDTH/3);
                ctx.lineTo((WIDTH/3-squareSize)/2 + squareSize/6 + shapeSize + (j%3)*squareSize/3 + (i%3)*WIDTH/3, (WIDTH/3 - squareSize)/2 + squareSize/6 - shapeSize + Math.floor(j/3)*squareSize/3 + Math.floor(i/3)*WIDTH/3);
                ctx.stroke();
            }else if(boards[i][j] === -1*switchAroo){
                ctx.strokeStyle = COLORS.blue;
                ctx.beginPath();
                ctx.ellipse((WIDTH/3-squareSize)/2 + squareSize/6 + (j%3)*squareSize/3 + (i%3)*WIDTH/3, (WIDTH/3 - squareSize)/2 + squareSize/6 + Math.floor(j/3)*squareSize/3 + Math.floor(i/3)*WIDTH/3, shapeSize*1.1, shapeSize*1.1, 0, 0, Math.PI*2);
                ctx.stroke();
            }
        }
    }


    if(gameRunning){
        if (checkWinCondition(mainBoard) !== 0) {
            gameRunning = false;
            document.getElementById("winMenu").removeAttribute("hidden");
            if(checkWinCondition(mainBoard) === 1){
                document.getElementById("result").innerHTML = playerNames[0] + " WINS!";
            }else{
                document.getElementById("result").innerHTML = playerNames[1] + " WINS!";
            }
        }


        var countw = 0;
        for(var bt = 0; bt < boards.length; bt++){
            if(checkWinCondition(boards[bt]) === 0){
                boards[bt].forEach((v) => (v === 0 && countw++));
            }
        }

        if(countw === 0){
            gameRunning = false;
            document.getElementById("winMenu").removeAttribute("hidden");
            document.getElementById("result").innerHTML = "IT'S A TIE!";
        }
    }

    shapeSize = squareSize/3;
    ctx.lineWidth = 20;


    for(var j in mainBoard){
        if(mainBoard[j] === 1*switchAroo){
            ctx.strokeStyle = COLORS.red;
            ctx.beginPath();
            ctx.moveTo(WIDTH/6 - shapeSize + (j%3)*WIDTH/3, WIDTH/6 - shapeSize + Math.floor(j/3)*WIDTH/3);
            ctx.lineTo(WIDTH/6 + shapeSize + (j%3)*WIDTH/3, WIDTH/6 + shapeSize + Math.floor(j/3)*WIDTH/3);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(WIDTH/6 - shapeSize + (j%3)*WIDTH/3, WIDTH/6 + shapeSize + Math.floor(j/3)*WIDTH/3);
            ctx.lineTo(WIDTH/6 + shapeSize + (j%3)*WIDTH/3, WIDTH/6 - shapeSize + Math.floor(j/3)*WIDTH/3);
            ctx.stroke();
        }else if(mainBoard[j] === -1*switchAroo){
            ctx.strokeStyle = COLORS.blue;
            ctx.beginPath();
            ctx.ellipse(WIDTH/6 + (j%3)*WIDTH/3, WIDTH/6 + Math.floor(j/3)*WIDTH/3, shapeSize*1.1, shapeSize*1.1, 0, 0, Math.PI*2);
            ctx.stroke();
        }
    }

    if(mainBoard[currentBoard] !== 0 || !boards[currentBoard].includes(0)){currentBoard = -1;}



    ctx.fillStyle = COLORS.red;
    ctx.globalAlpha = 0.1;
    ctx.fillRect(WIDTH/3*(currentBoard%3), WIDTH/3*Math.floor(currentBoard/3), WIDTH/3, WIDTH/3);
    ctx.globalAlpha = 1;





}



var keys;



function findScreenCoords(mouseEvent)
{
    var rect = canvas.getBoundingClientRect();
    mousePosX = mouseEvent.clientX - rect.left;
    mousePosY = mouseEvent.clientY - rect.top;
}

function click(){
    clicked = true;
}
document.getElementById("myCanvas").onmousemove = findScreenCoords;
document.getElementById("myCanvas").onclick = click;

window.addEventListener('keydown', function (e) {
    keys = (keys || []);
    keys[e.keyCode] = (e.type == "keydown");

    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }

}, false);
window.addEventListener('keyup', function (e) {
    keys[e.keyCode] = (e.type == "keydown");
}, false);



function Reload() {
    localStorage.setItem("HighScoreBusiness", 0);

}

function startGame(type){
    boards = [

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]

    ];

    mainBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    MOVES = 0;


    currentBoard = -1;

    if(type === 0){
        AIACTIVE = true;
        gameRunning = true;
        playerNames[0] = "PLAYER";
        playerNames[1] = "AI";
    }else{
        AIACTIVE = false;
        gameRunning = true;
        switchAroo = 1;
        playerNames[0] = "PLAYER 1";
        playerNames[1] = "PLAYER 2";
    }
    document.getElementById("startMenu").setAttribute("hidden", "hidden");
    document.getElementById("turnMenu").setAttribute("hidden", "hidden");
}
 function about() {

         window.location.href = "about-us.html";

    }
    function howto() {

             window.location.href = "howto.html";
        }


function setGame(type){
    if(type === 0){
        currentTurn = 1;
        switchAroo = 1;
    }else{
        currentTurn = -1;
        switchAroo = -1;
    }
    startGame(0);
}

function menu(){
    document.getElementById("startMenu").removeAttribute("hidden");
    document.getElementById("turnMenu").setAttribute("hidden", "hidden");
    document.getElementById("winMenu").setAttribute("hidden", "hidden");
}

function pickTurns(){
    document.getElementById("startMenu").setAttribute("hidden", "hidden");
    document.getElementById("turnMenu").removeAttribute("hidden");
}


function repeatOften() {
    game();
    requestAnimationFrame(repeatOften);
}
requestAnimationFrame(repeatOften);