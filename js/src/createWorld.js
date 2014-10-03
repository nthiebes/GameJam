// Fill the world with walls
window.GameJam.createWorld = function() {

    console.log('Creating world ...');

    GameJam.world = GameJam.levels[GameJam.currentLevel].map;
    GameJam.items = GameJam.levels[GameJam.currentLevel].items;

    // Calculate initial possible path
    GameJam.pathEnd = [Math.floor((GameJam.worldHeight-1) / 2), 0];

    GameJam.redraw();
};