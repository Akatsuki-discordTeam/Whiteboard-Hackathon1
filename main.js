var isMouseDown = false;
var canvas = document.createElement("canvas");
var body = document.getElementsByTagName("body")[0];
var ctx = canvas.getContext("2d");
let currentSize = 3;

var linesArray = [];
var index = -1;

var currentColor = "rgba(0,0,0, 0.4)";
var currentBg = "white";

var eraseMode = false;

createCanvas();

function createCanvas() {
  canvas.id = "canvas";
  // canvas.width = parseInt(document.getElementById("sizeX").value);
  // canvas.height = parseInt(document.getElementById("sizeY").value);
  canvas.width = 800;
  canvas.height = 800;
  canvas.style.zIndex = 8;
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid #547c9a";
  ctx.fillStyle = currentBg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  body.appendChild(canvas);
}

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
  ctx.strokeStyle = currentColor;
}

function mousemove(canvas, evt) {
  if (isMouseDown) {
    var currentPosition = getMousePos(canvas, evt);
    ctx.lineTo(currentPosition.x, currentPosition.y);
    ctx.stroke();
  }

  if (mousedown && eraseMode) {
    ctx.beginPath();
    var currentPosition = getMousePos(canvas, evt);
    ctx.arc(currentPosition.x, currentPosition.y, 40, 0, 2 * Math.PI, false);
    ctx.fillStyle = currentBg;
    ctx.fill();
    ctx.closePath();
  }
}

function mouseup() {
  isMouseDown = false;
  eraseMode = false;

  linesArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  index++;
  console.log(linesArray);
}

//Undo functionality
document.querySelector(".undo").addEventListener("click", undo);

function undo() {
  if (index > 0) {
    console.log(index);
    console.log(linesArray[index - 1]);

    index--;

    linesArray.pop();
    ctx.putImageData(linesArray[index], 0, 0);
  } else {
    createCanvas();
  }
}

//

//
