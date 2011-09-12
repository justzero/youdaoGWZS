(function($){
    
    var $u = $.require_module('youdao.util'),
        cache = $.require_module('youdao.cache');

    $.run = function(mods, callback, ctx){
        //console.log(mods);
        if($u.isArray(mods)){
            runMods(mods, callback, ctx);
        }else if($u.isString(mods)){
            runMod(mods, callback, ctx);
        }
    };
    
    $.runNoSyn = function(mods) {
        if($u.isArray(mods)){
            var mod, name, mod_list=[ ];
            for (var i=0, len=mods.length; i != len; i++) {
                mod = mods.pop();
                name = $u.getModName(mod);
                if (!cache.nosyn[name]) { mod_list.push(mod);}
                else {
                    $.conf[name] = {};
                    //console.log(mod_list, mod, mod_list.length);
                    $.conf[name].success = (mod_list.length > 1) ? mod_list.reverse() : mod_list;
                    //console.log(name, $.conf[name].success);
                    mod_list = [mod];
                }
            }
            $.run(mod_list.reverse());
        };
    };
    
    $.setCallback = function(key, callbackObj){
        $.conf[$u.getModName(key)] = callbackObj;
    };
    
    function runMod(modNS, callback, ctx){
        var mod = $.require_module(modNS);
        //console.log('mod : ',mod);
        if($u.isArray(mod) && mod.length !== 0){
        	runMods(mod, callback, ctx);
        	return;
        }
        
        if($u.isFunction(mod)){
            var name = $u.getModName(modNS),cb={};
            
            if ($.conf[name]) {
                for (var i in $.conf[name])
                    cb[i] = function() {
                        $.run($.conf[name][i]);
                    }
                mod(cb);
            } else mod();
        }
        if($u.isFunction(callback)){
            callback.apply(ctx);
        }
    }
    
    function runMods(mods, callback, ctx){
    	//console.log(mods, callback);
        for(var i=0, len = mods.length; i<len; i++){

            if(i === len-1){
                runMod(mods[i], callback, ctx);
            }else{
                runMod(mods[i]);
            }
        }
    }
    
})(youdao);
