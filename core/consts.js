/**
 * youdao.setting
 * 系统常量配置
 */
(function($) {

	var consts = {
		ajaxTimeout: 5,
		codeOfs: 88,
		baseUrl: "http://zhushou.corp.youdao.com/",
		updateUrl: "http://zhushou.corp.youdao.com/",
		logUrl: "http://zhushou.corp.youdao.com/log",
		logType: "ARMANI_EXTENSION_ACTION",
		mmUrl: "http://www.360buy.com/product/140007.html",
		pageUrl: location.href,
		elemId: "youdaoGWZS",
		optionsID: "youdaoGWZS_options",
		serUrl: "productSense",
		updateSer: "productSense",
		baseCss: "http://zhushou.corp.youdao.com/css/",
		commonCssName: "extension_2_0_",
		commonName: "gouwu_",
		showTime: .2,
		baseUrl_test: "./server/",
		serUrl_test: "data6.js",
		baseCss_test: "./css/",
		commonCssName_test: ""
	};

	$.extend('youdao.consts', consts);
})(youdao);

