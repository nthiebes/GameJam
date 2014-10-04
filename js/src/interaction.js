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
	            	GameJam.panning = true;

	            	// Check if an item is at the dragstart cell
					for (var i in GameJam.items) {
						var startwidth = Math.floor(GameJam.items[i].pos[0]/GameJam.tileWidth),
							endwidth = Math.floor((GameJam.items[i].pos[0] + GameJam.items[i].width)/GameJam.tileWidth),
							startheight = Math.floor(GameJam.items[i].pos[1]/GameJam.tileHeight),
							endheight = Math.floor((GameJam.items[i].pos[1] + GameJam.items[i].height)/GameJam.tileHeight);

						if (startwidth <= cell[0] && cell[0] <= endwidth && startheight <= cell[1] && cell[1] <= endheight) {
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
	            		var cellwidth = cell[0] - Math.floor((GameJam.items[GameJam.draggedItem].width)/GameJam.tileWidth) + 1 ,
	            			cellheight = cell[1] - Math.floor((GameJam.items[GameJam.draggedItem].height)/GameJam.tileHeight) + 1,
	            			newxpos = cellwidth * GameJam.tileWidth,
	            			newypos = cellheight * GameJam.tileHeight,
	            			posHasItem = false;
	            		if (GameJam.world[cellwidth][cellheight] === 0 ){
		            		for (var i=0; i < GameJam.items.length; i++) {
									if (GameJam.items[i].pos[0] === newxpos && GameJam.items[i].pos[1] === newypos){
										posHasItem = true;
									}
							}
		            		if (!posHasItem){
		            			GameJam.items[GameJam.draggedItem].pos = [newxpos, newypos];
		            		}
	            		}
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
	            	GameJam.panning = false;
	            	GameJam.draggedItem = null;
	            	break;
	        }
		});
		
		// Main menu play button
		var mcPlay = new Hammer(document.getElementById('play'));
		mcPlay.on("tap", function(e){

			// Create level tiles
			var levelHtml = '<ul>',
				counter = 1;
			for (var i in GameJam.levels) {
				levelHtml += '<li class="level" id="' + i + '">' + counter +'<div class="bronze"></div><div class="silver"></div><div class="gold"></div></li>';
				counter++;
			}
			levelHtml += '</ul>';

			document.getElementById('level-selection').innerHTML = '<button id="back-main-menu">Back</button>' + levelHtml;
			document.getElementById('level-selection').className = 'visible';
			document.getElementById('main-menu').className = 'hidden';

			// Back to main menu button
			var mcBackMain = new Hammer(document.getElementById('back-main-menu'));
			mcBackMain.on("tap", function(e){
				document.getElementById('main-menu').className = 'visible';
				document.getElementById('level-selection').className = 'hidden';
			});
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