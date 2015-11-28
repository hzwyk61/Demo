$(document).ready(function(){
	$("#content").load('php/front/news.recommend.php');
	
	$("#recommend").on('click',function(){
         $("#content").load('php/front/news.recommend.php');
	})

	$("#technology").on('click',function(){
         $("#content").load('php/front/news.technology.php');
	})

	$("#location").on('click',function(){
         $("#content").load('php/front/news.location.php');
	})

	$("#military").on('click',function(){
         $("#content").load('php/front/news.military.php');
	})
})