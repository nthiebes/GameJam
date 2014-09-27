// fill the world with walls
window.GameJam.createWorld = function() {

    console.log('Creating world...');

    // create emptiness
    for (var x=0; x < GameJam.worldWidth; x++) {
        GameJam.world[x] = [];

        for (var y=0; y < GameJam.worldHeight; y++) {
            GameJam.world[x][y] = 0;
        }
    }

    // scatter some walls
    for (var x=0; x < GameJam.worldWidth; x++) {
        for (var y=0; y < GameJam.worldHeight; y++) {
            if (Math.random() > 0.75){
                GameJam.world[x][y] = 1;
            }
        }
    }

    // calculate initial possible path
    // note: unlikely but possible to never find one...
    GameJam.currentPath = [];
    while (GameJam.currentPath.length == 0) {
        GameJam.pathStart = [Math.floor(Math.random()*GameJam.worldWidth),Math.floor(Math.random()*GameJam.worldHeight)];
        GameJam.pathEnd = [Math.floor(Math.random()*GameJam.worldWidth),Math.floor(Math.random()*GameJam.worldHeight)];
        if (GameJam.world[GameJam.pathStart[0]][GameJam.pathStart[1]] == 0){
            GameJam.currentPath = GameJam.findPath(GameJam.world,GameJam.pathStart,GameJam.pathEnd,'Manhattan');
        }
    }
    GameJam.redraw();

};