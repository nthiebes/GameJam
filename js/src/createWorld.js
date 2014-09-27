// fill the world with walls
window.GameJam.createWorld = {

    console.log('Creating world...');

    // create emptiness
    for (var x=0; x < worldWidth; x++) {
        world[x] = [];

        for (var y=0; y < worldHeight; y++) {
            world[x][y] = 0;
        }
    }

    // scatter some walls
    for (var x=0; x < worldWidth; x++) {
        for (var y=0; y < worldHeight; y++) {
            if (Math.random() > 0.75){
                world[x][y] = 1;
            }
        }
    }

    // calculate initial possible path
    // note: unlikely but possible to never find one...
    currentPath = [];
    while (currentPath.length == 0) {
        pathStart = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
        pathEnd = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
        if (world[pathStart[0]][pathStart[1]] == 0){
            currentPath = findPath(world,pathStart,pathEnd,'Manhattan');
        }
    }
    redraw();

};