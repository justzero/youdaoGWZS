/**
 * youdao.ajax
 */
(function($){
    
    var $u = $.require_module('youdao.util');
    var $consts = $.require_module('youdao.consts');

    // conf{url: 'script url', params:{}, context: ctx, success: fn, error: fn}
    $.ajax = function(conf){
        var jsonpCallback = 'youdaogouwupi'+(+new Date),
            params = conf.params || {};
        params['jsonp'] = jsonpCallback;
        
        var timerHandler = null;
        
        window[jsonpCallback] = function(json){
            window.clearTimeout(timerHandler);
            if(json === null){
                if($u.isFunction(conf.error)){
                    conf.error.call(conf.context);
                }
            }else{
                if($u.isFunction(conf.success)){
                    conf.success.call(conf.context, json);
                }
            }
        };
        // use script tag send a request, imitate ajax
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = $consts.baseUrl+conf.url+'?'+$u.comboParams(params);
        script.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(script);
        
        // timing starts
        var timeoutHandler = function(){
            //console.log('sorry! is time out '+constant.timeout);
            window[jsonpCallback] = function(){};
            if($u.isFunction(conf.error)){
                conf.error.call(conf.context);
            }
        };
        timerHandler = window.setTimeout(timeoutHandler, $consts.ajaxTimeout*1000);
    };
    
})(youdao);