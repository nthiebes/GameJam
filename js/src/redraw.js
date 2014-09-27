window.GameJam.redraw = function(){ 
	console.log('redrawing...');
 
	var spriteNum = 0;
 
	// clear the screen
	GameJam.ctx.fillStyle = '#000000';
	GameJam.ctx.fillRect(0, 0, GameJam.canvas.width, GameJam.canvas.height);
 
	for (var x=0; x < GameJam.worldWidth; x++){
		for (var y=0; y < GameJam.worldHeight; y++){
  		// choose a sprite to draw
  		switch(GameJam.world[x][y]){
  			case 1: 
  			spriteNum = 1; 
  			break;
  			default:
  			spriteNum = 0; 
  			break;
  		}
  
  		// draw it
  		// ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
  		GameJam.ctx.drawImage(GameJam.tileset, 
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
  			spriteNum = 2; // start
  			break;
			case GameJam.currentPath.length-1:
	  		spriteNum = 3; // end
  			break;
			default:
  			spriteNum = 4; // path node
  			break;
		}
 
		GameJam.ctx.drawImage(GameJam.tileset, 
			spriteNum*GameJam.tileWidth, 0, 
			GameJam.tileWidth, GameJam.tileHeight,
			GameJam.currentPath[rp][0]*GameJam.tileWidth, 
			GameJam.currentPath[rp][1]*GameJam.tileHeight,
			GameJam.tileWidth, GameJam.tileHeight);
	}		
};