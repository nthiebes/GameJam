// Fill the world with walls
window.GameJam.createWorld = function() {

    console.log('Creating world...');

    // Create emptiness
    /*for (var x=0; x < GameJam.worldWidth; x++) {
        GameJam.world[x] = [];

        for (var y=0; y < GameJam.worldHeight; y++) {
            GameJam.world[x][y] = 0;
        }
    }*/
    

    // Scatter some walls
    /*for (var x=0; x < GameJam.worldWidth; x++) {
        for (var y=0; y < GameJam.worldHeight; y++) {
            if (Math.random() > 0.75){
                GameJam.world[x][y] = 1;
            }
        }
    }*/

    var levels = {
            level1: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                     [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            level2: []
        };

    GameJam.world = levels.level1;

    // Calculate initial possible path
    GameJam.pathStart = [Math.floor((GameJam.worldHeight-1) / 2), GameJam.worldWidth-1];
    GameJam.pathEnd = [Math.floor((GameJam.worldHeight-1) / 2), 0];

    while (GameJam.currentPath.length == 0) {
        if (GameJam.world[GameJam.pathStart[0]][GameJam.pathStart[1]] == 0){
            GameJam.currentPath = GameJam.findPath(GameJam.world,GameJam.pathStart,GameJam.pathEnd,'Manhattan');
        }
    }
    GameJam.redraw();

};