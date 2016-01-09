$(document).ready(function() {
    headSearch(); //头部搜索框移入移出点击效果
    ad(); //banner轮播图
    lessonTab(); //标签页鼠标移入切换
    com(); //合作媒体按钮轮播
    reTop(); //回到顶部函数
});

function headSearch() {
    var input = $(".input_search");
    var btn = $("#search_button");
    var hotWords = $("#hotwords");
    input.on('click', function() {
        btn.css('background', '#35b558 url(images/topsearch1.png) center no-repeat');
        hotWords.hide();
    });
    input.blur(function() {
        btn.css('background', 'url(images/topsearch2.png) center no-repeat');
        hotWords.show();
    });

    btn.hover(
        function() {
            btn.css('background', '#35b558 url(images/topsearch1.png) center no-repeat');
        },
        function() {
            btn.css('background', 'url(images/topsearch2.png) center no-repeat');
        }
    );
};


function ad() {
    var banner = $('.index_banner');
    var box = $('#img_box');
    var right = $('#banner_right');
    var left = $('#banner_left');
    var buttons = $('#buttons span');
    var index = 1;
    var timer;


    banner.hover(stop, play);

    right.click(function() {
        if (index == 5) {
            index = 1;
        } else {
            index += 1
        }
        showButton();
        animate(-570);
    });

    left.click(function() {
        if (index == 1) {
            index = 5;
        } else {
            index -= 1
        }
        showButton();
        animate(570);
    });


    function showButton() {
        buttons.eq(index - 1).addClass('on').siblings().removeClass('on');
    };

    function animate(offset) {
        var boxLeft = parseInt(box.css('left')) + offset;
        if (offset > 0) {
            offset = '+=' + offset;
        } else {
            offset = '-=' + Math.abs(offset);
        }

        box.animate({
            'left': offset
        }, 600, function() {
            if (boxLeft > -570) {
                box.css('left', '-2850px');
            }
            if (boxLeft < -2850) {
                box.css('left', '-570px');
            }
        })
    };


    function play() {
        timer = setTimeout(function() {
            right.trigger('click');
            play();
        }, 3000);
    };

    function stop() {
        clearTimeout(timer);
    };
    play();

    buttons.each(function() {
        $(this).click(function() {
            if ($(this).is(':animate') || $(this).attr('class') == 'on') {
                return;
            }
            var myindex = parseInt($(this).attr('index'));
            var offset = -570 * (myindex - index);
            index = myindex;
            showButton();
        })
    });

}

function lessonTab(){
    $('.category').each(function() {
        $(this).on('mouseover', function() {
            var myindex = $(this).attr('index');
            $(this).eq(0).addClass('cateSelect').siblings().removeClass('cateSelect')
            $('.sixLesson').eq(myindex - 1).addClass('onLesson').siblings().removeClass('onLesson')
        })
    })
};

function com() {
    var contanier = $('#enterprise_box');
    var box2 = $('#company');
    var left2 = $('#company_left');
    var right2 = $('#company_right');

    left2.click(function() {
        animate(160);
    });

    right2.click(function() {
        animate(-160)
    });

    function animate(offset) {
        var newLeft = parseInt(box2.css('left')) + offset;
        if (offset > 0) {
            offset = '+=' + offset;
        }
        if (offset < 0) {
            offset = '-=' + Math.abs(offset);
        }
        box2.animate({
            'left': offset
        }, 500, function() {
            if (newLeft > -160) {
                box2.css('left', '-2080px')
            }
            if (newLeft < -2080) {
                box2.css('left', '-160px')
            }
        })
    };
}

function reTop() {
    var btn = document.getElementById('top');
    var lenTop = document.documentElement.scrollTop || document.body.scrollTop;
    var timer;
    var isTop = true;

    btn.onclick = function() {
        timer = setInterval(function() {
            var lenTop = document.documentElement.scrollTop || document.body.scrollTop;
            var ispeed = Math.floor(-lenTop / 3);
            document.documentElement.scrollTop = document.body.scrollTop = lenTop + ispeed;

            // var isTop = true;
            if (lenTop == 0) {
                clearInterval(timer);
            }
        }, 20);
    };
}