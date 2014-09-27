/* Main part of the game */
var core = function(document, window){

	function init(){
		window.onload = function() {
			 /* Initialize game if all ressources are loaded */
			GameJam.resources.load([
				//'img/sprites.png',
				'img/tileset.png',
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

   function initGame (){
   	GameJam.lastTime = Date.now();
   	console.log('Ressources loaded.');
	GameJam.canvass = document.getElementById('static-canvas');
	GameJam.canvass.width = GameJam.worldWidth * GameJam.tileWidth;
	GameJam.canvass.height = GameJam.worldHeight * GameJam.tileHeight;
	GameJam.canvass.addEventListener("click", GameJam.canvasClick, false);
	GameJam.ctxs = GameJam.canvass.getContext("2d");

	GameJam.canvasa = document.getElementById('animation-canvas');
	GameJam.canvasa.width = GameJam.worldWidth * GameJam.tileWidth;
	GameJam.canvasa.height = GameJam.worldHeight * GameJam.tileHeight;
	GameJam.ctxa = GameJam.canvasa.getContext("2d");

	GameJam.tileset = GameJam.resources.get('img/spritesheet.png');

	console.log('Ressources loaded.');
	GameJam.tilesetLoaded = true;
	GameJam.createWorld();
	 

	GameJam.prisoner.push({
	    attacking: false,
	    alternativeDir: '',
	    pos: GameJam.pathStart,
    	sprite: new Sprite('img/tileset.png', [0, 0], [32, 32], 8, [0,1,2], 'horizontal', false, false) // url, pos, size, speed, frames, dir, once, inProgress
	});

	 main();
	 console.log('game initialized loaded');
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
	 startGame();
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

	    updateEntities(dt);

	  

	}

	function updateEntities(dt) {
	    // Update the prisoner sprite animation
	    GameJam.prisoner[0].sprite.update(dt);



	}

	// Draw everything
	function render() {
	    //GameJam.ctxa.fillRect(0, 0, GameJam.canvasa.width, GameJam.canvasa.height);

	    GameJam.canvasa.width = GameJam.canvasa.width;

	    //renderEntities(items);
	    renderEntities(GameJam.prisoner);
	    
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
	 /* making available action items */
	 /* event listeners started so prisioner starts to move */
	 /* countdown started */
	 /* time over */
	 /* stop everything */
	 console.log('startGame done!');
   }
     
   

   return {
      Init: init,
      InitGame: initGame
   }
}(document, window);

core.Init();