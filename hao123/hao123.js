//更换主题，并将主题存入localStorage
var theme = document.getElementById('theme')

function forest() {
    theme.href = "forest.css";
    var str = theme.href;
    localStorage.setItem("color", str);
}

function sky() {
    theme.href = "sky.css";
    var str = theme.href;
    localStorage.setItem("color", str);
}

function rose() {
    theme.href = "rose.css";
    var str = theme.href;
    localStorage.setItem("color", str);
}

function night() {
    theme.href = "silver.css";
    var str = theme.href;
    localStorage.setItem("color", str);
}

//加载上次主题 导航栏图片轮播
window.onload = function() {
    var target = localStorage.getItem("color");
    if (target.value == "") {
        return;
    } else {
        theme.href = target;
    }

    var magImg = document.getElementById('magImg');
    var time;

    function animate(offset) {
        var newleft = parseInt(magImg.style.left);
        magImg.style.left = newleft + offset + 'px';
        if (newleft < -880) {
            magImg.style.left = 0 + 'px';
        }
    }

    function play() {
        time = setInterval(function() {
            animate(-220);
        }, 2000)
    }
    play();
}
