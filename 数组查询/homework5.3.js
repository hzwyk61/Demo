window.onload = function() {
    var arr = new Array("a", "x", "b", "d", "m", "a", "k", "m", "p", "j", "a");
    var n = 0; //字符的出现的次数
    var max = 0; //输出出现最多的字符
    var most = 0; //输出出现最多的字符的次数
    var order = []; //记录相同字符出现的位次
    var m = 0; //记录这是相同字符中的第几个
    var excute = true;
    calculate.onclick = function() {
        //判断计算是否已经执行过
        if (excute == false) {
            alert('您已经得到了结果');
            return;
        }
        //找出重复出现的字符，并记录次数和位置
        for (var i = 0; i < arr.length; i++) {
            m = 0;
            for (var j = 0; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    n++;
                    order[m] = j + 1;
                    m++;
                }
            }
            //判断是否为出现次数最多的字符
            if (n > most) {
                most = n;
                max = arr[i];
            }
            n = 0;


        }
        var answer = document.getElementById('answer');
        answer.innerHTML += "出现次数最多的字母为：" + max + "</br>";
        answer.innerHTML += '出现的次数为：' + most + "</br>";
        answer.innerHTML += '出现顺序为：' + order + "</br>";
        excute = false;
    }
}
