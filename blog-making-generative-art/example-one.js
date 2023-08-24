/*
 * Created on Thursday 24 August 2023
 *
 * Features as a basic introduction to generative art in "Making Generative Art"
 * Name: Stage One
 * Link: https://www.datarav3.art/blog/how-i-started-making-generative-art
 * Requires: https://p5js.org/
 */

stillCircles = [];
stillCirclesAmount = 10;
stillCirclesColour = [245, 245, 245];

movingCircles = [];
movingCirclesAmount = 1;
movingCirclesColour = [255, 165, 0];

circleSize = 50;

function setup() {
  createCanvas(800, 450);
  noStroke();

  for (let i = 0.5; i < stillCirclesAmount; i++) {
    stillCircles.push(
      new CoolCircle(
        (width / stillCirclesAmount) * i,
        random(circleSize, height - circleSize),
        circleSize,
        stillCirclesColour
      )
    );
  }

  for (let i = 0; i < movingCirclesAmount; i++) {
    movingCircles.push(
      new CoolMover(width / 2, height / 2, circleSize, movingCirclesColour)
    );
  }
}

function draw() {
  background(10);

  for (let c of stillCircles) {
    c.display();
  }

  for (let c of movingCircles) {
    c.move();
    c.display();
  }
}

class CoolCircle {
  constructor(x, y, size, colour) {
    this.pos = createVector(x, y);
    this.size = size;
    this.colour = colour;
  }

  display() {
    fill(...this.colour);
    circle(this.pos.x, this.pos.y, this.size);
  }
}

class CoolMover extends CoolCircle {
  constructor(x, y, size, colour) {
    super(x, y, size, colour);
    this.velocity = createVector(random(-10, 10), random(-10, 10));
  }

  move() {
    this.pos.add(this.velocity);
    this.velocity = createVector(random(-10, 10), random(-10, 10));
  }
}
