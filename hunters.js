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
    this.randomTargetIndex = parseInt(Math.random() * targetForHunters.length);
    setInterval(() => {
      this.changeRandomDirection();
    }, 1000);
  }

  changeRandomDirection() {
    this.randomTargetIndex += 1;
    this.randomTargetIndex = this.randomTargetIndex % 4;
  }

  moveProcess() {
    if (this.isInRangeOfPacman()) {
      target = pacman;
    } else {
      this.target = targetForHunters[this.randomTargetIndex];
    }
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

  isInRangeOfPacman() {
    let xDistance = Math.abs(pacman.getFirstMapX() - this.getFirstMapX());
    let yDistance = Math.abs(pacman.getFirstMapY() - this.getFirstMapY());
    if (
      Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= this.range
    ) {
      return true;
    } else {
      return false;
    }
  }

  changeDirectionIfPossible() {
    let tempDirection = this.direction;
    this.direction = this.calculateNewDirection(
      mapFirst,
      parseInt(this.target.x / blockSize),
      parseInt(this.target.y / blockSize)
    );

    if (typeof this.direction == "undefined") {
      this.direction = tempDirection;
      return;
    }

    this.moveForwards();
    if (this.checkCollision()) {
      this.moveBackwards();
      this.direction = tempDirection;
    } else {
      this.moveBackwards();
    }
  }

  calculateNewDirection(map, destX, destY) {
    let mp = [];
    for (let i = 0; i < mapFirst.length; i++) {
      mp[i] = map[i].slice();
    }
    let que = [{ x: this.getFirstMapX(), y: this.getFirstMapY, moves: [] }];

    while (que.length > 0) {
      let poped = que.shift();
      if (poped.x == destX && poped.y == destY) {
        return poped.moves[0];
      } else {
        mp[poped.y][poped.x] = 1;
        let neighbourList = this.addNeighbours(poped, mp);
        for (let i = 0; i < neighbourList.length; i++) {
          que.push(neighbourList[i]);
        }
      }
    }
    return DU;
  }

  addNeighbours(poped, mp) {
    let que = [];
    let numberOfRows = mp.length;
    let numberOfColumns = mp[0].length;
    if (
      poped.x - 1 >= 0 &&
      poped.x - 1 < numberOfRows &&
      mp[poped.y][poped.x - 1] != 1
    ) {
      let tempMoves = poped.moves.slice();
      tempMoves.push(DR);
      que.push({ x: poped.x - 1, y: poped, moves: tempMoves });
    }
    if (
      poped.x + 1 >= 0 &&
      poped.x + 1 < numberOfRows &&
      mp[poped.y][poped.x + 1] != 1
    ) {
      let tempMoves = poped.moves.slice();
      tempMoves.push(DL);
      que.push({ x: poped.x + 1, y: poped, moves: tempMoves });
    }
    if (
      poped.y - 1 >= 0 &&
      poped.y - 1 < numberOfRows &&
      mp[poped.y - 1][poped.x] != 1
    ) {
      let tempMoves = poped.moves.slice();
      tempMoves.push(DU);
      que.push({ x: poped.x, y: poped.y - 1, moves: tempMoves });
    }
    if (
      poped.y + 1 >= 0 &&
      poped.y + 1 < numberOfRows &&
      mp[poped.y + 1][poped.x] != 1
    ) {
      let tempMoves = poped.moves.slice();
      tempMoves.push(DB);
      que.push({ x: poped.x, y: poped.y + 1, moves: tempMoves });
    }
    return que;
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
