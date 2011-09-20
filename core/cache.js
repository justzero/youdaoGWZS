(function($){		
    var cache = {};                        
	cache.conf = {    
		browser : 'chrome',
		version : '2.0',
		apiVersion : '2.0',
		vendor : 'youdao',
		position: 'down',  //up & down
		flag: 0 ,// 0: no-show features; 1: show
		showLen: 3,
		searchData: '请输入想查找的商品',
		taobao: false,
		title: document.title,
		cateGory: 'wu',
		product: 'product'
		};
	cache.dom = {
	    body: document.body,
	    elem: document.body
	};
	cache.animate = {};
	cache.nosyn = {};
	$.extend('youdao.cache', cache);
})(youdao);
    
