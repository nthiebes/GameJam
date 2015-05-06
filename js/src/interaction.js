/**
 * Includes all game interactions (tap/pan events etc.)
 * @return {object} Public functions
 */
var interaction = function(document, window){

	/**
	 * Register the game events
	 */
	function gameEvents(){
		/**
		 * Create a simple instance
		 * by default, it only adds horizontal recognizers
		 */
		var mcCanvas = new Hammer(GameJam.canvasa);

		/**
		 * Let the pan gesture support all directions
		 * this will block the vertical scrolling on a touch-device while on the element
		 */
		mcCanvas.get('pan').set({
			direction: Hammer.DIRECTION_ALL
		});

		var canvas = document.getElementsByTagName('canvas'),
			startMarginLeft = 0,
			startMarginTop = 0;

		/** Listen to pan events */
		mcCanvas.on('pan panstart panend', function(e){
			var boundings = GameJam.canvasa.getBoundingClientRect(),
				boundingsMain = document.getElementsByTagName('main')[0].getBoundingClientRect(),
           		x,
           		y,
           		xScroll,
           		yScroll;

			// Grab html page coords
			x = e.center.x + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.center.y + document.body.scrollTop + document.documentElement.scrollTop;

			// Make them relative to the canvas only
			x -= GameJam.canvasa.offsetLeft;
			y -= GameJam.canvasa.offsetTop;

			// Return tile x,y that we dragged
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

		/** Listen to pan events */
		var obstaclesList = document.querySelectorAll('.obstacle');
		for (var i=0; i<obstaclesList.length; i++) {
			var mcObstacle = new Hammer(obstaclesList[i]);
			mcObstacle.get('pan').set({
				direction: Hammer.DIRECTION_ALL
			});
			mcObstacle.on('pan panstart panend', function(e){
				var boundings = GameJam.canvasa.getBoundingClientRect(),
					boundingsMain = document.getElementsByTagName('main')[0].getBoundingClientRect(),
	           		obstacle = e.target.className.match(/obstacle/g) ? e.target : e.target.parentElement,
            		obstacleId = obstacle.getAttribute('data-icon'),
            		item = GameJam.levels[GameJam.currentLevel].items[obstacleId],
	           		x,
	           		y,
            		pos = [],
            		cellwidth,
	            	cellheight;

				// Grab html page coords
				x = e.center.x + document.body.scrollLeft + document.documentElement.scrollLeft;
				y = e.center.y + document.body.scrollTop + document.documentElement.scrollTop;

				// Make them relative to the canvas only
				x -= GameJam.canvasa.offsetLeft;
				y -= GameJam.canvasa.offsetTop;

				// Return tile x,y that we dragged
				var cell = [
					Math.floor(x/(boundings.width / GameJam.worldWidth)),
					Math.floor(y/(boundings.height / GameJam.worldHeight))
				];

				cellwidth = cell[0] - Math.floor((item.width)/GameJam.tileWidth) + 1 ,
	            cellheight = cell[1] - Math.floor((item.height)/GameJam.tileHeight) + 1;

				switch(e.type) {
		            case 'panstart':
		            	console.log('panstart', e);

		            	// Hide obstacles list
		            	document.getElementById('slider').className = 'show minimized';
						document.getElementById('obstacles').className = 'show minimized';
						document.getElementById('start-button-wrapper').className = 'show minimized';

		                break;

		            case 'pan':
		            	
		            	break;

		            case 'panend':
		            	console.log('panend', e);


	            		pos.push(cellwidth * GameJam.tileWidth);
	            		pos.push(cellheight * GameJam.tileHeight);

		            	console.log( GameJam.world );

		            	console.log( pos );

		            	GameJam.levels[GameJam.currentLevel].items[obstacleId].pos = pos;

		            	GameJam.items.push( GameJam.levels[GameJam.currentLevel].items[obstacleId] );



		            	
		            	break;
		        }
			});
		}

		/** Free the mouse ... */
		var mcStart = new Hammer(document.getElementById('start-game'));
		mcStart.on('tap', function(e){
			if (e.target.className.match(/disabled/g)) {
				return false;
			}

			core.StartGame();
		});

		/** Expand/minimize the item list */
		var mcSlider = new Hammer(document.getElementById('slider'));
		mcSlider.on('tap', function(e){
			if (e.target.className.match(/minimized/g)) {
				e.target.className = 'show expanded';
				document.getElementById('obstacles').className = 'show expanded';
				document.getElementById('start-button-wrapper').className = 'show expanded';
			} else{
				e.target.className = 'show minimized';
				document.getElementById('obstacles').className = 'show minimized';
				document.getElementById('start-button-wrapper').className = 'show minimized';
			}
		});

		/** Reset margin on resize */
		window.onresize = function(e){
		    for (var i=0; i < canvas.length; i++) {
		    	canvas[i].style.marginLeft = '0px';
				canvas[i].style.marginTop = '0px';
			}
		};
	}


	/**
	 * Register general events
	 */
	function generalEvents(){
		/** Elements that change the view */
		var viewList = document.querySelectorAll('.view');
		for (var i=0; i<viewList.length; i++) {
			var mcView = new Hammer(viewList[i]);

			mcView.on('tap', function(e){
				var newView = e.target.getAttribute('data-view');
				core.ChangeView(newView);
			});
		}

		/** Checkboxes */
		var checkboxList = document.querySelectorAll('.checkbox');
		for (var i=0; i<checkboxList.length; i++) {
			var mcCheckbox = new Hammer(checkboxList[i]);

			mcCheckbox.on('tap', function(e){
				var checked = e.target.getAttribute('data-checked');
				if (checked === 'true') {
					e.target.className = 'checkbox';
					e.target.setAttribute('data-checked', 'false');
				} else{
					e.target.className = 'checkbox checked';
					e.target.setAttribute('data-checked', 'true');
				}
			});
		}

		/** Level selection buttons */
		var levelList = document.querySelectorAll('.level.unlocked');
		for (var i=0; i<levelList.length; i++) {
			var mcLevel = new Hammer(levelList[i]);

			mcLevel.on('tap', function(e){
				GameJam.currentLevel = e.target.parentElement.id;
				core.InitGame();
				GameJam.createWorld();

				// Create obstacle icons
				var iconsHtml = '',
					counter = 1;
				for (var i in GameJam.levels[GameJam.currentLevel].items) {
					var item = GameJam.levels[GameJam.currentLevel].items[i];
					iconsHtml += '<li class="obstacle" data-icon="' + item.id + '">' +
									'<div class="size">' + item.width/32 + 'x' + item.height/32 + '</div>' +
									'<div class="icon" style="background-position: 0px -' + item.icon + 'px;"></div>' +
									'<div class="count">' + item.count + '</div>' +
								 '</li>';
					counter++;
				}
				document.getElementById('obstacles-list').innerHTML = iconsHtml;

				// Register game event handlers
				interaction.GameEvents();
				console.log('-- Game events initialized');

				requestTimeout(function(){
					document.getElementById('obstacles').className = 'show';
					document.getElementById('start-button-wrapper').className = 'show';
					document.getElementById('slider').className = 'show';
				}, 300);
				
			});
		}
	}


	/**
	 * Return public functions
	 */
	return {
		GameEvents: gameEvents,
		GeneralEvents: generalEvents
	}

}(document, window);