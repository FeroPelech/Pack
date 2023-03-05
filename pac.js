class Pac {
  constructor(x, y, width, height, velocity) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
    this.direction = DR;
    this.currentFrame = 1;
    this.frameCount = 7;

    setInterval(() => {
      this.changeAnimation();
    }, 100);
  }

  moveProcess() {
    this.changeDirectionIfPossible();
    this.moveForwards();
    if (this.checkCollision()) {
      this.moveBackwards();
    }
  }

  eat() {}

  moveBackwards() {
    switch (this.direction) {
      case DR:
        this.x -= this.velocity;
        break;
      case DU:
        this.y += this.velocity;
        break;
      case DL:
        this.x += this.velocity;
        break;
      case DB:
        this.y -= this.velocity;
        break;
    }
  }

  moveForwards() {
    switch (this.direction) {
      case DR:
        this.x += this.velocity;
        break;
      case DU:
        this.y -= this.velocity;
        break;
      case DL:
        this.x -= this.velocity;
        break;
      case DB:
        this.y += this.velocity;
        break;
    }
  }

  checkCollision() {
    if (
      mapFirst[this.getFirstMapY()][this.getFirstMapX()] == 1 ||
      mapFirst[this.getFirstMapYRightSide()][this.getFirstMapX] == 1 ||
      mapFirst[this.getFirstMapY()][this.getFirstMapXRightSide] == 1 ||
      mapFirst[this.getFirstMapYRightSide()][this.getFirstMapXRightSide()] == 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkGhostCollision() {}

  changeDirectionIfPossible() {}

  changeAnimation() {
    this.currentFrame =
      this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
  }

  draw() {}

  getFirstMapX() {
    return parseInt(this.x / blockSize);
  }

  getFirstMapY() {
    return parseInt(this.y / blockSize);
  }

  getFirstMapXRightSide() {
    return parseInt((this.x + 0.9999 * blockSize) / blockSize);
  }

  getFirstMapYRightSide() {
    return parseInt((this.y + 0.9999 * blockSize) / blockSize);
  }
}
