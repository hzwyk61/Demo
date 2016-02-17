/**
 * Created by Baby on 2016/1/30.
 */

var aliveObj = function () {
    this.fruitNum = 0;
};

aliveObj.prototype.draw = function () {
    context1.fillStyle = "white";
    context1.textAlign = "center";
    context1.save();
    context1.font = "28PX 微软雅黑";
    context1.fillText("AliveTime: " + this.fruitNum + " s", canvas1.width * 0.5, canvas1.height - 40);
    context1.restore();
};

aliveObj.prototype.dead = function () {
    context1.save();
    context1.font = "50PX 微软雅黑";
    context1.fillText("Game Over ", canvas1.width * 0.5, canvas1.height * 0.5);
    context1.restore();
};

var t;
function timeCount() {
    if (!gameOver) {
        alive.fruitNum = alive.fruitNum + 1;
        t = setTimeout("timeCount()", 1000);
        console.log(alive.fruitNum);
    }
}
//大小鱼 果实碰撞
function bigFishFruitsCollision() {
    for (var i = 0; i < fruits.num; i++) {
        //吃篮果实加时间
        if (fruits.alive[i] && fruits.fruitType[i] == "blue") {
            var distance = calLength2(fruits.x[i], fruits.y[i], bigFish.x, bigFish.y);
            if (distance < 625) {
                fruits.dead(i);
                alive.fruitNum++;
            }
        }
        //碰到orange或者小红鱼game over
        if (fruits.alive[i] && fruits.fruitType[i] == "orange") {
            var distance = calLength2(fruits.x[i], fruits.y[i], bigFish.x, bigFish.y);
            if (distance < 625) {
                gameOver = true;
            }
        }
        var distanceFish = calLength2(babyFish.x, babyFish.y, bigFish.x, bigFish.y);
        if (distanceFish < 900) {
            gameOver = true;
        }
    }
}