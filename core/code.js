(function($) {
	
	var cs = $.require_module('youdao.consts');
	var util = $.require_module('youdao.util');
	
	var code = {
	    zero: ['0','00','000','0000','00000','000000','0000000','00000000'],
	    strReverse: function(str){
	        var r = [];
	        for(var i=0, l=str.length; i<l; i++){
	            r[r.length] = str.charAt(i);    
	        }
	        return r.reverse().join('');
	    },
	    encrypt: function(srcStr, m, rvt){
	        if(!util.isString(srcStr)) return '';
	        var uca = [];
	        for(var i=0, l=srcStr.length; i<l; i++){
	            uca[uca.length] = code.to(srcStr.charCodeAt(i), m);
	        }            
	        return rvt? code.strReverse(uca.join('')):uca.join('');
	    },
	    to: function(n, m){
	        var n1 = ''+(n+cs.codeOfs).toString(16), len = m - n1.length;
	        if(len > 0){
	            return code.zero[len-1]+n1;
	        }
	        return n1;
	    },
	    decrypt: function(srcStr, m, rvt){
	        if(!util.isString(srcStr)) return '';
	        var uca = [];
	        if (rvt) srcStr = code.strReverse(srcStr);
	        for(var i=0,j=0; i<srcStr.length; i+=m,j++){
	            var s = srcStr.substring(i, i+m);
	            uca[j] = code.tranFormat(s, m);
	      }            
	        return String.fromCharCode.apply(String, uca);
	    },
	    tranFormat: function(n, m){
	        if(n.length !== m) return 0;
	        return parseInt(n.replace(/^0+/g,''),16) - cs.codeOfs;
	    }
	};
	
	$.extend('youdao.code', code);
})(youdao);
