$(window).load(function(){
	waterFull();
	var dataInt = {              //模拟Json,向监听事件传图数据
		"data":[
		{"src":"43.jpg"},
		{"src":"44.jpg"},
		{"src":"45.jpg"},
		{"src":"46.jpg"},
		{"src":"47.jpg"},
		{"src":"48.jpg"},
		{"src":"49.jpg"},
		{"src":"50.jpg"},
		{"src":"51.jpg"},
		{"src":"52.jpg"},
		{"src":"53.jpg"},
		{"src":"54.jpg"},
		{"src":"55.jpg"},
		]
	};
	$(window).on('scroll',function(){        //移动滚动条时执行的事件
		var oParent = $('#container');
		var Boxs = $('.box');
		var lastBoxH = Boxs.last().offset().top + Math.floor(Boxs.last().outerHeight()/2); //最后一张图片的高度
		var scrollTop = $(window).scrollTop();   //滚动条移动的高度
		var documentH = $(window).height();   //当前浏览器窗口的高度
		if(lastBoxH<scrollTop+documentH){
			//遍历dataInt，将其插入在html文档最后
			$.each(dataInt.data,function(key,value){
				var Box = $('<div>').addClass('box').appendTo(oParent);
				var pic = $('<div>').addClass('pic').appendTo($(Box));
				var img = $('<img>').attr('src','img/'+$(value).attr('src'));
				img.appendTo($(pic));
			})
			waterFull(); //将上面插入的图片按照waterFull的方式加在文档中
		};
	});
})

function waterFull(){
	var oParent = $('#container');
	var Boxs = $('.box');
	var BoxsWidth = Boxs.eq(0).outerWidth();  //获取每个box的宽度
	var cols = Math.floor($(window).width()/BoxsWidth);  //计算列数
	oParent.width(BoxsWidth*cols);        //计算container的宽度
	var hArr =[];     //存储每列box的最后一个的高度
	Boxs.each(function(index,value){
		if(index<cols){
			hArr[index]=Boxs.eq(index).outerHeight();   //将第一行的5个box的高度存入hArr中为基底
		}else{
			var MinH = Math.min.apply(null,hArr);   //从第六个开始寻找之前box中高度最小的
			var MinHindex = $.inArray(MinH,hArr);    //找出最小高度box在hArr数组中所对象的位次（用于left计算）
			$(value).css({
				'position':'absolute',
				'top':MinH+'px',
				'left':MinHindex*BoxsWidth+'px'     
			})
			hArr[MinHindex] += Boxs.eq(index).outerHeight();  //更新hArr数组中的最小高度
		}
	})
}
