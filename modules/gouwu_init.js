(function($) {
	var m = $.ns('youdao.modules'),
	cache = $.require_module('youdao.cache');
	cache.nosyn.gouwuInit = true;
	m.gouwuInit = function(callback) {
		var util = $.require_module('youdao.util'),
		consts = $.require_module('youdao.consts'),
		elem = cache.dom.elem,
		str = '',
		div = document.getElementById(consts.commonName + 'contentBar'),
		body = document.body;
		cache.nosyn.gouwuInit = true;
		for (var i in $.conf[cache.data.code])
		str += $.tm[$.conf[cache.data.code][i]] || '';
		if (cache.data.urlPriceList && cache.data.urlPriceList.length < cache.conf.showLen) cache.conf.showLen = cache.data.urlPriceList.length;
		var tmpData = cache.data.urlPriceList;
		if (tmpData && tmpData.length !== 0) {
			for (var i = 0; i < tmpData.length; i++)
			if (!tmpData[i].num) tmpData[i].num = 0;
		};
		var data = {
			data: cache.data,
			conf: cache.conf.position || 'down',
			taobao: cache.conf.taobao,
			name: consts.commonName,
			len: cache.conf.showLen,
			value: cache.conf.searchData
		};
		var features = $.conf.features;
		if (cache.conf.flag) {
			$.tm.event.tmp = $.tm.event[features[cache.conf.flag - 1]];
			$.tm.event[features[cache.conf.flag - 1]] = function() {};
		}
		div.innerHTML = $.tmpl(str, data);
		for (var i in $.conf[cache.data.code]) {
			var code = $.conf[cache.data.code][i],
			fn = $.tm.event[code];
			if (fn && util.isFunction(fn)) {
				/*if (!cache.conf.flag || features[cache.conf.flag-1] !== code) */
				fn();
			}
		}

		elem.style.opacity = 1;
		elem.style.fiter = 'alpha(opacity=100)';
		cache.dom.contentWidth = div.offsetWidth;
		elem.style.overflow = 'hidden';
		document.getElementById(consts.commonName + 'close').style.display = 'block';
		json = {
			elem: cache.dom.elem.id,
			attr: ['height', 0, 50, 'px'],
			timer: 'fast',
			atp: 'Line',
			context: this,
			callback: function() {
				//div.style.overflow = 'visible';
				cache.dom.elem.style.overflow = 'visible';
				callback.success();
			}
		};
		$.addAnimate(json);
		if ((fn = $.tm.event.up[cache.data.code]) && util.isFunction(fn)) fn();
	};
})(youdao);

