/**
 * All levels of the game
 * @type {Object}
 */
window.GameJam.levels = {
	level1: {
		name: 'Brot',
		map: [[20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22],
			  [23, 25, 25, 25, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0, 23],
			  [23, 0, 0, 0, 0, 0, 25, 0, 25, 25, 25, 25, 25, 25, 0, 23],
			  [23, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0, 23],
			  [23, 0, 0, 0, 0, 0, 25, 25, 25, 25, 25, 0, 0, 25, 0, 23],
			  [23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 23],
			  [24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 24],
			  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0],
			  [22, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 0, 25, 0, 22],
			  [23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 23],
			  [23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 23],
			  [23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 23],
			  [23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 23],
			  [23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23],
			  [23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23],
			  [20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 24]],
		time: 25,
		stars: [10, 15, 20],
		unlocked: true,
		items: [
			{
				id: 0,
				count: 3,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite('img/animatedTiles.png', [0, 32], [32, 32], 8, [0, 1, 2, 3, 4, 5], 'horizontal', false, false) // url, pos, size, speed, frames, dir, once, inProgress
			},
			{
				id: 1,
				count: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite('img/animatedTiles.png', [0, 0], [32, 64], 8, [0, 1, 2, 3, 4, 5], 'horizontal', false, false) // url, pos, size, speed, frames, dir, once, inProgress
			},
			{
				id: 2,
				count: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite('img/animatedTiles.png', [0, 32], [64, 32], 8, [0, 1, 2, 3, 4, 5], 'horizontal', false, false) // url, pos, size, speed, frames, dir, once, inProgress
			}
		]
	},
	level2: {
		time: 17,
		stars: [10, 15, 20],
		unlocked: true
	},
	level3: {
		time: 13,
		stars: [10, 15, 20],
		unlocked: true
	},
	level4: {
		time: 7,
		stars: [10, 15, 20],
		unlocked: true
	},
	level5: [],
	level6: [],
	level7: [],
	level8: [],
	level9: [],
	leve10: []
};