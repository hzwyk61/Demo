window.onload = function() {
    //目录展开收起
    spread();
    //回到顶部
    reTop();
}

var spread = function() {
    var list = document.getElementById("list");
    var ul = document.getElementById("ul");
    var time;
    var flag = true;

    ul.style.height = 85 + "px"
    list.onclick = function() {
        // if (ul.style.height == 1 + "px") {
        //     ul.style.animation = "spread 1s forwards";
        //     ul.style.WebkitAnimation = "spread 0.6s forwards";
        //     ul.style.height = 84 +"px";
        // } else {
        //     ul.style.animation = "shrink 1s forwards";
        //     ul.style.WebkitAnimation = "shrink 0.6s forwards";
        //     ul.style.height = 1 +"px";
        // }

        if (flag) {
            time = setInterval(function() {
                var height = parseInt(ul.style.height);
                ul.style.height = height - 14 + "px";
                if (ul.style.height == 1 + "px") {
                    clearInterval(time);
                    flag = false;
                }
            }, 30);
        } else if (!flag) {
            time = setInterval(function() {
                var height = parseInt(ul.style.height);
                ul.style.height = height + 14 + "px";
                if (ul.style.height == 85 + "px") {
                    clearInterval(time);
                    flag = true;
                }
            }, 30);
        }
    }
};

var reTop = function() {
    var reTop = document.getElementById("reTop");
    var time;

    //滚动条滚动时触发
    // window.onscroll = function() {
    //     var container = document.getElementById("container");
    //     container.onclick = function() {
    //         clearInterval(time);
    //     }
    // }

    reTop.onclick = function() {
        time = setInterval(function() {
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            var ispeed = Math.floor(-osTop / 3);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
            if (osTop == 0) {
                clearInterval(time);
            }
        }, 30)
    }
};
