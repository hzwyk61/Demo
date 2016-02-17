/**
 * Created by Baby on 2016/1/29.
 */

var aneObj = function () {
    this.x = [];
    this.len = [];
};

aneObj.prototype.num = 50;

aneObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.x[i] = i * 16 + Math.random() * 20;
        this.len[i] = 80 + Math.random() * 50;
    }
};

aneObj.prototype.draw = function () {
    //save();restore();样式设置仅在此之间生效
    context2.save();
    context2.globalAlpha = 0.6;
    context2.lineWidth = 20;
    context2.lineCap = "round";
    context2.strokeStyle = "seagreen";
    for (var i = 0; i < this.num; i++) {
        context2.beginPath();
        context2.moveTo(this.x[i], canHeight);
        context2.lineTo(this.x[i], canHeight - this.len[i]);
        context2.stroke();
    }
    context2.restore();
};