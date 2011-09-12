// 当插件条渲染好之后，调用该模块，实现后续动作
(function($){
    var m = $.ns('youdao.modules'),
         cache = $.require_module('youdao.cache');
         cache.nosyn.gouwuExperience = true;
    m.gouwuExperience = function(callback){
        $.runNoSyn($.conf.action[cache.data.code]);
		callback.success();
    };
})(youdao);
//test
