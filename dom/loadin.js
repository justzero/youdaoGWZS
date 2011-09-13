(function($){
	var m = $.ns('youdao.modules'),
	cache = $.require_module('youdao.cache');
	cache.nosyn.loadin = true;
	m.loadin = function( callback ) {
	    var  dom = $.require_module('youdao.dom'), consts = $.require_module('youdao.consts');
	    cache.dom.elem.append = $.dom.append;
	    var elem = cache.dom.elem.append('div', { id: consts.elemId, className: cache.conf.position }, { }, '' ),
	    showDiv = cache.dom.elem.append('div', { id: consts.elemId + 'Show' }, { }, '' ); 	    
		if (cache.conf.ie !== 6) {
	        elem.style.position = 'fixed';
	        showDiv.style.position = 'fixed';
	    };
        showDiv.onmouseover = function() {
            $.ctrl.cleanTime();
        };
        showDiv.onmouseout = function() {
            $.ctrl.delayClean(consts.showTime * 1000);
        };
	    cache.dom.elem = elem;
	    cache.dom.show = showDiv;
	    var data = { name: consts.commonName };
	    //console.log(youdao.tm);
	    elem.innerHTML = $.tmpl( $.tm.load,  data);
		cache.dom.contentWidth = cache.dom.inLen = document.getElementById(consts.commonName + 'contentBar').offsetWidth;
	    $.tm.event.load();
	    //document.getElementById(consts.commonName + 'contentBar').style.width = '240px';
		cache.dom.elem.style.overflow = 'hidden';
	    var self = this,
	          json = {
	             elem: consts.elemId,
	             attr: ['height', 0, 50, 'px'],
	             timer: 'fast',
	             atp: 'Line',
	             callback: function() { callback.success(); },
	             context: self
	          }	;
	    $.addAnimate(json);
	}
})(youdao);
