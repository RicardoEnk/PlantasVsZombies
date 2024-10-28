class Character extends GameObject{
  constructor(position,img = null){
    super(position,img);
    this.health = 100;
    this.cell = null;
    this.reloadtime = 1000;
    this.cooldown = 0;
    this.width = backyard.cellSize;
    if(img){
      this.imgW = backyard.cellSize;
      this.imgH = img.height / img.width * this.imgW;
    }
    
  }
  
  die(){
     this.health = 0;
     this.vel=createVector(0,0);
     this.deleteMe = true;
  }
  
  receiveDmg(dmg){
    this.health -= dmg;
    if(this.health <= 0){
      this.die(); 
    }
  }
  
  cooldownFinish(){
    
  }
  
  
  update(){
    super.update();
    if(this.cooldown > 0){
      this.cooldown -= deltaTime;
      if(this.cooldown <= 0){
         this.cooldown = 0;
         this.cooldownFinish();
      }
    }
  }
  
  place(x,y){
    this.cell = createVector(x,y);
    this.pos = backyard.cellToPixel(x,y);
    this.cooldown = this.reloadtime;
  }
    
  hits(o) {
    if (o instanceof Character && o.health === 0) {
      return false;
    }
    if (o.cell.y === this.cell.y) {
      let ols = this.pos.x - this.width / 2;
      let ors = this.pos.x + this.width / 2;
      if (o.pos.x > ols && o.pos.x < ors) {
        return true;
      }
    }
    return false;
  }
  
}