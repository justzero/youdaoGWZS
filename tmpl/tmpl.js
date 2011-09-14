(function($) {
	if (!$.tm) {
		$.tm = {
			info: {},
			event: {},
			features: {}
		};
	}
	// gouwuzhushou loading...
	var consts = $.require_module('youdao.consts'),
	name = consts.commonName,
	cache = $.require_module('youdao.cache');

	/***
 * 弹出框通用样式模版 
 * */
	$.tm.popo = function(att, str) {
		var upStyle = downStyle = 'display: none;',
		span = '';
		if (cache.dom.elem.className === 'down') downStyle = '';
		else upStyle = '';
		if (att.type === 2) span = '<span class="youdaoGWZS_topIcon"><%=logo%></span>';
		return '<div class="youdaoGWZS_st' + att.type + '">\
                             <div class="youdaoGWZS_top1">\
                             <div class="youdaoGWZS_top2"><div class="youdaoGWZS_upPoint" style="left:' + att.leftX + 'px; ' + upStyle + '"></div>' + span + '</div>\
                             </div>\
                             <div class="youdaoGWZS_content">' + str + '</div>\
                             <div class="youdaoGWZS_bottom1"><div class="youdaoGWZS_bottom2"><div class="youdaoGWZS_downPoint" style="left:' + att.leftX + 'px; ' + downStyle + '"></div></div></div>';
	};

	/***
 * loading 过程模版 
 * */
	$.tm.load = '<span class="youdaoGWBar_left"></span>\
	<div class="youdaoGWBar_mid">\
    <a id="<%=name%>icon" class="hide" href="http://gouwu.youdao.com/?keyfrom=extension" clkAction="CLICK_LOGO" target="_blank" ref="icon"> </a>\
    <div id="<%=name%>contentBar">\
    <span class="youdaoGWLoad" > </span>\
    </div>\
    <span id="<%=name%>close" class="close" style="display: none;" clkAction="CLOSE" ref="close"> </span>\
    <span id="<%=name%>lowPrice" ref="end"> </span>\
	</div>\
	<span class="youdaoGWBar_right"></span>\
';
	$.tm.event.load = function() {
		$.event.addEvent(document.getElementById(name + 'close'), 'click', function() {
			var cache = $.require_module('youdao.cache'),
			div = document.getElementById(name + 'contentBar'),
			json,
			close = document.getElementById(name + 'close'),
			icon = document.getElementById(name + 'icon'),
			util = $.require_module('youdao.util');
			/* * *
	 			 * open animation
	 			 * */
			if (close.name === '1') {
				div.style.display = 'block';
				icon.className = 'hide';
				json = {
					elem: div.id,
					attr: ['width', 1, cache.dom.contentWidth, 'px'],
					timer: 'normal',
					atp: 'Line',
					callback: function() {
						close.className = 'close';
						cache.dom.elem.style.overflow = div.style.overflow = 'visible';
						close.name = '0';
						$.tm.lowPriceResize();
						/*var eSMax = document.getElementById(name + 'searchMax');
						if (eSMax) eSMax.style.display = 'block';*/
					},
					context: this
				};
				$.addAnimate(json);
			} else { // close animation
				div.style.overflow = 'hidden';
				$.tm.lowPriceResize('none');
				if (cache.dom.fDiv && cache.dom.fDiv.style.display !== 'none') cache.dom.fDiv.style.display = 'none';
			/*	var eSMax = document.getElementById(name + 'searchMax');
				if (eSMax) eSMax.style.display = 'none';
			*/	json = {
					elem: div.id,
					attr: ['width', cache.dom.contentWidth, 1, 'px'],
					timer: 'normal',
					atp: 'Line',
					callback: function() {
						close.className = 'open';
						icon.className = 'show';
						close.name = '1';
						cache.dom.elem.style.overflow = div.style.overflow = 'hidden';
						//div.style.display = 'none'; 
					},
					context: this
				};
				$.addAnimate(json);
				if (e = document.getElementById(name + 'features')) {
					if (util.isFunction(e.closeFdiv)) e.closeFdiv();
				};
			};
			return false;
		});
	};

	/***
 * logo 模版 
 * */
	$.tm.logo = '<a id="<%=name%>logo" href="http://gouwu.youdao.com/" target="_blank" ref="logo"> </a>';

	/* * *
	 * button common function
	 * */
	var youdao_input_focus = function() {
		var fld = document.getElementById(name+'fld');
		fld.className = 'focus';
		var txt = this.value;
		if (txt === '请输入想查找的商品') this.value = '';
	};
	var youdao_input_blur = function() {
		var fld = document.getElementById(name+'fld');
		fld.className = '';
		this.value = (/^\s*$/g).test(this.value) ? '请输入想查找的商品': this.value;
		cache.conf.searchData = this.value;
	};
	var youdao_input_click = function(e) {
		var val = e.value;
		if ((/^\s*$/).test(val) || val === '请输入想查找的商品') {
			youdao_input_alert(e);
			return false;
		};
		return true;
	};
	var youdao_input_alert = function(e) {
		var counter = 0;
		var colorArr = ['#F2C100', '#BABABA'];
		var el = document.getElementById( name + 'fld');
		var timer = setInterval(function() {
			el.style.borderColor = colorArr[counter % 2];
			counter++;
			if (counter > 7) {
				clearInterval(timer);
				el.style.cssText = '';
			}
		},
		100);
	};

	/***
 * searchMin 模版 
 * */
	$.tm.searchMin = '<span id="<%=name%>searchMin" title="搜索" clkAction="SHOW_SEARCH"> </span>';
	$.tm.info.searchMin = '<form id="<%=name%>searchMinForm" action="http://gouwu.youdao.com/search?keyfrom=extension" target="_blank" method="get">\
	                                <fieldset id="<%=name%>fld">\
                                    <input id="<%=name%>searchInfo" autocomplete="off" name="q" type="text" value="<%=value%>" />\
									<input name="keyfrom" value="extension" type="hidden" />\
                                    <input id="<%=name%>searchBt" type="submit" clkAction="SEARCH" value="搜商品" />\
									</fieldset>\
                                    </form>';
	$.tm.event.searchMin = function() {
		$.event.addEvent(document.getElementById(name + 'searchMin'), 'click', function() {
			var cache = $.require_module('youdao.cache'),
			div = cache.dom.show,
			json = {
				css: 'youdao',
				value: cache.conf.searchData,
				name: name
			},
			consts = $.require_module('youdao.consts'),
			timer = consts.showTime * 1000,
			str = $.tm.popo({
				leftX: 40,
				type: 1
			},
			$.tm.info.searchMin),
			html = $.tmpl(str, json);
			if (div.style.display === 'block' && div.className === 'searchMin') {
				$.ctrl.clean();
				return;
			};
			var attr = {
				css: 'searchMin',
				width: 280,
				height: 'auto',
				left: dom.pageX(this) - 35
			};
			$.ctrl.setAttr(attr, html, function() {
				document.getElementById(name + 'searchMin').className = 'enter';
			});
			document.getElementById(name + 'searchInfo').onfocus = youdao_input_focus;
			document.getElementById(name + 'searchInfo').onblur = youdao_input_blur;
			document.getElementById(name + 'searchBt').onclick = function() {
				var el = document.getElementById(name + 'searchInfo');
				if (!youdao_input_click(el)) return false;
				else this.setAttribute('href', 'http://gouwu.youdao.com/search?q=' + el.value);
			};
			div.onmouseout = function() {
				if (document.getElementById(name + 'searchInfo')) {
					//console.log( name );
					cache.conf.searchData = (/^\s*$/g).test(document.getElementById(name + 'searchInfo').value) ? '请输入想查找的商品': document.getElementById(name + 'searchInfo').value;
				};
				$.ctrl.delayClean(timer, function() {
					div.onmouseout = function() {
						$.ctrl.delayClean(timer);
					};
				});
			};
		});
		$.event.addEvent(document.getElementById(name + 'searchMin'), 'mouseout', function() {
			var consts = $.require_module('youdao.consts'),
			timer = consts.showTime * 1000,
			cache = $.require_module('youdao.cache'),
			div = cache.dom.show;
			if (document.getElementById(name + 'searchInfo')) {
				//console.log( name );
				cache.conf.searchData = document.getElementById(name + 'searchInfo').value;
			};
			$.ctrl.delayClean(timer, function() {
				div.onmouseout = function() {
					$.ctrl.delayClean(timer);
				};
			});
		});
	};

	/***
 * searchMax 模版 
 * */
	$.tm.searchMax = '<% var addr = "http://gouwu.youdao.com/search?keyfrom=extension", bt = "搜商品"; if (taobao) { addr="http://s.taobao.com/search?keyfrom=extension"; bt="搜淘宝"; } %>\
				 <form id="<%=name%>searchMax" action="<%=addr%>" target="_blank" method="get">\
					        <fieldset id="<%=name%>fld">\
							<input id="<%=name%>sMaxInfo" autocomplete="off" name="q" type="text" value="<%=value%>" />\
							<input name="keyfrom" value="extension" type="hidden" />\
                            <input id="<%=name%>sMaxBt" type="submit" clkAction="SEARCH" value="<%=bt%>" />\
							</fieldset>\
							</form>';
	$.tm.event.searchMax = function() {
		$.event.addEvent(document.getElementById(name + 'sMaxInfo'), 'keypress', function(e) {
			//console.log(e);
		});
		document.getElementById(name + 'sMaxInfo').onblur = youdao_input_blur;
		document.getElementById(name + 'sMaxInfo').onfocus = youdao_input_focus;
		document.getElementById(name + 'sMaxBt').onclick = function() {
			var el = document.getElementById(name + 'sMaxInfo');
			if (!youdao_input_click(el)) return false;
			else this.setAttribute('href', document.getElementById(name + 'searchMax').getAttribute('action') + '?q=' + el.value);
		};
	};

	/***
 * douban 模版 
 * */
	$.tm.douban = '<span id="<%=name%>douban" <% if (!data.douban || !data.douban.doubanReview.summary) {  data.douban = { doubanRate : ""}; %> class="noMore" <% } else data.douban.doubanRate += "分"; %> hoverAction="SHOW_DOUBAN" ><%=data.douban.doubanRate%></span>';
	$.tm.info.douban = '<ul><li class="douban1">\
                      <% ps = "0 " + (parseInt(rate) * 15 - 150) + "px"; %>\
                      <span class="bookStar" style="background-position: <%=ps%>;"></span>\
                      <span style=" font-size: 14px; color: #cc0000;"><%=rate%></span><span style="font-size: 12px; color: #666;">(<%=rateCount%>人)</span>\
					  </li>\
                      <li class="douban2">本书热门书评</li>\
                      <li class="douban3"><%=data.summary%><a class="" href="<%=data.url%>" target="_blank" clkAction="CLICK_DOUBAN" title="查看详情">详细>></a></li>\
                      <li class="douban4">\
					  <span class="douban_author"><%=data.author%></span><span class="douban_time"><%=data.pubdate%></span>\
					  </li>\
					  <li class="douban5">\
					  <a class="moreShopBox" class="bookMore" href="<%=doubanUrl%>" target="_blank" clkAction="CLICK_DOUBAN" title="去豆瓣查看详情" style="margin: 0;"><span>该书的详情</span></a>\
					  </li></ul>';
					
	$.tm.event.douban = function() {
		var elem = document.getElementById(name + 'douban'),
		cache = $.require_module('youdao.cache'),
		consts = $.require_module('youdao.consts'),
		timer = consts.showTime * 1000;
		$.event.addEvent(elem, 'mouseover', function() {
			if (elem.className === 'noMore') return;
			var div = cache.dom.show,
			dom = $.require_module('youdao.dom'),
			str = $.tm.popo({
				leftX: 50,
				type: 2
			},
			$.tm.info.douban),
			html = $.tmpl(str, {
				rate: cache.data.douban.doubanRate,
				rateCount: cache.data.douban.doubanRateCount,
				data: cache.data.douban.doubanReview,
				doubanUrl: cache.data.douban.doubanUrl,
				logo: ''
			});;
			var attr = {
				css: 'youdaoGWZSdouban',
				width: 350,
				height: 'auto',
				left: dom.pageX(this) - 30
			};
			if (div.style.display === 'block' && div.className === 'douban') {
				$.ctrl.clean();
				return;
			}
			$.ctrl.setAttr(attr, html, function() {
				elem.className = 'enter';
			});
		});
		$.event.addEvent(elem, 'mouseout', function() {
			$.ctrl.delayClean(timer);
		});
	};

	/***
 * PriceData 模版 
 * */
	$.tm.onePrice = '<% for(var i = len-1; i >= 0; i--) {%>\
                        <%var style = ""; var urlNum = (data.urlPriceList[i].num % data.urlPriceList[i].length) ? data.urlPriceList[i].num : 0; %>\
                        <% if (i === 0)  style += "background-image: none; "; %>\
						<% if (data.urlPriceList[i].html === "缺货") {%>\
						<a id = "<%=name%>price<%=i%>" class="oneDataPrice" hoverAction="SHOW_OUT_MERCHANT" clkAction="CLICK_OUT_MERCHANT" style="<%=style%> color:#b2b2b2;" href="<%=data.urlPriceList[i].items[urlNum].cpsUrl %>" target="_blank" ps="0"\
							<% if (data.urlPriceList[i].priceUpdated) {%>\
								updated="1"\
							<%} else {%>\
								updated="0"\
							<%}%>\
							rel="onePrice" >\
							<% if (data.urlPriceList[i].items[0].price !== "0.0") { %>\
							<%=data.urlPriceList[i].siteName + " " + data.urlPriceList[i].items[0].price + "元(缺货)"%>\
							<% } else {%>\
								<% if (data.urlPriceList[i].items[0].priceImageUrl) {%>\
								<%=data.urlPriceList[i].siteName + " " %><img src="<%=data.urlPriceList[i].items[0].priceImageUrl%>" style="width: 60px;" alt="price" />(缺货)\
								<%} else {%>\
									<%=data.urlPriceList[i].siteName + " 暂无报价(缺货)"%>\
								<% } %>\
							<% } %>\
						<% } else { %>\
						<a id = "<%=name%>price<%=i%>" class="oneDataPrice" hoverAction="SHOW_OUT_MERCHANT" clkAction="CLICK_OUT_MERCHANT" style="<%=style%>" href="<%=data.urlPriceList[i].items[urlNum].cpsUrl %>" target="_blank" ps="0"\
							<% if (data.urlPriceList[i].priceUpdated) {%>\
								updated="1"\
							<%} else {%>\
								updated="0"\
							<%}%>\
							rel="onePrice" >\
							<% if ((!data.urlPriceList[i].html && data.urlPriceList[i].items[0].price !== "0.0") || (data.urlPriceList[i].html && data.urlPriceList[i].html !== "0.0元")) {%>\
							<%=data.urlPriceList[i].siteName + " " + (data.urlPriceList[i].html || data.urlPriceList[i].items[0].price + "元")%>\
							<% } else { %>\
							<%=data.urlPriceList[i].siteName + " "%>\
							<% if (data.urlPriceList[i].items[0].priceImageUrl) %>\
								<img src="<%=data.urlPriceList[i].items[0].priceImageUrl%>" style="width: 60px;" alt="price" />\
							<% else %> 暂无报价\
							<% } %>\
						<% } %>\
						</a>\
                        <% } %>';
	$.tm.priceData = '<div id="<%=name%>priceData" <% if (!data.hasLower) { %> class="noMore" <% }%> >' + $.tm.onePrice + '</div> ';
	$.tm.event.priceData = function() {
		var priceData = document.getElementById(name + 'priceData'),
		span = priceData.getElementsByTagName('a'),
		cache = $.require_module('youdao.cache'),
		consts = $.require_module('youdao.consts'),
		timer = consts.showTime * 1000;
		$.event.addEvent(span, 'mouseover', function() {
			var elem = this,
			i = parseInt(elem.id.match(/\d/)),
			data = cache.data.urlPriceList[i],
			div = cache.dom.show,
			dom = $.require_module('youdao.dom'),
			json = {
				priceList: data.items,
				len: data.items.length,
				ship: data.shipping,
				data: data,
				logo: (data.items.length === 1) ? '商品详情': '更多同款商品(不同颜色、规格等)'
			},
			str = $.tm.popo({
				leftX: 30,
				type: 2
			},
			youdao.tm.info.priceData),
			html = $.tmpl(str, json);
			var attr = {
				css: 'priceData',
				width: 325,
				height: 'auto',
				left: dom.pageX(this)
			};
			$.ctrl.setAttr(attr, html);
		});
		$.event.addEvent(span, 'mouseout', function() {
			$.ctrl.delayClean(timer);
		});
	};
	$.tm.info.priceData = '<ul><% for(var i=0; i != len; i++) {%>\
							 <% if (i > 4) break;%>\
                                <% if (priceList[i].available) {%>\
                                <li class="price">\
                                <a href="<%=priceList[i].cpsUrl%>" ps="<%=i+1%>" target="_blank" title="<%=priceList[i].name%>" clkAction="CLICK_OUT_MERCHANT_IN" style="display: block; text-align: left;">\
                                    <% if (priceList[i].price !== "0.0") {%>\
									<span style=" display: block; float: right;"><%=priceList[i].price %>元</span>\
									<%} else {%>\
										<% if (priceList[i].priceImageUrl) {%>\
											<img style=" display: block; float: right; width: 60px;" src="<%=priceList[i].priceImageUrl%>" alt="price"/>\
										<%} else {%>\
											<span style="dispay: block; float: right;">暂无报价</span>\
										<%}%>\
									<%}%>\
                                    <%=priceList[i].shortName%>\
                                </a>\
                                </li>\
                                <% } else { %>\
                                <li class="noPrice">\
                                <a href="<%=priceList[i].cpsUrl%>" ps="<%=i+1%>" target="_blank" title="<%=priceList[i].name%>" clkAction="CLICK_OUT_MERCHANT_IN" style="display: block; text-align: left;">\
                                    <% if (priceList[i].price !== "0.0") {%>\
									<span style=" display: block; float: right;"><%=priceList[i].price %>元(缺货)</span>\
									<%} else {%>\
										<% if (priceList[i].priceImageUrl) {%>\
											<span style="display: block; float: right;">\
												<img style="width: 60px;" src="<%=priceList[i].priceImageUrl%>" alt="price"/>\
												(缺货)\
											</span>\
										<%} else {%>\
                                    		<span style=" display: block; float: right;">暂无报价(缺货)</span>\
										<%}%>\
									<%}%>\
                                    <%=priceList[i].shortName%>\
								</a>\
								</li>\
                                <% } %>\
                            <% } %>\
                            <% if (ship) { %>\
                                <li class="ship">\
								<% if (data.famous) { %><span class="famousleft"><%=data.siteName + ": "%></span> <%} else {%><%=data.siteName + ": "%><% } %>\
								<span style="color: #698723;"><%=data.shipping%></span></li>\
                            <% } else { %>\
                                <li class="ship">\
								<% if (data.famous) { %><span class="famousleft"><%=data.siteName + ": "%></span> <%} else {%><%=data.siteName + ": "%><% } %>\
								<span style="color: #b2b2b2;">暂无运费信息</span></li>\
                            <% } %>\
                            </ul>';

	/***
 * taobao 模版 
 * */
	$.tm.taobao = '<span id="<%=name%>taobao" <% if (!data.taobaoPriceList || data.taobaoPriceList.items.length === 0) { %> class="noMore" title="暂无淘宝报价信息" <% } %> hoverAction="SHOW_TAOBAO" ref="taobao"> </span>';
	$.tm.info.taobao = '<ul>\
				   	<% for(var i=0; i < data.length; i++) {%>\
                   	<li class="oneShop"><table  border="0">\
                   	<tr class="tr1">\
						<td class="shopName">\
							<a href="<%=data[i].cpsUrl%>" target="_blank" clkAction="CLICK_ TAOBAO" ref="taobaoShop">\
								<%=data[i].taobao_nick_name || "淘宝店铺"%>\
							</a>\
						</td>\
						<td class="rank">\
                    	<% if (data[i].taobao_rank) { %>\
                    	<% css = "rankImg"; wd = "100%"; ps = "0 0"; %>\
                    	<% if (data[i].taobao_rank >= 30) { css = "rankImg2"; wd = "26px"; ps = "0 0"; %>\
                    	<%  } else { wd = ((data[i].taobao_rank % 5) * 13 !== 0)  ?  (data[i].taobao_rank % 5) * 13 + "px" : "65px"; ps = (data[i].taobao_rank > 15) ? "0 bottom" : " 0 top"; } %>\
                    	<% } else { css = "noRankImg"; wd = "100%"; ps = "0 0";}%>\
                    		<span class="<%=css%>" style="width:<%=wd%>; background-position: <%=ps%>;"></span>\
                    	</td>\
						<td class="price">\
							<%=data[i].price%>元\
						</td>\
					</tr>\
                    <tr class="tr2">\
						<td class="name" title="<%=data[i].name%>">\
							<a href="<%=data[i].cpsUrl%>" rel="taobaoshop" clkAction="CLICK_TAOBAO" target="_blank" style="width: 100%; height: 100%;"><%=data[i].shortName%></a>\
						</td>\
						<td class="addr">\
							<%=data[i].shop_loc%>\
						</td>\
						<td class="biz_buy">\
							<% biz =  (data[i].biz_30_day) ?"最近成交<br/>" + data[i].biz_30_day + "笔" : ""; %> <%=biz%>\
						</td>\
					</tr>\
                    </table>\
					</li> \
                    <% } %>\
                    <li class="moreShop">\
					<a class="moreShopBox" href="<%=moreUrl%>" target="_blank" rel="moreShop" clkAction="CLICK_TAOBAO" title="更多淘宝报价">\
					<span>更多淘宝搜索结果</span>\
					</a>\
					</li>\
                    </ul>';
	$.tm.event.taobao = function() {
		var elem = document.getElementById(name + 'taobao'),
		cache = $.require_module('youdao.cache'),
		consts = $.require_module('youdao.consts'),
		timer = consts.showTime * 1000;
		$.event.addEvent(elem, 'mouseover', function() {
			if (elem.className === 'noMore') return;
			var div = cache.dom.show,
			dom = $.require_module('youdao.dom'),
			str = $.tm.popo({
				leftX: 180,
				type: 2
			},
			youdao.tm.info.taobao),
			html = $.tmpl(str, {
				data: cache.data.taobaoPriceList.items,
				moreUrl: cache.data.taobaoPriceList.moreUrl,
				logo: ''
			});
			var attr = {
				css: 'taobao',
				width: 350,
				height: 'auto',
				left: dom.pageX(this)
			};
			$.ctrl.setAttr(attr, html, function() {
				document.getElementById(name + 'taobao').className = 'enter';
			});
		});
		$.event.addEvent(document.getElementById(name + 'taobao'), 'mouseout', function() {
			var consts = $.require_module('youdao.consts'),
			timer = consts.showTime * 1000;
			$.ctrl.delayClean(timer);
		});
	};

	/***
 * morePrice 模版 
 * */
	$.tm.morePrice = '<span id="<%=name%>morePrice"<% if (len === data.urlPriceList.length) { %> class="noMore" title="暂无其他商城报价信息" <% } %> hoverAction="SHOW_MORE_MERCHANT" ref="morePrice"> </span>';
	$.tm.info.morePrice = '<ul><% for(var i=showLen; i < data.length; i++) {%>\
										<% if (i - showLen >= 5) break; %>\
                                        <% if (data[i].available === "true") { %>\
										<li class="oneShop">\
										<table  border="0">\
                                            <tr class="tr1">\
												<td class="shopName">\
													<% num = data[i].num;%>\
													<a href="<%=data[i].items[num].url%>" clkAction="CLICK_ MORE_MERCHANT" rel="shop" target="_blank">\
													<%=data[i].siteName%><% if (data[i].famous) { %>\
													<img src="http://e.gouwu.youdao.com/images/extension_2_0/famous.png" class="famous"/>\
													<%}%>\
													</a>\
												</td>\
                                                <td class="price">\
												<%if ((data[i].html && data[i].html !== "0.0元") || (!data[i].html && data[i].items[num].price !== "0.0")) {%>\
													<%=(data[i].html || data[i].items[num].price + "元")%>\
												<% } else {%>\
													<img style="width: 60px;" src="<%=data[i].items[num].priceImageUrl%>"/>\
												<% } %>\
												</td>\
											</tr>\
                                            <tr class="tr2">\
												<td class="name" title="<%=data[i].items[num].name%>">\
													<a href="<%=data[i].items[num].url%>" rel="shop" clkAction="CLICK_ MORE_MERCHANT" target="_blank" style="width: 100%; height: 100%;">\
													<%=data[i].items[num].shortName%>\
													</a>\
												</td>\
												<td class="ship">\
													<% if (data[i].shipping) { %>\
														<span style="color: #698723;"><%=data[i].shipping%></span>\
													<% } else { %>\
														<span style="color: #b2b2b2;">暂无运费信息</span>\
													<% } %>\
												</td>\
											</tr>\
                                        </table>\
										</li> \
										<%} else {%>\
										<li class="noShop">\
										<table  border="0">\
                                            <tr class="tr1">\
												<td class="shopName">\
													<% num = data[i].num;%>\
													<a href="<%=data[i].items[num].url%>" rel="shop" clkAction="CLICK_ MORE_MERCHANT" style="color: #b2b2b2;" target="_blank">\
													<%=data[i].siteName%>\
													<% if (data[i].famous) { %>\
													<img src="http://e.gouwu.youdao.com/images/extension_2_0/famous.png" class="famous"/>\
                                            		<%}%>\
													</a>\
												</td>\
                                                <td class="price" style=" color: #b2b2b2; ">\
												<%if (data[i].items[0].price !== "0.0") {%>\
													<%=data[i].items[num].price + "元"%>\
												<% } else {%>\
													<% if (data[i].items[0].priceImageUrl !== "") { %>\
														<img style="width: 60px;" src="<%=data[i].items[num].priceImageUrl%>"/>\
													<% } else { %>\
														无报价信息\
													<% } %>\
												<% } %>\
												</td>\
											</tr>\
                                            <tr class="tr2">\
												<td class="name" title="<%=data[i].items[num].name%>">\
													<a href="<%=data[i].items[num].url%>" rel="shop" clkAction="CLICK_ MORE_MERCHANT" target="_blank" style="width: 100%; height: 100%; color: #b2b2b2;">\
													<%=data[i].items[num].shortName%>\
													</a>\
												</td>\
												<td class="ship">\
													<span style="color: #b2b2b2;">缺货</span>\
												</td>\
											</tr>\
                                        </table>\
										</li> \
										<% } %>\
                                    	<% } %>\
                                    <li class="moreShop">\
										<a href="<%=moreUrl%>" target="_blank" rel="moreShop" clkAction="CLICK_ MORE_MERCHANT" title="更多商城报价" class="moreShopBox">\
										<span>更多商城报价</span>\
										</a>\
										</li>\
                                    </ul>';
	$.tm.event.morePrice = function() {
		var elem = document.getElementById(name + 'morePrice'),
		cache = $.require_module('youdao.cache'),
		consts = $.require_module('youdao.consts'),
		timer = consts.showTime * 1000;
		$.event.addEvent(elem, 'mouseover', function() {
			if (elem.className === 'noMore') return;
			else {
				var div = cache.dom.show,
				dom = $.require_module('youdao.dom'),
				json = {
					data: cache.data.urlPriceList,
					showLen: cache.conf.showLen,
					moreUrl: cache.data.detailUrl,
					logo: '商城报价'
				},
				str = $.tm.popo({
					leftX: 10,
					type: 2
				},
				$.tm.info.morePrice),
				html = $.tmpl(str, json);
				var attr = {
					css: 'morePrice',
					width: 300,
					height: 'auto',
					left: dom.pageX(this)
				};
				$.ctrl.setAttr(attr, html, function() {
					document.getElementById(name + 'morePrice').className = 'enter';
				});
			}
		});
		$.event.addEvent(document.getElementById(name + 'morePrice'), 'mouseout', function() {
			var consts = $.require_module('youdao.consts'),
			timer = consts.showTime * 1000;
			$.ctrl.delayClean(timer);
		});
	};

	/***
 * conf 模版 
 * */
	$.tm.conf = '<span id="<%=name%>conf"\
			<% if (data.code === "110000") {%>\
				style="background-position-x: -30px; border-bottom: none 0; float: left; "\
			<% }else{ %>\
				style="background-position-x: 0px;"\
			<% } %>\
			title="设置"\
			clkAction="CLICK_SET"> </span>';
	$.tm.info.conf = '<h2>设置</h2>\
                  <div class="mid">\
				  <strong>显示位置:</strong>\
                  <div class="radio radio1">\
                      <input id="upBt" type="radio" name="conf" value = "网页上方">浏览器顶部\
			      </div>\
				  <div class="radio radio2">\
                      <input id="downBt" type="radio" name="conf" value = "网页下方">浏览器底部\
				  </div>\
				  <input id="<%=name%>set" type="button" clkAction="SET" value = "确定" class="non1">\
                  </div>\
                  <a class="youdaoGWZShelp" href="http://zhushou.youdao.com/help" clkAction="SUGGEST" target="_blank" >帮助</a>\
                  <a class="youdaoGWZSfeelback" href="http://feedback.youdao.com/quality_report.jsp?prodtype=gouwuzhushou" clkAction="HELP" target="_blank" >意见反馈</a>\
                  <a id="<%=name%>confClose" title="关闭"> </a>';
	$.tm.event.conf = function() {
		var util = $.require_module('youdao.util');
		$.event.addEvent(document.getElementById(name + 'conf'), 'click', function() {
			var cache = $.require_module('youdao.cache'),
			div = cache.dom.show,
			json = {
				css: 'youdao',
				name: consts.commonName
			},
			str = $.tm.popo({
				leftX: 193,
				type: 1
			},
			youdao.tm.info.conf),
			html = $.tmpl(str, json);
			var attr = {
				css: 'conf',
				width: 253,
				height: 'auto',
				left: dom.pageX(this) - 190
			};
			if (div.style.display === 'block' && div.className === 'conf') {
				$.ctrl.clean();
				return;
			}
			$.ctrl.setAttr(attr, html, function() {
				document.getElementById(name + 'conf').className = 'enter';
			});
			document.getElementById(cache.conf.position + 'Bt').checked = "checked";
			var set = document.getElementById(consts.commonName + 'set');
			set.className = 'non';
			var elemId = {
				'down': 'upBt',
				'up': 'downBt'
			} [cache.conf.position];
			$.event.addEvent(document.getElementById(consts.commonName + 'confClose'), 'click', function() {
				$.ctrl.clean();
			});
			$.event.addEvent(document.getElementById(cache.conf.position + 'Bt'), 'click', function() {
				set.className = 'non';
			});
			$.event.addEvent(document.getElementById(elemId), 'click', function() {
				set.className = 'enable';
			});
			$.event.addEvent(set, 'click', function() {
				if (set.className === 'non') return false;
				var e;
				if (!cache.conf.position || cache.conf.position === 'down') {
					$.ctrl.clean();
					cache.dom.elem.className = 'up';
					cache.conf.position = 'up';
					cache.localConf.position = 'up';
					var sE = document.getElementById(consts.optionsID);
					if (sE && cache.localConf) sE.innerHTML = util.jsonToStr(cache.localConf, ';');
					if (cache.conf.ie === 6) {
						cache.dom.top = document.documentElement.scrollTop;
						cache.dom.elem.style.top = cache.dom.top + 1 + 'px';
						cache.dom.elem.style.bottom = 'auto';
					}
					if (e = document.getElementById(name + 'features')) {
						e.style.top = '35px';
						e.style.bottom = 'auto';
					};
				} else {
					$.ctrl.clean();
					cache.dom.elem.className = 'down';
					cache.conf.position = 'down';
					cache.localConf.position = 'down';
					var sE = document.getElementById(consts.optionsID);
					if (sE && cache.localConf) sE.innerHTML = util.jsonToStr(cache.localConf, ';');
					if (cache.conf.ie === 6) {
						cache.dom.elem.style.bottom = cache.dom.bottom = (cache.conf.bottom) ? 0 : 1;
						cache.dom.elem.style.top = cache.dom.top = 'auto';
					}
					if (e = document.getElementById(name + 'features')) {
						e.style.bottom = '55px';
						e.style.top = 'auto';
					};
				}
			});
		});
		$.event.addEvent(document.getElementById(name + 'conf'), 'mouseout', function() {
			var consts = $.require_module('youdao.consts'),
			timer = consts.showTime * 1000;
			$.ctrl.delayClean(timer);
		});
	};

	/***
 * window resize 事件 模版 
 * */
	$.tm.event.resize = function() {
		var div = cache.dom.show,
		span = div.append('span', {
			className: 'oneDataPrice'
		},
		{},
		'');
		for (var i = 0, len = cache.data.urlPriceList.length; i < len; i++) {
			var price = cache.data.urlPriceList[i];
			span.innerHTML = price.siteName + '  ' + price.items[0].price + '元(缺货)';
			price.len = span.offsetWidth + 35;
		}
		var reSizeWin = function() {
			if (!cache.conf.ie) {
				var w = cache.dom.body.style.width || 'auto';
				cache.dom.body.style.width = '100%';
				cache.dom.bodyWidth = cache.dom.body.offsetWidth;
				cache.dom.body.style.width = w;
			} else {
				cache.dom.bodyWidth = document.documentElement.clientWidth;
			};
			document.getElementById(consts.commonName + 'contentBar').style.overflow = (cache.dom.bodyWidth < 620) ? 'hidden': 'visible';
			
			cache.dom.contentWidth = (cache.conf.ie === 6) ? Math.ceil(cache.dom.bodyWidth - 158) : Math.ceil(cache.dom.bodyWidth - 152);
			document.getElementById(consts.commonName + 'contentBar').style.width = cache.dom.contentWidth + 'px';
			var tmpW, sub = 0,
			i = 0,
			mLeft = 0;
			if (!cache.data.douban || ! cache.data.douban.doubanReview || ! cache.data.douban.doubanReview.summary) {
				tmpW = cache.dom.bodyWidth - 500;
			} else {
				tmpW = cache.dom.bodyWidth - 600;
			}
			while (i < cache.data.urlPriceList.length && sub < tmpW) {
				sub += cache.data.urlPriceList[i++].len;
			}
			if (sub >= tmpW) cache.conf.showLen = (i > 1) ? i - 1: 0;
			else cache.conf.showLen = i;
			if (cache.conf.showLen > 3) cache.conf.showLen = 3;
			document.getElementById(consts.commonName + 'priceData').innerHTML = $.tmpl($.tm.onePrice, {
				data: cache.data,
				name: consts.commonName,
				len: cache.conf.showLen
			});
			if (cache.data.urlPriceList.length - cache.conf.showLen > 0) {
				document.getElementById(consts.commonName + 'morePrice').className = '';
				document.getElementById(consts.commonName + 'morePrice').title = '';
			} else {
				document.getElementById(consts.commonName + 'morePrice').className = 'noMore';
				document.getElementById(consts.commonName + 'morePrice').title = '暂无其他商城报价信息';
			}
			$.tm.event.priceData();
		};
		reSizeWin();
		$.event.addEvent(window, 'resize', reSizeWin);
	};

	/***
 * 更低价显示 模版 
 * */
	$.tm.lowPriceResize = function(style) {
		var e = document.getElementById(consts.commonName + 'price0'),
		closeCss = document.getElementById(consts.commonName + 'close').className;
		if (e && cache.data.hasLower && closeCss !== 'open') {
			e.style.color = '#cc0033';
			var low = document.getElementById(consts.commonName + 'lowPrice');
			low.style.left = (dom.pageX(e) + (e.offsetWidth / 2) - 10) + 'px';
			low.style.display = style || 'block';
			//cache.dom.elem.style.overflow = 'visiable';
		} else {
			var low = document.getElementById(consts.commonName + 'lowPrice');
			low.style.display = 'none';
		}
	};

	/***
 * 特殊动画 模版 
 * */
	$.tm.event.up = {
		'110011': function() {
			cache.dom.bodyMarginTop = (mTop = document.body.style.marginTop) ? mTop: 'auto';
			var options = {
				elem: 'body',
				attr: ['marginTop', 0, 50, 'px'],
				timer: 'vFast',
				atp: 'Line',
				context: this,
				callback: function() {}
			};
			if (cache.conf.position === 'up') {
				$.addAnimate(options);
			};
			$.event.addEvent(document.getElementById(consts.commonName + 'close'), 'click', function() {
				if (document.getElementById(consts.commonName + 'close').className === 'close' && cache.dom.elem.className === 'up') {
					options.attr = ['marginTop', 50, 0, 'px'];
					$.addAnimate(options);
				};
				if (document.getElementById(consts.commonName + 'close').className === 'open' && cache.dom.elem.className === 'up') {
					options.attr = ['marginTop', 0, 50, 'px'];
					$.addAnimate(options);
				};
			});
			$.event.addEvent(document.getElementById(consts.commonName + 'conf'), 'click', function() {
				if (cache.dom.show.style.display === 'none') return;
				var set = document.getElementById(consts.commonName + 'set');
				if (!set) return;
				$.event.addEvent(set, 'click', function() {
					if (set.className === 'non') return;
					var options = {
						elem: 'body',
						attr: ['marginTop', 0, 50, 'px'],
						timer: 'vFast',
						atp: 'Line',
						context: this,
						callback: function() {}
					};
					if (document.body.style.marginTop === '50px' && cache.dom.elem.className === 'down') {
						options.attr = ['marginTop', 50, 0, 'px'];
						$.addAnimate(options);
					};
					if (document.body.style.marginTop !== '50px' && cache.dom.elem.className === 'up') {
						options.attr = ['marginTop', 0, 50, 'px'];
						$.addAnimate(options);
					};
				});
			});
		},
		'110000': function() {
			var div = document.getElementById(consts.commonName + 'contentBar'),
			close = document.getElementById(consts.commonName + 'close'),
			icon = document.getElementById(consts.commonName + 'icon');
			div.style.width = 0;
			div.style.overflow = 'hidden';
			//document.getElementById(name + 'searchMax').style.display = 'none';
			div.style.display = 'none';
			close.className = 'open';
			close.name = '1';
			icon.className = 'show';
		}
	};

	/***
 * 新功能引导 模版 
 * */
	$.tm.features.tmple = '<ul>\
                                        <li class="fts1">功能提示</li>\
                                        <li class="fts2"><%=info[0]%></li>\
                                        <li class="fts3"><%=info[1]%>\
                                        <span style="font-Weight: bold;">功能展示:</span><br/><%=info[2]%></li>\
                                        <li class="fts4"><a href="" style="">查看功能详情>></a><input type="button" id="ftsBt" value="我知道了"\></li></ul>';
	$.tm.features.event = function(fDiv) {
		$.event.addEvent(document.getElementById('ftsBt'), 'click', function() {
			var util = $.require_module('youdao.util');
			fDiv.style.display = 'none';
			var code = $.conf.features[++cache.conf.flag - 1];
			$.tm.event[code] = $.tm.event.tmp;
			$.tm.event.tmp();
			cache.dom.elem.flag = (cache.conf.flag <= $.conf.features.length) ? cache.conf.flag: 0;
		});
		fDiv.closeFdiv = function() {
			var util = $.require_module('youdao.util');
			fDiv.style.display = 'none';
			var code = $.conf.features[cache.conf.flag - 1];
			$.tm.event[code] = $.tm.event.tmp;
			$.tm.event.tmp();
		}
	};

})(youdao);
/* * *
 * this is a djwijq
 * */

