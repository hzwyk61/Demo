window.onload = function() {
	waterFull("container", "box");
	var dataInt = {
		"data":[
		{"src":"43.jpg"},
		{"src":"44.jpg"},
		{"src":"45.jpg"},
		{"src":"46.jpg"},
		{"src":"47.jpg"},
		{"src":"48.jpg"},
		{"src":"49.jpg"},
		{"src":"50.jpg"},
		{"src":"51.jpg"},
		{"src":"52.jpg"},
		{"src":"53.jpg"},
		{"src":"54.jpg"},
		{"src":"55.jpg"},
		]
	};
	window.onscroll = function(){
		var oParent = document.getElementById('container');
	    var oBoxs = getByClass(oParent,'box');
		var lastoBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	    var height = document.body.clientHeight || document.documentElement.clientHeight;
		if(lastoBoxH<scrollTop+height){
			var oParent = document.getElementById("container");
			for(var i=0;i<dataInt.data.length;i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = "pic";
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "./img/" + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterFull('container','box');
		};
	}
}

function waterFull(parent, box) {
		var oParent = document.getElementById(parent);
		var oBoxs = getByClass(oParent, box);
		//计算整个页面的显示列数（页面宽/box宽）
		var oBoxW = oBoxs[0].offsetWidth;
		var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
		//设置container的宽度
		oParent.style.cssText = 'width:' + oBoxW * cols + 'px;margin:0 auto';
		//将每一列的高度存放在hArr数组里
		var hArr = [];
		for (var i = 0; i < oBoxs.length; i++) {
			if (i < cols) { // 前六章的高度值
				hArr.push(oBoxs[i].offsetHeight);
			} else { //从第七章开始找高度最小的
				var minH = Math.min.apply(null, hArr); //apply()用于改变函数属性和this指向
				//获取高度最小列所对应的left值
				var index = getMinHleft(hArr, minH)
				oBoxs[i].style.position = 'absolute';
				oBoxs[i].style.top = minH + 'px';
				oBoxs[i].style.left = oBoxW * index + 'px';
//				oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
				hArr[index] += oBoxs[i].offsetHeight;
			}
		};
	}
	//找到container下的所有box元素，将其存入数组boxArr;

function getByClass(parent, clsName) {
	var boxArr = new Array();
	oElements = parent.getElementsByTagName('*');
	for (var i = 0; i < oElements.length; i++) {
		if (oElements[i].className == clsName) {
			boxArr.push(oElements[i]);
		}
	};
	return boxArr;
}

function getMinHleft(arr, val) {
	for (var i in arr) {
		if (arr[i] == val) {
			return i
		}
	};
}

//function checkScrollSlide(){
//	var oParent = document.getElementById('container');
//	var oBoxs = getByClass(oParent,'box');
//	var lastoBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
//	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
//	var height = document.body.clientHeight || document.documentElement.clientHeight;
//	return(lastoBoxH<scrollTop+height)?true:false;
//}



