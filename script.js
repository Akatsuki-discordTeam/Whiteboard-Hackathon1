//draw function
window.onload = function() {
	var myCanvas = document.getElementById("myCanvas");
	var ctx = myCanvas.getContext("2d");
    var brushSize = 7;
    var brushColor = "black";
    var points = [];

    var translatePos = {
        x: myCanvas.width / 2,
        y: myCanvas.height / 2
    };

    var scale = 1.0;
    var scaleMultiplier = 0.9;
    var startDragOffset = {};
    var mouseDown = false;

    // Fill Window Width and Height
    myCanvas.width = window.innerWidth-100;
	myCanvas.height = window.innerHeight-100;
	
	// Setting Background Color
    ctx.fillStyle="white";
    ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
	
    // Mouse Event Handlers
	if(myCanvas){
		var isDown = false;
		var canvasX, canvasY;
		ctx.lineWidth = 5;                     								//pen sizing here

		addEventListener('mousedown', (event) =>{
            isDown = true;
			ctx.beginPath();
			canvasX = event.pageX - myCanvas.offsetLeft;
			canvasY = event.pageY - myCanvas.offsetTop;
			ctx.moveTo(canvasX, canvasY);
		});
		addEventListener('mousemove', (event) =>{
			if(isDown!== false){
				canvasX = event.pageX - myCanvas.offsetLeft;
				canvasY = event.pageY - myCanvas.offsetTop;
				ctx.lineTo(canvasX, canvasY);
				ctx.strokeStyle = "black";                                 //pen coloring here
				ctx.stroke();
				points.push({
            	x: event.pageX,
            	y: event.pageY  ,
            	size: brushSize,
            	color: brushColor,
            	mode: "draw"
				});
            };
        });
		addEventListener('mouseup', (event) =>{
			isDown = false;
			ctx.closePath();
		});
        addEventListener("wheel", function(e){
            if(e.deltaY == 53){
                scale /= scaleMultiplier;
                draw(scale, translatePos, points);
            } else if(e.deltaY == -53){
                scale *= scaleMultiplier;
                draw(scale, translatePos, points);
            }
        }, false);
	}

    document.getElementById("clearScreen").addEventListener("click", () => {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.fillStyle="white";
        ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
    });

};


function draw(scale, translatePos, points){
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle="white";
    context.fillRect(0,0,canvas.width,canvas.height);


    context.save();
    context.translate(translatePos.x, translatePos.y);
    context.scale(scale, scale);
    // console.log(scale, scale);
    redraw(context, points);
    context.restore();
}


function redraw(ctx, points) {
    for (var i = 1; i < points.length; i++) {
        ctx.beginPath();
        ctx.moveTo(points[i-1].x, points[i-1].y);
        ctx.lineWidth  = points[i].size;
        ctx.lineCap = "round";
        ctx.strokeStyle = points[i].color;
        ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();
        ctx.closePath();
    }
}


function undoLastPoint() {

    // remove the last drawn point from the drawing array
    var lastPoint=points.pop();

    // add the "undone" point to a separate redo array
    redoStack.unshift(lastPoint);

    // redraw all the remaining points
    redrawAll();
}

//download feature
document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'myCanvas', 'media.png');
}, false);

function downloadCanvas(link, canvas, filename) {
    link.href = document.getElementById(canvas).toDataURL();
    link.download = filename;
}

//text feature
/*
const line = document.querySelector("#line");
const text = document.querySelector("#text");
const Rectangle = document.querySelector("#Rectangle");

const spans = document.querySelectorAll("span");
var selectedOption = "Line";
ctx.fillStyle = "black";


const select = document.getElementById("brush_size");
var sizes = [1, 2, 3, 5, 8, 12, 25, 35, 50, 75, 100];
sizes.forEach((size) => {
    let node = document.createElement('option')
    node.value = size
    node.innerHTML = size
    select.appendChild(node)
});
select.addEventListener('change', (e) => {
    brushSize = select.value
}, false);


[line, text, Rectangle].forEach(elem => {
    elem.addEventListener("click", () => {
        clearOption()
        elem.classList.add("selected");
        selectedOption = elem.innerHTML
        console.log(selectedOption)
    }, false)
})


// Line(event, ctx)
canvas.addEventListener("mousedown", function () {
    if(selectedOption == "Line"){
        mousedown(canvas, event);
    }
});
canvas.addEventListener("mousemove", function () {
    if(selectedOption == "Line"){
        mousemove(canvas, event);
    }
});
canvas.addEventListener("mouseup", mouseup);

canvas.addEventListener("click", (event) => {
    if(selectedOption == "Text"){
        textMode(event, ctx)
    } else if(selectedOption == "Rectangle"){
        console.log("Rectangle is triggered")
        Rect(event, ctx)
    }
})

function clearOption(){
    spans.forEach(span => {
        span.classList.remove("selected")
    })
}

textMode = function(event, ctx) {
    var text = prompt('Enter Your Text:', '');
    if (text) {
      var pos = getMousePos(ctx.canvas, event);
      ctx.font = brushSize + 'px sans-serif';
      ctx.fillText(text, pos.x, pos.y);
    }
}*/