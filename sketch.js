const Engine= Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var myEngine, myWorld;
var bg;
var ground;
var tram1,tram2,tram3,tram4,tram5,tram6;
var chain1,chain2,chain3,chain4,chain5,chain6;
var rock1;
var trainSound; 
var crashSound;
var collision;
var flag = 0;

function preload(){
  bg= loadImage("images/bg.jpg");
  trainSound = loadSound("sound/train.mp3");
  crashSound = loadSound("sound/train_crossing.mp3");
}
function setup() {
  createCanvas(1200,400);
  myEngine = Engine.create();
  myWorld= myEngine.world;

  ground = new Ground(600,380,1200,10);

  tram1 = new Tram(width/4-250,height-230,50,50);
  tram2 = new Tram(width/4-150,height-230,50,50);
  tram3 = new Tram(width/4-50,height-230,50,50);
  tram4 = new Tram(width/3-50,height-230,50,50);
  tram5 = new Tram(width/3+50,height-230,50,50);
  tram6 = new Tram(width/2-50,height-230,50,50);
  
  rock1 = new Rock(width-50,height-230,100,100);

  chain1 = new Chain(tram1.body,tram2.body);
  chain2 = new Chain(tram2.body,tram3.body);
  chain3 = new Chain(tram3.body,tram4.body);
  chain4 = new Chain(tram4.body,tram5.body);
  chain5 = new Chain(tram5.body,tram6.body);
}

function draw() {
  background(bg);  
  Engine.update(myEngine);
  
  ground.show();

  tram1.show();
  tram2.show();
  tram3.show();
  tram4.show();
  tram5.show();
  tram6.show();

  rock1.show();

  chain1.show();  
  chain2.show();
  chain3.show();
  chain4.show();
  chain5.show();

  collision = Matter.SAT.collides(tram6.body,rock1.body);
  if(collision.collided){
    flag=1;
  }
  if(flag===1){
    textSize(40);
    fill("steelblue");
    text("Crash",width/2,height/2);
    crashSound.play();
  }
}

function keyPressed(){
  if(keyCode===RIGHT_ARROW){
    Matter.Body.applyForce(tram1.body,{x:tram6.body.position.x,y:tram6.body.position.y},{x:0.5,y:0});
    trainSound.play();
  }
}