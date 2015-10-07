/**
 * Find a path through the maze
 */
window.GameJam.movePrisoner = function(){
	// Create a path
	GameJam.currentPath = [];
    GameJam.currentPath = GameJam.findPath(GameJam.obstacles, [GameJam.prisoner[0].pos[0] / GameJam.tileWidth, GameJam.prisoner[0].pos[1] / GameJam.tileHeight], GameJam.pathEnd);

    function breakItem(){

        //animation of breaking stuff        
        for (var i = GameJam.items.length - 1; i >= 0; i--) {
            GameJam.explosion.push({
                pos: GameJam.items[i].pos,
                sprite: new Sprite({
                    url: 'img/explosion.png',
                    pos: [0, 0],
                    size: [32, 32],
                    speed: 5,
                    frames: [0,1,2,3,4,5,6],
                    dir: 'horizontal',
                    once: true,
                    inProgress: false,
                    stay: false
                })
            });
        }

        core.itemsToObstacles(false);

    }

    function moveOrBreak(){
         // Break the wall if no path is possible
        if (GameJam.currentPath.length === 0) {
            console.log('Break the wall!');
            breakItem();
            GameJam.currentPath = GameJam.findPath(GameJam.obstacles, [GameJam.prisoner[0].pos[0] / GameJam.tileWidth, GameJam.prisoner[0].pos[1] / GameJam.tileHeight], GameJam.pathEnd);
            
            setTimeout(function(){ 
                GameJam.explosion.length = 0;
            }, 2000);

            moveOrBreak();

        } else{
            // Draw path
            GameJam.redraw();

            // Define the next tile for the animation
            GameJam.nextTile = [GameJam.currentPath[0]];
        }
    }

    moveOrBreak();
};