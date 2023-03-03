class Pac {
  constructor(x, y, width, height, velocity) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
    this.direction = DR;
  }

  moveProcess() {
    this.changeDirectionIfPossible();
    this.moveForwards();
    if (this.checkCollision()) {
      this.moveBackwards();
    }
  }

  eat() {}

  moveBackwards() {}

  moveForwards() {}

  checkCollision() {}

  checkGhostCollision() {}

  changeDirectionIfPossible() {}

  changeAnimation() {}

  draw() {}
}
