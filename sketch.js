let backyard;
let backyardObjects = [];
let otherObjects = [];
let newPlant = null;
let gameStarted = false;
let gameOver = false;
let gameOverImg;

let suns = 0;
let sunTimer = 7000;

function startGame() {
  gameStarted = true;
  document.getElementById("start-screen").style.display = "none";

  startCoroutine(spawnZombies());
  startCoroutine(rainSuns());
}

function* spawnZombies() {
  yield sleep(13000);
  sndZombiesComing.play();
  yield sleep(2000);

  while (true) {
    let row = floor(random(0, backyard.numCellsY));
    addGameObject(new Zombie(row));
    yield sleep(10000);
  }
}

function* rainSuns() {
  while (true) {
    let randomX = random(backyard.width) + backyard.pos.x;
    let randomY = random(backyard.height) + backyard.pos.y;

    let starting = createVector(randomX, -20);
    let landing = createVector(randomX, randomY);

    addGameObject(new Sun(starting, landing));
    yield sleep(sunTimer);
  }
}

function addGameObject(obj) {
  if (obj.cell) {
    backyardObjects[obj.cell.y].push(obj);
  } else {
    otherObjects.push(obj);
  }
}

function preload() {
  SunImg = loadImage('img/Sun.png');
  bgImage = loadImage('img/Day.png');
  SunflowerImg = loadImage('img/Sunflower.gif'); 
  PeashooterImg = loadImage('img/peashooter.gif');
  Sun.preload();
  Pea.preload();
  Peashooter.preload();
  Sunflower.preload();
  Zombie.preload();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(bgImage);
  backyard = new Backyard(createVector(260, 100));

  for (let i = 0; i < backyard.numCellsY; i++) {
    backyardObjects.push([]);
  }

  addGameObject(new Seeds(createVector(150, 20), Sunflower));
  addGameObject(new Seeds(createVector(210, 20), Peashooter));
}

function draw() {
  if (!gameStarted) {
    background(0);
    return;
  }

  tickCoroutines();

  image(bgImage, 0, 0, width, height);

  backyard.update();
  backyard.draw();
  

  textSize(20);
  text(suns, 55, 47);

  for (let i = otherObjects.length - 1; i >= 0; i--) {
    otherObjects[i].update();
    if (otherObjects[i].deleteMe) {
      otherObjects.splice(i, 1);
    }
  }
  for (const row of backyardObjects) {
    for (let i = row.length - 1; i >= 0; i--) {
      row[i].update();
      if (row[i].deleteMe) {
        row.splice(i, 1);
      }
    }
  }

  for (let i = 0; i < otherObjects.length; i++) {
    otherObjects[i].draw();
  }
  for (const row of backyardObjects) {
    for (let i = 0; i < row.length; i++) {
      row[i].draw();
    }
  }

  if (newPlant != null) {
    newPlant.pos.x = mouseX;
    newPlant.pos.y = mouseY;
    newPlant.draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  let mousePos = createVector(mouseX, mouseY);
  for (let i = 0; i < otherObjects.length; i++) {
    if (otherObjects[i].onClick != null) {
      if (otherObjects[i].mouseOver(mousePos)) {
        otherObjects[i].onClick();
      }
    }
  }
}

function mouseReleased() {
  if (newPlant != null) {
    newPlant.plant();
    addGameObject(newPlant);
    newPlant = null;
  }
}


function findObjectsOfType(row, type) {
  let found = [];
  for (const obj of backyardObjects[row]) {
    if (obj instanceof type) {
      found.push(obj);
    }
  }

  return found;
}