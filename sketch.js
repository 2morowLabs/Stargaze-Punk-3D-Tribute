var img;
var cameras = [];
let chunks = [];

let recorder;
let stopped = false;
let started = false;
let imageName;

const startRecord = () => {
  chunks.length = 0;

  let stream = document.querySelector("canvas").captureStream(60);
  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = (e) => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  recorder.onstop = exportVideo;
  recorder.start();
};

function preload() {
  const urlParams = new URLSearchParams(location.search);
  imageName = urlParams.get("image");

  img = loadImage(`http://192.168.1.119:8080/${imageName}`);
}

function setup() {
  createCanvas(400, 400, WEBGL);
  frameRate(500); // Attempt to refresh at starting FPS
  setTimeout(() => {
    startRecord();
  }, 100);
}

function draw() {
  background(0);
  if (stopped) return;

  if (sin((frameCount - 157) * 0.01) * 100 < -99.99 && frameCount > 200) {
    recorder.stop();
    stopped = true;
    return;
  }

  camera(100, 100, sin((frameCount - 157) * 0.01) * 100, 0, 0, 0, 100, 0, 0);

  for (var i = -1; i < 2; i++) {
    for (var j = -2; j < 3; j++) {
      push();
      translate(i * 160, 0, j * 160);
      box(60, 60, 60);
      pop();
    }
  }

  texture(img);

  box(200, 200, 200);
}

function exportVideo(e) {
  console.log("export");
  var blob = new Blob(chunks);
  var vid = document.createElement("video");
  vid.id = "recorded";
  blank;
  vid.controls = true;
  vid.src = URL.createObjectURL(blob, { type: "video/mp4" });
  document.body.appendChild(vid);
  vid.play();

  const a = document.createElement("a");
  a.download = `${imageName.split(".")[0]}.mp4`;
  console.log(a.download);
  a.href = vid.src;
  a.textContent = "download the video";
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    const name = parseInt(imageName.split(".")[0]) + 1;

    location.href = `http://127.0.0.1:3000/?image=${name}.png`;
    console.log(location.href);
  }, 1000);
}
