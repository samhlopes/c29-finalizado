const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var holder, ball, ground;
var stand1, stand2;
var ball;
var slingShot;
var polygon_img;

var blocks1;
var blocks2;
function preload() {
  polygon_img = loadImage("polygon.png");
}
function setup() {
  createCanvas(900, 400);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  ground = new Ground();
  stand1 = new Stand(390, 300, 290, 10);
  stand2 = new Stand(700, 200, 200, 10);

  var blocosParaDeletar1 = [
    { x: 0, y: 2 },
    { x: 0, y: 1 },
    { x: 6, y: 2 },
    { x: 6, y: 1 },
     { x: 1, y: 2 },
    { x: 5, y: 2 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    //{ x: 3, y: 3 },
    { x: 5, y: 3 },
    { x: 6, y: 3 },
    { x: 7, y: 3 },
    { x: 0, y: 3 },
    { x: 4, y: 3 },
  ];
  var blocosParaDeletar2 = [
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 6, y: 1 },
    { x: 6, y: 2 },
    { x: 1, y: 2 },
    { x: 5, y: 2 },
    { x: 2, y: 2 },
    { x: 4, y: 2 },
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 6, y: 0 },
    { x: 5, y: 1 },];


  blocks1 = criarBlocos(300, 275, blocosParaDeletar1, 7,4);
  blocks2 = criarBlocos(610, 175, blocosParaDeletar2,7,4);

  polygon = Bodies.circle(50,200,20);
  World.add(world,polygon);

  slingShot = new Slingshot(this.polygon,{x:100,y:200});
}
function draw() {
  background(56, 44, 44);

  textSize(20);
  fill("lightyellow");

  ground.display();
  stand1.display();
  stand2.display();

  strokeWeight(2);
  stroke(15);
  fill("skyblue");

  for (var i = 0; i < blocks1.length; i++) {
    if (i < 7) {
      fill("pink");
    } else if (i < 12) {
      fill("turquoise");
    } else if (i < 15) {
      fill("grey");
    }else {
      fill ("white");
    }
    blocks1[i].display();
  }

  for (var i = 0; i < blocks2.length; i++) {
    if ( i < 5) {
      fill("green")
    } else if (i < 8) {
      fill("purple")
    } else {
      fill ("white")
    }
    blocks2[i].display();
  }

  fill("gold");
  imageMode(CENTER)
  image(polygon_img ,polygon.position.x,polygon.position.y,40,40);


  slingShot.display();

}

function criarBlocos(startX, startY, blocosParaDeletar, blocksQuantityX, blocksQuantityY) {
  var blocks = [];
  var width = 30;
  var height = 40;

  for (var y = 0; y < blocksQuantityY; y++) {
    for (var x = 0; x < blocksQuantityX; x++) {
      var precisoCriarOBloco = true;

      for (var iDeletar = 0; iDeletar < blocosParaDeletar.length; iDeletar++) {
        var meDelete = blocosParaDeletar[iDeletar]

        if (meDelete.x === x && meDelete.y === y)
          precisoCriarOBloco = false
      }

      if (precisoCriarOBloco === false)
        continue;

      var blockX = startX + (width * x);
      var blockY = startY - (height * y);
      blocks.push(new Block(blockX, blockY, width, height));
    }
  }

  return blocks;
}


function mouseDragged(){
  Matter.Body.setPosition(this.polygon,{x:mouseX,y:mouseY});
}
function mouseReleased(){
  slingShot.fly();
}