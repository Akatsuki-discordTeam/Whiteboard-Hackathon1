
function createPaint(parent) {
    var canvas = elt('canvas', {width: window.innerWidth - 100, height: window.innerHeight - 100});
    var cx = canvas.getContext('2d');
    var toolbar = elt('div', {class: 'toolbar'});

    cx.fillStyle="white";
    cx.fillRect(0,0,canvas.width,canvas.height);
    
    for (var name in controls)
      toolbar.appendChild(controls[name](cx));
    
    var panel = elt('div', {class: 'picturepanel'}, canvas);
    parent.appendChild(elt('div', null, panel, toolbar));
  }
  
  /************************************************************************
   * helper functions
   ***********************************************************************/
  function elt(name, attributes) {
    var node = document.createElement(name);
    if (attributes) {
      for (var attr in attributes)
        if (attributes.hasOwnProperty(attr))
          node.setAttribute(attr, attributes[attr]);
    }
    for (var i = 2; i < arguments.length; i++) {
      var child = arguments[i];
      
      // if this argument is a string, create a text node
      if (typeof child == 'string')
        child = document.createTextNode(child);
      node.appendChild(child);
    }
    return node;
  }
  
  function relativePos(event, element) {
    var rect = element.getBoundingClientRect();
    return {x: Math.floor(event.clientX - rect.left),
            y: Math.floor(event.clientY - rect.top)};
  }
  
  function trackDrag(onMove, onEnd) {
    function end(event) {
      removeEventListener('mousemove', onMove);
      removeEventListener('mouseup', end);
      if (onEnd)
        onEnd(event);
    }
    addEventListener('mousemove', onMove);
    addEventListener('mouseup', end);
  }
  
  var scale = 1.0;
  var scaleMultiplier = 0.9;
  var startDragOffset = {};
  var mouseDown = false;
  
  
  // document.getElementById("paint-app").addEventListener("wheel", function(e){
  //   if(e.deltaY == 53){
  //       cx.scale /= scaleMultiplier;
  //       cx.draw(scale, translatePos);
  //   } else if(e.deltaY == -53){
  //       cx.scale *= scaleMultiplier;
  //       cx.draw(scale, translatePos);
  //   }
  // }, false);
  
  
  function loadImageURL(cx, url)  {
    var image = document.createElement('img');
    image.addEventListener('load', function() {
      var color = cx.fillStyle, size = cx.lineWidth;
      cx.canvas.width = image.width;
      cx.canvas.height = image.height;
      cx.drawImage(image, 0, 0);
      cx.fillStyle = color;
      cx.strokeStyle = color;
      cx.lineWidth = size;
    });
    image.src = url;
  }
  
  function randomPointInRadius(radius) {
    for (;;) {
      var x = Math.random() * 2 - 1;
      var y = Math.random() * 2 - 1;
      // uses the Pythagorean theorem to test if a point is inside a circle
      if (x * x + y * y <= 1)
        return {x: x * radius, y: y * radius};
    }
  }
  
  /************************************************************************
   * controls
   ***********************************************************************/
  
  var controls = Object.create(null);
  
  controls.tool = function(cx) {
    var select = elt('select');
    
    // populate the tools
    for (var name in tools)
      select.appendChild(elt('option', null, name));
    
    // calls the particular method associated with the current tool
    cx.canvas.addEventListener('mousedown', function(event) {
      
      // is the left mouse button being pressed?
      if (event.which == 1) {
        
        // the event needs to be passed to the method to determine
        // what the mouse is doing and where it is
        tools[select.value](event, cx);
        // don't select when user is clicking and dragging
        event.preventDefault();
      }
    });
    
    return elt('span', null, '', select);
  };
  
  // color module
  controls.color = function(cx) {
    var input = elt('input', {type: 'color'});
    
    // on change, set the new color style for fill and stroke
    input.addEventListener('change', function() {
      cx.fillStyle = input.value;
      cx.strokeStyle = input.value;
    });
    return elt('span', null, 'Color: ', input);
  };
  
  // brush size module
  controls.brushSize = function(cx) {
    var select = elt('select');
    
    // various brush sizes
    var sizes = [1, 2, 3, 5, 8, 12, 25, 35, 50, 75, 100];
    
    // build up a select group of size options
    sizes.forEach(function(size) {
      select.appendChild(elt('option', {value: size}, size + ' pixels'));
    });
    
    // on change, set the new stroke thickness
    select.addEventListener('change', function() {
      cx.lineWidth = select.value;
    });
    return elt('span', null, 'size: ', select);
  };
  
  // save
  controls.save = function(cx) {
    // MUST open in a new window because of iframe security stuff
    var link = elt('a', {href: '/', target: '_blank', class:'save'}, 'Save');
    function update() {
        console.log(cx.canvas.toDataURL());
        link.href = cx.canvas.toDataURL();
        link.download = "media.png";
    }
    link.addEventListener('mouseover', update);
    link.addEventListener('focus', update);
    return link;
  };
  
  // open a file
  controls.openFile = function(cx) {
    var input = elt('input', {type: 'file',id:"uploadFile", class:"hide"});
    input.addEventListener('change', function() {
      if (input.files.length == 0) return;
      var reader = new FileReader();
      reader.addEventListener('load', function() {
        loadImageURL(cx, reader.result);
      });
      reader.readAsDataURL(input.files[0]);
    });
    return elt('label', {for:"uploadFile", class:"btn"},  'Upload', input);
  };
  
  // open a URL
  controls.openURL = function(cx) {
    var input = elt('input', {type: 'text'});
    var form = elt('form', null, '', input, 
                   elt('button', {type: 'submit'}, 'URLUpload'));
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      loadImageURL(cx, form.querySelector('input').value);
    });
    return form;
  };
  
  /************************************************************************
   * tools
   ***********************************************************************/
  
  // drawing tools
  var tools = Object.create(null);
  
  // line tool
  // onEnd is for the erase function, which uses it to reset
      // the globalCompositeOperation to source-over
  tools.Line = function(event, cx, onEnd) {
    cx.lineCap = 'round';
    
    // mouse position relative to the canvas
    var pos = relativePos(event, cx.canvas);
    trackDrag(function(event) {
      cx.beginPath();
      
      // move to current mouse position
      cx.moveTo(pos.x, pos.y);
      
      // update mouse position
      pos = relativePos(event, cx.canvas);
      
      // line to updated mouse position
      cx.lineTo(pos.x, pos.y);
      
      // stroke the line
      cx.stroke();
    }, onEnd);
  };
  
  // erase tool
  tools.Erase = function(event, cx) {
    cx.globalCompositeOperation = 'destination-out';
    tools.Line(event, cx, function() {
      cx.globalCompositeOperation = 'source-over';
    });
  };
  
  // text tool
  tools.Text = function(event, cx) {
    var text = prompt('Text:', '');
    if (text) {
      var pos = relativePos(event, cx.canvas);
      // for simplicity, text size is brush size, locked to sans-serif
      cx.font = Math.max(7, cx.lineWidth) + 'px sans-serif';
      cx.fillText(text, pos.x, pos.y);
    }
  }
  
  // spray paint tool
  tools.Spray = function(event, cx) {
    var radius = cx.lineWidth / 2;
    var area = radius * radius * Math.PI;
    var dotsPerTick = Math.ceil(area / 30);
    
    var currentPos = relativePos(event, cx.canvas);
    var spray = setInterval(function() {
      for (var i = 0; i < dotsPerTick; i++) {
        var offset = randomPointInRadius(radius);
        cx.fillRect(currentPos.x + offset.x, 
                    currentPos.y + offset.y, 1, 1);
      }
    }, 25);
    trackDrag(function(event) {
      currentPos = relativePos(event, cx.canvas);
    }, function() {
      clearInterval(spray);
    });
  };
  
  /************************************************************************
   * exercises
   ***********************************************************************/
  tools.Rectangle = function(event, cx) {
    var leftX, rightX, topY, bottomY
    var clientX = event.clientX,
        clientY = event.clientY;
    
    // placeholder rectangle
    var placeholder = elt('div', {class: 'placeholder'});
    
    // cache the relative position of mouse x and y on canvas
    var initialPos = relativePos(event, cx.canvas);
    
    // used for determining correct placeholder position
    var xOffset = clientX - initialPos.x,
        yOffset = clientY - initialPos.y;
    
    trackDrag(function(event) {
      document.body.appendChild(placeholder);
      
      var currentPos = relativePos(event, cx.canvas);
      var startX = initialPos.x,
          startY = initialPos.y;
          
      // assign leftX, rightX, topY and bottomY
      if (startX < currentPos.x) {
        leftX = startX;
        rightX = currentPos.x;
      } else {
        leftX = currentPos.x;
        rightX = startX;
      }
  
      if (startY < currentPos.y) {
        topY = startY;
        bottomY = currentPos.y;
      } else {
        topY = currentPos.y;
        bottomY = startY;
      }
    
        // set the style to reflect current fill
      placeholder.style.background = cx.fillStyle;
      
        // set div.style.left to leftX, width to rightX - leftX
      placeholder.style.left = leftX + xOffset + 'px';
      placeholder.style.top = topY + yOffset + 'px';
      placeholder.style.width = rightX - leftX + 'px';
      placeholder.style.height = bottomY - topY + 'px';	
    }, function() {
      
      // add rectangle to canvas with leftX, rightX, topY and bottomY
      cx.fillRect(leftX, topY, rightX - leftX, bottomY - topY);
      
        // destroy placeholder
      document.body.removeChild(placeholder);
    });
  };
 
  
  // helpers for flood fill
  
  // iterates over N, S, E and W neighbors and performs a function fn
  function forEachNeighbor(point, fn) {
    fn({x: point.x - 1, y: point.y});
    fn({x: point.x + 1, y: point.y});
    fn({x: point.x, y: point.y - 1});
    fn({x: point.x, y: point.y + 1});
  }
  
  // checks if 2 points in data, point1 and point2, have the same color
  function isSameColor(data, point1, point2) {
    var offset1 = (point1.x + point1.y * data.width) * 4;
    var offset2 = (point2.x + point2.y * data.width) * 4;
    
    for (var i = 0; i < 4; i++) {
      if (data.data[offset1 + i] != data.data[offset2 + i]) {
        return false;
      }
    }
    return true;
  }
  
  // end flood fill helpers
  
  tools["Flood Fill"] = function(event, cx) {
    var imageData = cx.getImageData(0, 0, cx.canvas.width, cx.canvas.height),
        // get sample point at current position, {x: int, y: int}
            sample = relativePos(event, cx.canvas),
        isPainted = new Array(imageData.width * imageData.height),
        toPaint = [sample];
    
    // while toPaint.length > 0
    while(toPaint.length) {
      // current point to check
      var current = toPaint.pop(),
          id = current.x + current.y * imageData.width;
      
      // check if current has already been painted
      if (isPainted[id]) continue;
      else {
        
        // if it hasn't, paint current and set isPainted to true
        cx.fillRect(current.x, current.y, 1, 1);
        isPainted[id] = true;
      }
      
      // for every neighbor (new function)
      forEachNeighbor(current, function(neighbor) {
        if (neighbor.x >= 0 && neighbor.x < imageData.width &&
            neighbor.y >= 0 && neighbor.y < imageData.height &&
            isSameColor(imageData, sample, neighbor)) {
          toPaint.push(neighbor);
        }
      });
    }
  };
  
  // initialize the app
  var appDiv = document.querySelector('#myapp');
  createPaint(appDiv);