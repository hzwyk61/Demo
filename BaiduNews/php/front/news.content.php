<?php
     require_once('../connect.php');
     $id = $_GET['id'];
     $query = mysql_query("SELECT * FROM `baidunews` WHERE `id` = $id");
     $content = mysql_fetch_assoc($query);
?>

<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width; initial-scale=1.0">
    <title>百度新闻</title>
    <link rel="stylesheet" href="../../css/news.content.css">
    <link rel="shortcut icon" href="../../img/news-logo.png">
</head>
<body>
	<div class="header">
	    <span id="back" class="back"></span>
		<b class="sort">
			<?php echo $content['sort']?>
		</b>
		<i class="logo"></i>
	</div>
	<div class="article">
		<p class="title">
			<?php echo $content['title']?>
		</p>
		<span class="author">
			<?php echo $content['author']?>
		</span>
		<span class="date">
			<?php echo $content['dateline']?>
		</span>
        <p class="content">
        	<?php echo $content['content']?>
        </p>
	</div>
	<script src="../../javascript/jquery-2.1.4.min.js"></script>
	<script src="../../javascript/news.content.js"></script>
</body>
</html>