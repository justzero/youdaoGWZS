(function($) { 
    $.ctrl = {
        attr: ['top', 'right', 'bottom', 'left'],
        setAttr: function(json, html, fn) {
            var cache = $.require_module('youdao.cache'),
            div = cache.dom.show;
            if ((json.left + json.width + 10) > cache.dom.bodyWidth)
                json.left = cache.dom.bodyWidth - json.width - 10;
			if (div.className === json.css && div.style.left === json.left + 'px') {
            	this.cleanTime();
				return;
			};
			this.cleanTime();
            this.clean();
            for (var i in json) {
               if (i === 'css') {
                   div.className = json[i];
                   continue;
               }
               if (json[i] !== 'auto')
                    div.style[i] = json[i] + 'px';
               else div.style[i] = 'auto';
            }
			if (cache.conf.position === 'up') {
				div.style.top = (cache.conf.ie === 6 || cache.conf.backCompat) ? cache.dom.top + 50 + 'px' : '50px';
				if (cache.conf.ie === 6 && !cache.conf.backCompat) div.style.top = cache.dom.top + 60 + 'px';
				div.style.bottom = 'auto';
			} else {
				div.style.bottom = (cache.conf.ie === 6 || cache.conf.backCompat) ? cache.dom.bottom + 50 + 'px' : '50px';
				if (cache.conf.ie === 6 && !cache.conf.backCompat) div.style.bottom = cache.dom.bottom + 60 + 'px';
				div.style.top = 'auto';
			}
            div.innerHTML = html;
			if (div.style.display === 'none'){
				div.style.display = 'block';
				var options = {
					elem: div.id,
					attr: ['fade', 0, 100, 'px'],
					timer: 'fast',
					atp: 'Line',
					context: this,
					callback: function(){}
				};
				if (cache.conf.ie !== 6) $.addAnimate(options);
			};
            if (fn) fn();
        },
        delayClean: function(timer, fn) {
            var util = $.require_module('youdao.util');
            if (fn && util.isFunction(fn))
                this.timeId = setTimeout(function() { fn(); $.ctrl.clean(); }, timer);
            else 
                this.timeId = setTimeout($.ctrl.clean, timer);
        },
        cleanTime: function() {
            if (this.timeId) {
                //console.log('11');
                clearTimeout(this.timeId);
                this.timeId = '';
            };
        },
        clean: function( ) {
            var cache = $.require_module('youdao.cache'),
            consts = $.require_module('youdao.consts'),
            name = consts.commonName,
            div = cache.dom.show;
			if (div.className === "youdaoGWZSdouban") var tmpE = document.getElementById(name + 'douban');
			else var tmpE = document.getElementById(name + div.className);
			if (tmpE && tmpE.className === 'enter') tmpE.className = '';
            //div.innerHTML = '';
			if (!cache.localConf || !cache.localConf.popofade || cache.localConf.popofade !== "false") {
            	div.className = '';
				div.style.display = 'none';
			};
        },
        timeId: ''
    };
})(youdao);

/// 需要修改，没有elem注册
