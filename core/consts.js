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
		baseCss: "http://e.gouwu.youdao.com/css/",
		commonCssName: "extension_2_0_",
		commonName: "gouwu_",
		showTime: .2,
		baseUrl_test: "http://localhost:8080/",
		serUrl_test: "gouwutest/index.php",
		baseCss_test: "http://localhost:8080/css/",
		commonCssName_test: ""
	};

	$.extend('youdao.consts', consts);
})(youdao);

