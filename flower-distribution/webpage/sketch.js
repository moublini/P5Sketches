//<reference path="./intellisense-config/p5.global-mode.d.ts"/>
//point variables
let point_num = 1;
let point_size;
const max_points = 1000;
//speed of zoom-out for animation
const k = 100;
//turns in TWO_PI * turns radians
let turns = 0;
const static_image = false;
// play animation
const zoom_out = false;
const increment = 1/(10e4);
const refresh_rate = 165;
//Golden ratio here (1.618... and 0.618... can be both interpreted as PHI)
const GOLDEN_RATIO = 0.61803398875;

function setup() {
  //Inital settings
  createCanvas(windowWidth, windowHeight);
  frameRate(refresh_rate);
  background(0);
  stroke(255);
  strokeWeight(1);
  noFill()
  ellipseMode(CENTER);
  
  if (!static_image) return;
  
  translate(width/2,height/2);
  //Drawing the static image with GOLDEN_RATIO turns
  turns = GOLDEN_RATIO;
  point_num = max_points
  point_size = width/point_num;

  for (let i = 0; i < point_num; i++) {
    colorMode(HSB, 360);
    stroke(360 * (i/point_num), 360, 360)
    rotate(TWO_PI * turns);
    ellipse(i * point_size, 0, point_size);
    colorMode(RGB, 255);
  }
}

function draw() {
  if (static_image) return;
  resizeCanvas(windowWidth, windowHeight);
  background(0);

  //Same as the static image drawing iteration but starting from 0 points.
  translate(width/2,height/2);
  point_size = width/point_num;

  for (let i = 0; i < point_num; i++) {
    colorMode(HSB, 360);
    stroke((360 * i)/point_num, 360, 360)
    rotate(TWO_PI * turns);
    ellipse(i * point_size, 0, point_size);
    colorMode(RGB, 255);
  }

  turns += increment;
  turns %= 1;

  if (zoom_out) {point_num += ((max_points - point_num) * k)/(max_points * refresh_rate);}
  else {point_num = max_points;}
}