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
    this.nextDirection = this.direction;

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

  eat() {
    for (let i = 0; i < mapFirst.length; i++) {
      for (let j = 0; j < mapFirst[0].length; j++) {
        if (
          mapFirst[i][j] == " " &&
          this.getFirstMapX() == j &&
          this.getFirstMapY() == i
        ) {
          mapFirst[i][j] = "e ";
          score++;
        }
      }
    }
  }

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
      mapFirst[this.getFirstMapY()][this.getFirstMapX()] == "w" ||
      mapFirst[this.getFirstMapYRightSide()][this.getFirstMapX] == "w" ||
      mapFirst[this.getFirstMapY()][this.getFirstMapXRightSide] == "w" ||
      mapFirst[this.getFirstMapYRightSide()][this.getFirstMapXRightSide()] ==
        "w"
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkGhostCollision() {}

  changeDirectionIfPossible() {
    if (this.direction == this.nextDirection) return;

    let tempDirection = this.direction;
    this.direction = this.nextDirection;
    this.moveForwards();
    if (this.checkCollision()) {
      this.moveBackwards();
      this.direction = tempDirection;
    } else {
      this.moveBackwards();
    }
  }

  changeAnimation() {
    this.currentFrame =
      this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
  }

  draw() {
    canvasContext.save();
    canvasContext.translate(this.x + blockSize / 2, this.y + blockSize / 2);
    canvasContext.rotate((this.direction * 90 * Math.PI) / 180);
    canvasContext.translate(-this.x - blockSize / 2, -this.y - blockSize / 2);
    canvasContext.drawImage(
      pacFrames,
      (this.currentFrame - 1) * blockSize,
      0,
      blockSize,
      blockSize,
      this.x,
      this.y,
      this.width,
      this.height
    );
    canvasContext.restore();
  }

  getFirstMapX() {
    return parseInt(this.x / blockSize);
  }

  getFirstMapY() {
    return parseInt(this.y / blockSize);
  }

  getFirstMapXRightSide() {
    return parseInt((this.x + 0.99 * blockSize) / blockSize);
  }

  getFirstMapYRightSide() {
    return parseInt((this.y + 0.99 * blockSize) / blockSize);
  }
}
