let p;
let qilin;
let gravity = 2;
let floorHeight = 100;
let covid;
let enemies = [];
let enemySpeed = 3;
let score = 0;

function preload() {
  qilin = loadImage("qilin.png");
  covid = loadImage("coronavirus-5107804_1280.webp");
  back = loadImage("background.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = new Player();
}

function draw() {
  background(back);
  
  enemySpeed += 0.001; /// ***
  
  if (random(1) < 0.03) {
    enemies.push(new Enemy());
  }
  
  for (let i of enemies) {
    i.move();
    i.display();
    if (p.collision(i)) {
      //console.log("Game Over");
      //noLoop();
    }
  }
  p.update();
  p.display();
  
  textSize(50);
  fill(255);
  text("Score: " + score, 35, 70); // play with a different font?
}

function keyPressed() {
  if (key == " ") {
    p.jump();
  }
}

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 90,
    };
    this.velocity = {
      y: 0,
    };
    this.width = 125;
    this.height = 125;
  }
  display() {
    push();
    noStroke();
    fill(color(0, 0, 255));
    image(qilin, this.position.x, this.position.y, this.width, this.height);
    pop();
  }
  jump() {
    this.velocity.y = -30;
  }
  collision(i) {
    if (
      i.x > this.position.x &&
      i.x < this.width + this.position.x &&
      i.y > this.position.y &&
      i.y < this.position.y + this.height
    ) {
      //return true;
      // increase the score
      score++; // ***
      
      // shoot the enemy away
      i.xSpd = random(10, 40);
      i.ySpd = random(-5, 5);
    }
  }
  update() {
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= windowHeight) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

class Enemy {
  constructor() {
    this.x = width;
    this.y = random(height);
    this.xSpd = random(-2, -1) * enemySpeed; // ***
    this.ySpd = random(-3, 3);
    this.size = random(30, 75);
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  display() {
    push();
    imageMode(CENTER);
    image(covid, this.x, this.y, this.size, this.size);
    pop();
  }
}




