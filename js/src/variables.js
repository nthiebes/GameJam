window.GameJam = {
    // the game's canvas element (animated)
	canvasa: null,

	// the canvas 2d context
	ctxa: null,

	 // the game's canvas element (static)
	canvass: null,

	// the canvas 2d context
	ctxs: null,

	// an image containing all sprites
	tileset: null,
	 
	// the world grid: a 2d array of tiles
	world: [[]],
	 
	// size in the world in sprite tiles
	worldWidth: 16,
	worldHeight: 16,
	 
	// size of a tile in pixels
	tileWidth: 32,
	tileHeight: 32,
	 
	// start and end of path
	pathStart: [0, 0],
	pathEnd: [0,0],
	currentPath: [],

	// time
	gameTime: null,
	lastTime: null,

	// objects
	prisoner: [],
	items: [],

	// misc
	draggedItem: null,
	currentLevel: '',
	timer: document.getElementById('timer'),
	gameStarted: false,
	gameEnded: false,
	loadedInner: document.getElementById('loaded-inner'),
	loadingPercentage: 0,
	loadingPercentageElem: document.getElementById('percentage'),
	paused: false,
	panning: false
};