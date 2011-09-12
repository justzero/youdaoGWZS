/**
 * 该文件在所有js文件之前引入
 */
(function() {

    // 定义顶层命名空间
    var $ = youdao = window.youdao || {};
    
    $.ns = function(namespace, context){
        var parent = (context == null) ? window : context;
        var arr = namespace.split('.');
        for (var i = 0; i < arr.length; i++) {
            if (!!!parent[arr[i]]) {
                parent[arr[i]] = {};
            }
            parent = parent[arr[i]];
        }
        return parent;
    };
    
    $.require_module = function(namespace, context){
        var parent = (context == null) ? window : context;
        var arr = namespace.split('.');
        for (var i = 0; i < arr.length; i++) {
            if (!!!parent[arr[i]]) {
                throw new Error("required module not found: " + namespace);
            }
            parent = parent[arr[i]];
        }
        return parent;
    };
    
    $.extend = function(namespace, obj){
        if(!obj) return;
        var _ns = $.ns(namespace);
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                _ns[key] = obj[key];
            }
        }
        return _ns;
    };

})();