/**
 * Find a path through the maze
 */
window.GameJam.movePrisoner = function(){
	// Create a path
	GameJam.currentPath = [];
    GameJam.currentPath = GameJam.findPath(GameJam.world, [GameJam.prisoner[0].pos[0] / GameJam.tileWidth, GameJam.prisoner[0].pos[1] / GameJam.tileHeight], GameJam.pathEnd);

    // Break the wall if no path is possible
    if (GameJam.currentPath.length === 0) {
    	console.log('Break the wall!');
    } else{
    	// Draw path
    	GameJam.redraw();

    	// Define the next tile for the animation
    	GameJam.nextTile = [GameJam.currentPath[0]]
    }
}