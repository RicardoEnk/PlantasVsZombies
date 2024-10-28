let sprSunflower, sprSunflowerProduce;

class Sunflower extends Plant{
  static cost(){
   return 50; 
  }
  
  static preload(){
    sprSunflower = loadImage("img/Sunflower.gif");     
    sprSunflowerProduce = loadImage("img/SunflowerProduce.gif");
  }
  
  constructor(){
     super(sprSunflower); 
     this.reloadtime = 15000; //milliseconds
     this.spriteSpeed = 0.2;
  }

  
  produce(){
    let landing = p5.Vector.random2D().mult(40).add(this.pos);
    
    addGameObject( new Sun(this.pos,landing) );
    this.cooldown = this.reloadtime;
  }
  
  cooldownFinish(){
    this.produce();
  }
}