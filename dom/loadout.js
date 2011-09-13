(function($){
    var m = $.ns('youdao.modules'),
        cache = $.require_module('youdao.cache');
        cache.nosyn.loadout = true,
		consts = $.require_module('youdao.consts');
    m.loadout = function(callback) {
        var cache = $.require_module('youdao.cache');
        cache.dom.elem.append = $.dom.append,
        dom = $.require_module('youdao.dom');
        var elem = cache.dom.elem;
        var self = this, w = dom.outWidth(elem),
              json = {
                 elem: consts.elemId,
                 attr: ['fade', 100, 0, 'px'],
                 timer: 'vFast',
                 atp: 'Line',
                 callback: function(){ elem.style.height = 0; callback.success(); },
                 context: self
              } ;
       	// $.addAnimate(json);
		json.callback();
		cache.dom.inLen = cache.dom.elem.offsetWidth;
		//callback.success();
    };
})(youdao);
