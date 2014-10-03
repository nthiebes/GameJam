window.GameJam.levels = {
    level1: {
        name: 'Brot',
        map: [[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0],
              [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
              [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
              [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
              [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        medals: {
            bronze: 5000,
            silver: 10000,
            gold: 15000
        },
        items: [
            {
                pos: [32, 64],
                sprite: new Sprite('img/animatedTiles.png', [0, 32], [32, 32], 8, [0, 1, 2, 3, 4, 5], 'horizontal', false, false) // url, pos, size, speed, frames, dir, once, inProgress
            }, 
            {
                pos: [32, 128],
                sprite: new Sprite('img/animatedTiles.png', [0, 32], [32, 32], 8, [0, 1, 2, 3, 4, 5], 'horizontal', false, false) // url, pos, size, speed, frames, dir, once, inProgress
            },
            {
                pos: [32, 192],
                sprite: new Sprite('img/animatedTiles.png', [0, 32], [32, 32], 8, [0, 1, 2, 3, 4, 5], 'horizontal', false, false) // url, pos, size, speed, frames, dir, once, inProgress
            }
        ]
    },
    level2: []
};