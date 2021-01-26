var bg;
var dog;
var dogImg, happyDog;
var database;
var foodS, foodStock;
var feedButton, addFood;
var lastFed, fedTime;
var foodObj;
var Milk;

function preload()
{
dogImg = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png");

bg = loadImage("images/backyyard img.jpg");
}

function setup() {
  createCanvas(800, 500);

  database = firebase.database();

  feedButton=createButton("Satisfy the hungry canine!");
  feedButton.position(900, 95);
  feedButton.mousePressed(feedDog);

  addFood=createButton("Press when your food supply is exhausted.");
  addFood.position(450, 95);
  addFood.mousePressed(addFoods);

  dog = createSprite(720, 250, 20, 60);
  dog.addImage(dogImg);
  dog.scale = 0.25;

  foodObj = new Food(10, 250, 5, 10);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {

  background(bg);
  drawSprites();

  stroke("blue");
  fill("purple");
  textSize(22);
  text("Milk bottles left:" + foodS, 15, 20);

  stroke("blue");
  fill("orange");
  textSize(18);
  text("To earn your dog's respect, feed it by hitting the up arrow key!", 2, 490);

  fill(255, 255, 255);
  textSize(15);
  if(lastFed>=12){
    text("Last fed:"+ lastFed%12 + "PM", 350, 30);
  }else if(lastFed===0){
    text("Last fed: 12 AM", 350, 30);
  }
  else{
    text("Last fed: "+ lastFed + "AM", 350, 30)
  }

  foodObj.display();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

