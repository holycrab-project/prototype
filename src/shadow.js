class Shadow extends Traveller {

  constructor(startPosition, startRotation, traveller) {
    super(startPosition);
    this.rotation = startRotation;
    this.lastNotZeroDeltaPos = 0;
    this.trailLength = 150;
    this.traveller = traveller;
    this.distanceFromTraveller = this.position.dist(this.traveller.position);
    this.dying = false;
    this.died = false;
  }

  prepareColor() {
    this.colorR = 255
    this.colorG = 0;
    this.colorB = 0;
    this.alpha = 255;
  }

  update(dPos, dRot) {
    if(this.dying) this.finishMe();
    if (dPos != 0) {
      this.lastNotZeroDeltaPos = dPos
      super.update(dPos, dRot);
    } else {
      super.update(this.lastNotZeroDeltaPos, dRot);
    }
    this.distanceFromTraveller = this.position.dist(this.traveller.position);
  }

  bodyDisplay() {
    super.bodyDisplay();
    // eyes
    this.drawBodyPart(3, -5, 1, 2, 0);
    this.drawBodyPart(-3, -5, 1, 2, 0);
  }

  finishMe(){
    this.alpha -= 1;
    this.updateColor();

    if(this.alpha <= 0 ) this.died = true;
  }

  dye() {
    if(this.dying) return;
    this.dying = true;
  }
}
