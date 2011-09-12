(function($) {
	var m = $.ns('youdao.modules'),
	cache = $.require_module('youdao.cache'),
	consts = $.require_module('youdao.consts');
	cache.nosyn.updatePrice = true;
	m.updatePrice = function(callback) {
		consts.baseUrl = consts.updateUrl;
		var data = cache.data.urlPriceList,

		qPrice = function(list) {
			var len = list.length,
			arr = [];
			for (var i = 0; i < len; i++) {
				var price = data[list[i]],
				l = price.items.length;
				while (price.num < l && ! price.items[price.num].available)++price.num;
				if (price.num >= l) {
					price.html = '缺货';
					price.available = "false";
					price.num = 0;
				} else {
					if (price.items[price.num].available && price.items[price.num].newPrice) price.html = price.items[price.num].newPrice + '元';
					else arr.push(list[i]);
				}
			}
			if (arr.length !== 0) priceUpdate(arr);
			else show(function() {
				document.getElementById(consts.commonName + 'priceData').innerHTML = $.tmpl($.tm.onePrice, {
					data: cache.data,
					name: consts.commonName,
					len: cache.conf.showLen
				});
				$.tm.event.priceData();
			});
		},

		priceUpdate = function(list) {
			var arr = [],
			tmp = {};
			for (var i = 0, len = list.length; i < len; i++) {
				var price = data[list[i]];
				tmp[price.items[price.num].cpsUrl] = list[i];
				price.items[price.num].newPrice = price.items[price.num].price;
				arr.push(price.items[price.num].cpsUrl);
			}
			$.ajax({
				url: consts.updateSer,
				params: {
					t: new Date().getTime(),
					updatePrice: true,
					urls: arr.join('|@|')
				},
				context: this,
				success: function(json) {
					$.ajax({
						url: consts.updateSer,
						params: {
							t: new Date().getTime(),
							updatePrice: true,
							urls: arr.join('|@|')
						},
						context: this,
						success: function(json) {
							for (var key in json) {
								var p = data[tmp[key]];
								if (p.items[p.num].price !== json[key].price || p.items[p.num].available !== json[key].avb) {
									p.items[p.num].priceUpDate = true;
									p.priceUpDate = true;
								}
								p.items[p.num].available = json[key].avb;
								p.items[p.num].price = p.items[p.num].newPrice = json[key].price;
							}
							qPrice(list);
							callback.success();
						},
						error: function() {
							if (callback.error) callback.error();
						}
					});
				},
				error: function() {
					if (callback.error) callback.error();
				}
			});
		},
		show = function(fn) {
			var x = (cache.conf.position === 'up') ? - 1: 1;
			var json = {
				elem: consts.commonName + 'priceData',
				attr: ['top', 0, 50 * x, 'px'],
				timer: 'fast',
				atp: 'Line',
				context: this,
				callback: function() {
					fn();
					$.addAnimate({
						elem: consts.commonName + 'priceData',
						attr: ['top', 50 * x, 0, 'px'],
						timer: 'fast',
						atp: 'Back',
						context: this,
						callback: function() {
							$.tm.lowPriceResize();
							$.event.addEvent(window, 'resize', function() {
								youdao.tm.lowPriceResize();
							});

						}
					});
				}
			};
			$.addAnimate(json);
		};
		var arrS = [];
		for (var i = 0; i < cache.conf.showLen; i++) arrS.push(i);
		qPrice(arrS);
	};
	if (!cache.localConf || ! cache.localConf.update || cache.localConf.update !== 'false') $.conf.action['110011'].push('youdao.modules.updatePrice');
})(youdao);

