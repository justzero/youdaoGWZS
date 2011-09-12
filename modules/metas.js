(function($) {
	var m = $.ns('youdao.modules');	
	m.metas = function() {
		var cache = $.require_module('youdao.cache');
		var util = $.require_module('youdao.util');
		
		var elems = document.getElementsByTagName('meta'),
			metas = {}, key, _host = window.location.hostname;
		for (var i=0, len=elems.length; i<len; i++) {
			key = elems[i].name;
			if (!util.isString(key)) continue;
			key = key.toLowerCase();
			metas[key] = '' + elems[i].getAttribute('content');
			if (key === 'keywords' && /(taobao\.com)|(tmall\.com)/.test(_host)) {
				var tmp = getTaobaoInfo();
				if (tmp !== '') metas[key] = tmp;
				cache.conf.taobao = true;
			};
		};
		for (i in metas) cache.conf[i] = metas[i];
		function getTaobaoInfo() {
			var o = document.getElementById('attributes');
	        if(!o) return '';
	        var htmlstr = o.innerHTML || '';
	        var isbn = htmlstr.match(/ISBN[^<]+?(\d+)/); 
	        if (isbn) return '@ISBN='+isbn[1] ;
	        var ret='';
	        var name=htmlstr.match(/名称[^\"][^<]+/); ; 
	        if (name ) ret=name;
	        var brand=htmlstr.match(/品牌[^\"][^<]+/); 
	        if (brand ) ret+=' '+brand;
	        var model=htmlstr.match(/型号[^\"][^<]+/);
	        if (model ) ret+=' '+model;
	        ret=ret.replace('&nbsp;',' ').replace('&nbsp;',' ').replace('&nbsp;',' ');
	        return ret;
		};
	};
	$.conf.init.push('youdao.modules.metas');
})(youdao);
