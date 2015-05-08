/**
 * Fill the world with walls
 */
window.GameJam.createWorld = function(){
    console.log('Creating world ...');

    GameJam.world = GameJam.levels[GameJam.currentLevel].map;
    GameJam.obstacles = GameJam.levels[GameJam.currentLevel].obstacles;

    // Calculate initial possible path
    GameJam.pathEnd = [2, 1]; // Math.floor((GameJam.worldHeight-1) / 2 + 0)

    GameJam.redraw();
};