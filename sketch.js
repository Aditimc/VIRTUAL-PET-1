var database;
var dog,dogImage,dogImage1,food,foodImage,foodStock,foodRef;

function preload()
{
  
  backgroundImg = loadImage("images/bg.png");
  dogImage = loadImage("images/Dog.png");
  dogImage1 = loadImage("images/happydog.png");
  foodImage = loadImage("images/Bone.png");
  bathImage = loadImage("images/bath.png");
  sleepImage = loadImage("images/sleep.png");
  playImage = loadImage("images/play.png");
  walkImage = loadImage("images/walk.png");
  

}

function setup() {
  createCanvas(480, 480);

  food = createSprite(250,400,50,50);
  food.addImage(foodImage);
  food.scale = 0.3;

  dog = createSprite(400,150);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  database = firebase.database();

  foodRef = database.ref("Food");
  foodRef.on("value",read,console.log("error"));

  foodRef.set(20);


}


function draw() {  
  background(backgroundImg);
  drawSprites();
  
  textSize(32);
  fill("cyan");
  text("Bones in the Stock: "+foodStock,50,300);
  decreaseFood();
  if(foodStock===0){
    foodStock = 20;
  }

  if(keyWentUp(DOWN_ARROW)){
    
    dog.addImage(bathImage);
    
    
  }

  if(keyWentUp(LEFT_ARROW)){
   
    dog.addImage(sleepImage);
    dog.scale = 0.3
    
    
  }

  if(keyWentUp(RIGHT_ARROW)){
   
    dog.addImage(playImage);
    dog.scale = 0.3
    
    
  }

  if(keyCode === 32){
    
    dog.addImage(walkImage);
    dog.scale = 0.3
 }

}

function read(data){
  foodStock = data.val();
}

function decreaseFood(){
  if(keyWentDown(UP_ARROW)){
  foodRef = database.ref("Food");
  foodStock = foodStock - 1;
  foodRef.set(foodStock);
  dog.addImage(dogImage1);
  food.x = 350;
  food.y = 200;
  food.scale = 0.1;

  }
  
  if(keyWentUp(UP_ARROW)){
    
    foodStock = foodStock;
    dog.addImage(dogImage);
    fill("blue");
    text('Thank you 🥳🥳',10,80);
    food.x = 250;
    food.y = 400;
    food.scale = 0.2;
    
  }
}

