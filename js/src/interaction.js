var interaction = function(document, window){

	function init(){
		var startmovement = false;
		GameJam.itemPath = [];
        var myElement = GameJam.canvasa;
		// create a simple instance
		// by default, it only adds horizontal recognizers
		var mc = new Hammer(myElement);
		// listen to events...
		mc.on("panleft panright panstart panend tap press", function(ev) {
			switch(ev.type) {
	            case 'panstart':

	            	console.log ("panstart");
		            // check we click on the element
		            console.log (ev.center.x);
		            console.log (GameJam.items[0].pos[0]);
		            console.log (GameJam.items[0].sprite.size[0]);
		           	if (isItemTapped(ev,GameJam.items[0])){
		           		startmovement = true;
		           	}

	                break;

	            case 'panend':
	            	console.log ("panend");
	             	console.log (ev.center.x);
		            console.log (GameJam.items[0].pos[0]);
		            console.log (GameJam.items[0].sprite.size[0]);
		            startmovement = false;
	            	break;   

	            case 'panright':
	            	if(startmovement){
	            	GameJam.itemPath.push(ev.center);
	            }
	            	break;

	            case 'panleft':
	            	if(startmovement){
	            	GameJam.itemPath.push(ev.center);
	            }
	            	break;

	        }

		    console.log( ev.type +" gesture detected." );
		});

	}

	function isItemTapped(ev, item){
		var isTapped = false;
		console.log ( item.pos[0]);
		console.log ((ev.center.x > item.pos[0] && ev.center.x < item.pos[0] + item.sprite.size[0]));
		console.log ( item.pos[1]);
		console.log((ev.center.y > item.pos[1] && ev.center.y < item.pos[1] + item.sprite.size[1]));
		if ((ev.center.x > item.pos[0] && ev.center.x < item.pos[0] + item.sprite.size[0]) &&
			(ev.center.y > item.pos[1] && ev.center.y < item.pos[1] + item.sprite.size[1])){
    		isTapped = true;
    		console.log ("isTapped");
		}

		return isTapped;
	}


   return {
      Init: init
   }
}(document, window);
