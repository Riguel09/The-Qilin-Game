let p;
let qilin;
let gravity = 2;
let floorHeight = 100;
let covid;
let enemies = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = new Player();
}

function draw() {
  background(back);
  
  if(random(1) < 0.01){
    enemies.push(new Enemy());
  }
  for(let i of enemies){
    i.move();
    i.display()
    if(p.collision(i)){
    console.log("Game Over")
    noLoop()
  }
  }
  p.update();
  p.display();
  
}

function keyPressed(){
  if (key == " "){
    p.jump()
  }
}

function preload(){
  qilin = loadImage("qilin.png")
  covid = loadImage("coronavirus-5107804_1280.webp")
  back = loadImage("background.jpg")
}


class Player {
  constructor() {
    this.position = {
      x: 50,
      y: 90,
    }; // M: oh this looks great!

    this.velocity = {
      y: 0,
    };

    this.width = 125;
    this.height = 125;
  }
  display() {
    noStroke();
    fill(color(0, 0, 255));
    image(qilin,this.position.x, this.position.y, this.width, this.height);
  }

  jump(){
      this.velocity.y = -30
  }
  
  collision(i){
    
    if(i.x > this.position.x && i.x < this.width + this.position.x && i.y >       this.position.y && i.y < this.position.y + this.height){
      return true
    }
    
  }

  update() {
    this.position.y += this.velocity.y;

    if (
      this.position.y + this.height + this.velocity.y <=
      windowHeight
    ) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }

  }
  
}

class Enemy{
  
  constructor(){
    this.x = width
    this.y = windowHeight - 75
    this.width = 75;
    this.height = 75;
    
    
  }
  
  move(){
    this.x -= 10
  }

  display(){
    image(covid, this.x, this.y, this.width, this.height)
  }
}




