const p5 = require("node-p5");

let sin = 0;
let cam;

function sketch(p) {
  p.setup = () => {
    let canvas = p.createCanvas(200, 200);
    setTimeout(() => {
      p.saveCanvas(canvas, "myCanvas", "png").then((filename) => {
        console.log(`saved the canvas as ${filename}`);
      });
    }, 100);
  };

  p.draw = () => {
    p.background(0);
    // p.camera(100, 100, sin * 100, 0, 0, 0, 100, 0, 0);

    // for (var i = -1; i < 2; i++) {
    //   for (var j = -2; j < 3; j++) {
    //     p.push();
    //     p.translate(i * 160, 0, j * 160);
    //     p.box(60, 60, 60);
    //     p.pop();
    //   }
    // }

    // texture(img);

    p.box(200, 200, 200);
  };
}

let p5Instance = p5.createSketch(sketch);

var img;
var cameras = [];

function preload() {
  img = loadImage("Art.jpg");
}

function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  background(0);
  //cylinder(50,50);

  camera(100, 100, sin(frameCount * 0.01) * 100, 0, 0, 0, 100, 0, 0);
  //plane(120, 120);
}
