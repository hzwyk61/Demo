/**
 * Created by Baby on 2016/1/29.
 */
var canvas1;
var canvas2;

var context1;
var context2;

var lastTime;
var deltaTime;
//背景设置
var bgPic = new Image();
var canWidth;
var canHeight;

//海葵
var anemone;

//果实
var fruits;

//大鱼,小鱼
var bigFish;
var babyFish;

//鼠标
var mouseX;
var mouseY;

var alive;
var gameOver = false;

//body加载完后，把game作为所有JS脚本的入口
document.body.onload = game;

function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameLoop();
}

function init() {
    canvas1 = document.getElementById('canvas1'); //fish,dust,UI,circle
    canvas2 = document.getElementById('canvas2'); // background, anemone, fruits
    context1 = canvas1.getContext("2d");
    context2 = canvas2.getContext("2d");

    //鼠标监听
    canvas1.addEventListener('mousemove', onMouseMove, false);

    bgPic.src = "./images/background.jpg";
    canWidth = canvas1.width;
    canHeight = canvas1.height;
    anemone = new aneObj();
    anemone.init();

    fruits = new fruitObj();
    fruits.init();

    bigFish = new bigFishObj();
    bigFish.init();

    babyFish = new babyFishObj();
    babyFish.init();

    mouseX = canWidth * 0.5;
    mouseY = canHeight * 0.5;

    //游戏规则
    alive = new aliveObj();
    timeCount();
}

function gameLoop() {
    requestAnimationFrame(gameLoop);//根据当前设备性能来决定下次执行,相比setTimeout,setInterval
    var now = Date.now();
    deltaTime = now - lastTime; //每两帧之间的时间间隔，用来保证动画流畅
    lastTime = now;
    if (deltaTime > 40) deltaTime = 40;

    drawBackground();
    anemone.draw();
    fruitMonitor();//判断屏幕果实数量
    fruits.draw();

    context1.clearRect(0, 0, canWidth, canHeight);
    bigFish.draw();
    babyFish.draw();

    bigFishFruitsCollision();//生死判断


    alive.draw();
    if (gameOver) {
        alive.dead();
    }
}

function onMouseMove(e) {
    if (e.offsetX || e.layerX) {
        mouseX = e.offsetX == undefined ? e.layerX : e.offsetX;
        mouseY = e.offsetY == undefined ? e.layerY : e.offsetY;
    }
}

function drawBackground() {
    context2.drawImage(bgPic,0,0,canWidth,canHeight);
}