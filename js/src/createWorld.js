// Fill the world with walls
window.GameJam.createWorld = function() {

    console.log('Creating world...');

    GameJam.world = GameJam.levels[GameJam.currentLevel].map;

    // Calculate initial possible path
    GameJam.pathEnd = [Math.floor((GameJam.worldHeight-1) / 2), 0];

    GameJam.redraw();

};