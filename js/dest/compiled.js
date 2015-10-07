/**
 * Global game variables
 */
window.GameJam = {
    // The game canvas element (animated)
	canvasa: null,

	// The canvas 2d context
	ctxa: null,

	// The game canvas element (static)
	canvass: null,

	// The canvas 2d context
	ctxs: null,

	// Tilesets
	tilesetLevel: null,
	tilesetObstacles: null,
	 
	// The world grid: a 2d array of tiles
	world: [[]],
	obstacles: [[]],
	imageNumTiles: 16,
	tileSize: 32,
	 
	// Size in the world in sprite tiles
	worldWidth: 16,
	worldHeight: 16,
	 
	// Size of a tile in pixels
	tileWidth: 32,
	tileHeight: 32,
	 
	// Start and end of path
	pathStart: [0, 0],
	pathEnd: [0, 0],
	currentPath: [],

	// Time
	tileCounter: 0,
	lastTime: null,

	// Map
	prisoner: [],
	items: [],
	map: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
		  [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
		  [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
		  [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
		  [64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
		  [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95],
		  [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111],
		  [112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127],
		  [128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143],
		  [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159],
		  [160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175],
		  [176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191],
		  [192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207],
		  [208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223],
		  [224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239],
		  [240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255]],

	// Misc
	explosion: [],
	draggedItem: null,
	currentLevel: '',
	gameStarted: false,
	firstLevel: false,
	gameEnded: false,
	paused: false,
	panning: false,
	loadingPercentage: 30,

	// Html elements
	timer: document.getElementById('timer'),
	html: document.getElementsByTagName('html')[0],
	body: document.getElementsByTagName('body')[0],
	loadingWrapper: document.getElementById('loading-wrapper'),
	loadingInner: document.getElementById('loading-inner'),
	draggedIcon: document.getElementById('dragged-icon'),

	music: null
};
/**
 * Sprite handling
 */
(function(){
    function Sprite( cfg ){
        this.pos = cfg.pos;
        this.size = cfg.size;
        this.speed = typeof cfg.speed === 'number' ? cfg.speed : 0;
        this.frames = cfg.frames;
        this._index = 0;
        this.url = cfg.url;
        this.dir = cfg.dir || 'horizontal';
        this.once = cfg.once;
        this.stay = cfg.stay;
        this.currentFrame;
        this.inProgress = cfg.inProgress;
    }

    Sprite.prototype = {
        update: function(dt) {
            // Stay not yet working correct
            if (!(this.stay && this.done)) {
                this._index += this.speed*dt;
                // Always start with first frame
                if( this.frames.length === 1 ){
                    this._index = 0;
                }
            }
        },

        render: function(ctx) {
            var frame;

            if(this.speed > 0) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];

                if(this.once && idx >= max) {
                    this.done = true;
                }

                // End animation
                if( idx >= max ){
                    this._index = 0;
                }
            }
            else {
                frame = 0;
            }

            this.currentFrame = frame;


            var x = this.pos[0];
            var y = this.pos[1];

            if(this.dir == 'vertical') {
                y += frame * this.size[1];
            }
            else {
                x += frame * this.size[0];
            }

            //if it is done and it has to run once, we dont update
            if(!(this.done && this.once)){
                ctx.drawImage(resources.get(this.url),
                              x, y,
                              this.size[0], this.size[1],
                              0, 0,
                              this.size[0], this.size[1]);
            }
        }
    };

    window.Sprite = Sprite;
})();
/**
 * All levels of the game
 * @type {Object}
 */

/*

[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],

sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [96, 0],
    size: [32, 64],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})

 */

window.GameJam.levels = {
	level1: {
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 7, 13, 0, 0, 12, 28, 44, 0, 8, 24, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [20, 25, 30],
		unlocked: true,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [64, 0],
				    size: [32, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [128, 0],
				    size: [64, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			}
		]
	},
	level2: {
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 0, 0, 8, 24, 0, 0, 0, 0, 0, 0, 1],
				    [1, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 23, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 7, 0, 0, 13, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 4, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 5, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 12, 28, 44, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [20, 30, 40],
		unlocked: false,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [64, 0],
				    size: [32, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [96, 0],
				    size: [32, 64],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [128, 0],
				    size: [64, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			}
		]
	},
	level3: {
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [20, 30, 40],
		unlocked: true,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [64, 0],
    size: [32, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [96, 0],
    size: [32, 64],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [128, 0],
    size: [64, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			}
		]
	},
	level4: {
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 0, 0, 8, 24, 0, 0, 0, 0, 0, 0, 1],
				    [1, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 23, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 7, 0, 0, 13, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 2, 4, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 5, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 12, 28, 44, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [20, 30, 40],
		unlocked: true,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [64, 0],
    size: [32, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [96, 0],
    size: [32, 64],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [128, 0],
    size: [64, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			}
		]
	},
	level5: {
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 0, 0, 8, 24, 0, 0, 0, 0, 0, 0, 1],
				    [1, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 23, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 7, 0, 0, 13, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 4, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 5, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 12, 28, 44, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [20, 30, 40],
		unlocked: false,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [64, 0],
    size: [32, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [96, 0],
    size: [32, 64],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [128, 0],
    size: [64, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			}
		]
	},
	level6: {
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 0, 0, 8, 24, 0, 0, 0, 0, 0, 0, 1],
				    [1, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 23, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 7, 0, 0, 13, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 4, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 5, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 12, 28, 44, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [20, 30, 40],
		unlocked: false,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [64, 0],
    size: [32, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [96, 0],
    size: [32, 64],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [128, 0],
    size: [64, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			}
		]
	},
	level7: {
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 0, 0, 8, 24, 0, 0, 0, 0, 0, 0, 1],
				    [1, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 23, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 7, 0, 0, 13, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 4, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 5, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 12, 28, 44, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [20, 30, 40],
		unlocked: false,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [64, 0],
    size: [32, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [96, 0],
    size: [32, 64],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [128, 0],
    size: [64, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			}
		]
	},
	level8: {
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 0, 0, 8, 24, 0, 0, 0, 0, 0, 0, 1],
				    [1, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 23, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 7, 0, 0, 13, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 4, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 5, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 12, 28, 44, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [20, 30, 40],
		unlocked: false,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [64, 0],
    size: [32, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [96, 0],
    size: [32, 64],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [128, 0],
    size: [64, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			}
		]
	},
	level9: {
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 0, 0, 8, 24, 0, 0, 0, 0, 0, 0, 1],
				    [1, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 23, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 7, 0, 0, 13, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 4, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 5, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 12, 28, 44, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [20, 30, 40],
		unlocked: false,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [64, 0],
    size: [32, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [96, 0],
    size: [32, 64],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [128, 0],
    size: [64, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			}
		]
	},
	leve10: {
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 0, 0, 8, 24, 0, 0, 0, 0, 0, 0, 1],
				    [1, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 23, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 7, 0, 0, 13, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 4, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 5, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 12, 28, 44, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [20, 30, 40],
		unlocked: false,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [64, 0],
    size: [32, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [96, 0],
    size: [32, 64],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [128, 0],
    size: [64, 32],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})
			}
		]
	}
};
/**
 * The heart of the game
 * @return {object} Public functions
 */
