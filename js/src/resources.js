/**
 * Handle resources
 * @return {object} Public functions
 */
var resources = function(document, window){

    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /**
     * Load an image url or an array of image urls
     * @param {array} urlOrArr Array of image urls
     */
    function load(urlOrArr){
        if (urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            _load(urlOrArr);
        }
    }

    function _load(url){
        if(resourceCache[url]) {
            return resourceCache[url];
        } else {
            var img = new Image();
            img.onload = function(){
                resourceCache[url] = img;
                
                GameJam.loadingPercentage += 5;
                core.Loading(GameJam.loadingPercentage);

                if (isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }


    /**
     * [get description]
     * @param  {string} url Image url
     * @return {image} The image object
     */
    function get(url){
        return resourceCache[url];
    }


    /**
     * Check if all resources are loaded
     * @return {boolean}
     */
    function isReady(){
        var ready = true;
        for (var k in resourceCache) {
            if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }


    /**
     * Push callback functions to a callback array
     * @param {function} func Callback function
     */
    function onReady(func){
        readyCallbacks.push(func);
    }


    /**
     * Return public functions
     */
    return { 
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };

}(document, window);