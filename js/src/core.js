/* Main part of the game */
var core = function(document){

	function init(){
	 /* load resources needed */
	 // Initialize if all ressources are loaded
	resources.load([
		//'img/sprites.png',
		//'img/bla.png',
		//'img/blubb.png',
		'img/tileset.png'
	]);
	resources.onReady(core.Resources);
	
	 /* load enviroment */
     enviroment();
	 /* load player interaction */
	 playerInteraction();
	 /* load mister G */
	 prisoner();
	 /* setting goals of the game */
	 settingGoals();	 
   }
   
   function resources (){
   
	 /* load sprites */
	 /* load assets */
	 console.log('resources loaded');
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
      Resources: resources
   }
}(document);

window.onload = function() {
	core.Init();
};