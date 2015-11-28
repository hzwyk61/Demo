<?php
     require_once('../connect.php');

     $id = $_POST['id'];
     $title = $_POST['title'];
     $author = $_POST['author'];
     $sort = $_POST['sort'];
     $content = $_POST['content'];
     $dateline = date('y-m-d h:i:s',time());

     $updataSql = "UPDATE `baidunews` SET `title`='$title',`author`='$author',`sort`='$sort',`content`='$content',`dateline`='$dateline' WHERE `id`='$id'"; 

     if (mysql_query($updataSql)) {
     	echo "success";
     }else{
     	echo "failed";
     }