var core = function(document, window){

	var localStorageActive = storageAvailable('localStorage');


	/**
	 * General initialization
	 */
	function init(){
		loading(GameJam.loadingPercentage);

		window.onload = function(){
			// Initialize game if all ressources are loaded
			resources.load([
				'img/mouse.png',
				'img/fog.png',
				'img/loading.png',
				'img/background.png',
				'img/ui.png',
				'img/window.png',
				'img/window-bg.jpg',
				'img/window-vert.png',
				'img/icons.png',
				'img/level.png',
				'img/obstacles.png',
				'img/explosion.png'
			]);
			resources.onReady(initMenu);
		};
   	}


   	/**
   	 * Initialize the main menu
   	 */
   	function initMenu(){
   		loading(100);
   		console.log('-- Loading done');

		//music
		if (!buzz.isMP3Supported()) {
		    alert("Your browser doesn't support MP3 Format.");
		}else{
			// GameJam.music = new buzz.sound("music/cafm.mp3");
			// GameJam.music.loop().play().fadeIn();
		}

   		requestTimeout(function(){
			changeView('menu');
			document.getElementById('fog').className = 'show';
			console.log('-- Menu initialized');
		}, 700);

		interaction.GeneralEvents();
		console.log('-- Events initialized');

		if (localStorageActive) {
			if (!localStorage.getItem('level1')) {
				populateStorage();
			} else {
				useStorage();
			}
		} else {
			if (!docCookies.hasItem('levels')) {
				populateCookie();
			} else {
				useCookie();
			}
		}


		var musicbtn = document.getElementById('musicbtn');

		musicbtn.addEventListener('click', function() {
			console.log("he: " +document.getElementById('musicbtn').getAttribute("data-checked"));
		    var musicon = !(document.getElementById('musicbtn').getAttribute("data-checked") == 'true');
		    console.log(musicon	);
		    musicon ? GameJam.music.play() : GameJam.music.pause();
		}, false);

		getLevels();
		interaction.LevelButtonEvents();
   	}


   	/**
   	 * Populate the local storage for the first time
   	 */
   	function populateStorage(){
   		console.log('-- Populate local storage');

   		for (var level in GameJam.levels) {
   			localStorage.setItem(level, GameJam.levels[level].time);
   		}
   	}


   	/**
   	 * Update the levels with data from storage
   	 */
   	function useStorage(){
   		console.log('-- Use local storage');

   		for (var level in GameJam.levels) {
   			GameJam.levels[level].time = localStorage.getItem(level);
   			if (GameJam.levels[level].time >= GameJam.levels[level].stars[0]) {
   				GameJam.levels[level].unlocked = true;
   				var nextLevel = 'level' + (parseInt(level.replace(/level/g, '')) + 1);
   				GameJam.levels[nextLevel].unlocked = true;
   			}
   		}
   	}


   	/**
   	 * Populate the cookie for the first time
   	 */
   	function populateCookie(){
   		console.log('-- Populate cookie');

   		var cookieObject = {};
   		for (var level in GameJam.levels) {
   			cookieObject[level] = GameJam.levels[level].time;
   		}
   		docCookies.setItem('levels', JSON.stringify(cookieObject));
   	}


   	/**
   	 * Update the levels with data from cookie
   	 */
   	function useCookie(){
   		console.log('-- Use cookie');

   		var cookie = JSON.parse(docCookies.getItem('levels'));
   		for (var level in GameJam.levels) {
   			GameJam.levels[level].time = cookie[level];
   			if (GameJam.levels[level].time >= GameJam.levels[level].stars[0]) {
   				GameJam.levels[level].unlocked = true;
   				var nextLevel = 'level' + (parseInt(level.replace(/level/g, '')) + 1);
   				GameJam.levels[nextLevel].unlocked = true;
   			}
   		}
   	}


	/**
	 * Game initialization
	 */
   	function initGame(){
		GameJam.lastTime = Date.now();
		
		// Static canvas
		GameJam.canvass = document.createElement('canvas');
		GameJam.ctxs = GameJam.canvass.getContext('2d');
		document.getElementsByTagName('main')[0].appendChild(GameJam.canvass);
		GameJam.canvass.width = GameJam.worldWidth * GameJam.tileWidth;
		GameJam.canvass.height = GameJam.worldHeight * GameJam.tileHeight;
		GameJam.canvass.id = 'static-canvas';

		// Animated canvas
		GameJam.canvasa = document.createElement('canvas');
		GameJam.ctxa = GameJam.canvasa.getContext('2d');
		document.getElementsByTagName('main')[0].appendChild(GameJam.canvasa);
		GameJam.canvasa.width = GameJam.worldWidth * GameJam.tileWidth;
		GameJam.canvasa.height = GameJam.worldHeight * GameJam.tileHeight;
		GameJam.canvasa.id = 'animation-canvas';

		// Set map tileset
		GameJam.tilesetLevel = resources.get('img/level.png');
		GameJam.tilesetObstacles = resources.get('img/obstacles.png');
		 
		// Create the priosoner object
		GameJam.prisoner.push({
			attacking: false,
			steps: 20,			// The speed of the walk animation
			currentStep: 20,	// Current position in the way from one tile to another
			nextTile: [],
			pos: [Math.floor((GameJam.worldWidth-1) / 2) * GameJam.tileWidth, (GameJam.worldHeight-1) * GameJam.tileHeight - 32],
			sprite: new Sprite({
				url: 'img/mouse.png',
				pos: [0, 0],
				size: [32, 32],
				speed: 5,
				frames: [0, 1],
				dir: 'horizontal',
				once: false,
				inProgress: false,
				stay: false
			})
		});

		
		// Main game loop
		main();

		// Hide menu
		GameJam.body.className = 'in-game';
		document.getElementById('levels').className = 'window hide';
		document.getElementById('fog').className = '';

		console.log('-- Game initialized');
   	}


   	/**
   	 * Create level tiles
   	 */
   	function getLevels(){
		var levelHtml = '<ul>',
			counter = 1;
		for (var level in GameJam.levels) {
			var unlocked = GameJam.levels[level]['unlocked'],
				time = GameJam.levels[level]['time'],
				stars = GameJam.levels[level]['stars'],
				star = 0;

			for (var i in stars) {
				if (time >= stars[i]) {
					star++;
				}
			}

			levelHtml += '<li class="level' + (unlocked ? ' unlocked' : '') + '" id="' + level + '">' +
							(unlocked ? '<div class="counter">' + counter + '</div>' : '<div class="locked"></div>') +
							(unlocked ? '<div class="stars star' + star + '"></div>' : '') +
						  '</li>';
			counter++;
		}
		levelHtml += '</ul>';

		document.querySelectorAll('#levels .inner-content')[0].innerHTML = levelHtml;
   	}


	/**
	 * Update loading bar
	 * @param {integer} percentage Loading percentage
	 */
	function loading(percentage){
		GameJam.loadingInner.style.width = percentage + '%';
		GameJam.loadingPercentage = percentage;

		if (percentage === 100) {
			window.setTimeout(function(){
				GameJam.loadingWrapper.className = 'hide';
			}, 600);
		}
	}


	/**
	 * Change the view
	 * @param {string} newView The new view that should be shown
	 */
	function changeView(newView){
		if (document.querySelectorAll('.window.show').length) {
			GameJam.body.className = '';
			var current = document.querySelectorAll('.window.show')[0];
			current.className = 'window';

			requestTimeout(function(){
				current.className = 'window hide';
			}, 300);
		}
		requestTimeout(function(){
			GameJam.body.className = 'view-' + newView;
			document.querySelectorAll('#' + newView)[0].className = 'window show';
		}, 300);
	}


	/**
	 * Hide obstacles list
	 */
	function hideObstacles(){
		if (!document.getElementById('slider').className.match(/hide/g)) {
	    	document.getElementById('slider').className = 'show minimized';
			document.getElementById('obstacles').className = 'show minimized';
			document.getElementById('start-button-wrapper').className = 'show minimized';
			document.getElementById('start-game').className = 'button disabled';
		}
	}


	/**
	 * Show obstacles list
	 */
	function showObstacles(){
    	document.getElementById('slider').className = 'show expanded';
		document.getElementById('obstacles').className = 'show expanded';
		document.getElementById('start-button-wrapper').className = 'show expanded';
		document.getElementById('start-game').className = 'button';
	}


   	/**
   	 * Main game loop
   	 */
   	function main(){
		var now = Date.now();
		var dt = (now - GameJam.lastTime) / 1000.0;

		// Render if not paused
		if (!GameJam.paused) {
			update(dt);
			render();
		}
		
		GameJam.lastTime = now;
		requestAnimFrame(main);
	}


	/**
	 * Update sprite positions
	 * @param {integer} dt The time that has changed since the last update
	 */
	function update(dt){
		// Only move if a path exists and no pan is in progress
		if (!GameJam.panning) {
			if (GameJam.currentPath.length > 0) {
				// Vertical movement
				if (GameJam.prisoner[0].nextTile[0] === GameJam.currentPath[0][0]) {
					// Move top if next tile is above current
					if (GameJam.prisoner[0].nextTile[1] > GameJam.currentPath[0][1]) {
						GameJam.prisoner[0].pos[1] = GameJam.currentPath[0][1] * GameJam.tileHeight + ((GameJam.tileHeight / GameJam.prisoner[0].steps) * GameJam.prisoner[0].currentStep);
						GameJam.prisoner[0].sprite.pos[1] = 0;
					// Move bottom if next tile is below current
					} else if (GameJam.prisoner[0].nextTile[1] < GameJam.currentPath[0][1]){
						GameJam.prisoner[0].pos[1] = GameJam.currentPath[0][1] * GameJam.tileHeight - ((GameJam.tileHeight / GameJam.prisoner[0].steps) * GameJam.prisoner[0].currentStep);
						GameJam.prisoner[0].sprite.pos[1] = 32;
					}

				// Horizontal movement
				} else{
					// Move left if next tile is on the left side of the current
					if (GameJam.prisoner[0].nextTile[0] > GameJam.currentPath[0][0]) {
						GameJam.prisoner[0].pos[0] = GameJam.currentPath[0][0] * GameJam.tileWidth + ((GameJam.tileWidth / GameJam.prisoner[0].steps) * GameJam.prisoner[0].currentStep);
						GameJam.prisoner[0].sprite.pos[1] = 64;
					// Move right if next tile is on the right side of the current
					} else if (GameJam.prisoner[0].nextTile[0] < GameJam.currentPath[0][0]) {
						GameJam.prisoner[0].pos[0] = GameJam.currentPath[0][0] * GameJam.tileWidth - ((GameJam.tileWidth / GameJam.prisoner[0].steps) * GameJam.prisoner[0].currentStep);
						GameJam.prisoner[0].sprite.pos[1] = 96;
					}
				}

				// End of an animation from tile to tile
				if (GameJam.prisoner[0].currentStep === 1) {
					GameJam.prisoner[0].nextTile = GameJam.currentPath[0];

					// Remove the first tile in the array
					GameJam.currentPath.splice(0,1);

					// Reset to start animation for next tile 
					GameJam.prisoner[0].currentStep = GameJam.prisoner[0].steps;

					GameJam.tileCounter++;
				}	

				GameJam.prisoner[0].currentStep--;		
			} else{
				GameJam.prisoner[0].sprite.pos[1] = 0;
				GameJam.prisoner[0].sprite.speed = 0;

				if (GameJam.gameStarted && !GameJam.gameEnded) {
					endLevel();
				}
			}

			// Update tile counter
			if (GameJam.gameStarted && !GameJam.gameEnded) {
				GameJam.timer.innerHTML = Math.round(GameJam.tileCounter);
			}
		}

		updateEntities(dt);
	}


	/**
	 * Update entities
	 * @param {integer} dt The time that has changed since the last update
	 */
	function updateEntities(dt){
	    // Update the prisoner sprite animation
	    if (!GameJam.panning) {
		    for (var i in GameJam.prisoner) {
				GameJam.prisoner[i].sprite.update(dt);
			}
		}

	    for (var i in GameJam.items) {
			GameJam.items[i].sprite.update(dt);
		}

		for (var i in GameJam.explosion) {
			GameJam.explosion[i].sprite.update(dt);
		}
	}


	/**
	 * Draw everything
	 */
	function render(){
		GameJam.canvasa.width = GameJam.canvasa.width;
	    renderEntities(GameJam.prisoner);
	    renderEntities(GameJam.items);
	    renderEntities(GameJam.explosion);
	}


	/**
	 * Render entities
	 * @param {array} list A list of entities
	 */
	function renderEntities(list){
		if (!list.pos) {
			//return false;
		}
		for(var i=0; i<list.length; i++) {
			renderEntity(list[i]);
		}    
	}


	/**
	 * Render a single entity
	 * @param {object} entity An object in the game
	 */
	function renderEntity(entity){
		if (entity.pos) {
			GameJam.ctxa.save();
			GameJam.ctxa.translate(entity.pos[0], entity.pos[1]);
			entity.sprite.render(GameJam.ctxa);
			GameJam.ctxa.restore();
		}
	}
   	
	function itemsToObstacles(insertItems){
		// Put the items to the world map
		var list = GameJam.items;
		for (var i=0; i<list.length; i++) {
			var item = GameJam.items[i],
				itemPos = item.sprite.pos,
				obstacleX = itemPos[0]/32,
				obstacleY = itemPos[1]/32,
				rows = item.height/32,
				cols = item.width/32,
				offset = obstacleY;
			
			if (cols >= rows) {
				for (var c=0; c<cols; c++) {
					GameJam.obstacles[GameJam.items[i].pos[0]/32 + c][GameJam.items[i].pos[1]/32] = insertItems? obstacleX + c : 0;
				}
			} else {
				for (var r=0; r<rows; r++) {
					GameJam.obstacles[GameJam.items[i].pos[0]/32][GameJam.items[i].pos[1]/32 + r] = insertItems? obstacleX + offset : 0;
					offset = offset + GameJam.imageNumTiles;
				}
			}
		}
	}


   	/**
   	 * Start the second stage of the game
   	 */
   	function startGame(){
		
		//put items in the map
		itemsToObstacles(true);

		// Create the prisoner path
		GameJam.movePrisoner();

		// Reset items, we dont want the user to be able to drag and drop them
 		GameJam.items = [];
 		
 		for (var item in GameJam.levels[GameJam.currentLevel].items) {
 			GameJam.levels[GameJam.currentLevel].items[item].count = GameJam.levels[GameJam.currentLevel].items[item].countStart;
 		}

		// Reset prisoner speed
		GameJam.prisoner[0].sprite.speed = 5;

		// Reset game time
		GameJam.tileCounter = 0;
		GameJam.timer.className = 'show';
		document.getElementById('obstacles').className = 'hide';
		document.getElementById('slider').className = 'hide';
		document.getElementById('start-button-wrapper').className = 'hide';

		// Game has started
		GameJam.gameStarted = true;

		GameJam.gameEnded = false;

		console.log('-- Game started');
	}


	/**
	 * End of the level
	 */
	function endLevel(){
		GameJam.gameEnded = true;
		GameJam.paused = true;

		// Reset
		var starsElmts = document.querySelectorAll('.stars-big .star');
		for (var star in starsElmts) {
			starsElmts[star].className = 'star';
		}

		var nextLevelBtn = document.querySelectorAll('#complete .next-btn')[0];
		if (nextLevelBtn) {
			nextLevelBtn.remove();
		}

		var stars = GameJam.levels[GameJam.currentLevel].stars,
			steps = Math.round(GameJam.tileCounter);

		for (var i in stars) {
			document.querySelectorAll('#steps' + i)[0].innerHTML = stars[i];

			if (GameJam.levels[GameJam.currentLevel].time >= stars[i]) {
				document.querySelectorAll('#star-big' + i)[0].className = 'star visible';
			}

			// Current playthrough
			if (steps >= stars[i]) {
				showStar(i);
				var nextLevel = 'level' + (parseInt(GameJam.currentLevel.replace(/level/g, '')) + 1);
				if (GameJam.levels[nextLevel]) {
					GameJam.levels[nextLevel].unlocked = true;
				}
			}
		}

		function showStar(star){
			requestTimeout(function(){
				document.querySelectorAll('#star-big' + star)[0].className = 'star show';
			}, star*500 + 500);
		}

		if (steps > GameJam.levels[GameJam.currentLevel].time) {
			GameJam.levels[GameJam.currentLevel].time = steps;
			if (localStorageActive) {
				localStorage.setItem(GameJam.currentLevel, steps);
			} else {
				var cookieObject = JSON.parse(docCookies.getItem('levels'));
				cookieObject[GameJam.currentLevel] = steps;
				docCookies.setItem('levels', JSON.stringify(cookieObject));
			}
		}
		document.querySelectorAll('#complete .steps')[0].innerHTML = steps;

		if (GameJam.levels[GameJam.currentLevel].time >= GameJam.levels[GameJam.currentLevel].stars[0]) {
			var buttonsElm = document.querySelectorAll('#complete .buttons')[0];
			buttonsElm.insertAdjacentHTML('beforeend', '<div class="button next-btn"></div>');
			interaction.NextLevelBtnEvent();
		}

		GameJam.canvasa.style.display = 'none';
		GameJam.canvass.style.display = 'none';
		GameJam.timer.className = '';

		document.getElementById('fog').className = 'show';

		getLevels();
		interaction.LevelButtonEvents();

		changeView('complete');

		console.log('-- Level done!');
	}


	/**
	 * Load a new level
	 */
	function loadLevel(newLevel){
		console.log('-- Load new level:', newLevel);
		GameJam.currentLevel = newLevel;

		GameJam.timer.className = '';

		if( !GameJam.firstLevel ){
			core.InitGame();
		} else {
			GameJam.prisoner[0].pos = [Math.floor((GameJam.worldWidth-1) / 2) * GameJam.tileWidth, (GameJam.worldHeight-1) * GameJam.tileHeight - 32];

			// Hide menu
			GameJam.body.className = 'in-game';
			document.getElementById('levels').className = 'window hide';
			document.getElementById('fog').className = '';
		}
		GameJam.createWorld();

		// Create obstacle icons
		var iconsHtml = '',
			counter = 1;
		for (var i in GameJam.levels[GameJam.currentLevel].items) {
			var item = GameJam.levels[GameJam.currentLevel].items[i];
			iconsHtml += '<li class="obstacle" data-icon="' + item.id + '">' +
							'<div class="size">' + item.width/32 + 'x' + item.height/32 + '</div>' +
							'<div class="icon" style="background-position: 0px -' + item.icon + 'px;"></div>' +
							'<div class="count">' + item.count + '</div>' +
						 '</li>';
			counter++;
		}
		document.getElementById('obstacles-list').innerHTML = iconsHtml;

		// Register game event handlers
		if( !GameJam.firstLevel ){
			interaction.GameEvents();
		}
		interaction.ObstacleEvents();
		console.log('-- Game events initialized');

		GameJam.canvasa.style.display = 'block';
		GameJam.canvass.style.display = 'block';

		GameJam.paused = false;

		requestTimeout(function(){
			document.getElementById('obstacles').className = 'show';
			document.getElementById('start-button-wrapper').className = 'show';
			document.getElementById('slider').className = 'show';
		}, 300);

		if( !GameJam.firstLevel ){
			GameJam.firstLevel = true;
		}
	}


	/**
	 * Check for local storage availability
	 */
	function storageAvailable(type){
		try {
			var storage = window[type],
				x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return false;
		}
	}


	/**
	 * Cookie helper
	 */
	var docCookies = {
		getItem: function (sKey) {
			if (!sKey) { return null; }
			return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
		},
		setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
			if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
			var sExpires = "";
			if (vEnd) {
				switch (vEnd.constructor) {
					case Number:
						sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
						break;
					case String:
						sExpires = "; expires=" + vEnd;
						break;
					case Date:
						sExpires = "; expires=" + vEnd.toUTCString();
					break;
				}
			}
			document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
			return true;
		},
		removeItem: function (sKey, sPath, sDomain) {
			if (!this.hasItem(sKey)) { return false; }
			document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
			return true;
		},
		hasItem: function (sKey) {
			if (!sKey) { return false; }
			return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		},
		keys: function () {
			var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
			for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
			return aKeys;
		}
	};


	/**
	 * A cross-browser requestAnimationFrame
	 */
	var requestAnimFrame = (function(){
		return window.requestAnimationFrame    ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback){
				window.setTimeout(callback, 1000 / 60);
			};
	})();


	/**
	 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
	 * @param {function} 	fn 		The callback function
	 * @param {int} 		delay 	The delay in milliseconds
	 */
	window.requestTimeout = function(fn, delay){
	    if( !window.requestAnimationFrame       && 
	        !window.webkitRequestAnimationFrame && 
	        !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
	        !window.oRequestAnimationFrame      && 
	        !window.msRequestAnimationFrame)
	            return window.setTimeout(fn, delay);
	            
	    var start = new Date().getTime(),
	        handle = new Object();
	        
	    function loop(){
	        var current = new Date().getTime(),
	            delta = current - start;
	            
	        delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
	    };
	    
	    handle.value = requestAnimFrame(loop);
	    return handle;
	};
	 

	/**
	 * Return public function
	 */
	return {
		Init: init,
		InitGame: initGame,
		StartGame: startGame,
		ChangeView: changeView,
		Loading: loading,
		HideObstacles: hideObstacles,
		ShowObstacles: showObstacles,
		itemsToObstacles: itemsToObstacles,
		LoadLevel: loadLevel,
		DocCookies: docCookies,
		LocalStorageActive: localStorageActive,
		renderEntities: renderEntities
	};

}(document, window);

