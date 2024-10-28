class GameObject {
  constructor(position, img = null) {
    this.pos = position.copy();
    this.vel = createVector(0, 0);
    this.image = img;
    this.onClick = null;
    this.mouseOver = null;
    this.deleteMe = false;
    this.imgW = null;
    this.imgH = null;
    this.spriteIndex = 0;
    this.spriteSpeed = 1;
  }

  update() {
    this.pos.add( p5.Vector.mult(this.vel,deltaTime/1000) );
  }

  draw() {
    push()
    translate(this.pos.x, this.pos.y);
    imageMode(CENTER);

    this.image.setFrame(floor(this.spriteIndex));
    image(this.image, 0, 0, this.imgW, this.imgH);

    this.spriteIndex = (this.spriteIndex + this.spriteSpeed) % this.image.numFrames();
    pop();
  }

}