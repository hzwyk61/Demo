/**
 * 通过单例模式与外观模式，利用面向对象编程的思想，使得结构清晰易阅读，代码整洁易修改。同时防止了变量名污染等问题。
 * js设计模式：单例模式
 * 功能:更多产品
 */

var moreProduct = {
    init: function() {
        this.render();
        this.bind();
    },
    render: function() {
        var me = this;
        me.moreProduct = $('#moreProduct');
        me.sideBar = $('.sideBar');
    },
    bind: function() {
        var me = this;
        me.moreProduct.hover(function() {
            $('.sideBar').slideDown(500);
            $('.sideBar').slideUp(500);
        })
    }
}

/**
 * js设计模式：单例模式
 * 功能：导航栏切换（我的导航与推荐导航）
 */

var tabSwitch = {
    init: function() {
        this.render();
        this.bind();
    },
    render: function() {
        var me = this;
        me.myNav = $('#myNav');
        me.hotNav = $('#hotNav');
    },
    bind: function() {
        var me = this;
        me.myNav.click(function() {
            $(this).addClass('titleSelected');
            $('#hotNav').removeClass('titleSelected');
            $('.navOption').show();
            $('.myNav').show();
            $('.hotNav').hide();
        });
        me.hotNav.click(function() {
            $(this).addClass('titleSelected');
            $('#myNav').removeClass('titleSelected');
            $('.navOption').hide();
            $('.hotNav').show();
            $('.myNav').hide();
        })
    }
}

/**
 * js设计模式：单例模式
 * 功能：新闻图片轮播
 */
var newsPlay = {
    init: function() {
        this.render();
        this.bind();
        this.loopPlay();
    },
    render: function() {
        var me = this;
        me.thumbnail = $(".thumbnail");
        me.thumbs = $(".thumbnail a");
        me.arrowRight = $('#arrowRight');
        me.arrowLeft = $('#arrowLeft');
        me.imgBox = $('.imgBox');
        me.list = $(".imgList");
    },
    // 左右键切换
    bind: function() {
        var me = this;
        var index = 1;
        me.arrowRight.click(function() {
            if (index == 5) {
                index = 1;
            } else {
                index += 1;
            }
            me.animateImg(-425);
            me.thumbnailShow(index);
            me.titleShow(index);
        });
        me.arrowLeft.click(function() {
            if (index == 1) {
                index = 5
            } else {
                index -= 1;
            }
            me.animateImg(425);
            me.thumbnailShow(index);
            me.titleShow(index);
        });
    },
    // 循环轮播
    loopPlay: function() {
        var me = this;
        var index = 1;
        var time;
        // 自动轮播
        function play() {
            time = setTimeout(function() {
                $('#arrowRight').trigger('click');
                play();
            }, 3000)
        };
        play();
        // 停止播放
        function stop() {
            clearTimeout(time);
        };
        // 计算图片移动距离的函数
        me.thumbs.each(function() {
            $(this).on("click", function() {
                if ($(this).attr('class') == "imgSlected") {
                    return;
                }
                var myindex = parseInt($(this).attr("index"));
                var offset = -425 * (myindex - index);
                me.animateImg(offset);
                index = myindex;
                me.thumbnailShow(index);
                me.titleShow(index);
            });
        });

        me.imgBox.hover(
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
        );
    },
    // 按钮切换
    thumbnailShow: function(index) {
        var me = this;
        me.thumbs.eq(index - 1).addClass('imgSelect').siblings().removeClass("imgSelect");
    },
    // 新闻小标题
    titleShow: function(index) {
        var me = this;
        switch (index) {
            case 1:
                $("#imgTitle").html("印度街头有毒泡沫飞扬");
                break;
            case 2:
                $("#imgTitle").html("山东日照一群大叔秀房车");
                break;
            case 3:
                $("#imgTitle").html("这个地方风景不错，天气也不错");
                break;
            case 4:
                $("#imgTitle").html("看世界的女教师脱团了");
                break;
            case 5:
                $("#imgTitle").html("战斗民族的老司机拍下的极光");
                break;
        }
    },
    // 图片位移
    animateImg: function(offset) {
        var me = this;
        var len = 5;
        var left = parseInt(me.list.css('left')) + offset;
        if (offset < 0) {
            offset = '-=' + Math.abs(offset);
        } else {
            offset = '+=' + offset;
        }
        me.list.animate({
            'left': offset
        }, 0, function() {
            if (left > -425) {
                me.list.css('left', -425 * len);
            }
            if (left < (-425 * len)) {
                me.list.css('left', -425);
            }
        });
    }
}

