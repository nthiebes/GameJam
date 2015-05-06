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

	// An image containing all sprites
	tileset: null,
	 
	// The world grid: a 2d array of tiles
	world: [[]],
	 
	// Size in the world in sprite tiles
	worldWidth: 16,
	worldHeight: 16,
	 
	// Size of a tile in pixels
	tileWidth: 32,
	tileHeight: 32,
	 
	// Start and end of path
	pathStart: [0, 0],
	pathEnd: [0,0],
	currentPath: [],

	// Time
	tileCounter: 0,
	lastTime: null,

	// Objects
	prisoner: [],
	items: [],

	// Misc
	draggedItem: null,
	currentLevel: '',
	timer: document.getElementById('timer'),
	gameStarted: false,
	gameEnded: false,
	html: document.getElementsByTagName('html')[0],
	body: document.getElementsByTagName('body')[0],
	loadingWrapper: document.getElementById('loading-wrapper'),
	loadingInner: document.getElementById('loading-inner'),
	paused: false,
	panning: false
};