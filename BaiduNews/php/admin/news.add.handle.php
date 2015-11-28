<?php
    require_once('../connect.php');
    //将传递信息入库
    if (!(isset($_POST['title'])&&(!empty($_POST['title'])))){
    	echo "emptyTitle";
        return;
    }
    $title = $_POST['title'];
    if (!(isset($_POST['author'])&&(!empty($_POST['author'])))) {
        echo "emptyAuthor";
        return;
    }
    $author = $_POST['author'];
    $sort = $_POST['sort'];
    if (!(isset($_POST['content'])&&(!empty($_POST['content'])))) {
        echo "emptyContent";
        return;
    }
    $content = $_POST['content'];
    $dateline =date('y-m-d h:i:s',time());
    $insertSql = "INSERT INTO`baidunews`(`title`,`author`,`sort`,`content`,`dateline`)
                  VALUES('".$title."','".$author."','".$sort."','".$content."','".$dateline."')";
    if(mysql_query($insertSql)){
    	echo "addSuccess";
    }else{
    	echo "addFail".mysql_error();
    }