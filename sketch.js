var ball;
var gameState = 0
var playerCount, database;
var form, player, game;
var allPlayers;
var car1,car2,car3,car4,cars;
var car1img, car2img, carimg, car4img, track;

function preload(){
    car1img = loadImage("images/car1.png");
    car2img = loadImage("images/car2.png")
    car3img = loadImage("images/car3.png")
    car4img = loadImage("images/car4.png")
    track = loadImage("images/track.jpg")
}
function setup(){
    database = firebase.database() 
    createCanvas(displayWidth-40,displayHeight-60);
    game = new Game()
    game.getState()
    game.start()
}

function draw(){
   
    if(playerCount===4){
        game.update(1)
    }
    if(gameState===1){
        clear()
        game.play()
    }
    if(gameState===2){
        game.end()
    }
}
