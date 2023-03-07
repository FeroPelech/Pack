class Hunter {
  constructor(
    x,
    y,
    width,
    height,
    velocity,
    imageX,
    imageY,
    imageWidth,
    imageHeight,
    range
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
    this.direction = DR;
    this.imageX = imageX;
    this.imageY = imageY;
    this.imageHeight = imageHeight;
    this.imageWidth = imageWidth;
    this.range = range;
  }

  moveProcess() {
    this.changeDirectionIfPossible();
    this.moveForwards();
    if (this.checkCollision()) {
      this.moveBackwards();
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
    canvasContext.drawImage(
      hunterFrames,
      this.imageX,
      this.imageY,
      this.imageWidth,
      this.imageHeight,
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
