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
                attacking: false,
                steps: 20,          // The speed of the walk animation
                currentStep: 20,    // Current position in the way from one tile to another
                nextTile: [[4, 8]],
                pos: GameJam.items[i].pos,
                sprite:  new Sprite('img/explosion.png', [0, 0], [32, 32], 5, [0, 1], 'horizontal', false, false) // url, pos, size, speed, frames, dir, once, inProgress
            });

        };

        core.itemsToObstacles(false);

    }

    function moveOrBreak(){
         // Break the wall if no path is possible
        if (GameJam.currentPath.length === 0) {
            console.log('Break the wall!');
            breakItem();
            GameJam.currentPath = GameJam.findPath(GameJam.obstacles, [GameJam.prisoner[0].pos[0] / GameJam.tileWidth, GameJam.prisoner[0].pos[1] / GameJam.tileHeight], GameJam.pathEnd);
            
            setTimeout(function(){ 
                core.renderEntities(GameJam.explosion);
                //GameJam.explosion.map(function (sprite){

                //        sprite.sprite.render(GameJam.ctxa);
                        //sprite.sprite.update();
                //})
                setTimeout(function(){ 
                    GameJam.explosion.length = 0;
                    moveOrBreak();
                }, 3000);

            }, 1000);
            

        } else{
            // Draw path
            GameJam.redraw();

            // Define the next tile for the animation
            GameJam.nextTile = [GameJam.currentPath[0]]
        }
    }

    moveOrBreak();
};