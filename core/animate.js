/**
 * youdao.setting
 */
(function($){
    // 鍔ㄧ敾绠楁硶
    var Tween = {
        Quad: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t + b;
            },
            easeOut: function(t,b,c,d){
                return -c *(t/=d)*(t-2) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            },
            Line: function(t,b,c,d){ 
					  return c*t/d + b; 
			},
			Back: function(t,b,c,d){
					  var s = 2.70158, w = c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
					  return w;
			}
        }
    };
    
    /**
     * 鍔ㄧ敾
     * $.animate(elem, ['left', 0, 100, '%'], 'fast', animateType, fn, ctx);
     * $.animate(GouwuDom.loading, ['right', -150, 0, 'px'], 'fast', 'easeOut', function(){}, this);
	 *json = { elem: consts.elemId, attr: ['left', -300, 0, 'px'], timer: 'normal', atp: 'easeOut', callback: function() { callback.success(); }, context: self }	;
     */
    $.addAnimate = function(json) {
        var cache = $.require_module('youdao.cache');
              cache.animate[json.elem] = cache.animate[json.elem] || [];
        var anim_list = cache.animate[json.elem];
              
        if (anim_list && anim_list.length === 0) {
            anim_list.push(json);
            $.runAnimate(json.elem);
        } else anim_list.push(json);
    };
    $.runAnimate = function(elem){
        var cache = $.require_module('youdao.cache'),
                anim_list = cache.animate[elem];
                //console.log(cache.animate);
        if (anim_list.length !== 0) {
            var data = anim_list.shift(), e;
			if (data.elem === 'body') e = document.body;
			else e = document.getElementById(data.elem);
            $.animate(e, data.attr, data.timer, data.atp, function(){ 
                data.callback();
                $.runAnimate.call(data.context, elem);
            }, data.context);
        };
    };
    $.animate = function(elem, attr, timer, atp, callback, context){
        var util = $.require_module('youdao.util');
        var spd = {'vFast': 100, 'fast': 150, 'normal': 400, 'slow': 800},
            t = 0,
			timerId,
            b = attr[1],
            c = attr[2] - attr[1],
            f = 15,
            d = spd[timer] || timer,
            s = Math.abs(Math.ceil(c/(d/f))),
            atype = atp || 'Line',
            _unit = attr.length === 4 ? attr[3] : '%';
        function run(){            
            if(t < d){
                elem.style[attr[0]] = (Math.ceil(Tween.Quad[atype](t,b,c,d)))+_unit;
                t += s;
                //window.setTimeout(run, f);
            }else{
				clearInterval(timerId);
                elem.style[attr[0]] = attr[2]+_unit;
                if(util.isFunction(callback)){
                    callback.call(context);
                }
            }
        };
		
		function fade(){
			if (t < d){
				var value = Math.ceil(Tween.Quad[atype](t,b,c,d));
				elem.style.opacity = value / 100;
				elem.style.fiter = 'alpha(opacity=' + value + ')';
				t += s;
				//window.setTimeout(fade, f);
			} else {
				clearInterval(timerId);
				elem.style.opacity = attr[2] / 100;
				elem.style.filter = 'alpha(opacity=' + attr[2] + ')';
				if(util.isFunction(callback)){
					callback.call(context);
				}
			}
		};
        if (attr[0] === 'fade') {
			timerId = window.setInterval(fade, f);
		}
		else timerId = window.setInterval(run, f);
    }
    
})(youdao);
