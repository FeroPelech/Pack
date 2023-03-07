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
let score = 0;
let hunters = [];
let huntersSum = 4;

const DR = 4;
const DU = 3;
const DL = 2;
const DB = 1;

let hunterLocation = [
  { x: 0, y: 0 },
  { x: 176, y: 0 },
  { x: 0, y: 121 },
  { x: 176, y: 121 },
];

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

let createNewPacman = () => {
  pacman = new Pac(blockSize, blockSize, blockSize, blockSize, blockSize / 5);
};

let createNewHunter = () => {
  hunters = [];
  for (let i = 0; i < huntersSum; i++) {
    let newHunter = new Hunter(
      9 * blockSize + (i % 2 == 0 ? 0 : 1) * blockSize,
      10 * blockSize + (i % 2 == 0 ? 0 : 1) * blockSize,
      blockSize,
      blockSize,
      Pac.velocity / 2,
      hunterLocation[i % 4].x,
      hunterLocation[i % 4].y,
      124,
      116,
      6 + i
    );
    hunters.push(newHunter);
  }
};

let gameRender = () => {
  draw();
  update();
};

let update = () => {
  pacman.moveProcess();
  pacman.eat();
};

let scoreboard = () => {
  canvasContext.font = "25px Emulogic";
  canvasContext.fillStyle = "grey";
  canvasContext.fillText(
    "Score: " + score,
    0,
    blockSize * (mapFirst.length + 1)
  );
};

let drawHunters = () => {
  for (let i = 0; i < hunters.length; i++) {
    hunters[i].draw();
  }
};

let draw = () => {
  //canvasContext(0, 0, canvas.width, canvas.height);
  createRect(0, 0, canvas.width, canvas.height, "black");
  drawWalls();
  drawMass();
  pacman.draw();
  scoreboard();
  drawHunters();
};

let drawMass = () => {
  for (let i = 0; i < mapFirst.length; i++) {
    for (let j = 0; j < mapFirst[0].length; j++) {
      if (mapFirst[i][j] == " ") {
        createRect(
          j * blockSize + blockSize / 3,
          i * blockSize + blockSize / 3,
          blockSize / 3,
          blockSize / 3,
          "yellow"
        );
      }
    }
  }
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
          "#878f99"
        );
      }
    }
  }
};

createNewPacman();
createNewHunter();
gameRender();

window.addEventListener("keydown", (event) => {
  let k = event.keyCode;

  setTimeout(() => {
    if (k == 37 || k == 65) {
      //left
      pacman.nextDirection = DL;
    } else if (k == 38 || k == 87) {
      //up
      pacman.nextDirection = DU;
    } else if (k == 39 || k == 68) {
      //right
      pacman.nextDirection = DR;
    } else if (k == 40 || k == 83) {
      //down
      pacman.nextDirection = DB;
    }
  }, 1);
});
