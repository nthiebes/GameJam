/**
 * All levels of the game
 * @type {Object}
 */

/*

[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],

sprite: new Sprite({
    url: 'img/obstacles.png',
    pos: [96, 0],
    size: [32, 64],
    speed: 0,
    frames: [0],
    dir: 'horizontal',
    once: false,
    inProgress: false,
    stay: false
})

 */

window.GameJam.levels = {
	level1: {
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 7, 13, 0, 0, 12, 28, 44, 0, 8, 24, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [20, 25, 30],
		unlocked: true,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [64, 0],
				    size: [32, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [128, 0],
				    size: [64, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			}
		]
	},
	level2: {
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 0, 0, 8, 24, 0, 0, 0, 0, 0, 0, 1],
				    [1, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 23, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 7, 0, 0, 13, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 4, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 5, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 12, 28, 44, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [20, 30, 40],
		unlocked: false,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [64, 0],
				    size: [32, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [96, 0],
				    size: [32, 64],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [128, 0],
				    size: [64, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			}
		]
	},
	level3: {
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
				    [1, 0, 0, 0, 11, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 6, 0, 0, 0, 2, 0, 11, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 7, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 2, 0, 0, 0, 10, 0, 0, 0, 2, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 8, 24, 0, 0, 0, 1, 1],
				  	[1, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 6, 0, 0, 12, 28, 44, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [30, 33, 47],
		unlocked: true,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [64, 0],
				    size: [32, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [96, 0],
				    size: [32, 64],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			}
		]
	},
	level4: {
		time: 0,
		obstacles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				    [1, 0, 0, 2, 0, 0, 6, 0, 8, 24, 0, 0, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 7, 0, 0, 0, 13, 22, 0, 0, 0, 1],
				    [1, 1, 0, 0, 0, 0, 0, 28, 44, 0, 0, 23, 0, 0, 0, 1],
				    [1, 1, 0, 11, 0, 6, 0, 0, 11, 0, 0, 8, 24, 0, 0, 1],
				  	[1, 1, 0, 10, 0, 7, 0, 0, 10, 0, 0, 0, 0, 2, 0, 1],
				  	[1, 1, 0, 5, 0, 0, 11, 0, 0, 3, 2, 0, 0, 2, 1, 1],
				  	[1, 1, 0, 0, 6, 0, 10, 0, 0, 0, 0, 6, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 7, 0, 0, 13, 11, 0, 0, 7, 0, 2, 0, 1],
				  	[1, 1, 0, 0, 0, 11, 0, 0, 0, 22, 0, 0, 0, 2, 0, 1],
				  	[1, 1, 0, 0, 0, 10, 0, 0, 0, 23, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 28, 44, 0, 0, 2, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				  	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		stars: [20, 47, 73],
		unlocked: true,
		items: [
			{
				id: 0,
				count: 1,
				countStart: 1,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [64, 0],
				    size: [32, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 1,
				count: 2,
				countStart: 2,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [96, 0],
				    size: [32, 64],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [128, 0],
				    size: [64, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			}
		]
	},
	level5: {
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
		unlocked: false,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [64, 0],
				    size: [32, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [96, 0],
				    size: [32, 64],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [128, 0],
				    size: [64, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			}
		]
	},
	level6: {
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
		unlocked: false,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [64, 0],
				    size: [32, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [96, 0],
				    size: [32, 64],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [128, 0],
				    size: [64, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			}
		]
	},
	level7: {
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
		unlocked: false,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [64, 0],
				    size: [32, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [96, 0],
				    size: [32, 64],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [128, 0],
				    size: [64, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			}
		]
	},
	level8: {
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
		unlocked: false,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [64, 0],
				    size: [32, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [96, 0],
				    size: [32, 64],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [128, 0],
				    size: [64, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			}
		]
	},
	level9: {
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
		unlocked: false,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [64, 0],
				    size: [32, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [96, 0],
				    size: [32, 64],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [128, 0],
				    size: [64, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			}
		]
	},
	leve10: {
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
		unlocked: false,
		items: [
			{
				id: 0,
				count: 2,
				countStart: 2,
				width: 32,
				height: 32,
				icon: 0,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [64, 0],
				    size: [32, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 1,
				count: 1,
				countStart: 1,
				width: 32,
				height: 64,
				icon: 50,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [96, 0],
				    size: [32, 64],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			},
			{
				id: 2,
				count: 1,
				countStart: 1,
				width: 64,
				height: 32,
				icon: 150,
				sprite: new Sprite({
				    url: 'img/obstacles.png',
				    pos: [128, 0],
				    size: [64, 32],
				    speed: 0,
				    frames: [0],
				    dir: 'horizontal',
				    once: false,
				    inProgress: false,
				    stay: false
				})
			}
		]
	}
};