let sprPeashooter, sprPeashooterShoot;

class Peashooter extends Plant {
  static cost(){
   return 100; 
  }
  
  static preload(){
    sprPeashooter = loadImage("img/peashooter.gif");     
    sprPeashooterShoot = loadImage("img/peashooterShoot.gif");
  }
  
  constructor(){
    super(sprPeashooter);
    this.reloadtime = 1400; 
    this.weaponOffset = createVector(20,-10);
  }
  
 
  *shoot(){
    this.image = sprPeashooterShoot;
    let rememberIndex = this.spriteIndex;
    this.spriteIndex = 0;
    
    //wait until right moment to make a pea
    let shootAnimationOffset = 8;
    while(this.spriteIndex < shootAnimationOffset){
     yield; 
    }
    
    //make a pea
    let peaposition = p5.Vector.add(this.pos,this.weaponOffset);
    addGameObject( new Pea(peaposition) );
    this.cooldown = this.reloadtime;
    
    //wait until the animation ends
    while(this.spriteIndex !== 0 ){
     yield; 
    }
    
    //go back to other image
    this.spriteIndex = rememberIndex;
    this.image = sprPeashooter;
  }
  
  *waitForZombies(){
    
    let zombies = 0;
    while(zombies == 0){
      zombies = findObjectsOfType(this.cell.y,Zombie).length;
      yield sleep(50);
    }
    
    startCoroutine(this.shoot());
  }
  
  cooldownFinish(){
    startCoroutine(this.waitForZombies());
  }

}