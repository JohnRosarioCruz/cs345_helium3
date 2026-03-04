let color = 0;
let colorChange = 1;

let rectSize = 10;
let rectSizeChange = 10;
let rectDist = 0;
let rectDistChange = 1;

let ballX = 10;
let ballD = 20;
let ballR = ballD / 2;
let ballY = 200 - ballR;

let velocity = 0.0;
// account for 9.8 m/s with frame count (earth gravity woohoo)
let gravity = 9.8/60;
let rebound = -0.9;

// copy vertical kinematics with horizontal
let horizontalVelocity = 45;
// Decay simulates gravity
let horizontalDecay = 0.99;



function setup() {
  createCanvas(400, 400);
}

function draw() {
  // set when to bounce up, height is const of canvas, set when to bounce off wall
  let floorY = height - ballR;
  let floorX = width - ballR;
  
  velocity += gravity;
  ballY += velocity;
  // making ball bounce UP
  if (ballY > floorY) {
    ballY = floorY;
    velocity *= rebound;
  }
  
  horizontalVelocity *= horizontalDecay;
  ballX += horizontalVelocity;

  // decrement horizontal velocity, determine if wall bounce
  // if ballX at right wall, else if left wall
  if (ballX > width - ballR) {
    ballX = width - ballR;
    horizontalVelocity *= -1;
  } else if (ballX < ballR) {
    ballX = ballR;
    horizontalVelocity *= -1;
  }

  // changing colors
  if (frameCount % 200 == 0) {
    colorChange *= -1;
  }
  
  // 380 pixel dist, 10 equal increments
  if (frameCount % (380/10) == 0) {
    rectSize += rectSizeChange;
  }
  
  // making square smaller and going the other way
  if (frameCount % 310 == 0) {
    rectSizeChange *= -1;
    rectDistChange *= -1;
  }
  
  // making rect move 
  rectDist += rectDistChange;
  // make color change
  color += colorChange;
  

  
  background(color, color/3.8, color/1.8);
  // doing two, one diag and one by project spec
  // change color if squares intersect
  if (rectDist + 100 == rectDist + rectDist) {
    // choose random color
    let random_colors = [random(255), random(255), random(255)];
    fill(random_colors[0], random_colors[1], random_colors[2]);
  }
  
  rect(rectDist, 100, rectSize, rectSize);
  rect(rectDist, rectDist, rectSize, rectSize);
  circle(ballX, ballY, ballD);
}