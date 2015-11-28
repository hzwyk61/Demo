<?php
    require_once("../connect.php");
    $sql = "SELECT * FROM `baidunews` order by `dateline` DESC";
    $query = mysql_query($sql);
    if($query&&mysql_num_rows($query)){
    	while ($row=mysql_fetch_assoc($query)) {
    		$data[]=$row;
    	}
    }else{
    		$data = array();
    }
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>新闻管理列表</title>
	<link rel="stylesheet" href="../../css/bootstrap.min.css">
	<link rel="stylesheet" href="../../css/buttons.css">
	<link rel="stylesheet" href="../../css/newsManager.css">
</head>
<body>
	<nav class="navbar navbar-default navbar-fixed-top navSet">
        <div class="container-fluid">
            <div class="navbar-header navbar-right">
                <img alt="Brand" src="../../img/baidu.jpg">
            </div>
            <ul class="nav navbar-nav systemName">
                <li>新闻后台管理系统</li>
            </ul>
        </div>
    </nav>
    <article>
        <section class="sideBar">
            <div class="managerMenu">
                <a href="../news.list.php" class="button button-glow button-3d button-rounded button-primary button-pill">新闻首页</a>
                <a href="news.manage.php" class="button button-glow button-3d button-rounded button-primary button-pill">新闻列表</a>
                <a href="news.add.php" class="button button-glow button-3d button-rounded button-primary button-pill">新闻发布</a>
                <a class="button button-glow button-3d button-rounded button-primary button-pill">新闻来稿</a>
                <a class="button button-glow button-3d button-rounded button-primary button-pill">关于我们</a>
            </div>
        </section>
        <section class="mainContent">
            <div class="newsList">
            	<h3>新闻管理列表</h3>
            	<table class="table table-bordered">
                     <th class="active">
                     	<td class="active">标题</td>
                     	<td class="active">作者</td>
                        <td class="active">分类</td>
                     	<td class="active">日期</td>
                     	<td class="active">操作</td>
                     </th>
                     <?php 
                        if (!empty($data)) {
                        	foreach ($data as $value) {
                     ?>
                     <tr class="warning">
                     	<td><?php echo $value["id"]?></td>
                     	<td style="max-width:350px"><a href="../news.show.php?id=<?php echo $value['id']?>"><?php echo $value["title"]?></a></td>
                     	<td><?php echo $value["author"]?></td>
                        <td><?php echo $value["sort"]?></td>
                        <td><?php echo $value["dateline"]?></td>
                     	<td style="text-align:center">
                          <div class="button-group" id="handle">
                             <a href="news.modify.php?id=<?php echo $value["id"]?>" class="button button-pill button-action button-raised button-rounded " >修改</a>
                             <a href="news.del.handle.php?id=<?php echo $value["id"]?>" onclick="return confirm('您确定要删除改篇报道？')" class="button button-pill button-action button-raised button-rounded"  >删除</a>
                          </div> 
                     	</td>
                     </tr>
                     <?php
                     	}
                     }
                     ?>
                </table>
            </div>
        </section>
    </article>
</body>
</html>
     