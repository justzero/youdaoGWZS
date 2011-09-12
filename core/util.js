/**
 * youdao.util
 */
(function($) {

	var toStr = Object.prototype.toString;

	var util = {
		mode: document.compatMode,
		isString: function(str) {
			return toStr.call(str) === "[object String]";
		},
		isFunction: function(fn) {
			return toStr.call(fn) === "[object Function]";
		},
		isArray: function(arr) {
			return toStr.call(arr) === "[object Array]";
		},
		isEmptyObject: function(obj) {
			for (var k in obj) {
				if (obj.hasOwnProperty(k)) return false;
			}
			return true;
		},
		trim: function(text) {
			return (text || "").replace(/^\s+|\s+$/g, "");
		},
		jsonToStr: function(oParam, x) {
			var pa = [];
			if (!x) var x = '&';
			for (var k in oParam) {
				if (!oParam.hasOwnProperty(k)) continue;
				pa.push(k + '=' + oParam[k]);
			}
			return pa.join(x);
		},
		comboParams: function(oParam) {
			var pa = [];
			for (var k in oParam) {
				if (!oParam.hasOwnProperty(k)) continue;
				pa.push(k + '=' + encodeURIComponent(oParam[k]));
			}
			pa.push('t=' + ( + new Date));
			return pa.join('&');
		},
		getModName: function(modNS) {
			if (util.isString(modNS)) {
				var name_list = modNS.split('.');
				return name_list[name_list.length - 1];
			}
		},
		urlToJson: function(url, x) {
			var obj = {},
			options = url;
			if (!x) x = '&';
			options = options.replace(/^[?]{1}|[#]{1}$/g, '').split(x);
			for (var i = 0, len = options.length; i < len; i++) {
				var e = options[i].split('=');
				if (e[0].length === 0) continue;
				obj[e[0]] = e.length === 1 ? '': e[1];
			}
			return obj;
		}
	};

	$.extend('youdao.util', util);

})(youdao);

