var interaction = function(document, window){

	function init(){
		// create a simple instance
		// by default, it only adds horizontal recognizers
		var mc = new Hammer(GameJam.canvasa);

		// let the pan gesture support all directions.
		// this will block the vertical scrolling on a touch-device while on the element
		mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

		var canvas = document.getElementsByTagName('canvas'),
			startMarginLeft = 0,
			startMarginTop = 0;

		// listen to events...
		mc.on("pan panstart panend", function(e) {
			var boundings = GameJam.canvasa.getBoundingClientRect(),
				boundingsMain = document.getElementsByTagName('main')[0].getBoundingClientRect(),
           		x,
           		y,
           		xScroll,
           		yScroll;

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

					// Get the starting margins
					startMarginLeft = parseInt(window.getComputedStyle(canvas[0]).getPropertyValue('margin-left'));
					startMarginTop = parseInt(window.getComputedStyle(canvas[0]).getPropertyValue('margin-top'));
	                break;

	            case 'pan':
	            	// Move the dragged item
	            	if (GameJam.draggedItem) {
	            		GameJam.items[GameJam.draggedItem].pos = [cell[0] * GameJam.tileWidth, cell[1] * GameJam.tileHeight];
	            	} else{
						// Map scrolling
						var newMarginLeft = e.deltaX + startMarginLeft,
							newMarginTop = e.deltaY + startMarginTop;

						// Horizontal scolling with restriction to viewport
						if (newMarginLeft <= 0 && (newMarginLeft - boundingsMain.width) * -1 <= boundings.width) {
							for (var i=0; i < canvas.length; i++) {
								canvas[i].style.marginLeft = newMarginLeft + 'px';
							}
						}

						// Vertical scolling with restriction to viewport
						if (newMarginTop <= 0 && (newMarginTop - boundingsMain.height) * -1 <= boundings.height) {
							for (var i=0; i < canvas.length; i++) {
								canvas[i].style.marginTop = newMarginTop + 'px';
							}
						}
	            	}
	            	break;

	            case 'panend':
	            	// Stop the dragging
	            	GameJam.draggedItem = null;
	            	break;
	        }
		});
		
		// Main menu play button
		var mcPlay = new Hammer(document.getElementById('play'));
		mcPlay.on("tap", function(e){
			//document.getElementsByTagName('main')[0].className = 'visible';

			//core.StartGame();

			var levelHtml = '<ul>';

			for (var i in GameJam.levels) {
				levelHtml += '<li class="level" id="' + i + '"></li>'
			}

			levelHtml += '</ul>';

			document.getElementById('level-selection').innerHTML = levelHtml;

			document.getElementById('level-selection').className = 'visible';
		});

		// Level selection buttons
		var selectLevel = new Hammer(document.getElementById('level-selection'));
		selectLevel.on("tap", function(e){

			if (e.target.className === 'level') {
				GameJam.currentLevel = e.target.id;

				GameJam.createWorld();

				document.getElementsByTagName('main')[0].className = 'visible';
				document.getElementById('start-game').className = 'visible';
			}
		});

		// Free the mouse ...
		var mcStart = new Hammer(document.getElementById('start-game'));
		mcStart.on("tap", function(e){
			core.StartGame();
		});
		
		// Reset margin on resize
		window.onresize = function(e){
		    for (var i=0; i < canvas.length; i++) {
		    	canvas[i].style.marginLeft = '0px';
				canvas[i].style.marginTop = '0px';
			}
		};
	}

	return {
		Init: init
	}

}(document, window);