core.Init();
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
/**
 * Handle resources
 * @return {object} Public functions
 */
var resources = function(document, window){

    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /**
     * Load an image url or an array of image urls
     * @param {array} urlOrArr Array of image urls
     */
    function load(urlOrArr){
        if (urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            _load(urlOrArr);
        }
    }

    function _load(url){
        if(resourceCache[url]) {
            return resourceCache[url];
        } else {
            var img = new Image();
            img.onload = function(){
                resourceCache[url] = img;
                
                GameJam.loadingPercentage += 5;
                core.Loading(GameJam.loadingPercentage);

                if (isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }


    /**
     * [get description]
     * @param  {string} url Image url
     * @return {image} The image object
     */
    function get(url){
        return resourceCache[url];
    }


    /**
     * Check if all resources are loaded
     * @return {boolean}
     */
    function isReady(){
        var ready = true;
        for (var k in resourceCache) {
            if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }


    /**
     * Push callback functions to a callback array
     * @param {function} func Callback function
     */
    function onReady(func){
        readyCallbacks.push(func);
    }


    /**
     * Return public functions
     */
    return { 
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };

}(document, window);
/*! Hammer.JS - v2.0.3 - 2014-09-10
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */


!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==ib?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<gb.length;){if(c=gb[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return mb++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:pb?N:qb?O:ob?Q:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&wb&&d-e===0,g=b&(yb|zb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=lb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===wb||f.eventType===yb)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=zb&&(i>vb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=kb(l.x)>kb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:jb(a.pointers[c].clientX),clientY:jb(a.pointers[c].clientY)},c++;return{timeStamp:lb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:jb(a[0].clientX),y:jb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:jb(c/b),y:jb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Ab:kb(a)>=kb(b)?a>0?Bb:Cb:b>0?Db:Eb}function I(a,b,c){c||(c=Ib);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Ib);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Jb)-J(a[1],a[0],Jb)}function L(a,b){return I(b[0],b[1],Jb)/I(a[0],a[1],Jb)}function M(){this.evEl=Lb,this.evWin=Mb,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Pb,this.evWin=Qb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Sb,this.targetIds={},y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=this.targetIds;if(b&(wb|xb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f=t(a.targetTouches),g=t(a.changedTouches),h=[];if(b===wb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(yb|zb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function Q(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new O(this.manager,a),this.mouse=new M(this.manager,a)}function R(a,b){this.manager=a,this.set(b)}function S(a){if(q(a,Yb))return Yb;var b=q(a,Zb),c=q(a,$b);return b&&c?Zb+" "+$b:b||c?b?Zb:$b:q(a,Xb)?Xb:Wb}function T(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=_b,this.simultaneous={},this.requireFail=[]}function U(a){return a&ec?"cancel":a&cc?"end":a&bc?"move":a&ac?"start":""}function V(a){return a==Eb?"down":a==Db?"up":a==Bb?"left":a==Cb?"right":""}function W(a,b){var c=b.manager;return c?c.get(a):a}function X(){T.apply(this,arguments)}function Y(){X.apply(this,arguments),this.pX=null,this.pY=null}function Z(){X.apply(this,arguments)}function $(){T.apply(this,arguments),this._timer=null,this._input=null}function _(){X.apply(this,arguments)}function ab(){X.apply(this,arguments)}function bb(){T.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function cb(a,b){return b=b||{},b.recognizers=m(b.recognizers,cb.defaults.preset),new db(a,b)}function db(a,b){b=b||{},this.options=i(b,cb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new R(this,this.options.touchAction),eb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function eb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function fb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var gb=["","webkit","moz","MS","ms","o"],hb=b.createElement("div"),ib="function",jb=Math.round,kb=Math.abs,lb=Date.now,mb=1,nb=/mobile|tablet|ip(ad|hone|od)|android/i,ob="ontouchstart"in a,pb=v(a,"PointerEvent")!==d,qb=ob&&nb.test(navigator.userAgent),rb="touch",sb="pen",tb="mouse",ub="kinect",vb=25,wb=1,xb=2,yb=4,zb=8,Ab=1,Bb=2,Cb=4,Db=8,Eb=16,Fb=Bb|Cb,Gb=Db|Eb,Hb=Fb|Gb,Ib=["x","y"],Jb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Kb={mousedown:wb,mousemove:xb,mouseup:yb},Lb="mousedown",Mb="mousemove mouseup";j(M,y,{handler:function(a){var b=Kb[a.type];b&wb&&0===a.button&&(this.pressed=!0),b&xb&&1!==a.which&&(b=yb),this.pressed&&this.allow&&(b&yb&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:tb,srcEvent:a}))}});var Nb={pointerdown:wb,pointermove:xb,pointerup:yb,pointercancel:zb,pointerout:zb},Ob={2:rb,3:sb,4:tb,5:ub},Pb="pointerdown",Qb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Pb="MSPointerDown",Qb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Nb[d],f=Ob[a.pointerType]||a.pointerType,g=f==rb;e&wb&&(0===a.button||g)?b.push(a):e&(yb|zb)&&(c=!0);var h=s(b,a.pointerId,"pointerId");0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Rb={touchstart:wb,touchmove:xb,touchend:yb,touchcancel:zb},Sb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Rb[a.type],c=P.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:rb,srcEvent:a})}}),j(Q,y,{handler:function(a,b,c){var d=c.pointerType==rb,e=c.pointerType==tb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(yb|zb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Tb=v(hb.style,"touchAction"),Ub=Tb!==d,Vb="compute",Wb="auto",Xb="manipulation",Yb="none",Zb="pan-x",$b="pan-y";R.prototype={set:function(a){a==Vb&&(a=this.compute()),Ub&&(this.manager.element.style[Tb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),S(a.join(" "))},preventDefaults:function(a){if(!Ub){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,Yb),f=q(d,$b),g=q(d,Zb);return e||f&&c&Fb||g&&c&Gb?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var _b=1,ac=2,bc=4,cc=8,dc=cc,ec=16,fc=32;T.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=W(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=W(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=W(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=W(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?U(d):""),a)}var c=this,d=this.state;cc>d&&b(!0),b(),d>=cc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=fc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(fc|_b)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(dc|ec|fc)&&(this.state=_b),this.state=this.process(b),void(this.state&(ac|bc|cc|ec)&&this.tryEmit(b))):(this.reset(),void(this.state=fc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(X,T,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ac|bc),e=this.attrTest(a);return d&&(c&zb||!e)?b|ec:d||e?c&yb?b|cc:b&ac?b|bc:ac:fc}}),j(Y,X,{defaults:{event:"pan",threshold:10,pointers:1,direction:Hb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Fb&&b.push($b),a&Gb&&b.push(Zb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Fb?(e=0===f?Ab:0>f?Bb:Cb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ab:0>g?Db:Eb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return X.prototype.attrTest.call(this,a)&&(this.state&ac||!(this.state&ac)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=V(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(Z,X,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Yb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ac)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j($,T,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[Wb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(yb|zb)&&!f)this.reset();else if(a.eventType&wb)this.reset(),this._timer=e(function(){this.state=dc,this.tryEmit()},b.time,this);else if(a.eventType&yb)return dc;return fc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===dc&&(a&&a.eventType&yb?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=lb(),this.manager.emit(this.options.event,this._input)))}}),j(_,X,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Yb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ac)}}),j(ab,X,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Fb|Gb,pointers:1},getTouchAction:function(){return Y.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Fb|Gb)?b=a.velocity:c&Fb?b=a.velocityX:c&Gb&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&kb(b)>this.options.velocity&&a.eventType&yb},emit:function(a){var b=V(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(bb,T,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[Xb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&wb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=yb)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=dc,this.tryEmit()},b.interval,this),ac):dc}return fc},failTimeout:function(){return this._timer=e(function(){this.state=fc},this.options.interval,this),fc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==dc&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),cb.VERSION="2.0.3",cb.defaults={domEvents:!1,touchAction:Vb,enable:!0,inputTarget:null,inputClass:null,preset:[[_,{enable:!1}],[Z,{enable:!1},["rotate"]],[ab,{direction:Fb}],[Y,{direction:Fb},["swipe"]],[bb],[bb,{event:"doubletap",taps:2},["tap"]],[$]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var gc=1,hc=2;db.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?hc:gc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&dc)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===hc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ac|bc|cc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof T)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&fb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&eb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(cb,{INPUT_START:wb,INPUT_MOVE:xb,INPUT_END:yb,INPUT_CANCEL:zb,STATE_POSSIBLE:_b,STATE_BEGAN:ac,STATE_CHANGED:bc,STATE_ENDED:cc,STATE_RECOGNIZED:dc,STATE_CANCELLED:ec,STATE_FAILED:fc,DIRECTION_NONE:Ab,DIRECTION_LEFT:Bb,DIRECTION_RIGHT:Cb,DIRECTION_UP:Db,DIRECTION_DOWN:Eb,DIRECTION_HORIZONTAL:Fb,DIRECTION_VERTICAL:Gb,DIRECTION_ALL:Hb,Manager:db,Input:y,TouchAction:R,TouchInput:O,MouseInput:M,PointerEventInput:N,TouchMouseInput:Q,Recognizer:T,AttrRecognizer:X,Tap:bb,Pan:Y,Swipe:ab,Pinch:Z,Rotate:_,Press:$,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==ib&&define.amd?define(function(){return cb}):"undefined"!=typeof module&&module.exports?module.exports=cb:a[c]=cb}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.map

/**
 * Find a path to 
 * @param  {array}	world     	World is a 2d array of integers (e.g. world[10][15] = 0)
 * @param  {array}  pathStart	e.g. [5,10]
 * @param  {array}  pathEnd   	e.g. [5,10]
 * @return {array}           	this returns an array of coordinates that is empty if no path is possible
 */
window.GameJam.findPath = function(world, pathStart, pathEnd){
	// shortcuts for speed
	var	abs = Math.abs;
	var	max = Math.max;
	var	pow = Math.pow;
	var	sqrt = Math.sqrt;

	// the world data are integers:
	// anything higher than this number is considered blocked
	// this is handy if you use numbered sprites, more than one
	// of which is walkable road, grass, mud, etc
	var maxWalkableTileNum = 0;

	// keep track of the world dimensions
    // Note that this A-star implementation expects the world array to be square: 
	// it must have equal height and width. If your game world is rectangular, 
	// just fill the array with dummy values to pad the empty space.
	var worldWidth = world[0].length;
	var worldHeight = world.length;
	var worldSize =	worldWidth * worldHeight;

	// which heuristic should we use?
	// default: no diagonals (Manhattan)
	var distanceFunction = ManhattanDistance;
	var findNeighbours = function(){}; // empty

	/*

	// alternate heuristics, depending on your game:

	// diagonals allowed but no sqeezing through cracks:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighbours;

	// diagonals and squeezing through cracks allowed:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighboursFree;

	// euclidean but no squeezing through cracks:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighbours;

	// euclidean and squeezing through cracks allowed:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighboursFree;

	*/

	// distanceFunction functions
	// these return how far away a point is to another

	function ManhattanDistance(Point, Goal){
		// linear movement - no diagonals - just cardinal directions (NSEW)
		return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
	}

	function DiagonalDistance(Point, Goal){
		// diagonal movement - assumes diag dist is 1, same as cardinals
		return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
	}

	function EuclideanDistance(Point, Goal){
		// diagonals are considered a little farther than cardinal directions
		// diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
		// where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
		return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
	}

	// Neighbours functions, used by findNeighbours function
	// to locate adjacent available cells that aren't blocked

	// Returns every available North, South, East or West
	// cell that is empty. No diagonals,
	// unless distanceFunction function is not Manhattan
	function Neighbours(x, y){
		var	N = y - 1,
		S = y + 1,
		E = x + 1,
		W = x - 1,
		myN = N > -1 && canWalkHere(x, N),
		myS = S < worldHeight && canWalkHere(x, S),
		myE = E < worldWidth && canWalkHere(E, y),
		myW = W > -1 && canWalkHere(W, y),
		result = [];
		if(myN)
		result.push({x:x, y:N});
		if(myE)
		result.push({x:E, y:y});
		if(myS)
		result.push({x:x, y:S});
		if(myW)
		result.push({x:W, y:y});
		findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
		return result;
	}

	// returns every available North East, South East,
	// South West or North West cell - no squeezing through
	// "cracks" between two diagonals
	function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result){
		if(myN)
		{
			if(myE && canWalkHere(E, N))
			result.push({x:E, y:N});
			if(myW && canWalkHere(W, N))
			result.push({x:W, y:N});
		}
		if(myS)
		{
			if(myE && canWalkHere(E, S))
			result.push({x:E, y:S});
			if(myW && canWalkHere(W, S))
			result.push({x:W, y:S});
		}
	}

	// returns every available North East, South East,
	// South West or North West cell including the times that
	// you would be squeezing through a "crack"
	function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result){
		myN = N > -1;
		myS = S < worldHeight;
		myE = E < worldWidth;
		myW = W > -1;
		if(myE)
		{
			if(myN && canWalkHere(E, N))
			result.push({x:E, y:N});
			if(myS && canWalkHere(E, S))
			result.push({x:E, y:S});
		}
		if(myW)
		{
			if(myN && canWalkHere(W, N))
			result.push({x:W, y:N});
			if(myS && canWalkHere(W, S))
			result.push({x:W, y:S});
		}
	}

	// returns boolean value (world cell is available and open)
	function canWalkHere(x, y){
		return ((world[x] != null) &&
			(world[x][y] != null) &&
			(world[x][y] <= maxWalkableTileNum));
	};

	// Node function, returns a new object with Node properties
	// Used in the calculatePath function to store route costs, etc.
	function Node(Parent, Point){
		var newNode = {
			// pointer to another Node object
			Parent:Parent,
			// array index of this Node in the world linear array
			value:Point.x + (Point.y * worldWidth),
			// the location coordinates of this Node
			x:Point.x,
			y:Point.y,
			// the heuristic estimated cost
			// of an entire path using this node
			f:0,
			// the distanceFunction cost to get
			// from the starting point to this node
			g:0
		};

		return newNode;
	}

	// Path function, executes AStar algorithm operations
	function calculatePath(){
		// create Nodes from the Start and End x,y coordinates
		var	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
		var mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
		// create an array that will contain all world cells
		var AStar = new Array(worldSize);
		// list of currently open Nodes
		var Open = [mypathStart];
		// list of closed Nodes
		var Closed = [];
		// list of the final output array
		var result = [];
		// reference to a Node (that is nearby)
		var myNeighbours;
		// reference to a Node (that we are considering now)
		var myNode;
		// reference to a Node (that starts a path in question)
		var myPath;
		// temp integer variables used in the calculations
		var length, max, min, i, j;
		// iterate through the open list until none are left
		while(length = Open.length)
		{
			max = worldSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];
			// is it the destination node?
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				// clear the working arrays
				AStar = Closed = Open = [];
				// we want to return start to finish
				result.reverse();
			}
			else // not the destination
			{
				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y);
				// test each one that hasn't been tried already
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						// estimated cost of this particular route so far
						myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
						// remember this new path for testing above
						Open.push(myPath);
						// mark this node in the world graph as visited
						AStar[myPath.value] = true;
					}
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}
		} // keep iterating until the Open list is empty
		return result;
	}

	// actually calculate the a-star path!
	// this returns an array of coordinates
	// that is empty if no path is possible
	return calculatePath();

};
/**
 * Draw the path through the maze
 */
window.GameJam.redraw = function(){ 
	console.log('Redrawing ...');
 
	var spriteNum = 0,
		spriteRow = 0;
 
	// Clear the screen
	GameJam.ctxs.fillStyle = '#000000';
	GameJam.ctxs.fillRect(0, 0, GameJam.canvass.width, GameJam.canvass.height);

	var level = GameJam.world,
		obstacles = GameJam.obstacles,
		rowTileCount = level.length,
		colTileCount = level[0].length;

	// Draw the map
	for (var r = 0; r < rowTileCount; r++) {
        for (var c = 0; c < colTileCount; c++) {
            var tile = level[ r ][ c ];
            var tileRow = (tile / GameJam.imageNumTiles) | 0;
            var tileCol = (tile % GameJam.imageNumTiles) | 0;

            GameJam.ctxs.drawImage(GameJam.tilesetLevel, (tileCol * GameJam.tileSize), (tileRow * GameJam.tileSize), GameJam.tileSize, GameJam.tileSize, (c * GameJam.tileSize), (r * GameJam.tileSize), GameJam.tileSize, GameJam.tileSize);

            tile = level[ r ][ c ];
            tileRow = (tile / GameJam.imageNumTiles) | 0;
            tileCol = (tile % GameJam.imageNumTiles) | 0;

            GameJam.ctxs.drawImage(GameJam.tilesetLevel, (tileCol * GameJam.tileSize), (tileRow * GameJam.tileSize), GameJam.tileSize, GameJam.tileSize, (c * GameJam.tileSize), (r * GameJam.tileSize), GameJam.tileSize, GameJam.tileSize);
        }
    }
 	
 	// Draw the default obstacles
	for (var x=0; x < GameJam.worldWidth; x++){
		for (var y=0; y < GameJam.worldHeight; y++){
			spriteNum = GameJam.obstacles[x][y];
			if (spriteNum > 30) {
				spriteRow = 2;
				spriteNum = spriteNum-32;
			} else if (spriteNum > 15) {
				spriteRow = 1;
				spriteNum = spriteNum-16;
			} else {
				spriteRow = 0;
			}
  
	  		// Draw it
	  		GameJam.ctxs.drawImage(GameJam.tilesetObstacles,
	    		spriteNum*GameJam.tileWidth, spriteRow*GameJam.tileHeight,
	    		GameJam.tileWidth, GameJam.tileHeight,
	  	  		x*GameJam.tileWidth, y*GameJam.tileHeight,
	  		  	GameJam.tileWidth, GameJam.tileHeight);
		}
	}

	// Draw the path
	console.log('Current path length: '+GameJam.currentPath.length);
	// for (var rp=0; rp<GameJam.currentPath.length; rp++){
	// 	switch(rp){
	// 		case 0:
 //  			spriteNum = 17; // start
 //  			break;
	// 		case GameJam.currentPath.length-1:
	//   		spriteNum = 18; // end
 //  			break;
	// 		default:
 //  			spriteNum = 19; // path node
 //  			break;
	// 	}
 		
 // 		// draw it
	// 	GameJam.ctxs.drawImage(GameJam.tilesetObstacles, 
	// 		spriteNum*GameJam.tileWidth, 0, 
	// 		GameJam.tileWidth, GameJam.tileHeight,
	// 		GameJam.currentPath[rp][0]*GameJam.tileWidth, 
	// 		GameJam.currentPath[rp][1]*GameJam.tileHeight,
	// 		GameJam.tileWidth, GameJam.tileHeight);
	// }		
};
/**
 * Includes all game interactions (tap/pan events etc.)
 * @return {object} Public functions
 */
var interaction = function(document, window){

	/**
	 * Register the game events
	 */
	function gameEvents(){
		/**
		 * Create a simple instance
		 * by default, it only adds horizontal recognizers
		 */
		var mcCanvas = new Hammer(GameJam.canvasa);

		/**
		 * Let the pan gesture support all directions
		 * this will block the vertical scrolling on a touch-device while on the element
		 */
		mcCanvas.get('pan').set({
			direction: Hammer.DIRECTION_ALL
		});

		var canvas = document.getElementsByTagName('canvas'),
			startMarginLeft = 0,
			startMarginTop = 0;

		/** Listen to pan events */
		mcCanvas.on('pan panstart panend', function(e){
			var boundings = GameJam.canvasa.getBoundingClientRect(),
				boundingsMain = document.getElementsByTagName('main')[0].getBoundingClientRect(),
           		x,
           		y,
           		xScroll,
           		yScroll;

			// Grab html page coords
			x = e.center.x + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.center.y + document.body.scrollTop + document.documentElement.scrollTop;

			// Make them relative to the canvas only
			x -= GameJam.canvasa.offsetLeft;
			y -= GameJam.canvasa.offsetTop;

			// Return tile x,y that we dragged
			var cell = [
				Math.floor(x/(boundings.width / GameJam.worldWidth)),
				Math.floor(y/(boundings.height / GameJam.worldHeight))
			];

			switch(e.type) {
	            case 'panstart':
	            	GameJam.panning = true;

	            	// Hide obstacles list
		            core.HideObstacles();

	            	// Check if an item is at the dragstart cell
					for (var i in GameJam.items) {
						var startwidth = Math.floor(GameJam.items[i].pos[0]/GameJam.tileWidth),
							endwidth = Math.floor(GameJam.items[i].pos[0]/GameJam.tileWidth + GameJam.items[i].width/GameJam.tileWidth - 1),
							startheight = Math.floor(GameJam.items[i].pos[1]/GameJam.tileHeight),
							endheight = Math.floor(GameJam.items[i].pos[1]/GameJam.tileHeight + GameJam.items[i].height/GameJam.tileHeight - 1);

						//console.log(startwidth + "-" + endwidth + "-" + startheight + "-" + endheight + "-" + cell);
						
						if (startwidth <= cell[0] && cell[0] <= endwidth && startheight <= cell[1] && cell[1] <= endheight) {
							GameJam.draggedItem = i;
						}
					}

					// Get the starting margins
					startMarginLeft = parseInt(window.getComputedStyle(canvas[0]).getPropertyValue('margin-left'));
					startMarginTop = parseInt(window.getComputedStyle(canvas[0]).getPropertyValue('margin-top'));
	                break;

	            case 'pan':
	            	// Move the dragged item
	            	if (GameJam.draggedItem) {
	            		var cellwidth = cell[0] - Math.floor((GameJam.items[GameJam.draggedItem].width)/GameJam.tileWidth) + 1 ,
	            			cellheight = cell[1] - Math.floor((GameJam.items[GameJam.draggedItem].height)/GameJam.tileHeight) + 1,
	            			cellxhigh = GameJam.items[GameJam.draggedItem].width/ GameJam.tileWidth,
	            			cellyhigh = GameJam.items[GameJam.draggedItem].height/ GameJam.tileHeight,
	            			newxpos = cellwidth * GameJam.tileWidth,
	            			newypos = cellheight * GameJam.tileHeight,
	            			newxhighpos =  newxpos + GameJam.tileWidth*(GameJam.items[GameJam.draggedItem].width/GameJam.tileWidth -1),
	            			newyhighpos =  newypos + GameJam.tileHeight*(GameJam.items[GameJam.draggedItem].height/GameJam.tileHeight -1),
	            			posHasItem = false;
						
						// if it has an obstacle we don't move it there
						if (GameJam.obstacles[cellwidth] && GameJam.obstacles[cellwidth][cellheight] === 0 ){
	            			// checkin all  x blocks from the item with the obstacles
	            			while(!posHasItem && cellxhigh>1){
	            				//console.log("ob XX" + GameJam.obstacles[cellwidth + cellxhigh -1][cellheight] + '-'+cellwidth  + '-' +cellxhigh + posHasItem );
	            				if (GameJam.obstacles[cellwidth + cellxhigh -1][cellheight]  !== 0){
	            					posHasItem = true;
	            					//console.log("ob X" + GameJam.obstacles[cellwidth + cellxhigh -1][cellheight] + '-'+cellwidth  + '-' +cellxhigh + posHasItem );
	            				}
	            				cellxhigh--;
	            			}

	            			// checkin all y blocks from the item with the obstacles
	            			while(!posHasItem && cellyhigh>1){
	            				if (GameJam.obstacles[cellwidth][cellheight + cellyhigh -1]  !== 0){
	            					posHasItem = true;
	            					//console.log("ob y" + GameJam.obstacles[cellwidth][cellheight + cellyhigh -1] + '-'+cellheight  + '-' +cellyhigh + posHasItem);
	            				}
	            				cellyhigh--;
	            			}
	            			var i = 0;
	            			while (!posHasItem && i < GameJam.items.length){
	            				//we want to check all items but not the one that we drag
	            				if(i != GameJam.draggedItem){
	            					var itemxpos = GameJam.items[i].pos[0],
	            						itemypos = GameJam.items[i].pos[1],
	            						itemxhighpos = itemxpos + GameJam.tileWidth*(GameJam.items[i].width/GameJam.tileWidth -1),
	            						itemyhighpos = itemypos +  GameJam.tileHeight*(GameJam.items[i].height/GameJam.tileHeight -1);

		            				//console.log('x:' + newxpos + ':' + newxhighpos + '-'+ itemxpos + ':' + itemxhighpos + '::' + i);
		            				//console.log('y:' + newypos + ':' + newyhighpos + '-'+ itemypos + ':' + itemyhighpos  + '::' + i);

		            				//ix <= nx <= nhx <= ihx
		            				//iy <= ny <= nhy <= ihy
									if (((itemxpos <= newxpos && newxpos <= itemxhighpos) || (itemxpos <= newxhighpos && newxhighpos <= itemxhighpos)) &&
										((itemypos <= newypos && newypos <= itemyhighpos) || (itemypos <= newyhighpos && newyhighpos <= itemyhighpos))){

										//console.log('xx:'+GameJam.items[i].pos[0] + '-' + newxpos + ':' + newxhighpos + '::' + i);
		            					//console.log('yy:'+GameJam.items[i].pos[1] + '-' + newypos + ':' + newyhighpos + '::' + i);

										posHasItem = true;
									}
									
								}

								i++;
							}
							
							// it didnt have any obstacle or another item so we can move it
		            		if (!posHasItem){
		            			GameJam.items[GameJam.draggedItem].pos = [newxpos, newypos];
		            		}

	            		}
	            	} else{
						// Map scrolling
						var newMarginLeft = e.deltaX + startMarginLeft,
							newMarginTop = e.deltaY + startMarginTop;

						// Horizontal scolling with restriction to viewport
						if (newMarginLeft <= 0 && (newMarginLeft - boundingsMain.width) * -1 <= boundings.width) {
							for (var i=0; i < canvas.length; i++) {
								canvas[i].style.marginLeft = newMarginLeft + 'px';
							}
						}

						// Vertical scolling with restriction to viewport
						if (newMarginTop <= 0 && (newMarginTop - boundingsMain.height) * -1 <= boundings.height) {
							for (var i=0; i < canvas.length; i++) {
								canvas[i].style.marginTop = newMarginTop + 'px';
							}
						}
	            	}
	            	break;

	            case 'panend':
	            	// Stop the dragging
	            	GameJam.panning = false;
	            	GameJam.draggedItem = null;
	            	break;
	        }
		});


		/** Free the mouse ... */
		var mcStart = new Hammer(document.getElementById('start-game'));
		mcStart.on('tap', function(e){
			if (e.target.className.match(/disabled/g)) {
				return false;
			}

			core.StartGame();
		});

		/** Expand/minimize the item list */
		var mcSlider = new Hammer(document.getElementById('slider'));
		mcSlider.on('tap', function(e){
			if (e.target.className.match(/minimized/g)) {
				core.ShowObstacles();
			} else{
		        core.HideObstacles();
			}
		});

		/** Reset margin on resize */
		window.onresize = function(e){
		    for (var i=0; i < canvas.length; i++) {
		    	canvas[i].style.marginLeft = '0px';
				canvas[i].style.marginTop = '0px';
			}
		};

		/** Replay level button */
		var mcReplay = new Hammer(document.querySelectorAll('.replay-btn')[0]);
		mcReplay.on('tap', function(e){
			document.getElementById('complete').className = 'window hide';
			core.LoadLevel(GameJam.currentLevel);
		});
	}


	/**
	 * Start the next level
	 */
	function nextLevelBtnEvent(){
		var mcNext = new Hammer(document.querySelectorAll('.next-btn')[0]);
		mcNext.on('tap', function(e){
			document.getElementById('complete').className = 'window hide';
			var nextLevel = 'level' + (parseInt(GameJam.currentLevel.replace(/level/g, '')) + 1);
			core.LoadLevel(nextLevel);
		});
	}


	/**
	 * Obstacle list pan events
	 */
	function obstacleEvents(){
		/** Listen to pan events */
		var obstaclesList = document.querySelectorAll('.obstacle'),
			canvas = document.getElementsByTagName('canvas'),
			startMarginLeft = 0,
	        startMarginTop = 0;

		for (var i=0; i<obstaclesList.length; i++) {
			var mcObstacle = new Hammer(obstaclesList[i]);
			mcObstacle.get('pan').set({
				direction: Hammer.DIRECTION_ALL
			});
			mcObstacle.on('pan panstart panend', function(e){
				var boundings = GameJam.canvasa.getBoundingClientRect(),
					boundingsMain = document.getElementsByTagName('main')[0].getBoundingClientRect(),
	           		obstacle = e.target.className.match(/obstacle/g) ? e.target : e.target.parentElement,
            		obstacleId = obstacle.getAttribute('data-icon'),
            		item = GameJam.levels[GameJam.currentLevel].items[obstacleId],
            		itemCount = item.count,
	           		x,
	           		y,
            		pos = [],
            		cellwidth,
	            	cellheight;

				// Grab html page coords
				x = e.center.x + document.body.scrollLeft + document.documentElement.scrollLeft;
				y = e.center.y + document.body.scrollTop + document.documentElement.scrollTop;

				// Make them relative to the canvas only
				x -= GameJam.canvasa.offsetLeft;
				y -= GameJam.canvasa.offsetTop;

				// Return tile x,y that we dragged
				var cell = [
					Math.floor(x/(boundings.width / GameJam.worldWidth)),
					Math.floor(y/(boundings.height / GameJam.worldHeight))
				];

				cellwidth = cell[0] - Math.floor((item.width)/GameJam.tileWidth) + 1 ,
	            cellheight = cell[1] - Math.floor((item.height)/GameJam.tileHeight) + 1;

				switch(e.type) {
		            case 'panstart':
		            	// Show icon
		            	GameJam.draggedIcon.setAttribute('style', 'background-position: 0px -' + item.icon + 'px;');
		            	GameJam.draggedIcon.className = 'show';

		            	// Hide obstacles list
		            	core.HideObstacles();

		            	// Get the starting margins
						startMarginLeft = parseInt(window.getComputedStyle(canvas[0]).getPropertyValue('margin-left'));
						startMarginTop = parseInt(window.getComputedStyle(canvas[0]).getPropertyValue('margin-top'));

		                break;

		            case 'pan':

		            	// Move icon
		            	GameJam.draggedIcon.style.left = x-25 + startMarginLeft + 'px';
		            	GameJam.draggedIcon.style.top = y-25 + startMarginTop + 'px';
		            	
		            	break;

		            case 'panend':
		            	// Hide icon
		            	GameJam.draggedIcon.className = '';

		            	// Add obstacle to item array
	            		pos.push(cellwidth * GameJam.tileWidth);
	            		pos.push(cellheight * GameJam.tileHeight);

	            		// Remove obstacle from obstacle window
	            		
console.log(item,itemCount);

	            		itemCount = itemCount - 1;
	            		if (itemCount <= 0) {
	            			obstacle.remove();
	            		} else {
	            			obstacle.querySelectorAll('.count')[0].innerHTML = itemCount;
	            		}
	            		item.count = itemCount;
console.log(item,itemCount);
	            		// Create a new item and add it to the global items list
		            	var newItem = {};
		            	newItem.width = item.width;
		            	newItem.height = item.height;
		            	newItem.icon = item.icon;
		            	newItem.id = GameJam.levels[GameJam.currentLevel].items.length;
		            	newItem.pos = pos;
		            	newItem.sprite = item.sprite;
		            	GameJam.items.push( newItem );
		            	
		            	break;
		        }
			});
		}
	}


	/**
	 * Register general events
	 */
	function generalEvents(){
		/** Elements that change the view */
		var viewList = document.querySelectorAll('.view');
		for (var i=0; i<viewList.length; i++) {
			var mcView = new Hammer(viewList[i]);

			mcView.on('tap', function(e){
				var newView = e.target.getAttribute('data-view');
				core.ChangeView(newView);
			});
		}

		/** Checkboxes */
		var checkboxList = document.querySelectorAll('.checkbox');
		for (var i=0; i<checkboxList.length; i++) {
			var mcCheckbox = new Hammer(checkboxList[i]);

			mcCheckbox.on('tap', function(e){
				var checked = e.target.getAttribute('data-checked');
				if (checked === 'true') {
					e.target.className = 'checkbox';
					e.target.setAttribute('data-checked', 'false');
				} else{
					e.target.className = 'checkbox checked';
					e.target.setAttribute('data-checked', 'true');
				}
			});
		}

		/** Reset button */
		var mcReset = new Hammer(document.getElementById('reset-btn'));
		mcReset.on('tap', function(e){
			if (core.LocalStorageActive) {
				localStorage.clear();
			}
			core.DocCookies.removeItem('levels');
			document.location.reload();
		});
	}


	/**
	 * Level selection buttons
	 */
	function levelButtonEvents(){
		var levelList = document.querySelectorAll('.level.unlocked');
		for (var i=0; i<levelList.length; i++) {
			var mcLevel = new Hammer(levelList[i]);

			mcLevel.on('tap', function(e){
				core.LoadLevel(e.target.parentElement.id);
			});
		}
	}


	/**
	 * Return public functions
	 */
	return {
		GameEvents: gameEvents,
		GeneralEvents: generalEvents,
		LevelButtonEvents: levelButtonEvents,
		ObstacleEvents: obstacleEvents,
		NextLevelBtnEvent: nextLevelBtnEvent
	};

}(document, window);
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
 // ----------------------------------------------------------------------------
 // Buzz, a Javascript HTML5 Audio library
 // v1.1.10 - Built 2015-04-20 13:05
 // Licensed under the MIT license.
 // http://buzz.jaysalvat.com/
 // ----------------------------------------------------------------------------
 // Copyright (C) 2010-2015 Jay Salvat
 // http://jaysalvat.com/
 // ----------------------------------------------------------------------------

(function(t,e){"use strict";"undefined"!=typeof module&&module.exports?module.exports=e():"function"==typeof define&&define.amd?define([],e):t.buzz=e()})(this,function(){"use strict";var t=window.AudioContext||window.webkitAudioContext,e={defaults:{autoplay:!1,duration:5e3,formats:[],loop:!1,placeholder:"--",preload:"metadata",volume:80,webAudioApi:!1,document:window.document},types:{mp3:"audio/mpeg",ogg:"audio/ogg",wav:"audio/wav",aac:"audio/aac",m4a:"audio/x-m4a"},sounds:[],el:document.createElement("audio"),getAudioContext:function(){if(void 0===this.audioCtx)try{this.audioCtx=t?new t:null}catch(e){this.audioCtx=null}return this.audioCtx},sound:function(t,n){function i(t){for(var e=[],n=t.length-1,i=0;n>=i;i++)e.push({start:t.start(i),end:t.end(i)});return e}function u(t){return t.split(".").pop()}n=n||{};var s=n.document||e.defaults.document,r=0,o=[],a={},h=e.isSupported();if(this.load=function(){return h?(this.sound.load(),this):this},this.play=function(){return h?(this.sound.play(),this):this},this.togglePlay=function(){return h?(this.sound.paused?this.sound.play():this.sound.pause(),this):this},this.pause=function(){return h?(this.sound.pause(),this):this},this.isPaused=function(){return h?this.sound.paused:null},this.stop=function(){return h?(this.setTime(0),this.sound.pause(),this):this},this.isEnded=function(){return h?this.sound.ended:null},this.loop=function(){return h?(this.sound.loop="loop",this.bind("ended.buzzloop",function(){this.currentTime=0,this.play()}),this):this},this.unloop=function(){return h?(this.sound.removeAttribute("loop"),this.unbind("ended.buzzloop"),this):this},this.mute=function(){return h?(this.sound.muted=!0,this):this},this.unmute=function(){return h?(this.sound.muted=!1,this):this},this.toggleMute=function(){return h?(this.sound.muted=!this.sound.muted,this):this},this.isMuted=function(){return h?this.sound.muted:null},this.setVolume=function(t){return h?(0>t&&(t=0),t>100&&(t=100),this.volume=t,this.sound.volume=t/100,this):this},this.getVolume=function(){return h?this.volume:this},this.increaseVolume=function(t){return this.setVolume(this.volume+(t||1))},this.decreaseVolume=function(t){return this.setVolume(this.volume-(t||1))},this.setTime=function(t){if(!h)return this;var e=!0;return this.whenReady(function(){e===!0&&(e=!1,this.sound.currentTime=t)}),this},this.getTime=function(){if(!h)return null;var t=Math.round(100*this.sound.currentTime)/100;return isNaN(t)?e.defaults.placeholder:t},this.setPercent=function(t){return h?this.setTime(e.fromPercent(t,this.sound.duration)):this},this.getPercent=function(){if(!h)return null;var t=Math.round(e.toPercent(this.sound.currentTime,this.sound.duration));return isNaN(t)?e.defaults.placeholder:t},this.setSpeed=function(t){return h?(this.sound.playbackRate=t,this):this},this.getSpeed=function(){return h?this.sound.playbackRate:null},this.getDuration=function(){if(!h)return null;var t=Math.round(100*this.sound.duration)/100;return isNaN(t)?e.defaults.placeholder:t},this.getPlayed=function(){return h?i(this.sound.played):null},this.getBuffered=function(){return h?i(this.sound.buffered):null},this.getSeekable=function(){return h?i(this.sound.seekable):null},this.getErrorCode=function(){return h&&this.sound.error?this.sound.error.code:0},this.getErrorMessage=function(){if(!h)return null;switch(this.getErrorCode()){case 1:return"MEDIA_ERR_ABORTED";case 2:return"MEDIA_ERR_NETWORK";case 3:return"MEDIA_ERR_DECODE";case 4:return"MEDIA_ERR_SRC_NOT_SUPPORTED";default:return null}},this.getStateCode=function(){return h?this.sound.readyState:null},this.getStateMessage=function(){if(!h)return null;switch(this.getStateCode()){case 0:return"HAVE_NOTHING";case 1:return"HAVE_METADATA";case 2:return"HAVE_CURRENT_DATA";case 3:return"HAVE_FUTURE_DATA";case 4:return"HAVE_ENOUGH_DATA";default:return null}},this.getNetworkStateCode=function(){return h?this.sound.networkState:null},this.getNetworkStateMessage=function(){if(!h)return null;switch(this.getNetworkStateCode()){case 0:return"NETWORK_EMPTY";case 1:return"NETWORK_IDLE";case 2:return"NETWORK_LOADING";case 3:return"NETWORK_NO_SOURCE";default:return null}},this.set=function(t,e){return h?(this.sound[t]=e,this):this},this.get=function(t){return h?t?this.sound[t]:this.sound:null},this.bind=function(t,e){if(!h)return this;t=t.split(" ");for(var n=this,i=function(t){e.call(n,t)},u=0;t.length>u;u++){var s=t[u],r=s;s=r.split(".")[0],o.push({idx:r,func:i}),this.sound.addEventListener(s,i,!0)}return this},this.unbind=function(t){if(!h)return this;t=t.split(" ");for(var e=0;t.length>e;e++)for(var n=t[e],i=n.split(".")[0],u=0;o.length>u;u++){var s=o[u].idx.split(".");(o[u].idx===n||s[1]&&s[1]===n.replace(".",""))&&(this.sound.removeEventListener(i,o[u].func,!0),o.splice(u,1))}return this},this.bindOnce=function(t,e){if(!h)return this;var n=this;return a[r++]=!1,this.bind(t+"."+r,function(){a[r]||(a[r]=!0,e.call(n)),n.unbind(t+"."+r)}),this},this.trigger=function(t,e){if(!h)return this;t=t.split(" ");for(var n=0;t.length>n;n++)for(var i=t[n],u=0;o.length>u;u++){var r=o[u].idx.split(".");if(o[u].idx===i||r[0]&&r[0]===i.replace(".","")){var a=s.createEvent("HTMLEvents");a.initEvent(r[0],!1,!0),a.originalEvent=e,this.sound.dispatchEvent(a)}}return this},this.fadeTo=function(t,n,i){function u(){setTimeout(function(){t>s&&t>o.volume?(o.setVolume(o.volume+=1),u()):s>t&&o.volume>t?(o.setVolume(o.volume-=1),u()):i instanceof Function&&i.apply(o)},r)}if(!h)return this;n instanceof Function?(i=n,n=e.defaults.duration):n=n||e.defaults.duration;var s=this.volume,r=n/Math.abs(s-t),o=this;return this.play(),this.whenReady(function(){u()}),this},this.fadeIn=function(t,e){return h?this.setVolume(0).fadeTo(100,t,e):this},this.fadeOut=function(t,e){return h?this.fadeTo(0,t,e):this},this.fadeWith=function(t,e){return h?(this.fadeOut(e,function(){this.stop()}),t.play().fadeIn(e),this):this},this.whenReady=function(t){if(!h)return null;var e=this;0===this.sound.readyState?this.bind("canplay.buzzwhenready",function(){t.call(e)}):t.call(e)},this.addSource=function(t){var n=this,i=s.createElement("source");return i.src=t,e.types[u(t)]&&(i.type=e.types[u(t)]),this.sound.appendChild(i),i.addEventListener("error",function(t){n.trigger("sourceerror",t)}),i},h&&t){for(var d in e.defaults)e.defaults.hasOwnProperty(d)&&void 0===n[d]&&(n[d]=e.defaults[d]);if(this.sound=s.createElement("audio"),n.webAudioApi){var l=e.getAudioContext();l&&(this.source=l.createMediaElementSource(this.sound),this.source.connect(l.destination))}if(t instanceof Array)for(var c in t)t.hasOwnProperty(c)&&this.addSource(t[c]);else if(n.formats.length)for(var f in n.formats)n.formats.hasOwnProperty(f)&&this.addSource(t+"."+n.formats[f]);else this.addSource(t);n.loop&&this.loop(),n.autoplay&&(this.sound.autoplay="autoplay"),this.sound.preload=n.preload===!0?"auto":n.preload===!1?"none":n.preload,this.setVolume(n.volume),e.sounds.push(this)}},group:function(t){function e(){for(var e=n(null,arguments),i=e.shift(),u=0;t.length>u;u++)t[u][i].apply(t[u],e)}function n(t,e){return t instanceof Array?t:Array.prototype.slice.call(e)}t=n(t,arguments),this.getSounds=function(){return t},this.add=function(e){e=n(e,arguments);for(var i=0;e.length>i;i++)t.push(e[i])},this.remove=function(e){e=n(e,arguments);for(var i=0;e.length>i;i++)for(var u=0;t.length>u;u++)if(t[u]===e[i]){t.splice(u,1);break}},this.load=function(){return e("load"),this},this.play=function(){return e("play"),this},this.togglePlay=function(){return e("togglePlay"),this},this.pause=function(t){return e("pause",t),this},this.stop=function(){return e("stop"),this},this.mute=function(){return e("mute"),this},this.unmute=function(){return e("unmute"),this},this.toggleMute=function(){return e("toggleMute"),this},this.setVolume=function(t){return e("setVolume",t),this},this.increaseVolume=function(t){return e("increaseVolume",t),this},this.decreaseVolume=function(t){return e("decreaseVolume",t),this},this.loop=function(){return e("loop"),this},this.unloop=function(){return e("unloop"),this},this.setSpeed=function(t){return e("setSpeed",t),this},this.setTime=function(t){return e("setTime",t),this},this.set=function(t,n){return e("set",t,n),this},this.bind=function(t,n){return e("bind",t,n),this},this.unbind=function(t){return e("unbind",t),this},this.bindOnce=function(t,n){return e("bindOnce",t,n),this},this.trigger=function(t){return e("trigger",t),this},this.fade=function(t,n,i,u){return e("fade",t,n,i,u),this},this.fadeIn=function(t,n){return e("fadeIn",t,n),this},this.fadeOut=function(t,n){return e("fadeOut",t,n),this}},all:function(){return new e.group(e.sounds)},isSupported:function(){return!!e.el.canPlayType},isOGGSupported:function(){return!!e.el.canPlayType&&e.el.canPlayType('audio/ogg; codecs="vorbis"')},isWAVSupported:function(){return!!e.el.canPlayType&&e.el.canPlayType('audio/wav; codecs="1"')},isMP3Supported:function(){return!!e.el.canPlayType&&e.el.canPlayType("audio/mpeg;")},isAACSupported:function(){return!!e.el.canPlayType&&(e.el.canPlayType("audio/x-m4a;")||e.el.canPlayType("audio/aac;"))},toTimer:function(t,e){var n,i,u;return n=Math.floor(t/3600),n=isNaN(n)?"--":n>=10?n:"0"+n,i=e?Math.floor(t/60%60):Math.floor(t/60),i=isNaN(i)?"--":i>=10?i:"0"+i,u=Math.floor(t%60),u=isNaN(u)?"--":u>=10?u:"0"+u,e?n+":"+i+":"+u:i+":"+u},fromTimer:function(t){var e=(""+t).split(":");return e&&3===e.length&&(t=3600*parseInt(e[0],10)+60*parseInt(e[1],10)+parseInt(e[2],10)),e&&2===e.length&&(t=60*parseInt(e[0],10)+parseInt(e[1],10)),t},toPercent:function(t,e,n){var i=Math.pow(10,n||0);return Math.round(100*t/e*i)/i},fromPercent:function(t,e,n){var i=Math.pow(10,n||0);return Math.round(e/100*t*i)/i}};return e});