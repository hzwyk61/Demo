/**
 * Created by Baby on 2016/1/29.
 */

var bigFishObj = function () {
    this.x;
    this.y;
    this.angle;
    this.bigEyes = new Image();
    this.bigBody = new Image();
    this.bigTail = new Image();
};

bigFishObj.prototype.init = function () {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    this.bigEyes.src = "./images/bigEye0.png";
    this.bigBody.src = "./images/bigSwim0.png";
    this.bigTail.src = "./images/bigTail0.png";
};

bigFishObj.prototype.draw = function () {
    if (!gameOver) {
        //lerp x,y;
        this.x = lerpDistance(mouseX, this.x, 0.96);
        this.y = lerpDistance(mouseY, this.y, 0.96);

        //delta angle     Math.atan2(y,x);
        var deltaY = mouseY - this.y;
        var deltaX = mouseX - this.x;
        var beta = Math.atan2(deltaY, deltaX) + Math.PI;

        //lerp angle
        this.angle = lerpAngle(beta, this.angle, 0.7);

        context1.save();
        context1.translate(this.x, this.y);
        context1.rotate(this.angle);
        context1.drawImage(this.bigEyes, -this.bigEyes.width * 0.5, -this.bigEyes.height * 0.5);
        context1.drawImage(this.bigBody, -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);
        context1.drawImage(this.bigTail, -this.bigTail.width * 0.5 + 30, -this.bigTail.height * 0.5);
        context1.restore();
    }
};

var babyFishObj = function() {
    this.x;
    this.y;
    this.angle;
    this.babyEyes = new Image();
    this.babyBody = new Image();
    this.babyTail = new Image();
};

babyFishObj.prototype.init = function() {
    this.x = canWidth *0.5- 50;
    this.y = canHeight *0.5+ 50;
    this.angle = 0;
    this.babyEyes.src = "./images/babyEye0.png";
    this.babyBody.src = "./images/babyFade0.png";
    this.babyTail.src = "./images/babyTail0.png";
};

babyFishObj.prototype.draw = function() {
    //lerp 小鱼跟随大鱼
    this.x = lerpDistance(bigFish.x,this.x,0.97);
    this.y = lerpDistance(bigFish.y,this.y,0.97);

    //delta angle
    var deltaY = bigFish.y - this.y;
    var deltaX = bigFish.x - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;

    // lerp angle
    this.angle = lerpAngle(beta,this.angle,0.9);

    context1.save();
    context1.translate(this.x,this.y);
    context1.rotate(this.angle);
    context1.drawImage(this.babyTail,-this.babyTail.width *0.5 + 25,-this.babyTail.height *0.5);
    context1.drawImage(this.babyBody,-this.babyBody.width *0.5,-this.babyBody.height *0.5);
    context1.drawImage(this.babyEyes,-this.babyEyes.width *0.5,-this.babyEyes.height *0.5);
    context1.restore();
};