/**
 * Fill the world with walls
 */
window.GameJam.createWorld = function(){
    console.log('Creating world ...');

    GameJam.world = GameJam.map;

    GameJam.obstacles = JSON.parse(JSON.stringify(GameJam.levels[GameJam.currentLevel].obstacles));

    GameJam.pathEnd = [2, 1];

    GameJam.redraw();
};