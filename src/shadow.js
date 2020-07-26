class Shadow extends Traveller{
  
  constructor(startPosition, startRotation) {
    super(startPosition);
    this.rotation = startRotation;
    this.color = 'red';
    this.lastNotZeroDeltaPos = 0;
    this.trailLength = 150;
  }
  
  prepareColor() {
    this.colorR = 255
    this.colorG = 0;
    this.colorB = 0;
  }
  
  update(dPos, dRot) {
    if (dPos != 0) {
      this.lastNotZeroDeltaPos = dPos
      super.update(dPos, dRot);
    }else{
      super.update(this.lastNotZeroDeltaPos, dRot);
    }
  }
  
  bodyDisplay() {
    super.bodyDisplay();
    // eyes
    this.drawBodyPart(3, -5, 1, 2, 0);
    this.drawBodyPart(-3, -5, 1, 2, 0);
  }
}