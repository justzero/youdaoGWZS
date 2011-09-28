(function($) {
	var m = $.ns('youdao.modules'),
	cache = $.require_module('youdao.cache'),
	consts = $.require_module('youdao.consts');
	cache.nosyn.updateSameType = true;
	m.updateSameType = function(callback) {
		

		show = function(fn) {
			var x = (cache.conf.position === 'up') ? - 1: 1;
			var json = {
				elem: consts.commonName + 'sameType',
				attr: ['top', 0, 50 * x, 'px'],
				timer: 'fast',
				atp: 'Line',
				context: this,
				callback: function() {
					fn();
					$.addAnimate({
						elem: consts.commonName + 'sameType',
						attr: ['top', 50 * x, 0, 'px'],
						timer: 'fast',
						atp: 'Back',
						context: this,
						callback: function() {
							$.tm.sameTypeTip('block');
							$.event.addEvent(window, 'resize', function() {
								youdao.tm.sameTypeTip('block');
							});

						}
					});
				}
			};
			$.addAnimate(json);
		};
		
//		show(function() {
//			$.tm.event.sameType();
//		});
		$.tm.sameTypeTip('block');
		$.event.addEvent(window, 'resize', function() {
			youdao.tm.sameTypeTip('block');
		});
	};
	if (!cache.localConf || ! cache.localConf.update || cache.localConf.update !== 'false') {
		$.conf.action['111100'].push('youdao.modules.updateSameType');
	}
})(youdao);

