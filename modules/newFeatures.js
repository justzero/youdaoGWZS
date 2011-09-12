(function($){
    var m = $.ns('youdao.modules'), consts = $.require_module('youdao.consts'),
         cache = $.require_module('youdao.cache');
    m.newFeatures = function(){
        if (cache.conf.flag && $.conf.features.length !== 0 ) {
            var showFeatures = function(num) {
                    var item = $.conf.features[num], dom = $.require_module('youdao.dom'), fDiv = cache.dom.body.append('div', { id: consts.commonName + 'features' },{ position: 'absolute' });
                    elem = document.getElementById(consts.commonName + item);
                    cache.dom.fDiv = fDiv;
                    fDiv.flag = cache.conf.flag;
                    if (elem.className === 'noMore') {
                        var code = $.conf.features[cache.conf.flag - 1];
                        $.tm.event[code] = $.tm.event.tmp;
                        $.tm.event.tmp();
                        return;
                    }
                    if (cache.conf.ie !== 6) fDiv.style.position = 'fixed';
                    var attr = {
                        width: 300,
                        height: 'auto',
                        left: dom.pageX(elem)
                    };
                    if (!cache.conf.position || cache.conf.position === 'down') { attr.top = (cache.conf.ie === 6) ? cache.dom.top - attr.height - 2 : 'auto'; attr.bottom = 55; }
                    else { attr.top = (cache.conf.ie === 6) ? cache.dom.top + 55 : 55; attr.bottom = 'auto'; }
                    for (var i in attr) {
                        if (attr[i] !== 'auto')
                            fDiv.style[i] = attr[i] + 'px';
                        else fDiv.style[i] = 'auto';
                    }
                    fDiv.className = 'features';
                    var str = $.tm.popo({leftX: 20, type: 1}, $.tm.features.tmple);
                    fDiv.innerHTML = $.tmpl( str ,{info: ['有道购物助手为您找到更低报价:<br/><span style="color: #cc0033; font-weight: bold;">' + cache.data.urlPriceList[0].siteName+ ' - ' + cache.data.urlPriceList[0].items[0].price + '元</span>'
                                                        , '<span style="color: #cc0033; font-weight: bold;">比价</span>','XXXX']});
                    $.tm.features.event(fDiv);
            };
            showFeatures(cache.conf.flag -1);
        };
    };
    $.conf.action['110011'].push('youdao.modules.newFeatures');
})(youdao);
