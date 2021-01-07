var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup,obstacleGroup;
var survivalTime;
var backGround,backGroundimg;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  backGroundimg=loadImage("jungle.jpg")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
createCanvas(600,600);

   backGround=createSprite(300,200,1,1);
   backGround.addImage(backGroundimg)
   backGround.velocityX=-3;
   backGround.scale=3.5;
  
  monkey = createSprite(80,315,20,50);
  monkey.addAnimation("moving", monkey_running);
  monkey.velocityX=2
  monkey.scale = 0.1;
  
  ground = createSprite(monkey.x,350,2400,10);
  // ground.x = ground.width /2;
  ground.velocityX=-0.4;
  console.log(ground.x);
  ground.visible=false;
 
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  foodGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {

  background(255);
  monkey.collide(ground);
  
  if(gameState === PLAY){
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.round(frameCount/frameRate());
    text("Survival Time: " + survivalTime,monkey.x,50);
      
    console.log(monkey.y)
  
    if (ground.x < monkey.x){
      ground.x = monkey.x+300;
    }

    if (backGround.x < monkey.x){
      backGround.x = monkey.x+200;
    }

    camera.position.x=monkey.x;
    camera.position.y=300;
    
    if(keyDown("space") && monkey.y>314) {
        monkey.velocityY = -20;  
    }
    
    spawnfood();
    spawnobstacle();
    
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
    }
 
    if(monkey.isTouching(obstacleGroup)){
        //trex.velocityY = -12;
        gameState = END;   
    }
  }
  else if(gameState === END){
    
      ground.velocityX = 0;
      monkey.velocityY = 0;
      monkey.velocityX = 0;
      backGround.velocityX =0;
      
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

  }
  drawSprites();
   }

function spawnfood() {
  if (frameCount % 300 === 0) {
    var banana = createSprite(monkey.x+500,120,40,10);
    banana.y = Math.round(random(80,150));
   banana.addImage(bananaImage);
    banana.scale = 0.5;
   banana.velocityX = -0.3;
    banana.scale=0.1;
  
    banana.lifetime = 2000;
    
    banana.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
    
   foodGroup.add(banana);
  }
}


function spawnobstacle() {
  //write code here to spawn the clouds
  if (frameCount % 400 === 0) {
    var obstacle = createSprite(monkey.x+500,350,900,10);
    obstacle.y = Math.round(random(330,330));
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.5;
    obstacle.velocityX = -0.3;
    obstacle.scale=0.1;
    
     //assign lifetime to the variable
    obstacle.lifetime = 2000;
    
    //adjust the depth
   // banana.depth = monkey.depth;
   // monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}




