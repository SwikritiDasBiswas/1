class Game{
    constructor (){

    }
    getState(){
        var gameStateRef=database.ref('gameState')
        gameStateRef.on("value",function(data){
            gameState = data.val()
        })
    }
    update(state){ 
        database.ref('/').update({
            gameState:state
        })
    }
    async start(){
        if(gameState===0){
            var playerCountRef = await database.ref('playerCount').once("value");
            player = new Player()
            if(playerCountRef.exists()){
              playerCount = playerCountRef.val()
              player.getCount()
            }
            
            form = new Form()
            form.display()
        }
        car1 = createSprite(100,200)
        car1.addImage("car1",car1img)

        car2 = createSprite(300,200)
        car2.addImage("car2",car2img) 

        car3=  createSprite(500,200)
        car3.addImage("car3",car3img)

        car4 = createSprite(700,200)
        car4.addImage("car4",car4img)

        cars = [car1,car2,car3,car4]
    }
    
    end(){
        //console.log("The game has ended.")
        console.log(player.rank)
        textSize(50)
        fill("purple")
        text("Game Over", displayWidth/4, -3292)
        var message = createElement('h2')
        message.html("Congratulations "+player.name+ "!!! Your Rank is "+player.rank)
        message.position(displayWidth/2-70,displayHeight/4)
        
    }
    play(){
       form.hide() 
    //    textSize(30)
    //    text("Game Start",120,100) 
       Player.getPlayerInfo()
       player.getCarsAtEnd(player.rank)

       if(allPlayers!==undefined){
           background(255)
           image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
           var index = 0;
           var x = 175;
           var y ;

         //  var display_position = 130
           for(var plr in allPlayers){
               index = index+1;
               x = x+200;
               y= displayHeight - allPlayers[plr].distance;
               cars[index-1].x= x;
               cars[index-1].y = y;
            //    if(plr==="player"+player.index)
            //    fill("red")
            //    else
            //    fill("black")

            if(index===player.index){
                fill("red")
                stroke (10)
                ellipse(x,y,60,60)
                cars[index-1].shapeColor = "red";
                camera.position.x = displayWidth/2;
                camera.position.y = cars[index-1].y
            }
        //        display_position+=20
        // textSize(15)
        // text(allPlayers[plr].name+": "+ allPlayers[plr].distance,120,display_position)
           }
       }
       if(keyDown (UP_ARROW)&& player.index!=null){
           player.distance+=10
           player.update()

       }
       if(player.distance>3860){
           gameState = 2
           player.rank+=1
           Player.updateCarsAtEnd(player.rank)
       }
       drawSprites();
    }
}