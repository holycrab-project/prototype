class Lifeform {

  constructor(startPosition) {
    this.position = startPosition;
    this.rotation = 0;

    this.bodyLength = 8;
    this.feetLength = 2;
    this.feetOffset = 4;
    this.bodyLineWidth = 3;
    this.feetLineWidth = 2;
    this.feetAmplitude = 1;
    this.bodyAmplitude = 0.21;
    this.baseFootY = 1.5;
    this.prepareColor();
    this.color = color(this.colorR, this.colorG, this.colorB);

    this.stop();

  }

  prepareColor() {
    this.colorR = 255
    this.colorG = 255;
    this.colorB = 255;
  }

  walk(speed) {
    this.speed = speed;
    this.leftFootY = this.baseFootY + this.feetAmplitude * sin(radians(this.speedTick));
    this.rightFootY = this.baseFootY - this.feetAmplitude * sin(radians(this.speedTick));
    this.speedTick = (this.speedTick + this.speed) % 360;
  }

  update(deltaPosition, deltaRotation) {
    this.rotation += deltaRotation;
    let deltaX = -deltaPosition * sin(radians(this.rotation));
    let deltaY = deltaPosition * cos(radians(this.rotation));
    this.position.add(createVector(deltaX, deltaY));
  }

  stop(speed) {
    this.walk(0);
    this.speedTick = 0;
    this.leftFootY = this.baseFootY;
    this.rightFootY = this.baseFootY;
  }

  display() {

    stroke(this.color);
    push();
    translate(this.position.x, this.position.y);
    rotate(radians(this.rotation));
    this.bodyDisplay();
    pop();
  }

  bodyDisplay() {
    this.drawBodyPart(0, 0, this.bodyLength, this.bodyLineWidth, this.speedTick);
    this.drawBodyPart(-this.feetOffset, this.leftFootY, this.feetLength, this.feetLineWidth, 0);
    this.drawBodyPart(this.feetOffset, this.rightFootY, this.feetLength, this.feetLineWidth, 0);
  }

  drawBodyPart(xOffset, yOffset, length, lineWidth, rotation) {
    strokeWeight(lineWidth);

    line(xOffset - this.bodyAmplitude * sin(radians(rotation)),
      yOffset - length * 0.5,
      xOffset + this.bodyAmplitude * sin(radians(rotation)),
      yOffset + length * 0.5);
  }
}