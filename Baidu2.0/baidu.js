//侧边栏的显示
$(document).ready(function(){
   $("#moreProduct").hover(
   function(){
   	$('.sideBar').slideDown(500);
   },
   function(){
   	$('.sideBar').slideUp(500);
   })
})


$(document).ready(function() {
	//tab导航页 我的导航与推荐导航的切换
	$("#myNav").on("click", function() {
		$(this).addClass("titleSelected");
		$("#hotNav").removeClass("titleSelected");
		$(".navOption").show();
		$(".myNav").show();
		$(".hotNav").hide();
	});
	$("#hotNav").on("click", function() {
		$(this).addClass("titleSelected");
		$("#myNav").removeClass("titleSelected");
		$(".navOption").hide();
		$(".hotNav").show();
		$(".myNav").hide();
	})
})


// 新闻图片轮播
$(document).ready(function() {
	var imgTitle = $("#imgTitle");
	var list = $(".imgList");
	var thumbnail = $(".thumbnail")
	var thumbs = $(".thumbnail a");
	var index = 1;
	var len = 5;
	var time;

	$("#arrowRight").on("click", function() {
		if (index == 5) {
			index = 1;
		} else {
			index += 1;
		}
		animateImg(-425);
		thumbnailShow();
		titleShow(index);
	})
	$("#arrowLeft").on("click", function() {
		if (index == 1) {
			index = 5
		} else {
			index -= 1;
		}
		animateImg(425);
		thumbnailShow();
		titleShow(index);
	})


	thumbs.each(function() {
		$(this).on("click", function() {
			if ($(this).attr('class') == "imgSlected") {
				return;
			}
			var myindex = parseInt($(this).attr("index"));
			var offset = -425 * (myindex - index);
			animateImg(offset);
			index = myindex;
			thumbnailShow();
			titleShow(index);
		})
	});


	function animateImg(offset) {

		var left = parseInt(list.css('left')) + offset;
		if (offset < 0) {
			offset = '-=' + Math.abs(offset);
		} else {
			offset = '+=' + offset;
		}
		list.animate({
			'left': offset
		}, 0, function() {
			if (left > -425) {
				list.css('left', -425 * len);
			}
			if (left < (-425 * len)) {
				list.css('left', -425);
			}
		});
	}

	function thumbnailShow() {
		thumbs.eq(index - 1).addClass('imgSelect').siblings().removeClass("imgSelect");
	}

	function titleShow(index) {
		switch (index) {
			case 1:
				imgTitle.html("印度街头有毒泡沫飞扬");
				break;
			case 2:
				imgTitle.html("山东日照一群大叔秀房车");
				break;
			case 3:
				imgTitle.html("这个地方风景不错，天气也不错");
				break;
			case 4:
				imgTitle.html("看世界的女教师脱团了");
				break;
			case 5:
				imgTitle.html("战斗民族的老司机拍下的极光");
				break;
		}
	}

	function play() {
		time = setTimeout(function() {
			$('#arrowRight').trigger('click');
			play();
		}, 3000)
	}
	play();

	function stop() {
		clearTimeout(time);
	}


	$('.imgBox').hover(
		function() {
			$('#arrowLeft').css('display', 'block');
			$('#arrowRight').css('display', 'block');
			stop();
		},
		function() {
			$('#arrowLeft').css('display', 'none');
			$('#arrowRight').css('display', 'none');
			play();
		}
	)
})


// 购物页商品小标签hover
$(document).ready(function() {
	var bottom = parseInt($(".goodsAttr").css('bottom'));
	$(".goodsAttr").hover(
			function() {
				$(this).animate({
					'bottom': 0,
					'background-color': 'rgba(0,0,0,0.7)'
				}, 200)
			},
			function() {
				$(this).animate({
					'bottom': '-16px',
					'background-color': 'rgba(0,0,0,0.5)'
				}, 200)
			}
		)
		//
		//	if (bottom == 0) {
		//		$(".goodsAttr b").animate({
		//			'line-height': '44px'
		//		}, 300)
		//	}else{
		//		$(".goodsAttr b").animate({
		//			'line-height': '30px'
		//		}, 300)
		//	}
})



//视频标签页-猜你喜欢

$("document").ready(function() {
	var buttons = $(".videoSwitch span")
	var box = $(".videoBox");
	var list = $(".innerList");
	var index = 1;
	var time;

	function animate(offset) {
		var left = parseInt(list.css('left')) + offset;
		if (offset < 0) {
			offset = "-=" + Math.abs(offset);
		} else {
			offset = "+=" + offset;
		}
		list.animate({
			'left': offset
		}, 300, function() {
			if (left < -2395) {
				list.css('left', '0');
			}
			if (left > 0) {
				list.css('left', '-2395');
			}
		})
	}

	function imgSwitch() {
		buttons.eq(index - 1).addClass('videoSwitchSelect').siblings().removeClass('videoSwitchSelect');
	}

	buttons.each(function() {
		$(this).mouseover(function() {
			if ($(this).attr('class') == 'videoSwitchSelect' || list.is(':animated')) {
				return;
			}
			var myindex = parseInt($(this).attr('index'));
			var offset = -489 * (myindex - index);
			index = myindex;
			animate(offset);
			imgSwitch();
		})
	})

	function play() {
		time = setTimeout(function() {
			if (index == 5) {
				index = 1;
			} else {
				index += 1;
			}
			animate(-489);
			imgSwitch();
			play();
		}, 4000)
	}

	function stop() {
		clearTimeout(time);
	}
	play();
	buttons.hover(stop, play);
	box.hover(stop, play);
})

//视频页榜单切换
$(document).ready(function(){
	var titles = $(".videoNav a");
	var lists = $(".innerList")
	var bands = $(".innerBand");
	var index = 1;
	
	titles.each(function(){
		$(this).on('click',function(){
			if($(this).attr('class') == "videoSelect"){
			return;
		}
		var myindex = $(this).attr('index');	
		$(this).eq(index-1).addClass('videoSelect').siblings().removeClass('videoSelect');	
		bands.eq(myindex-1).addClass('onBand').siblings().removeClass('onBand');
		lists.eq(myindex-1).addClass('onList').siblings().removeClass('onList');
		})
	})
})



//左侧导航栏整体切换tab
$(document).ready(function(){
	var index = 1;
	
	$(".tabMenu").each(function(){
		$(this).on('click',function(){
			var myindex = $(this).attr("index");
			debugger
			$(this).eq(index-1).addClass('selected').siblings().removeClass('selected');
			$(".tabCon").eq(myindex-1).addClass('onTab').siblings().removeClass('onTab');
			})
		})
})





























