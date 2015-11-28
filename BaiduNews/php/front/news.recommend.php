<?php
    require_once('../connect.php');
    $recommend = "SELECT * FROM `baidunews` WHERE `sort`='推荐'";
    $query = mysql_query($recommend);
    if($query&&mysql_num_rows($query)){
    	while($rows = mysql_fetch_assoc($query)){
             $data[] = $rows;
    	}
    }
 ?>

 <!DOCTYPE html>
 <html>
 <head>
 	<meta charset="UTF-8">
 	<title>百度新闻</title>
 	<link rel="stylesheet" href="css/frontSort.css">
 </head>
 <body>
    <?php 
        if(!empty($data)){
    	    foreach ($data as $value){
 	?>
 	   <div class="new">
 	   	 <div class="title">
 	      <a href="php/front/news.content.php?id=<?php echo $value['id']?>"><?php  echo $value['title']?></a>
 	     </div>
         <div class="author">
       	   <?php echo $value['author']?>
         </div>
 	     <div class="content">
 	   	   <?php echo $value['content']?>
 	     </div>
 	   </div>
 	<?php
        }
    }
 	?>
 </body>
 </html>
