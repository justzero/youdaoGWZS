(function($) {
	var modules = $.ns('youdao.modules'),
	cache = $.require_module('youdao.cache');
	cache.nosyn.RequestPriceInfo = true;
	modules.RequestPriceInfo = function(callback) {
		var cache = $.require_module('youdao.cache'),
		consts = $.require_module('youdao.consts'),
		code = $.require_module('youdao.code'),
		conf = cache.conf,
		self = this,
		o = ['t=' + conf.title, 'k=' + conf['keywords'], 'd=' + conf['description']],
		k = code.encrypt(o.join('^&'), 4, false),
		u = code.encrypt(consts.pageUrl, 2, true),
		l = 1900 - u.length;
		k = (k.length > l) ? k.substr(0, l) : k;
		//console.log(callback, $.conf);
		var json = {
			url: consts.serUrl,
			params: {
				'browser': cache.localConf.browser || conf.browser,
				'version': conf.version,
				'vendor': conf.vendor,
				'av': conf.apiVersion,
				m: u,
				k: k
			},
			context: self,
			success: function(json) {
				cache.data = json;
				callback.success();
			},
			error: function() {
				cache.data = {
					code: '110000'
				};
				callback.success();
			}
		};
		if (cache.conf.test === 2) json.params = {
			'mmurl': consts.mmUrl
		};
		if (cache.conf.test === 1 && cache.localConf.filename) json.params = {
			filename: cache.localConf.filename
		};
		$.ajax(json);
	};

})(youdao);

