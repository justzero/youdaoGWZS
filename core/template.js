/**
 * 简易模板
 * var string = youdao.tmpl('HtmlString', jsonData);
 * 
 * -- HtmlString as follows -----------------------
 * <ul class="<%=className%>">
 *     <% for(var i=0; i<user.length) { %>
 *         <li><%=user[i].name%></li>
 *     <% } %>
 * </ul>
 * ------------------------------------------------
 */
(function($){

    var cache = {};

    $.tmpl = function tmpl(str, data){
        //console.log(str);
        var fn = !/\W/.test(str) ?
                cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
                "with(obj){p.push('" +
                str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");
        return data ? fn( data ) : fn;
    };
})(youdao);