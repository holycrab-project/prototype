class Food {
  constructor(startPosition) {
    this.position = startPosition;
    this.boundingBox = new Flatten.Polygon();
    this.calculateBoundingBox();
    this.eaten = false;
    print("make more food");
  }

  display() {
    if(this.eaten) return;
    push();
    stroke("red");
    circle(this.position.x, this.position.y, 10)
    pop();
  }

  calculateBoundingBox() {
    this.boundingBox = new Flatten.Circle(new Point(this.position.x, this.position.y), 1);
  }

  eat() {
    this.eaten = true;
  }

}
