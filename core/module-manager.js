/**
 * 模块管理器
 */
(function($){
    
    var $m = $.ns('youdao.module_manager');
    var $u = $.require_module('youdao.util');

    var regedModList = [],
        _sendModEvent = function(msg){return false;},
        _receiveModEvent = function(evt){return false;};
    
    $m.regMods = function(mods){
        if(!$u.isArray(mods)) return false;
        for(var i=0, l=mods.length; i<l; i++){
            this.regMod(mods[i]);
        }
    };
    
    $m.regMod = function(mod){
        if(!!!mod.sendModEvent){
            mod.sendModEvent = _sendModEvent;
        }
        if(!!!mod.receiveModEvent){
            mod.receiveModEvent = _receiveModEvent;
        }
        
        regedModList.push(mod);
    };
    
    $m.disp = function(evt){
        for(var i=0, l=regedModList.length; i<l; i++){
            regedModList[i].receiveModEvent(evt);
        }
    };
    
})(youdao);