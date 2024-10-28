class Seeds extends GameObject {
  constructor(pos, plant) {
    super(pos);
    this.onClick = this.buy;
    this.mouseOver = this.mouseCheck;
    this.width = 50;
    this.height = 70;
    this.plant = plant;
    this.img = this.loadPlantImage();
  }

  loadPlantImage() {
    if (this.plant === Sunflower) {
      return SunflowerImg;
    } else if (this.plant === Peashooter) {
      return PeashooterImg;
    }
    return null;
  }

  draw() {
    push();
    translate(this.pos);
    
    image(this.img, 0, 0, this.width, this.height);

    textSize(16);
    fill(0);
    textAlign(CENTER);
    let cost = this.plant.cost();
    text(`$${cost}`, this.width / 2, this.height + 15);

    pop();
  }
  
  buy() {
    if (this.plant.cost() <= suns) {
      suns -= this.plant.cost();
      newPlant = new this.plant();
    }
  }

  mouseCheck(mousePos) {
    return (mousePos.x > this.pos.x &&
      mousePos.x < this.pos.x + this.width &&
      mousePos.y > this.pos.y &&
      mousePos.y < this.pos.y + this.height);
  }
}