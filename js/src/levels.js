/**
 * All levels of the game
 * @type {Object}
 */
window.GameJam.levels = {
	level1: {
		name: 'Brot',
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 0, 0, 8, 24, 0, 0, 0, 0, 0, 0, 1],
				    [1, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 23, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 7, 0, 0, 13, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 4, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 5, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 12, 28, 44, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [20, 30, 40],
		unlocked: true,
		items: [
			{
				id: 0,
				count: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite('img/obstacles.png', [64, 0], [32, 32], 8, [0], 'horizontal', false, false) // url, pos, size, speed, frames, dir, once, inProgress
			},
			{
				id: 1,
				count: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite('img/obstacles.png', [96, 0], [32, 64], 8, [0], 'horizontal', false, false) // url, pos, size, speed, frames, dir, once, inProgress
			},
			{
				id: 2,
				count: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite('img/obstacles.png', [128, 0], [64, 32], 8, [0], 'horizontal', false, false) // url, pos, size, speed, frames, dir, once, inProgress
			}
		]
	},
	level2: {
		time: 17,
		stars: [10, 15, 20],
		unlocked: false
	},
	level3: {
		time: 13,
		stars: [10, 15, 20],
		unlocked: false
	},
	level4: {
		time: 7,
		stars: [10, 15, 20],
		unlocked: false
	},
	level5: [],
	level6: [],
	level7: [],
	level8: [],
	level9: [],
	leve10: []
};