/**
 * js设计模式：单例模式
 * 功能：购物页商品小标签hover效果
 */
var productTag = {
    init: function() {
        this.render();
        this.bind();
    },
    render: function() {
        var me = this;
        me.goodsAttr = $(".goodsAttr");
    },
    bind: function() {
        var me = this;
        me.goodsAttr.hover(
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
        );
    }
}

/**
 * js设计模式：单例模式
 * 功能：视频标签页-猜你喜欢(轮播)
 */
var videoInterest = {
    init: function() {
        this.render();
        this.loopPlay();
    },
    render: function() {
        var me = this;
        me.buttons = $(".videoSwitch span")
        me.box = $(".videoBox");
        me.list = $(".innerList");
    },
    loopPlay: function() {
        var me = this;
        var index = 1;
        var time;

        function imgSwitch() {
            me.buttons.eq(index - 1).addClass('videoSwitchSelect').siblings().removeClass('videoSwitchSelect');
        }

        me.buttons.each(function() {
            $(this).mouseover(function() {
                if ($(this).attr('class') == 'videoSwitchSelect' || me.list.is(':animated')) {
                    return;
                }
                var myindex = parseInt($(this).attr('index'));
                var offset = -489 * (myindex - index);
                index = myindex;
                me.animate(offset);
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
                me.animate(-489);
                imgSwitch();
                play();
            }, 4000)
        }

        function stop() {
            clearTimeout(time);
        }
        play();
        me.buttons.hover(stop, play);
        me.box.hover(stop, play);
    },
    animate: function(offset) {
        var me = this;
        var left = parseInt(me.list.css('left')) + offset;
        if (offset < 0) {
            offset = "-=" + Math.abs(offset);
        } else {
            offset = "+=" + offset;
        }
        me.list.animate({
            'left': offset
        }, 300, function() {
            if (left < -2395) {
                me.list.css('left', '0');
            }
            if (left > 0) {
                me.list.css('left', '-2395');
            }
        })
    }
}

/**
 * js设计模式：单例模式
 * 功能：视频页榜单切换
 */
var videoBand = {
    init: function() {
        this.render();
        this.ergodic();
    },
    render: function() {
        var me = this;
        me.titles = $(".videoNav a");
        me.lists = $(".innerList")
        me.bands = $(".innerBand");
    },
    //遍历函数
    ergodic: function() {
        var me = this;
        var index = 1;
        me.titles.each(function() {
            $(this).on('click', function() {
                if ($(this).attr('class') == "videoSelect") {
                    return;
                }
                var myindex = $(this).attr('index');
                $(this).eq(index - 1).addClass('videoSelect').siblings().removeClass('videoSelect');
                me.bands.eq(myindex - 1).addClass('onBand').siblings().removeClass('onBand');
                me.lists.eq(myindex - 1).addClass('onList').siblings().removeClass('onList');
            })
        })
    }
}

/**
 * js设计模式：单例模式
 * 功能：左侧导航栏整体切换tab
 */

var navSwitch = {
    init: function() {
        this.render();
        this.ergodic();
    },
    render: function() {
        var me = this;
        me.tabMenu = $(".tabMenu");
    },
    ergodic: function() {
        var me = this;
        var index = 1;

        me.tabMenu.each(function() {
            $(this).on('click', function() {
                var myindex = $(this).attr("index");
                $(this).eq(index - 1).addClass('selected').siblings().removeClass('selected');
                $(".tabCon").eq(myindex - 1).addClass('onTab').siblings().removeClass('onTab');
            })
        })
    }
}

/**
 * js设计模式：外观模式
 * 功能: 程序总调用
 * 作用：方便管理调度
 */
var start = (function() {
    //更多产品
    moreProduct.init();
    //导航栏切换（我的导航与推荐导航）
    tabSwitch.init();
    //新闻图片轮播
    newsPlay.init();
    //购物页商品小标签hover效果
    productTag.init();
    //视频标签页-猜你喜欢(轮播)
    videoInterest.init();
    //视频页榜单切换
    videoBand.init();
    //左侧导航栏整体切换tab
    navSwitch.init();
})();
