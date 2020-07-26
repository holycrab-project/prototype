let traveller;
let grid;
let shadows = [];
let timeOutShadowSpawning = 3000;

let walking = false;
let walkingSpeed = 15;
let walkingWorldSpeed = 0.5;

let rotationSpeed = 1;
let rotationVerso = 0;

let ost;


function preload() {
  // dogfooding - this is because security constraints in Firefox
  ost = loadSound('https://holycrab-project.github.io/prototype/src/resources/ost.mp3');
}

function setup() {
  createCanvas(128, 160, WEBGL);
  smooth();
  grid = new Grid();
  traveller = new Traveller(new p5.Vector(0, 0));
  ost.setVolume(0);
}

function draw() {
  background(0);

  let deltaPos = walking ? -walkingWorldSpeed : 0
  if (walking){
    traveller.walk(walkingSpeed);
    ShadowsWalk(walkingSpeed);
  }
  traveller.update(deltaPos, rotationVerso*rotationSpeed);
  ShadowsUpdate(deltaPos, rotationVerso*rotationSpeed);

  push();
  rotate(radians(-traveller.rotation));
  translate(-traveller.position.x, -traveller.position.y);

  grid.display();
  ShadowsDisplay();
  traveller.display();
  pop();
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      if(!ost.isPlaying()){
        //ost.loop();
        //ost.fade(0.5,1.3);
        timeOutShadowSpawning = random(3000, 5000);
        setTimeout(SpawnShadow, timeOutShadowSpawning);
      }

      walking = true;
      break;
    case LEFT_ARROW:
      rotationVerso = -1;
      break;
    case RIGHT_ARROW:
      rotationVerso = 1;
      break;
  }
}

function keyReleased(){
  switch (keyCode) {
    case UP_ARROW:
      walking = false;
      traveller.stop();
      break;
    case LEFT_ARROW:
    case RIGHT_ARROW:
      rotationVerso = 0;
      break;
  }
}

function SpawnShadow() {
  if (!traveller.timeReverse){
    let shadowStartPosition = traveller.position.copy();
    let angle = random(0, 359);
    let radius = random(50, 70);
    shadowStartPosition.x += radius*cos(radians(angle));
    shadowStartPosition.y += radius*sin(radians(angle));

    shadows.push(new Shadow(shadowStartPosition, angle-90));
  }

  timeOutShadowSpawning = random(3000, 5000);
  setTimeout(SpawnShadow, timeOutShadowSpawning);
}

function ShadowsDisplay() {
  let p0 = createVector( traveller.position.x - width*0.5 + 5, traveller.position.y - height*0.5 + 5);
  let p2 = createVector(p0.x + width -10, p0.y + height-10);
  let p1 = createVector(p0.x, p2.y);
  let p3 = createVector(p2.x, p0.y);
  p0 = rotatePointAround(p0, traveller.position, radians(traveller.rotation));
  p1 = rotatePointAround(p1, traveller.position, radians(traveller.rotation));
  p2 = rotatePointAround(p2, traveller.position, radians(traveller.rotation));
  p3 = rotatePointAround(p3, traveller.position, radians(traveller.rotation));

  fill(color(0,255,0,100));
  beginShape();
  vertex(p0.x, p0.y);
  vertex(p1.x, p1.y);
  vertex(p2.x, p2.y);
  vertex(p3.x, p3.y);
  endShape(CLOSE);

  for (let i=0; i<shadows.length; i++){
    shadows[i].display();
  }
}

function ShadowsWalk(walkingSpeed) {
  for (let i=0; i<shadows.length; i++){
    shadows[i].walk(walkingSpeed);
  }
}

function ShadowsUpdate(dPos, dRot) {
  for (let i=0; i<shadows.length; i++){
    shadows[i].update(dPos, dRot);
  }
}

function rotatePointAround(p, o, angle) {
  let resultX = cos(angle) * (p.x-o.x) - sin(angle) * (p.y-o.y) + o.x;
  let resultY = sin(angle) * (p.x-o.x) + cos(angle) * (p.y-o.y) + o.y;

  return createVector(resultX, resultY);
}


//ost:https://soundcloud.com/cube-5/glittering-waves
