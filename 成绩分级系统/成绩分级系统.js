function showLevel(){
    var score = document.getElementById('input').value;
    if(score==""){
    	alert('请输入您的分数');
    	return false;
    // }
    // if(!(/(^[1-9]\d*$)/.test(score))){
    // 	alert('请输入您正确的分数')
    // 	return false;
    }else if(score>=90 && score <=100){
        alert('恭喜您，被评为一等生！')
    }else if(score>=80 && score <90){
    	alert('恭喜您，被评为二等生！')
    }else if(score>=70 && score <80){
    	alert('恭喜您，被评为三等生！')
    }else if(score>=60 && score <70){
    	alert('恭喜您，被评为四等生！')
    }else if(score>=50 && score <60){
    	alert('恭喜您，被评为五等生！')
    }else if(score>=40 && score<50){
    	alert('要加油哦，被评为六等生！')
    }else if(score>=30 && score <40){
    	alert('要加油哦，被评为七等生！')
    }else if(score>=20 && score <30){
    	alert('要加油哦，被评为八等生！')
    }else if(score>=10 && score <20){
    	alert('要加油哦，被评为九等生！')
    }else if(score>=0 && score <10){
    	alert('要加油哦，被评为十等生！')
    }else{
    	alert('请输入您相应的分数')
    }
}