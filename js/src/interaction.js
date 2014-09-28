var interaction = function(document, window){

	function init(){
		// create a simple instance
		// by default, it only adds horizontal recognizers
		var mc = new Hammer(GameJam.canvasa);

		// let the pan gesture support all directions.
		// this will block the vertical scrolling on a touch-device while on the element
		mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

		// listen to events...
		mc.on("pan panstart panend", function(e) {
			var boundings = GameJam.canvasa.getBoundingClientRect(),
           		x,
           		y;

			// grab html page coords
			x = e.center.x + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.center.y + document.body.scrollTop + document.documentElement.scrollTop;

			// make them relative to the canvas only
			x -= GameJam.canvasa.offsetLeft;
			y -= GameJam.canvasa.offsetTop;

			// return tile x,y that we dragged
			var cell = [
				Math.floor(x/(boundings.width / GameJam.worldWidth)),
				Math.floor(y/(boundings.height / GameJam.worldHeight))
			];

			switch(e.type) {
	            case 'panstart':
	            	// Check if an item is at the dragstart cell
					for (var i in GameJam.items) {
						if (GameJam.items[i].pos[0] === cell[0] * GameJam.tileWidth && GameJam.items[i].pos[1] === cell[1] * GameJam.tileHeight) {
							GameJam.draggedItem = i;
						}
					}
	                break;

	            case 'pan':
	            	// Move the dragged item
	            	if (GameJam.draggedItem) {
	            		GameJam.items[GameJam.draggedItem].pos = [cell[0] * GameJam.tileWidth, cell[1] * GameJam.tileHeight];
	            	} else{
	            		// get scroll position
						var xs = window.scrollX,
						    ys = window.scrollY;
						
						// set scroll position to x: 140, y: 700
						//window.scrollTo( e.deltaX * -1, e.deltaY * -1 );
	            	}
	            	break;

	            case 'panend':
	            	// Stop the dragging
	            	GameJam.draggedItem = null;
	            	break;
	        }
		});
	}

	/*function isItemTapped(ev, item){
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
	}*/

	return {
		Init: init
	}

}(document, window);