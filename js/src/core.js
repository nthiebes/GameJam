/**
 * The heart of the game
 */
var core = function(document, window){

	/**
	 * General initialization
	 */
	function init(){
		window.onload = function(){
			// Initialize game if all ressources are loaded
			GameJam.resources.load([
				'img/animatedTiles.png',
				'img/walk.png',
				'img/spritesheet.png'
			]);
			GameJam.resources.onReady(initMenu);
		};

		getLevels();
   	}


   	/**
   	 * Initialize the main menu
   	 */
   	function initMenu(){
   		loading(100);
   		console.log('-- Loading done');

   		requestTimeout(function(){
			changeView('menu');
			document.getElementById('fog').className = 'show';
			console.log('-- Menu initialized');
		}, 700);

		interaction.GeneralEvents();
		console.log('-- Events initialized');
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
		GameJam.tileset = GameJam.resources.get('img/spritesheet.png');
		 
		// Create the priosoner object
		GameJam.prisoner.push({
			attacking: false,
			steps: 20,			// The speed of the walk animation
			currentStep: 20,	// Current position in the way from one tile to another
			nextTile: [],
			pos: [Math.floor((GameJam.worldWidth-1) / 2) * GameJam.tileWidth, (GameJam.worldHeight-1) * GameJam.tileHeight],
			sprite: new Sprite('img/walk.png', [0, 192], [32, 50], 5, [0, 1, 2, 3, 4, 5], 'horizontal', false, false) // url, pos, size, speed, frames, dir, once, inProgress
		});
		
		// Register game event handlers
		interaction.GameEvents();
		console.log('-- Game events initialized');

		// Main game loop
		main();

		// Hide menu
		GameJam.body.className = 'in-game';
		document.getElementById('levels').className = 'window hide';

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
		GameJam.gameTime += dt;

		// Only move if a path exists and no pan is in progress
		if (!GameJam.panning) {
			if (GameJam.currentPath.length > 0) {
				// Vertical movement
				if (GameJam.prisoner[0].nextTile[0] === GameJam.currentPath[0][0]) {
					// Move top if next tile is above current
					if (GameJam.prisoner[0].nextTile[1] > GameJam.currentPath[0][1]) {
						GameJam.prisoner[0].pos[1] = GameJam.currentPath[0][1] * GameJam.tileHeight + ((GameJam.tileHeight / GameJam.prisoner[0].steps) * GameJam.prisoner[0].currentStep);
						GameJam.prisoner[0].sprite.pos[1] = 192;
					// Move bottom if next tile is below current
					} else if (GameJam.prisoner[0].nextTile[1] < GameJam.currentPath[0][1]){
						GameJam.prisoner[0].pos[1] = GameJam.currentPath[0][1] * GameJam.tileHeight - ((GameJam.tileHeight / GameJam.prisoner[0].steps) * GameJam.prisoner[0].currentStep);
						GameJam.prisoner[0].sprite.pos[1] = 0;
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
						GameJam.prisoner[0].sprite.pos[1] = 128;
					}
				}

				// End of an animation from tile to tile
				if (GameJam.prisoner[0].currentStep === 1) {
					GameJam.prisoner[0].nextTile = GameJam.currentPath[0];

					// Remove the first tile in the array
					GameJam.currentPath.splice(0,1);

					// Reset to start animation for next tile 
					GameJam.prisoner[0].currentStep = GameJam.prisoner[0].steps;
				}	

				GameJam.prisoner[0].currentStep--;		
			} else{
				GameJam.prisoner[0].sprite.pos[1] = 192;
				GameJam.prisoner[0].sprite.speed = 0;

				if (GameJam.gameStarted && !GameJam.gameEnded) {
					endLevel();
				}
			}

			// Update timer
			if (GameJam.gameStarted && !GameJam.gameEnded) {
				GameJam.timer.innerHTML = Math.round(GameJam.gameTime) + 's';
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
	}


	/**
	 * Draw everything
	 */
	function render(){
		GameJam.canvasa.width = GameJam.canvasa.width;
	    renderEntities(GameJam.prisoner);
	    renderEntities(GameJam.items);
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
		GameJam.ctxa.save();
		GameJam.ctxa.translate(entity.pos[0], entity.pos[1]);
		entity.sprite.render(GameJam.ctxa);
		GameJam.ctxa.restore();
	}
   	

   	/**
   	 * Start the second stage of the game
   	 */
   	function startGame(){
		// Put the items to the world map
		var list = GameJam.items;
		for(var i=0; i<list.length; i++){
			GameJam.world[GameJam.items[i].pos[0]/32][GameJam.items[i].pos[1]/32] = 1;
		}

		// Reset items, we dont want the user to be able to drag and drop them
 		GameJam.items = [];

		// Reset prisoner speed
		GameJam.prisoner[0].sprite.speed = 5;

		// Reset game time
		GameJam.gameTime = 0;
		GameJam.timer.className = 'show';
		//document.getElementsByTagName('main')[0].className = 'show';
		document.getElementById('obstacles').className = 'hide';
		document.getElementById('start-button-wrapper').className = 'hide';

		// Game has started
		GameJam.gameStarted = true;

		// Create the prisoner path
		GameJam.movePrisoner();

		console.log('-- Game started');
	}


	/**
	 * End of the level
	 */
	function endLevel(){
		GameJam.gameEnded = true;
		GameJam.paused = true;
		console.log('-- Level done!');
	}


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
		Loading: loading
	}

}(document, window);

core.Init();