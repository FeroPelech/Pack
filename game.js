const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacFrames = document.getElementById("animations");
const hunterFrames = document.getElementById("hunters");

let createRect = (x, y, width, height, color) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
};
let fps = 30;
let blockSize = 20;
let mapFirst = [
  [
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
  ],
  [
    "w",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
  ],
  [
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
  ],
  [
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
  ],
  [
    "w",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
  ],
  [
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
    " ",
    "w",
    "w",
    "w",
    "w",
    "w",
    " ",
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
  ],
  [
    "w",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
    " ",
    " ",
    " ",
    "w",
    " ",
    " ",
    " ",
    "w",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
  ],
  [
    "w",
    "w",
    "w",
    "w",
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
    "w",
    "w",
    "w",
    "w",
  ],
  [
    "n",
    "n",
    "n",
    "n",
    "w",
    " ",
    "w",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
    " ",
    "w",
    "n",
    "n",
    "n",
    "n",
  ],
  [
    "w",
    "w",
    "w",
    "w",
    "w",
    " ",
    "w",
    " ",
    "w",
    "w",
    " ",
    "w",
    "w",
    " ",
    "w",
    " ",
    "w",
    "w",
    "w",
    "w",
    "w",
  ],
  [
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
    " ",
    " ",
    " ",
    "w",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
  ],
  [
    "w",
    "w",
    "w",
    "w",
    "w",
    " ",
    "w",
    " ",
    "w",
    " ",
    " ",
    " ",
    "w",
    " ",
    "w",
    " ",
    "w",
    "w",
    "w",
    "w",
    "w",
  ],
  [
    "n",
    "n",
    "n",
    "n",
    "w",
    " ",
    "w",
    " ",
    "w",
    "w",
    "w",
    "w",
    "w",
    " ",
    "w",
    " ",
    "w",
    "n",
    "n",
    "n",
    "n",
  ],
  [
    "n",
    "n",
    "n",
    "n",
    "w",
    " ",
    "w",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
    " ",
    "w",
    "n",
    "n",
    "n",
    "n",
  ],
  [
    "w",
    "w",
    "w",
    "w",
    "w",
    " ",
    " ",
    " ",
    "w",
    "w",
    "w",
    "w",
    "w",
    " ",
    " ",
    " ",
    "w",
    "w",
    "w",
    "w",
    "w",
  ],
  [
    "w",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
  ],
  [
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
    "w",
    "w",
    " ",
    "w",
  ],
  [
    "w",
    " ",
    " ",
    " ",
    "w",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
    " ",
    " ",
    " ",
    "w",
  ],
  [
    "w",
    "w",
    " ",
    " ",
    "w",
    " ",
    "w",
    " ",
    "w",
    "w",
    "w",
    "w",
    "w",
    " ",
    "w",
    " ",
    "w",
    " ",
    " ",
    "w",
    "w",
  ],
  [
    "w",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
    " ",
    " ",
    " ",
    "w",
    " ",
    " ",
    " ",
    "w",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
  ],
  [
    "w",
    " ",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    " ",
    "w",
    " ",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    " ",
    "w",
  ],
  [
    "w",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "w",
  ],
  [
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
  ],
];

let gameRender = () => {
  update();
  draw();
};

let update = () => {
  //todo
};

let draw = () => {
  drawWalls();
  //todo
};

let gameInterval = setInterval(gameRender, 1000 / fps);

let drawWalls = () => {
  for (let i = 0; i < mapFirst.length; i++) {
    for (let j = 0; j < mapFirst[0].length; j++) {
      if (mapFirst[i][j] == "w") {
        createRect(
          j * blockSize,
          i * blockSize,
          blockSize,
          blockSize,
          "#black"
        );
      }
    }
  }
};