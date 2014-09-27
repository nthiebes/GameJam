(function(){
    function Sprite( url, pos, size, speed, frames, dir, once, inProgress ){
        this.pos = pos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this._index = 0;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;
        this.currentFrame;
        this.inProgress = inProgress;
    };

    Sprite.prototype = {
        update: function(dt) {
            this._index += this.speed*dt;
            // Always start with first frame
            if( this.frames.length === 1 ){
                this._index = 0;
            }
        },

        render: function(ctx) {
            var frame;

            if(this.speed > 0) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];

                if(this.once && idx >= max) {
                    this.done = true;
                }

                // End animation
                if( idx >= max ){
                    this._index = 0;
                }
                if( idx >= max && !input.isDown('SPACE') ){
                    this.inProgress = false;
                }
            }
            else {
                frame = 0;
            }

            //console.log(frame);

            this.currentFrame = frame;


            var x = this.pos[0];
            var y = this.pos[1];

            if(this.dir == 'vertical') {
                y += frame * this.size[1];
            }
            else {
                x += frame * this.size[0];
            }

            ctx.drawImage(resources.get(this.url),
                          x, y,
                          this.size[0], this.size[1],
                          0, 0,
                          this.size[0], this.size[1]);
        }
    };

    window.Sprite = Sprite;
})();