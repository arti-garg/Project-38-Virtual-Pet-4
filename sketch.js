var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var bedroomImg,livingroomImg, gardenImage, washroomImage, milkImg;
var gameState ,readgS, writegS
var currentTime;

function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/happy dog.png");
bedroomImg= loadImage("Images/Bed Room.png");
gardenImg= loadImage("Images/Garden.png");
washroomImg= loadImage("Images/Wash Room.png");
milkImg = loadImage("Images/milk.png")
livingroomImg= loadImage("Images/Living Room.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);

foodObj = new Food();

dog= createSprite(250,250,10,10);
dog.addImage(sadDog);
dog.scale=0.15

foodStock= database.ref('Food');
foodStock.on("value", readStock);
foodStock.set(20);


milkBotltle1 = createSprite(140,435,10,10);
milkBotltle1.addImage(milkImg);
milkBotltle1.scale = 0.05;

milkBotltle2 = createSprite(210,280,10,10);
milkBotltle2.addImage(milkImg);
milkBotltle2.scale = 0.05;
milkBotltle2.visible = false;

}

function draw(){
background("yellow")
  
foodObj.display();
writeStock(foodS);

if(foodS == 0){
  dog.addImage(happyDog);
  milkBotltle2.visible=false;
}else{
  dog.addImage(sadDog);
  milkBotltle2.visible=true;
}

var gameStateRef=database.ref('gameState');
gameStateRef.on('value',function(data){
  gameState = data.val();
});

if(gameState===1){
  dog.addImage(happyDog);
  dog.scale=0.175;
  dog.y=250;
}
if(gameState===2){
  dog.addImage(sadDog);
  dog.scale=0.175;
  milkBotltle2.visible=false;
  dog.y=250;
}

var Bath=createButton("I want to take bath");
  Bath.position(600,125);
  if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===3){
    dog.addImage(washroomImg);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  var Sleep=createButton("I am very sleepy");
  Sleep.position(730,125);
  if(Sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===4){
    dog.addImage(bedroomImg);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  var Play=createButton("Lets play !");
  Play.position(500,160);
  if(Play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===5){
    dog.addImage(livingroomImg);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  var PlayInGarden=createButton("Lets play in park");
  PlayInGarden.position(585,160);
  if(PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===6){
    dog.y=175;
    dog.addImage(gardenImg);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  drawSprites();
  textSize(17);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,170,440);

}

function readStock(data){
  foodS= data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}