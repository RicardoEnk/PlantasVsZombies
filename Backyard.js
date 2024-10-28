class Backyard extends GameObject {
  constructor(position) {
    super(position);

    this.numCellsX = 9;
    this.numCellsY = 6;
    this.width = 900;


    this.cellSize = 100;
    this.height = this.cellSize * this.numCellsY; 

  }

  draw() {
    
    let mouseCell = this.pixelToCell(mouseX, mouseY);

    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    noFill(); 
    for (let nY = 0; nY < this.numCellsY; nY++) {
      for (let nX = 0; nX < this.numCellsX; nX++) {

        let x = map(nX, 0, this.numCellsX, 0, this.width);
        let y = map(nY, 0, this.numCellsY, 0, this.height);

        let darker = (nX + nY) % 2 == 0 ? 1.1 : 1;
        
        rect(x, y, this.cellSize, this.cellSize);

        
        if (mouseCell.x == nX || mouseCell.y == nY) {
          fill(255, 40);
          rect(x, y, this.cellSize, this.cellSize);
        }


      }
    }
    pop();
  }


  pixelToCell(px, py) {
    px = px - this.pos.x;
    py = py - this.pos.y;

    let cx = floor(px / this.width * this.numCellsX);
    let cy = floor(py / this.height * this.numCellsY);

    return createVector(cx, cy);
  }

  cellToPixel(cx, cy) {
    let px = cx / this.numCellsX * this.width;
    let py = cy / this.numCellsY * this.height;

    px = px + this.pos.x + this.cellSize / 2;
    py = py + this.pos.y + this.cellSize / 2;

    return createVector(px, py);
  }

  contains(px, py) {
    if (px > this.pos.x &&
      py > this.pos.y &&
      px < this.pos.x + this.width &&
      py < this.pos.y + this.height) {
      return true;
    }
    return false;
  }


}