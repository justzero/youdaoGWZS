(function($) {
	var img = new Image() ;
	var logUtil={
		sendLog:function(action, elem) {
			var cache = $.require_module('youdao.cache'),
			consts = $.require_module('youdao.consts'),
			util = $.require_module('youdao.util');
			if (cache.conf.test && !cache.localConf.log) return; //test return
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
				cateGory: cache.conf.cateGory
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
				params = util.comboParams(json) + parameters ;
			}
			
			img.src = consts.logUrl + '?' + params ;
			return true;
		}
	};
	$.extend('youdao.logUtil', logUtil);
})(youdao);

