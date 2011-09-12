/**
 * youdao.setting
 * 系统常量配置
 */
(function($){

    var consts = {
        ajaxTimeout: 5,
        codeOfs: 88,
        baseUrl : 'http://tb096x.corp.youdao.com:9527/',
		updateUrl : 'http://e.gouwu.youdao.com/', // update地址
		logUrl : 'http://e.gouwu.youdao.com/log',
		logType : 'ARMANI_EXTENSION_ACTION',
        baseUrl_test : 'http://localhost:8080/',
        mmUrl : 'http://www.360buy.com/product/140007.html',
		pageUrl : location.href,
        elemId : 'youdaoGWZS',
		optionsID : 'youdaoGWZS_options', //与插件交互的spanID
        serUrl : 'productSense',
        updateSer: 'productSense',
        serUrl_test: 'gouwutest/index.php',
		baseCss: 'http://192.168.4.41/gouwu/css/',
		commonCssName: 'extension_2_0_',
		baseCss_test: 'http://127.0.0.1:8080/css/',
		commonCssName_test: '',
        commonName : 'gouwu_', //common id head
        showTime : 0.2
    };

    
    $.extend('youdao.consts', consts);
})(youdao);
