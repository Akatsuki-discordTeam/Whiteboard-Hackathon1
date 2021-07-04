window.onload = function() {
	var myCanvas = document.getElementById("myCanvas");
	var ctx = myCanvas.getContext("2d");
    
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

		myCanvas.addEventListener('mousedown', (event) =>{
			isDown = true;
			ctx.beginPath();
			canvasX = event.pageX - myCanvas.offsetLeft;
			canvasY = event.pageY - myCanvas.offsetTop;
			ctx.moveTo(canvasX, canvasY);
		});
		myCanvas.addEventListener('mousemove', (event) =>{
			if(isDown!== false){
				canvasX = event.pageX - myCanvas.offsetLeft;
				canvasY = event.pageY - myCanvas.offsetTop;
				ctx.lineTo(canvasX, canvasY);
				ctx.strokeStyle = "black";                                 //pen coloring here
				ctx.stroke();
			}
		});
		window.addEventListener('mouseup', (event) =>{
			isDown = false;
			ctx.closePath();
		});
	}
};