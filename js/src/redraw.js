/**
 * Draw the path through the maze
 */
window.GameJam.redraw = function(){ 
	console.log('Redrawing ...');
 
	var spriteNum = 0;
 
	// Clear the screen
	GameJam.ctxs.fillStyle = '#000000';
	GameJam.ctxs.fillRect(0, 0, GameJam.canvass.width, GameJam.canvass.height);

	var level = GameJam.world,
		obstacles = GameJam.obstacles,
		rowTileCount = level.length,
		colTileCount = level[0].length;

	// Draw the map
	for (var r = 0; r < rowTileCount; r++) {
        for (var c = 0; c < colTileCount; c++) {
            var tile = level[ r ][ c ];
            var tileRow = (tile / GameJam.imageNumTiles) | 0;
            var tileCol = (tile % GameJam.imageNumTiles) | 0;

            GameJam.ctxs.drawImage(GameJam.tilesetLevel, (tileCol * GameJam.tileSize), (tileRow * GameJam.tileSize), GameJam.tileSize, GameJam.tileSize, (c * GameJam.tileSize), (r * GameJam.tileSize), GameJam.tileSize, GameJam.tileSize);

            tile = level[ r ][ c ];
            tileRow = (tile / GameJam.imageNumTiles) | 0;
            tileCol = (tile % GameJam.imageNumTiles) | 0;

            GameJam.ctxs.drawImage(GameJam.tilesetLevel, (tileCol * GameJam.tileSize), (tileRow * GameJam.tileSize), GameJam.tileSize, GameJam.tileSize, (c * GameJam.tileSize), (r * GameJam.tileSize), GameJam.tileSize, GameJam.tileSize);
        }
    }
 	
 	// Draw the default obstacles
	for (var x=0; x < GameJam.worldWidth; x++){
		for (var y=0; y < GameJam.worldHeight; y++){
  			// choose a sprite to draw
	  		switch(GameJam.world[x][y]){
	  			//case 1: 
	  			//spriteNum = 1;
	  			//break;
	  			default:
	  			spriteNum = GameJam.obstacles[x][y];
	  			break;
  			}
  
  		// draw it
  		GameJam.ctxs.drawImage(GameJam.tilesetObstacles, 
    		spriteNum*GameJam.tileWidth, 0, 
    		GameJam.tileWidth, GameJam.tileHeight,
  	  		x*GameJam.tileWidth, y*GameJam.tileHeight,
  		  	GameJam.tileWidth, GameJam.tileHeight);
		}
	}

	// Draw the path
	console.log('Current path length: '+GameJam.currentPath.length);
	// for (var rp=0; rp<GameJam.currentPath.length; rp++){
	// 	switch(rp){
	// 		case 0:
 //  			spriteNum = 17; // start
 //  			break;
	// 		case GameJam.currentPath.length-1:
	//   		spriteNum = 18; // end
 //  			break;
	// 		default:
 //  			spriteNum = 19; // path node
 //  			break;
	// 	}
 		
 // 		// draw it
	// 	GameJam.ctxs.drawImage(GameJam.tilesetObstacles, 
	// 		spriteNum*GameJam.tileWidth, 0, 
	// 		GameJam.tileWidth, GameJam.tileHeight,
	// 		GameJam.currentPath[rp][0]*GameJam.tileWidth, 
	// 		GameJam.currentPath[rp][1]*GameJam.tileHeight,
	// 		GameJam.tileWidth, GameJam.tileHeight);
	// }		
};