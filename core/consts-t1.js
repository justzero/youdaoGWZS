/**
 * youdao.setting
 * 系统常量配置
 */
(function($) {

	var consts = {
		ajaxTimeout: 5,
		codeOfs: 88,
		baseUrl: "http://e.gouwu.youdao.com/",
		updateUrl: "http://e.gouwu.youdao.com/",
		logUrl: "http://e.gouwu.youdao.com/log",
		logType: "ARMANI_EXTENSION_ACTION",
		mmUrl: "http://www.360buy.com/product/140007.html",
		pageUrl: location.href,
		elemId: "youdaoGWZS",
		optionsID: "youdaoGWZS_options",
		serUrl: "productSense",
		updateSer: "productSense",
		baseCss: "http://192.168.4.41/gouwu/css/",
		commonCssName: "extension_2_0_",
		commonName: "gouwu_",
		showTime: .2,
		baseUrl_test: "http://e.gouwu.youdao.com/",
		serUrl_test: "productSense",
		baseCss_test:  "http://192.168.4.41/gouwu/css/",
		commonCssName_test: "extension_2_0_"
	};

	$.extend('youdao.consts', consts);
})(youdao);

