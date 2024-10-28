let sprPea;
let sounds = [];

class Pea extends GameObject {
  static preload() {
    sprPea = loadImage("img/Pea.png");
    for (let i = 1; i <= 3; i++) {
      sounds.push(
        loadSound("snd/Splat" + i + ".ogg")
      );
    }
  }

  constructor(position) {
    super(position, sprPea);
    this.vel = createVector(300, 0);
    this.cell = backyard.pixelToCell(this.pos.x, this.pos.y);
    this.dmg = 10;
    this.imgW = 30;
    this.imgH = 30;
  }

  update() {
    super.update();
    if (this.pos.x > width) {
      this.deleteMe = true;
    }
    let zombies = findObjectsOfType(this.cell.y, Zombie);

    for (const zombie of zombies) {
      if (zombie.hits(this)) {
        zombie.receiveDmg(this.dmg);
        random(sounds).play();
        this.deleteMe = true;
      }
    }

  }

}