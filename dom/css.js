(function($) {
	var m = $.ns('youdao.modules'),
	consts = $.require_module('youdao.consts'),
	cache = $.require_module('youdao.cache');
	m.css = function() {
		var cache = $.require_module('youdao.cache');
		cache.dom.elem.append = $.dom.append;
		var elem = cache.dom.elem.append('div', {
			id: consts.elemId,
			className: cache.conf.position
		},
		{},
		''),
		showDiv = cache.dom.elem.append('div', {
			id: consts.elemId + 'Show'
		},
		{},
		'');
		cache.dom.elem = elem;
		cache.dom.show = showDiv;
		var positionWrapCtn = function() {
			if (cache.conf.position === 'down') {
				if (cache.conf.ie !== 6) cache.dom.bottom = 0 - document.body.scrollTop;
				else cache.dom.bottom = (cache.dom.bottom) ? 0: 1;
				cache.dom.elem.style.top = 'auto';
				cache.dom.elem.style.bottom = cache.dom.bottom + 'px';
				if (cache.dom.show.style.display === 'block') {
					cache.dom.show.style.bottom = (cache.conf.backCompat) ? (cache.dom.bottom + 50) + 'px': (cache.dom.bottom + 60) + 'px';
					cache.dom.show.style.top = 'auto';
				}
			} else {
				if (cache.conf.ie !== 6) cache.dom.top = document.body.scrollTop;
				else cache.dom.top = document.documentElement.scrollTop;
				cache.dom.elem.style.top = cache.dom.top + 'px';
				cache.dom.bottom = 'auto';
				if (cache.dom.show.style.display === 'block') {
					cache.dom.show.style.top = (cache.conf.backCompat) ? (cache.dom.top + 50) + 'px': (cache.dom.top + 60) + 'px';
					cache.dom.show.style.bottom = 'auto';
				}
			}
		};
		if (cache.conf.ie === 6 || cache.conf.backCompat) {
			positionWrapCtn();
			$.event.addEvent(window, 'scroll', function(event) {
				positionWrapCtn();
			});
			$.event.addEvent(window, 'resize', function(event) {
				positionWrapCtn();
			});
		} else {
			cache.dom.elem.style.position = 'fixed';
			cache.dom.show.style.position = 'fixed';
		}
	};
})(youdao);

