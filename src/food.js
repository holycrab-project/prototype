class Food {

    constructor(startPosition) {
        this.position = startPosition;
        this.boundingBox = new Flatten.Polygon();
        this.calculateBoundingBox();
    }

    display(){
        push();
        stroke("red");
        circle(this.position.x, this.position.y, 10)
        pop();
    }

    calculateBoundingBox() {
        this.boundingBox = new Flatten.Circle(new Point(this.position.x, this.position.y), 1);
      }

}
