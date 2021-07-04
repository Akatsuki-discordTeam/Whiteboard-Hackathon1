const line = document.querySelector("#line");
const text = document.querySelector("#text");
const Rectangle = document.querySelector("#Rectangle");

const spans = document.querySelectorAll("span");
var selectedOption = "Line";
ctx.fillStyle = "black";
var brushSize = 7;


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
}