(function($){
    var m = $.ns('youdao.modules'), consts = $.require_module('youdao.consts'),
         cache = $.require_module('youdao.cache'),util = $.require_module('youdao.util');
    m.newFeatures = function(){
        if (cache.conf.flag && $.conf.features.length !== 0 ) {
            var showFeatures = function(num) {
                    var item = $.conf.features[num], dom = $.require_module('youdao.dom'), fDiv = cache.dom.body.append('div', { id: consts.commonName + 'features' },{ position: 'absolute', zIndex: '999999' });
                    elem = document.getElementById(consts.commonName + item);
                    
                   //当同款数目为0时，不触发新功能提示；同时将同款服饰按钮的原有事件恢复。
                    if( item === 'sameType' && ( !cache.data.sameType||!cache.data.sameType.sameTypeNum ||cache.data.sameType.sameTypeNum <= 0 )){
                    	var code = $.conf.features[++cache.conf.flag - 1];
            			$.tm.event[code] = $.tm.event.tmp;
            			$.tm.event.tmp();
                    	return ;
                    }
                    
                    cache.dom.fDiv = fDiv;
                    fDiv.flag = cache.conf.flag;
                    if (elem.className === 'noMore') {
                        var code = $.conf.features[cache.conf.flag - 1];
                        $.tm.event[code] = $.tm.event.tmp;
                        $.tm.event.tmp();
                        return;
                    }
                    if (cache.conf.ie !== 6) fDiv.style.position = 'fixed';
                    var elemP = dom.pageX(elem) , elemWidth = elem.offsetWidth , leftX, pageWidth = cache.dom.bodyWidth -10;                    
                    var attr = {
                        width: 282,
                        height: 'auto',
                        left: dom.pageX(elem) - elemWidth*2/3
                    };
                    attr.left = elemP + elemWidth/2 - attr.width/3 ;
                	leftX = elemWidth/3 -12;
                    if( elemP < attr.width ){
                    	attr.left = elemP + elemWidth/2 - attr.width/3 ;
                    	leftX = attr.width/3 -12;
                    }
                    if(elemP + attr.width > pageWidth ){
                    	attr.left = pageWidth - attr.width ;
                    	leftX = attr.width - ( pageWidth- (elemP+elemWidth/2))-12 ;
                    }
//                    console.log('left:'+attr.left);
//                    console.log('leftX:'+leftX );
                    if (!cache.conf.position || cache.conf.position === 'down') {
                    	attr.top = (cache.conf.ie === 6) ? cache.dom.top - attr.height - 2 : 'auto'; attr.bottom = 55;
                    }else { 
                    	attr.top = (cache.conf.ie === 6) ? cache.dom.top + 70 : 70; attr.bottom = 'auto'; 
                    }
                    for (var i in attr) {
                        if (attr[i] !== 'auto')
                            fDiv.style[i] = attr[i] + 'px';
                        else fDiv.style[i] = 'auto';
                    }
                    fDiv.className = 'features';
                    var str = $.tm.popo({leftX: leftX, type: 1}, $.tm.features.tmple);
                    fDiv.innerHTML = $.tmpl( str ,{info: tipWord[item]?tipWord[item]:tipWord['default']});
                    $.tm.features.event(fDiv);
                    
            };
            var tipWord = {
            	"sameType":['有道购物助手为您在淘宝找到:',(cache.data.sameType?(cache.data.sameType.sameTypeNum?cache.data.sameType.sameTypeNum:0):0)+'件 同款服饰','同款服饰','浏览淘宝服饰页面时自动为您查找淘宝同款。','http://zhushou.youdao.com/features?keyfrom=help'],
            	"default":['有道购物助手为您在淘宝找到:','XXX 同款服饰','XXXX','浏览淘宝服饰页面时自动为您查找淘宝同款。','http://zhushou.youdao.com/features?keyfrom=help'],
            };
            showFeatures(cache.conf.flag -1);
        };
    };
//    $.conf.action['110011'].push('youdao.modules.newFeatures');
    $.conf.action['111100'].push('youdao.modules.newFeatures');
})(youdao);
