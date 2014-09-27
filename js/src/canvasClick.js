// handle click events on the canvas
window.GameJam.canvasClick = function(e) {
  var x;
  var y;
  
  // grab html page coords
  if (e.pageX != undefined && e.pageY != undefined) 
  {
    x = e.pageX;
    y = e.pageY;
  }
  else 
  {
    x = e.clientX + document.body.scrollLeft +
      document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop +
      document.documentElement.scrollTop;
  }
  
  // make them relative to the canvas only
  x -= GameJam.canvas.offsetLeft;
  y -= GameJam.canvas.offsetTop;
  
  // return tile x,y that we clicked
  var cell = 
      [
        Math.floor(x/GameJam.tileWidth),
        Math.floor(y/GameJam.tileHeight)
      ];
  
  // now we know while tile we clicked
  console.log('we clicked tile '+cell[0]+','+cell[1]);
  
  GameJam.pathStart = GameJam.pathEnd;
  GameJam.pathEnd = cell;
  
  // calculate path
  GameJam.currentPath = GameJam.findPath(GameJam.world, GameJam.pathStart, GameJam.pathEnd);
  GameJam.redraw();
};