let sndZombiesComing, sndScream;
let sprZombie;

class Zombie extends Character{
  static preload(){
    sprZombie = loadImage("img/zombie.gif");
    
    sndZombiesComing = loadSound("snd/The_Zombies_Are_Coming.ogg");
    sndScream = loadSound("snd/Scream.ogg");
  }
  
  constructor(row){
    let col = backyard.numCellsX;
    let pos = backyard.cellToPixel(col,row);
    //offset floating zombie to look better
    pos.y-=backyard.cellSize/2; 
    super(pos,sprZombie);
    
    this.attackPower = 30;
    this.cell = createVector(col,row);
    this.speed = -25;
    this.vel = createVector(this.speed,0);
    this.width = 30;
    startCoroutine(this.waitForPlant());
  }
  
  update(){
    super.update();
    if(this.pos.x < backyard.pos.x){ 
      noLoop(); 
      //TODO MAKE GAME OVER BETTER
      sndScream.play();
      console.log("GAME OVER");
    }

  }
  
  eat(plant){
    plant.receiveDmg(this.attackPower);
    this.cooldown = this.reloadtime;
    
  }
  
  *waitForPlant(){
        
    let isThereAPlant = false;
    while(!isThereAPlant){
      this.vel.x = this.speed;
      let plants = findObjectsOfType(this.cell.y,Plant);
      
      for(const plant of plants){
        if(this.hits(plant)){
          this.vel.x = 0;
          this.eat(plant);
          isThereAPlant = true;
        }
      }
    
      yield sleep(50);
    }
    
  }
  
  cooldownFinish(){
    startCoroutine(this.waitForPlant());
  }
  
  
}