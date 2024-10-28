class Plant extends Character{
  constructor(img = null){
    super( createVector(mouseX,mouseY),img);
    this.planted = false;
  }
  
  static cost(){
    return 50;
  }
  
  plant(){
    let cell = backyard.pixelToCell(mouseX,mouseY);
    this.place(cell.x,cell.y); 
    this.planted = true; 
  }
  
}

