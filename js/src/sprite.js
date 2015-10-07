/**
 * Sprite handling
 */
(function(){
    function Sprite( cfg ){
        this.pos = cfg.pos;
        this.size = cfg.size;
        this.speed = typeof cfg.speed === 'number' ? cfg.speed : 0;
        this.frames = cfg.frames;
        this._index = 0;
        this.url = cfg.url;
        this.dir = cfg.dir || 'horizontal';
        this.once = cfg.once;
        this.stay = cfg.stay;
        this.currentFrame;
        this.inProgress = cfg.inProgress;
    }

    Sprite.prototype = {
        update: function(dt) {
            // Stay not yet working correct
            if (!(this.stay && this.done)) {
                this._index += this.speed*dt;
                // Always start with first frame
                if( this.frames.length === 1 ){
                    this._index = 0;
                }
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
            }
            else {
                frame = 0;
            }

            this.currentFrame = frame;


            var x = this.pos[0];
            var y = this.pos[1];

            if(this.dir == 'vertical') {
                y += frame * this.size[1];
            }
            else {
                x += frame * this.size[0];
            }

            //if it is done and it has to run once, we dont update
            if(!(this.done && this.once)){
                ctx.drawImage(resources.get(this.url),
                              x, y,
                              this.size[0], this.size[1],
                              0, 0,
                              this.size[0], this.size[1]);
            }
        }
    };

    window.Sprite = Sprite;
})();