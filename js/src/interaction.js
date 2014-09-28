var interaction = function(document, window){

	function init(){

            var myElement = GameJam.canvasa;
			// create a simple instance
			// by default, it only adds horizontal recognizers
			var mc = new Hammer(myElement);
			// listen to events...
			mc.on("panleft panright tap press", function(ev) {
				switch(ev.type) {
		            case 'panleft':
		            // check we click on the element
		            console.log (ev.center.x);
		            console.log (GameJam.items[0].pos[0]);
		            console.log (GameJam.items[0].sprite.size[0]);
		           	if (isItemTapped(ev,GameJam.items[0])){
		           		console.log("YUUUUUUUUUUHUU");
		           	}

		 
		                break;
		        }

			    console.log( ev.type +" gesture detected." );
			});

	}

	function isItemTapped(ev, item){
		var isTapped = false;
		console.log ((ev.center.x > item.pos[0] && ev.center.x < item.pos[0] + item.sprite.size[0]));
		console.log((ev.center.y > item.pos[1] && ev.center.y < item.pos[1] + item.sprite.size[1]));
		if ((ev.center.x > item.pos[0] && ev.center.x < item.pos[0] + item.sprite.size[0]) &&
			(ev.center.y > item.pos[1] && ev.center.y < item.pos[1] + item.sprite.size[1])){
    		isTapped = true;
		}

		return isTapped;
	}


   return {
      Init: init
   }
}(document, window);
