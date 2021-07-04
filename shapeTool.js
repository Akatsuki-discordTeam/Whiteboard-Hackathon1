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

Rect = function(event, cx) {
    var leftX, rightX, topY, bottomY
    var clientX = event.clientX,
        clientY = event.clientY;
    
    // placeholder rectangle
    var placeholder = document.createElement('div');
    placeholder.classList.add("placeholder");
    
    // cache the relative position of mouse x and y on canvas
    var initialPos = getMousePos(cx.canvas, event);
    
    // used for determining correct placeholder position
    var xOffset = clientX - initialPos.x,
        yOffset = clientY - initialPos.y;
    
    trackDrag(function(event) {
      document.body.appendChild(placeholder);
      
      var currentPos = getMousePos(cx.canvas, event);
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