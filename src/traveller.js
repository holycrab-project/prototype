class Traveller extends Lifeform{
  
  constructor(startPosition) {
    super(startPosition);
    this.trailDeltaPos = [];
    this.trailDeltaRot = [];
    this.trailLength = 100;
    this.timeReverse = false;
    this.trailMaxWeight = 3;
    this.trailMinWeight = 0;
    this.bBoxMinX = Number.POSITIVE_INFINITY;
    this.bBoxMinY = Number.POSITIVE_INFINITY;
    this.bBoxMaxX = Number.NEGATIVE_INFINITY;
    this.bBoxMaxY = Number.NEGATIVE_INFINITY;
    this.trailPoints = [];
  }

  update(deltaPosition, deltaRotation){
    super.update(deltaPosition, deltaRotation);
    this.timeReverse = ((deltaPosition == 0) && (deltaRotation == 0))
    if (!this.timeReverse){
      this.trailDeltaPos.push(deltaPosition);
      this.trailDeltaRot.push(deltaRotation);
      if (this.trailDeltaPos.length > this.trailLength){
        this.trailDeltaPos.shift();
        this.trailDeltaRot.shift();
      }
    }else if (this.trailDeltaPos.length>0){
      let deltaStepPos = this.trailDeltaPos.pop();
      let deltaStepRot = this.trailDeltaRot.pop();
      this.rotation -= deltaStepRot;
      let deltaX = -deltaStepPos*sin(radians(this.rotation));
      let deltaY = deltaStepPos*cos(radians(this.rotation));
      this.position.sub(createVector(deltaX, deltaY));
    }
    this.calculateBoundingBox();
  }
  
  display() {
    this.bBoxDisplay();
    super.display();
    this.trailDisplay();
  }
  
  calculateBoundingBox() {
    let marg = 5;
    this.bBoxMinX = this.position.x-marg;
    this.bBoxMinY = this.position.y-marg;
    this.bBoxMaxX = this.position.x+marg;
    this.bBoxMaxY = this.position.y+marg;
    this.calculateTrail();
  }
  
  calculateTrail(){
    this.trailPoints = [];
    let p0 = this.position.copy();
    let rot0 = this.rotation;
    for (let i=this.trailDeltaPos.length-1; i>= 0; i--){
      let rot1 = rot0-this.trailDeltaRot[i];
      let deltaX = -this.trailDeltaPos[i]*sin(radians(rot1));
      let deltaY = this.trailDeltaPos[i]*cos(radians(rot1));
      let deltaP = createVector(deltaX, deltaY);
      let p1 = p5.Vector.sub(p0, deltaP);
      
      this.bBoxMinX = min(this.bBoxMinX, p1.x);
      this.bBoxMinY = min(this.bBoxMinY, p1.y);
      this.bBoxMaxX = max(this.bBoxMaxX, p1.x);
      this.bBoxMaxY = max(this.bBoxMaxY, p1.y);
      
      this.trailPoints.unshift(p1);
      
      p0 = p1.copy();
      rot0 = rot1;
    }
  }
  
  trailDisplay() {
    for (let i=this.trailPoints.length-1; i>= 0; i--){
      strokeWeight(this.trailWeightFor(i));
      point(this.trailPoints[i].x, this.trailPoints[i].y);
    }
  }
  
  trailWeightFor(index){
    let factor = (index+1)/this.trailDeltaPos.length;
    return  this.trailMinWeight + factor*(this.trailMaxWeight - this.trailMinWeight);
  }
  
  bBoxDisplay() {
    noStroke ();
    fill(255, 25);
    rect(this.bBoxMinX, this.bBoxMinY, this.bBoxMaxX-this.bBoxMinX, this.bBoxMaxY-this.bBoxMinY);
  }
  
}