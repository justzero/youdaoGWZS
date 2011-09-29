(function($) {
	var m = $.ns('youdao.modules'),
	cache = $.require_module('youdao.cache'),
	consts = $.require_module('youdao.consts'),
	util = $.require_module('youdao.util');
	m.gouwuLog = function() {
		if (cache.conf.test && !cache.localConf.log) return; //test return
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
                browser: cache.localConf.browser || cache.conf.browser,
				version: cache.conf.version,
				vendor: cache.conf.vendor,
				cateGory: cache.conf.cateGory,
			};
			
			if (elem.tagName === 'INPUT' && elem.getAttribute('type') === 'submit' && json.toSite === "none") {
				if (json.toSite === 'none') return true;
				else elem.removeAttribute('href');
			}
			if (elem.className === 'non' || elem.className === 'noMore') {
				return true;
			}
			
			var params , parameters = elem.getAttribute('params') || 'no-parameters' ;
			if( parameters === 'no-parameters' ){
				params = util.comboParams(json) ;
			}else{
				params = util.comboParams(json) + '&'+parameters ;
			}
			
			img.src = consts.logUrl + '?' + params ;
			return true;
		};
		/*** �ݹ�ڵ� ***/
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

