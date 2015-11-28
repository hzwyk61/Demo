<?php
     $con = mysql_connect('127.0.0.1','root','');
     if (!$con) {
     	die('connect failed:'.mysql_error());
     }
     //选择数据库
     if(!mysql_select_db('news_manager')){
     	die('Error:'.mysql_error());
     }
     //字符集
     if(!mysql_query('set names utf8')){
     	die('Error:'.mysql_error());
     }
?>
