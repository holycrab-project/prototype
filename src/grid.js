class Grid {
  
  constructor() {
    this.xStep = 20;
    this.yStep = 20;
    this.lineWidth = 2;
    this.xOffset = 0;
    this.yOffset = 0;
    this.size = 10;
  }

  update(pTx, pTy) {
    this.xOffset = pTx % this.xStep;
    this.yOffset = pTy % this.yStep;
  }
  
  display() {
    stroke(255, 31);
    strokeWeight(this.lineWidth);
    
    for (let i = this.xOffset-this.size*width; i < this.xOffset+this.size*width; i += this.xStep) {
      line(i, -this.size*height, i, this.size*height);
    }
    
    for (let j = this.yOffset-this.size*height; j < this.yOffset+this.size*height; j += this.yStep) {
      line(-this.size*width, j, this.size*width, j);
    }
    
    //this.debugDrawCross();
  }

  debugDrawCross() {
    stroke ('red');
    line(-10, 0, 10, 0);
    line(0, -10, 0, 10);
  }
}