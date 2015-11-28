<?php
     require_once('../connect.php');
     mysql_query('set name utf8');
     $id = $_GET['id'];
     $delete = "DELETE FROM `baidunews` WHERE `id`=$id";
     if(mysql_query($delete)){
          echo "<script>alert('新闻删除成功');window.location.href='news.manage.php'</script>";
     }else{
          echo "<script>alert('新闻删除失败');window.location.href='news.manage.php'</script>";
     }