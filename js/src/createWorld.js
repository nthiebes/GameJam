/**
 * Fill the world with walls
 */
window.GameJam.createWorld = function(){
    console.log('Creating world ...');

    GameJam.world = GameJam.map;
    GameJam.obstacles = GameJam.levels[GameJam.currentLevel].obstacles;

    GameJam.pathEnd = [2, 1];

    GameJam.redraw();
};