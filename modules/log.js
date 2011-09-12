(function($) {
	var m = $.ns('youdao.modules'),
	cache = $.require_module('youdao.cache'),
	consts = $.require_module('youdao.consts'),
	util = $.require_module('youdao.util');
	m.gouwuLog = function() {
		if (cache.conf.test) return; //test return
		var img = new Image();
		/*** set log ***/
		var sendLog = function(action, elem) {
			var json = {
				type: consts.logType,
				action: action,
				fromSite: consts.pageUrl,
				toSite: elem.getAttribute('href') || 'none',
				product: cache.conf.product,
				position: elem.getAttribute('ps') || 'no-position',
				'@browserType': cache.conf.browser,
				version: cache.conf.version,
				vendor: cache.conf.vendor,
				'@priceUpdated': elem.getAttribute('updated') || 'no-update',
				cateGory: cache.conf.cateGory
			};
			if (elem.tagName === 'INPUT' && elem.getAttribute('type') === 'submit' && json.toSite === "none") {
				if (json.toSite === 'none') return true;
				else elem.removeAttribute('href');
			}
			if (elem.className === 'non' || elem.className === 'noMore') {
				return true;
			}
			img.src = consts.logUrl + '?' + util.comboParams(json);
			console.log(img.src);
			return true;
		};
		/*** µÝ¹é½Úµã ***/
		var startLog = function(type, elem) {
			if (!elem.tagName || ! elem) return;
			var action = elem.getAttribute(type);
			if (action) {
				sendLog(action, elem);
			};
			startLog(type, elem.parentNode);
		};
		/*** addEvent ***/
		$.event.addEvent(window, 'click', function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			startLog('clkAction', target);
		});
		$.event.addEvent(cache.dom.elem, 'mouseover', function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			startLog('hoverAction', target);
		});
	};
})(youdao);

