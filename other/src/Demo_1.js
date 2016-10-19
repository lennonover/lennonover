$(function(){
		SyntaxHighlighter.all();
		//测试高亮
		$('.highlightText').html( highlight(
		    $('.highlightText').html(), // the text
		    ['测试', '亮'], 
		    'strong' // custom tag
		));
		//截取长度d
		$('.strSplit_s').html(excerpt($('.strSplit').html(),4,""));	
		//全局计数
		$(".buttonClick")
		    .data('counter', 1) 
		    .click(function() {
		        var counter = $(this).data('counter'); 
		        $(this).data('counter', counter + 1); 		        
		        $(".counter").html(counter);
	    });
		//当滚动条的位置处于距顶部50像素以下时显示
		$(window).scroll(function(){
            if ($(window).scrollTop()>50){
                $(".site-up").fadeIn(1600);
            }
            else
            {
                $(".site-up").fadeOut(500);
            }
        });
		//返回顶部
		$(".site-up").click(function(){
            $('body,html').animate({scrollTop:0},800);
            return false;
        });
		//切割数组
        chunk([0,1,2,3,4,5,9,8,7],3)
        
})
/**
	 * [设置高亮]
	 * @param  {[type]} text  [循环的目标]
	 * @param  {[type]} words [要高亮的字]
	 * @param  {[type]} tag   [标签类型]
	 */
	function highlight(text, words, tag) {
	  tag = tag || 'span';
	  var i, len = words.length, re;
	  for (i = 0; i < len; i++) {
	    re = new RegExp(words[i], 'g');
	    if (re.test(text)) {
	      text = text.replace(re, '<'+ tag +' class="highlight">$&</'+ tag +'>');
	    }
	  }
	  return text;
	}
	//取消高亮
	function unhighlight(text, tag) {
	  // Default tag if no tag is provided
	  tag = tag || 'span';
	  var re = new RegExp('(<'+ tag +'.+?>|<\/'+ tag +'>)', 'g');
	  return text.replace(re, '');
	}
	/**
	 * [excerpt description]
	 * @param  {[type]} str    [字符]
	 * @param  {[type]} nwords [限定长度]
	 * @param  {[type]} type   [split拆分条件]
	 */
	function excerpt(str, nwords,type) {
	  var words = str.split(type);
	  words.splice(nwords, words.length-1);
	  return words.join(type) +
	    (words.length !== str.split(type).length ? '…' : '');
	}
	//判断相应式布局中当前适配度
	function isBreakPoint(bp) {	  
	  var bps = [320, 480, 768, 1024];
	  var w = $(window).width();
	  var min, max;
	  for (var i = 0, l = bps.length; i < l; i++) {
	    if (bps[i] === bp) {
	      min = bps[i-1] || 0;
	      max = bps[i];
	      break;
	    }
	  }
	  return w > min && w <= max;
	}

// 转换为数字1
function intval(v)
{
	v = parseInt(v);
	return isNaN(v) ? 0 : v;
}

// 获取元素信息2
function getPos(e)
{
	var l = 0;
	var t  = 0;
	var w = intval(e.style.width);
	var h = intval(e.style.height);
	var wb = e.offsetWidth;
	var hb = e.offsetHeight;
	while (e.offsetParent){
		l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
		t += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0) - 18;
		e = e.offsetParent;
	}
	l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
	t  += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
	return {x:l, y:t, w:w, h:h, wb:wb, hb:hb};
}

// 获取滚动条信息3
function getScroll() 
{
	var t, l, w, h;
	
	if (document.documentElement && document.documentElement.scrollTop) {
		t = document.documentElement.scrollTop;
		l = document.documentElement.scrollLeft;
		w = document.documentElement.scrollWidth;
		h = document.documentElement.scrollHeight;
	} else if (document.body) {
		t = document.body.scrollTop;
		l = document.body.scrollLeft;
		w = document.body.scrollWidth;
		h = document.body.scrollHeight;
	}
	return { t: t, l: l, w: w, h: h };
}

// 锚点(Anchor)间平滑跳转4
function scroller(el, duration)
{
	if(typeof el != 'object') { el = document.getElementById(el); }
	if(!el) return;

	var z = this;
	z.el = el;
	z.p = getPos(el);
	z.s = getScroll();
	z.clear = function(){window.clearInterval(z.timer);z.timer=null};
	z.t=(new Date).getTime();

	z.step = function(){
		var t = (new Date).getTime();
		var p = (t - z.t) / duration;
		if (t >= duration + z.t) {
			z.clear();
			window.setTimeout(function(){z.scroll(z.p.y, z.p.x)},13);
		} else {
			st = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.y-z.s.t) + z.s.t;
			sl = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.x-z.s.l) + z.s.l;
			z.scroll(st, sl);
		}
	};
	z.scroll = function (t, l){window.scrollTo(l, t)};
	z.timer = window.setInterval(function(){z.step();},13);
}
/**
 * [chunk description]
 * @param  {[type]} arr  [description]
 * @param  {[type]} size [description]
 * @return {[type]}      [description]
 */
function chunk(arr, size) {
  var tempArr = [],
      newArr = [],
      len = arr.length,
      i = 0;
  while(i < len) {
    tempArr = arr.splice(0, size);
    newArr.push(tempArr);
    i += size;
    // arr=[0,1,2,3,4,5,6,7,8] && size = 4 && arr.length = 9
    // 1st => i = 0 => yes => arr.splice(0,4)=> tempArr=[0,1,2,3] =>arr=[4,5,6,7,8] (i=4,size=4)
    // 2st => i = 4 => yes => arr.splice(0,4)=> tempArr=[4,5,6,7] =>arr=[8] (i=8,size=4)
    // 3st => i = 8 => yes => arr.splice(0,4)=> tempArr=[8] => arr = [] (i=12,size=4)
    // 4st => i= 12 => no
  }
  return newArr;
}