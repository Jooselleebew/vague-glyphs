//genuary2024 - generative typography;
//type a letter

let font;
let points;
let connections;
let a, b, c, d;
function preload() {
  font = loadFont(
    "https://assets.codepen.io/4559259/NunitoSans-VariableFont_YTLC%2Copsz%2Cwdth%2Cwght.ttf"
  );
}
function setup() {
  cnv = createCanvas(600, 600);
  rectMode(CENTER);
  textAlign(CENTER);
  angleMode(DEGREES);
  letter = random(["∏", "◊", "S", "ß", "µ", "π", "Ω", "∑", "¬"]);
  connections = [];
  r = random(width / 5, width / 3);
  nRot = 9; //int(random(10, 20));
  points = font.textToPoints(letter, 0, 0, 100, { sampleFactor: 0.2 });
  for (let i = 0; i < points.length; i++) {
    theta = random(0, 360);
    connections[i] = theta;
  }
  a = random(0, 50);
  b = random(0, 50);
  c = random(0, 50);
  d = random(0, 50);
}

function draw() {
  background(60, 80, 100);
  translate(width / 2, height / 2);
  t = frameCount / 5;

  strokeWeight(0.5);

  for (let k = 0; k < nRot; k++) {
    for (let i = 0; i < points.length; i++) {
      x1 = (r / 5) * cos(connections[i]) - (width / 6) * cos(t / d);
      y1 = (r / 5) * sin(connections[i]) - (width / 6) * sin(t / d);
      push();
      rotate((k * 360) / nRot);
      translate(100, 100);
      translate(
        points[i].x + x1 * sin(t) * cos(t - k * a),
        points[i].y + y1 * sin(t) * cos(t - k * b)
      );
      push();
      stroke(
        255 - 50 * sin(t / a),
        255 - 30 * sin(t / b),
        255 - 20 * sin(t / c)
      );
      textSize(12);
      text(letter, 0, 0);
      pop();
      // circle(0, 0,  4);
      // circle(0, 0,  1);

      pop();
    }
  }

  border();
}

function makeLetter(n) {
  stroke(255);
  strokeWeight(0.5);
  noFill();
  if (n === 0) {
    letters[n] = [];
  }
}

function border() {
  noFill();
  stroke(20, 50, 60);
  strokeWeight(4);
  rect(0, 0, width - 20, height - 20);
}

function keyTyped() {
  letter = key;
  frameCount = 0;
  connections = [];
  points = [];
  points = font.textToPoints(key, 0, 0, 100, { sampleFactor: 0.2 });
  for (let i = 0; i < points.length; i++) {
    theta = random(0, 360);
    connections[i] = theta;
  }
  if (keyCode === 32) {
    save(cnv, key, "jpg");
  }
}

function windowResized() {
  resizeCanvas(windowWidth * 0.9, windowHeight * 0.9);
}