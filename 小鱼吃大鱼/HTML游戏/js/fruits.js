/**
 * Created by Baby on 2016/1/29.
 */

var fruitObj = function () {
    this.alive = []; //boolean
    this.x = [];
    this.y = [];
    this.l = [];  //果实大小
    this.speed = [];  //每个果实的成长和上漂速度
    this.orange = new Image();
    this.blue = new Image();
};

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.speed[i] = Math.random() * 0.05 + 0.005;  //[0.005,0.055);
        this.fruitType = [];
    }
    this.orange.src = "./images/fruit.png";
    this.blue.src = "./images/blue.png";
};

fruitObj.prototype.draw = function () {
    if (!gameOver) {
        for (var i = 0; i < this.num; i++) {
            if (!(this.alive[i] = true)) {
            } else {
                if (this.fruitType[i] == "blue") {
                    var pic = this.blue;
                } else {
                    var pic = this.orange;
                }
                if (this.l[i] <= 16) {
                    this.l[i] += this.speed[i] * deltaTime;
                } else {
                    this.y[i] -= this.speed[i] * 4 * deltaTime;
                }
                context2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
                if (this.y[i] < 10) {
                    this.alive[i] = false;
                }
            }
        }
    }
};

fruitObj.prototype.bron = function (i) {
    var aneIndex = Math.floor(Math.random() * anemone.num);
    this.x[i] = anemone.x[aneIndex];
    this.y[i] = canHeight - anemone.len[aneIndex];
    this.l[i] = 0;
    this.alive[i] = true;
    //果实类型
    var ran = Math.random();
    if (ran < 0.3) {
        this.fruitType[i] = "blue";
    } else {
        this.fruitType[i] = "orange";
    }

};

fruitObj.prototype.dead = function (i) {
    this.alive[i] = false;
}

function fruitMonitor() {
    var num = 0;
    for (var i = 0; i < fruits.num; i++) {
        if (fruits.alive[i]) {
            num++;
        }
    }
    if (num < 15) {
        sendFruit();
    }

}

function sendFruit() {
    for (var i = 0; i < fruits.num; i++) {
        if (!fruits.alive[i]) {
            fruits.bron(i);
            return;
        }
    }
}