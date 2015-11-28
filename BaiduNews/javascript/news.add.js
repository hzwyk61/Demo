$(document).ready(function(){
	$('#submit').click(function(e) {
    e.preventDefault();
    $.ajax({
         url: "../admin/news.add.handle.php",
         data:$('#form').serialize(),
         type: "post",
         success:function(data){
              if(data == "emptyTitle"){
              	alert('标题不能为空');
              }
              if(data == "emptyAuthor"){
              	alert('作者不能为空');
              }
              if(data == "emptyContent"){
              	alert('内容不能为空');
              }
              if(data == "addSuccess"){
              	alert('文章发布成功');
              	window.location = "../news.list.php";
              }
              console.log(data);
         } 
    });
})
})