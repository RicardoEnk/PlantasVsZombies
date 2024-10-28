let sprSun1, sprSun2;
let sndPoints;

class Sun extends GameObject{
  static preload(){
    sprSun1 = loadImage("img/Sun.png");
    sprSun2 = loadImage("img/Sun.png");
    sndPoints = loadSound("snd/Points.ogg");
  }
  
  constructor(position,landingPos){
    //TODO get a sprite for the sun
    super(position,null);
    this.landingPos = landingPos;
    this.onClick = this.clicked;
    this.mouseOver = this.mouseCheck;
    this.r = 20;
    this.collected = false;
    startCoroutine(this.expire());
  }
  
  update(){
    super.update();
    
    if(this.collected === false){
      this.pos = p5.Vector.lerp(this.pos,this.landingPos,0.05 );
    }
  }
  
  mouseCheck(mousePos){
    let dist = this.pos.dist(mousePos);
    if(dist<this.r){
       return true; 
    }else{
       return false;
    }
  }
  
  clicked(){
     if(this.collected === false){
       this.collected = true;
       startCoroutine(this.collect());
     }
  }
  
  draw(){
    push()
    translate(this.pos.x,this.pos.y);
    imageMode(CENTER);
    push()
    rotate(frameCount*0.02);
    image(sprSun2,0,0,this.r*3,this.r*3);
    pop();
    image(sprSun1,0,0,this.r,this.r);
    pop();
  }
  
  *collect(){
    sndPoints.play();
    let target = createVector(40,40);
    //animate
    while(this.pos.dist(target) > 2){
      this.pos =  p5.Vector.lerp(this.pos,target,0.2 );
      yield;
    }
   
    this.r *= 1.5;
    
    suns += 250; //give 25 sun currency to player
    yield sleep(200);
  
    this.deleteMe = true;
  }
  
  *expire(){
    yield sleep(10000); //expires in 10 seconds
    if(this.collected === false){
      this.deleteMe = true;
    }
  }
  
 
} 