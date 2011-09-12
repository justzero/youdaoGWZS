/**
 * youdao.event
 */
(function($){
    
    var event = {
        stopBubble: function(e) {
            if ( e && e.stopPropagation ){
                e.stopPropagation();
            }else{
                window.event.cancelBubble = true;
            }
        },
        stopDefault: function(e) { 
            if ( e && e.preventDefault ){ 
                e.preventDefault(); 
            }else{ 
                window.event.returnValue = false; 
            }
            return false; 
        },
        addEvent: function(elems, type, handle){
            if(elems.nodeType === 1 || elems.document){
                this._addEvent(elems, type, handle);
                return;
            }
            for(var i=0; i<elems.length; i++){
                this._addEvent(elems[i], type, handle);
            }
        },
        _addEvent: function(elem, type, handle){
            var _handle = (function(fn, ctx){
                return function(){
                    fn.apply(ctx, arguments);
                };
            })(handle, elem);
            if(elem.addEventListener){
                elem.addEventListener(type, _handle, false);
            }else if(elem.attachEvent){
                elem.attachEvent('on'+type, _handle);
            }
        }
    };
    
    $.extend('youdao.event', event);
    
})(youdao);



