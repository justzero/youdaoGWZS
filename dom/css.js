(function($){
        var m = $.ns('youdao.modules'), consts = $.require_module('youdao.consts'),
         cache = $.require_module('youdao.cache');
        m.css = function(){
            var cache = $.require_module('youdao.cache');
            var positionWrapCtn = function (){
                if (cache.conf.position === 'down') {
					cache.dom.bottom = (cache.dom.bottom) ? 0 : 1;
					cache.dom.elem.style.top = 'auto';
					cache.dom.elem.style.bottom = cache.dom.bottom + 'px';
                    if (cache.dom.show.style.display === 'block') {
						cache.dom.show.style.bottom = (cache.dom.bottom + 62) + 'px';
						cache.dom.show.style.top = 'auto';
					}
                } else {
                    cache.dom.top = document.documentElement.scrollTop;
                    cache.dom.elem.style.top = cache.dom.top + 1 + 'px';
					cache.dom.bottom = 'auto';
                    if (cache.dom.show.style.display === 'block') {
						cache.dom.show.style.top = (cache.dom.top + 62) + 'px';
						cache.dom.show.style.bottom = 'auto';
					}
                }
            };
            if (cache.conf.ie === 6) {
                positionWrapCtn();
                $.event.addEvent(window, 'scroll', function(event){
                    positionWrapCtn();
                });
                $.event.addEvent(window, 'resize', function(event){
                    positionWrapCtn();
                });
            } else {
                cache.dom.elem.style.position = 'fixed';
                cache.dom.show.style.position = 'fixed';
            }
        };
})(youdao);
