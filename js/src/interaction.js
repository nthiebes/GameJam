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

	            	// Hide obstacles list
		            core.HideObstacles();

	            	// Check if an item is at the dragstart cell
					for (var i in GameJam.items) {
						var startwidth = Math.floor(GameJam.items[i].pos[0]/GameJam.tileWidth),
							endwidth = Math.floor(GameJam.items[i].pos[0]/GameJam.tileWidth + GameJam.items[i].width/GameJam.tileWidth - 1),
							startheight = Math.floor(GameJam.items[i].pos[1]/GameJam.tileHeight),
							endheight = Math.floor(GameJam.items[i].pos[1]/GameJam.tileHeight + GameJam.items[i].height/GameJam.tileHeight - 1);

						//console.log(startwidth + "-" + endwidth + "-" + startheight + "-" + endheight + "-" + cell);
						
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
	            			cellxhigh = GameJam.items[GameJam.draggedItem].width/ GameJam.tileWidth,
	            			cellyhigh = GameJam.items[GameJam.draggedItem].height/ GameJam.tileHeight,
	            			newxpos = cellwidth * GameJam.tileWidth,
	            			newypos = cellheight * GameJam.tileHeight,
	            			newxhighpos =  newxpos + GameJam.tileWidth*(GameJam.items[GameJam.draggedItem].width/GameJam.tileWidth -1),
	            			newyhighpos =  newypos + GameJam.tileHeight*(GameJam.items[GameJam.draggedItem].height/GameJam.tileHeight -1),
	            			posHasItem = false;
						
						// if it has an obstacle we don't move it there
						if (GameJam.obstacles[cellwidth] && GameJam.obstacles[cellwidth][cellheight] === 0 ){
	            			// checkin all  x blocks from the item with the obstacles
	            			while(!posHasItem && cellxhigh>1){
	            				//console.log("ob XX" + GameJam.obstacles[cellwidth + cellxhigh -1][cellheight] + '-'+cellwidth  + '-' +cellxhigh + posHasItem );
	            				if (GameJam.obstacles[cellwidth + cellxhigh -1][cellheight]  !== 0){
	            					posHasItem = true;
	            					//console.log("ob X" + GameJam.obstacles[cellwidth + cellxhigh -1][cellheight] + '-'+cellwidth  + '-' +cellxhigh + posHasItem );
	            				}
	            				cellxhigh--;
	            			}

	            			// checkin all y blocks from the item with the obstacles
	            			while(!posHasItem && cellyhigh>1){
	            				if (GameJam.obstacles[cellwidth][cellheight + cellyhigh -1]  !== 0){
	            					posHasItem = true;
	            					//console.log("ob y" + GameJam.obstacles[cellwidth][cellheight + cellyhigh -1] + '-'+cellheight  + '-' +cellyhigh + posHasItem);
	            				}
	            				cellyhigh--;
	            			}
	            			var i = 0;
	            			while (!posHasItem && i < GameJam.items.length){
	            				//we want to check all items but not the one that we drag
	            				if(i != GameJam.draggedItem){
	            					var itemxpos = GameJam.items[i].pos[0],
	            						itemypos = GameJam.items[i].pos[1],
	            						itemxhighpos = itemxpos + GameJam.tileWidth*(GameJam.items[i].width/GameJam.tileWidth -1),
	            						itemyhighpos = itemypos +  GameJam.tileHeight*(GameJam.items[i].height/GameJam.tileHeight -1);

		            				//console.log('x:' + newxpos + ':' + newxhighpos + '-'+ itemxpos + ':' + itemxhighpos + '::' + i);
		            				//console.log('y:' + newypos + ':' + newyhighpos + '-'+ itemypos + ':' + itemyhighpos  + '::' + i);

		            				//ix <= nx <= nhx <= ihx
		            				//iy <= ny <= nhy <= ihy
									if (((itemxpos <= newxpos && newxpos <= itemxhighpos) || (itemxpos <= newxhighpos && newxhighpos <= itemxhighpos)) &&
										((itemypos <= newypos && newypos <= itemyhighpos) || (itemypos <= newyhighpos && newyhighpos <= itemyhighpos))){

										//console.log('xx:'+GameJam.items[i].pos[0] + '-' + newxpos + ':' + newxhighpos + '::' + i);
		            					//console.log('yy:'+GameJam.items[i].pos[1] + '-' + newypos + ':' + newyhighpos + '::' + i);

										posHasItem = true;
									}
									
								}

								i++;
							}
							
							// it didnt have any obstacle or another item so we can move it
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
				core.ShowObstacles();
			} else{
		        core.HideObstacles();
			}
		});

		/** Reset margin on resize */
		window.onresize = function(e){
		    for (var i=0; i < canvas.length; i++) {
		    	canvas[i].style.marginLeft = '0px';
				canvas[i].style.marginTop = '0px';
			}
		};

		/** Replay level button */
		var mcReplay = new Hammer(document.querySelectorAll('.replay-btn')[0]);
		mcReplay.on('tap', function(e){
			document.getElementById('complete').className = 'window hide';
			core.LoadLevel(GameJam.currentLevel);
		});
	}


	/**
	 * Start the next level
	 */
	function nextLevelBtnEvent(){
		var mcNext = new Hammer(document.querySelectorAll('.next-btn')[0]);
		mcNext.on('tap', function(e){
			document.getElementById('complete').className = 'window hide';
			var nextLevel = 'level' + (parseInt(GameJam.currentLevel.replace(/level/g, '')) + 1);
			core.LoadLevel(nextLevel);
		});
	}


	/**
	 * Obstacle list pan events
	 */
	function obstacleEvents(){
		/** Listen to pan events */
		var obstaclesList = document.querySelectorAll('.obstacle'),
			canvas = document.getElementsByTagName('canvas'),
			startMarginLeft = 0,
	        startMarginTop = 0;

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
            		itemCount = item.count,
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
		            	// Show icon
		            	GameJam.draggedIcon.setAttribute('style', 'background-position: 0px -' + item.icon + 'px;');
		            	GameJam.draggedIcon.className = 'show';

		            	// Hide obstacles list
		            	core.HideObstacles();

		            	// Get the starting margins
						startMarginLeft = parseInt(window.getComputedStyle(canvas[0]).getPropertyValue('margin-left'));
						startMarginTop = parseInt(window.getComputedStyle(canvas[0]).getPropertyValue('margin-top'));

		                break;

		            case 'pan':

		            	// Move icon
		            	GameJam.draggedIcon.style.left = x-25 + startMarginLeft + 'px';
		            	GameJam.draggedIcon.style.top = y-25 + startMarginTop + 'px';
		            	
		            	break;

		            case 'panend':
		            	// Hide icon
		            	GameJam.draggedIcon.className = '';

		            	// Add obstacle to item array
	            		pos.push(cellwidth * GameJam.tileWidth);
	            		pos.push(cellheight * GameJam.tileHeight);

	            		// Remove obstacle from obstacle window
	            		
console.log(item,itemCount);

	            		itemCount = itemCount - 1;
	            		if (itemCount <= 0) {
	            			obstacle.remove();
	            		} else {
	            			obstacle.querySelectorAll('.count')[0].innerHTML = itemCount;
	            		}
	            		item.count = itemCount;
console.log(item,itemCount);
	            		// Create a new item and add it to the global items list
		            	var newItem = {};
		            	newItem.width = item.width;
		            	newItem.height = item.height;
		            	newItem.icon = item.icon;
		            	newItem.id = GameJam.levels[GameJam.currentLevel].items.length;
		            	newItem.pos = pos;
		            	newItem.sprite = item.sprite;
		            	GameJam.items.push( newItem );
		            	
		            	break;
		        }
			});
		}
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

		/** Reset button */
		var mcReset = new Hammer(document.getElementById('reset-btn'));
		mcReset.on('tap', function(e){
			if (core.LocalStorageActive) {
				localStorage.clear();
			}
			core.DocCookies.removeItem('levels');
			document.location.reload();
		});
	}


	/**
	 * Level selection buttons
	 */
	function levelButtonEvents(){
		var levelList = document.querySelectorAll('.level.unlocked');
		for (var i=0; i<levelList.length; i++) {
			var mcLevel = new Hammer(levelList[i]);

			mcLevel.on('tap', function(e){
				core.LoadLevel(e.target.parentElement.id);
			});
		}
	}


	/**
	 * Return public functions
	 */
	return {
		GameEvents: gameEvents,
		GeneralEvents: generalEvents,
		LevelButtonEvents: levelButtonEvents,
		ObstacleEvents: obstacleEvents,
		NextLevelBtnEvent: nextLevelBtnEvent
	};

}(document, window);