(function($) {
	var m = $.ns('youdao.modules'),
	cache = $.require_module('youdao.cache');
	cache.nosyn.cssLink = true;
	m.cssLink = function(callback) {
		var dom = $.require_module('youdao.dom'),
		css = document.createElement('link');
		css.type = 'text/css';
		css.rel = 'stylesheet';
		if (!cache.conf.backCompat){
		    css.href = consts.baseCss + consts.commonCssName + cache.conf.browser + '.css';
			if (cache.conf.ie === 6)
		    css.href = consts.baseCss + consts.commonCssName + cache.conf.browser + '_6.css';
		} else
			css.href = consts.baseCss + consts.commonCssName + 'ie_bc.css';
		document.getElementsByTagName('head')[0].appendChild(css);
		var div = document.createElement('div');
		div.className = 'youdaoGWZSTestCss';
		document.body.appendChild(div);
		var CSSload = function(link, callback) {
			var cssLoaded = false;
			try {
				if (dom.getStyle(div, 'height') === '1px') {
					cssLoaded = true;
				}
			}
			catch(ex) {}
			if (cssLoaded) {
				callback();
			} else {
				setTimeout(function() {
					CSSload(link, callback);
				},
				100);
			}
		};
		//if (!cache.conf.backCompat)
		    CSSload(css, callback.success);
		//else
		//	alert('this is a bad page!');
		document.getElementById('testBt').innerHTML = 'css Link href : ' + css.href;
	};
})(youdao);

