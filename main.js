var isMouseDown = false;
var canvas = document.createElement("canvas");
var body = document.getElementsByTagName("body")[0];
var ctx = canvas.getContext("2d");
let currentSize = 3;
var currentColor = "rgba(0,0,0, 0.4)";
let selectedColor =  "rgba(0,0,0, 0.4)";
var currentBg = "#fff";
const erase = document.querySelector("#erase");



erase.addEventListener("click", eraser, false);

function eraser() {
  currentSize = 50;
  currentColor = currentBg
}

createCanvas();

function createCanvas() {
  canvas.id = "canvas";
  // canvas.width = parseInt(document.getElementById("sizeX").value);
  // canvas.height = parseInt(document.getElementById("sizeY").value);
  window.addEventListener("load", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  // window.addEventListener("resize", () => {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // });
  // canvas.width = 800;
  // canvas.height = 800;
  canvas.style.zIndex = 8;
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid #547c9a";
  ctx.fillStyle = currentBg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  body.appendChild(canvas);
}

/////////////////////////////////////////////////////////////////////////////////////////////
// Size of the brush tool
////////////////////////////////////////////////////////////////////////////////////////////
if (document.querySelector("#line").classList == "selected") {
  const select = document.getElementById("brush_size");
  var sizes = [1, 2, 3, 5, 8, 12, 25, 35, 50, 75, 100];
  select.addEventListener(
    "change",
    (e) => {
      currentSize = select.value;
    },
    false
  );
}
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

canvas.addEventListener("mousedown", function () {
  mousedown(canvas, event);
});
canvas.addEventListener("mousemove", function () {
  mousemove(canvas, event);
});
canvas.addEventListener("mouseup", mouseup);

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function mousedown(canvas, evt) {
  isMouseDown = true;
  var currentPosition = getMousePos(canvas, evt);
  ctx.moveTo(currentPosition.x, currentPosition.y);
  ctx.beginPath();
  ctx.lineWidth = currentSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = selectedColor;
}

function mousemove(canvas, evt) {
  if (isMouseDown) {
    var currentPosition = getMousePos(canvas, evt);
    ctx.lineTo(currentPosition.x, currentPosition.y);
    ctx.stroke();
  }
}

function mouseup() {
  isMouseDown = false;
}