/**
 * Draw the path through the maze
 */
window.GameJam.redraw = function(){ 
	console.log('Redrawing ...');
 
	var spriteNum = 0;
 
	// clear the screen
	GameJam.ctxs.fillStyle = '#000000';
	GameJam.ctxs.fillRect(0, 0, GameJam.canvass.width, GameJam.canvass.height);
 
	for (var x=0; x < GameJam.worldWidth; x++){
		for (var y=0; y < GameJam.worldHeight; y++){
  			// choose a sprite to draw
	  		switch(GameJam.world[x][y]){
	  			//case 1: 
	  			//spriteNum = 1;
	  			//break;
	  			default:
	  			spriteNum = GameJam.world[x][y];
	  			break;
  			}
  
  		// draw it
  		GameJam.ctxs.drawImage(GameJam.tileset, 
    		spriteNum*GameJam.tileWidth, 0, 
    		GameJam.tileWidth, GameJam.tileHeight,
  	  		x*GameJam.tileWidth, y*GameJam.tileHeight,
  		  	GameJam.tileWidth, GameJam.tileHeight);
		}
	}
 
	// draw the path
	console.log('Current path length: '+GameJam.currentPath.length);
	for (var rp=0; rp<GameJam.currentPath.length; rp++){
		switch(rp){
			case 0:
  			spriteNum = 17; // start
  			break;
			case GameJam.currentPath.length-1:
	  		spriteNum = 18; // end
  			break;
			default:
  			spriteNum = 19; // path node
  			break;
		}
 		
 		// draw it
		GameJam.ctxs.drawImage(GameJam.tileset, 
			spriteNum*GameJam.tileWidth, 0, 
			GameJam.tileWidth, GameJam.tileHeight,
			GameJam.currentPath[rp][0]*GameJam.tileWidth, 
			GameJam.currentPath[rp][1]*GameJam.tileHeight,
			GameJam.tileWidth, GameJam.tileHeight);
	}		
};