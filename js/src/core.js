/* Main part of the game */
var core = function(document, window){

	function init(){
		window.onload = function() {
			 /* Initialize game if all ressources are loaded */
			GameJam.resources.load([
				'img/animatedTiles.png',
				'img/tileset.png',
				'img/walk.png',
				'img/spritesheet.png'
			]);
			GameJam.resources.onReady(core.InitGame);
			
			 /* load enviroment */
			 //enviroment();

			 /* load player interaction */
			 //playerInteraction();

			 /* load mister G */
			 //prisoner();

			 /* setting goals of the game */
			 //settingGoals();
		};   
   }

   	function initGame(){
		console.log('Ressources loaded.');
		GameJam.lastTime = Date.now();
		
		// Static canvas
		// Ground layer canvas
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

		GameJam.tileset = GameJam.resources.get('img/spritesheet.png');
		
		 
		/* event listeners started so prisioner starts to move */
		GameJam.prisoner.push({
			attacking: false,
			steps: 20,			// The speed of the walk animation
			currentStep: 20,	// Current position in the way from one tile to another
			nextTile: [],
			pos: [Math.floor((GameJam.worldWidth-1) / 2) * GameJam.tileWidth, (GameJam.worldHeight-1) * GameJam.tileHeight],
			sprite: new Sprite('img/walk.png', [0, 192], [32, 50], 5, [0, 1, 2, 3, 4, 5], 'horizontal', false, false) // url, pos, size, speed, frames, dir, once, inProgress
		});
		

	
		interaction.Init();

		//GameJam.movePrisoner();

		main();

		console.log('Game initialized.');

		menuGame();
   }   
	  
   function enviroment (){
   
	 /* load map */
	 /* load interface */
	 /* load items on the map */
	 
	 console.log('enviroment loaded');
   }
   
   function playerInteraction (){
   
	 /* load sprites for mouse */
	 /* load drag and drop */
	 console.log('player interaction loaded');
   }
   
   
   function settingGoals (){
   
	 /* load time count */
	 /* setting start button */
	 
	 /* save results */
	 console.log('Goals done!');
   }


	//////////////////////////////////////////////
	// A cross-browser requestAnimationFrame    //
	//////////////////////////////////////////////
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

   function main() {
		var now = Date.now();
		var dt = (now - GameJam.lastTime) / 1000.0;

		update(dt);
		render();

		GameJam.lastTime = now;
		requestAnimFrame(main);
	}

	function update(dt) {
		GameJam.gameTime += dt;

		// Only move if a path exists
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
		}
		
		//items movements
		/*if (GameJam.itemPath.length > 0) {
			GameJam.items[0].pos[0] = GameJam.itemPath[0].x;

			GameJam.items[0].pos[1] = GameJam.itemPath[0].y;
			GameJam.itemPath.splice(0,1);
		}*/

		updateEntities(dt);
	}

	function updateEntities(dt) {
	    // Update the prisoner sprite animation
	    for (var i in GameJam.prisoner) {
			GameJam.prisoner[i].sprite.update(dt);
		}

	    for (var i in GameJam.items) {
			GameJam.items[i].sprite.update(dt);
		}

		


	}

	// Draw everything
	function render() {
		GameJam.canvasa.width = GameJam.canvasa.width;

	    //renderEntities(items);
	    renderEntities(GameJam.prisoner);
	    renderEntities(GameJam.items);
	    
	};

	function renderEntities(list) {
		for(var i=0; i<list.length; i++) {
			renderEntity(list[i]);
		}    
	}

	function renderEntity(entity) {
		GameJam.ctxa.save();
		GameJam.ctxa.translate(entity.pos[0], entity.pos[1]);
		entity.sprite.render(GameJam.ctxa);
		GameJam.ctxa.restore();
	}
   
   function startGame(){
		/* this is when the game is started after pressing the button */
		
		/* items to world map */
		var list = GameJam.items;
		for(var i=0; i<list.length; i++){
			GameJam.world[GameJam.items[i].pos[0]/32][GameJam.items[i].pos[1]/32] = 1;
		}

		// reset items, we dont want the user to be able to drag and drop them
 		GameJam.items = [];

		/* event listeners started so prisioner starts to move */
		GameJam.prisoner[0].sprite.speed = 5;

		GameJam.movePrisoner();
		/* countdown started */
		/* time over */
		/* stop everything */

	}

	function menuGame(){
		window.setTimeout(function(){
			document.getElementById('main-menu').className = 'visible';
		}, 500);
		

		console.log('Game started!');
   }
	 

   

   return {
	  Init: init,
	  InitGame: initGame,
	  StartGame: startGame
   }
}(document, window);

core.Init();