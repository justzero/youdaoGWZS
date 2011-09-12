/**
 * youdao.dom
 */
(function($){
    
    var $u = $.require_module('youdao.util');
    
    var dom = {
        addClass: function(elem, classNames){
            if(elem.nodeType !== 1) return false;
            var cn1 = elem.className?$u.trim(elem.className).split(/\s+/g):[],
                cn2 = $u.trim(classNames).split(/\s+/g),
                noin = true;
            for(var i=0; i<cn2.length; i++){
                if(!this.hasClass(elem, cn2[i])){
                    cn1.push(cn2[i]);
                }
            }
            elem.className = cn1.join(' ');
        },
        removeClass: function(elem, classNames){
            if(elem.nodeType !== 1) return false;
            var cn1 = $u.trim(elem.className),
                cn2 = $u.trim(classNames).split(/\s+/g);
            for(var i=0; i<cn2.length; i++){
                if(!this.hasClass(elem, cn2[i])) continue;
                cn1 = cn1.replace(cn2[i], ' ');
            }
            elem.className = $u.trim(cn1);
        },
        hasClass: function(elem, className){
            if(elem.nodeType !== 1) return false;
            if((' '+elem.className+' ').indexOf(' '+className+' ') === -1){
                return false;
            }
            return true;
        },
        // 两个参数时： function(className, rootContext)
        getElementsByClass: function(className, tagName, rootContext){
            var cn = className, tag = tagName || '*', context = rootContext || document;
            if(arguments.length === 2){
                context = tagName || document;
                tag = '*';
            }
            var tagNodes = context.getElementsByTagName(tag),
                nodesArr = [];
            for(var i=0, l=tagNodes.length; i<l; i++){
                if(this.hasClass(tagNodes[i], cn)){
                    nodesArr.push(tagNodes[i]);
                }
            }
            return nodesArr;
        },
        getStyle: function (elem, attr){
            if(elem.attr){
                return elem.style[attr];
            }else if(elem.currentStyle){
                return elem.currentStyle[attr];
            }else if(document.defaultView && document.defaultView.getComputedStyle){
                attr=attr.replace(/([A-Z])/g,'-$1').toLowerCase();
                return document.defaultView.getComputedStyle(elem,null).getPropertyValue(attr);
            }else{
                return '';
            }
        },
        outWidth: function(el){
            var pa = ['marginLeft','paddingLeft','width','paddingRight','marginRight'],
                sum = 0;
            for(var i=0; i<pa.length;i++){
                sum += parseInt(this.getStyle(el, pa[i]), 10);
            }
            
            return sum;
        },
        outHeight: function(el){
            var pa = ['marginTop','paddingTot','height','paddingBottom','marginBottom'],
                sum = 0;
            for(var i=0; i<pa.length;i++){
                sum += parseInt(this.getStyle(el, pa[i]), 10);
            }
            
            return sum;
        },
        pageX: function (elem) {
            return elem.offsetParent ? elem.offsetLeft + dom.pageX(elem.offsetParent) : elem.offsetLeft;
        },
        pageY: function (elem) {
          return elem.offsetParent ? elem.offsetTop + dom.pageY(elem.offsetParent) : elem.offsetTop;
        },
        builderFragment: function(htmlStr, callback) {
            var div = document.createElement('div'),
                frag = document.createDocumentFragment();
            div.innerHTML = htmlStr;
            (function() {
                if (div.firstChild) {
                    frag.appendChild(div.firstChild);
                    setTimeout(arguments.callee, 0);
                } else {
                    if(youdao.isFunction(callback)){
                        callback(frag);
                    }
                }
            })();
        },
        append: function(tag, att, css, html) {
            // 须将方法绑定到元素上才可使用
            var object = document.createElement(tag); 
            for( var i in att) object[i] = att[i]; 
            for( var i in css) object.style[i] = css[i]; 
            if (html) object.innerHTML = html;
            this.appendChild(object); 
            object.append = dom.append; 
            return object; 
        }
    };
    
    $.extend('youdao.dom', dom);
    
})(youdao);



