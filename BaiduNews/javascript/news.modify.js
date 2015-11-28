$(document).ready(function(){
	$("#btn").click(function(){
		$.ajax({
			url:"../admin/news.modify.handle.php",
			data:$("#form").serialize(),
			type:"post",
			success:function(data){
				if(data == "success"){
					alert("新闻修改成功");
					window.location = "../news.list.php";
				}else{
					alert("修改失败");
				}
			}
		})
	})
})