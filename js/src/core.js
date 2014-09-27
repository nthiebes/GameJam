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
   	console.log('Ressources loaded.');
	GameJam.canvas = document.getElementById('game-canvas');
	GameJam.canvas.width = GameJam.worldWidth * GameJam.tileWidth;
	GameJam.canvas.height = GameJam.worldHeight * GameJam.tileHeight;
	GameJam.canvas.addEventListener("click", GameJam.canvasClick, false);
	GameJam.ctx = GameJam.canvas.getContext("2d");

	GameJam.tileset = GameJam.resources.get('img/spritesheet.png');
	console.log('Ressources loaded.');
	GameJam.tilesetLoaded = true;
	GameJam.createWorld();
	 
	 
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
   
   function prisoner (){
   
	 /* load IA */
	 /* load object (sprites & movements) */
	 console.log('prisoner loaded');
   }
   
   function settingGoals (){
   
	 /* load time count */
	 /* setting start button */
	 startGame();
	 /* save results */
	 console.log('Goals done!');
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