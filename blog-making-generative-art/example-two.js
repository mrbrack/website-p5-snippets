/*
 * Created on Thursday 24 August 2023
 *
 * Features as a basic introduction to generative art in "Making Generative Art"
 * Name: Example Two
 * Link: https://www.datarav3.art/blog/how-i-started-making-generative-art
 * Requires: https://p5js.org/
 */

const stillCircles = [];
const stillCirclesAmount = 10;
const stillCirclesColour = [245, 245, 245];

const movingCircles = [];
const movingCirclesAmount = 1;
const movingCirclesColour = [255, 165, 0];

const circleSize = 50;

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
    c.intersect();
    c.display();
  }
}

function keyPressed() {
  if (key === "s") {
    saveGif("mySketch", 10);
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
    this.intersectColor = [
      [234, 123, 178],
      [45, 67, 10],
      [200, 234, 254],
    ];
  }

  move() {
    this.pos.add(this.velocity);
    this.velocity = createVector(random(-10, 10), random(-10, 10));
  }

  intersect() {
    for (let c of stillCircles) {
      const distance = dist(this.pos.x, this.pos.y, c.pos.x, c.pos.y);
      const radiusSum = (this.size + c.size) / 2;
      if (distance < radiusSum) {
        this.colour = random(this.intersectColor);
        return;
      } else {
        this.colour = movingCirclesColour;
      }
    }
  }
}
