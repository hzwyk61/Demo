<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>百度新闻后台管理系统</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/buttons.css">
    <link rel="stylesheet" href="../css/newsManager.css">
</head>

<body>
    <nav class="navbar navbar-default navbar-fixed-top navSet">
        <div class="container-fluid">
            <div class="navbar-header navbar-right">
                <img alt="Brand" src="../img/baidu.jpg">
            </div>
            <ul class="nav navbar-nav systemName">
                <li>新闻后台管理系统</li>
            </ul>
        </div>
    </nav>
    <article>
        <section class="sideBar">
            <div class="managerMenu">
                <a href="news.list.php" class="button button-glow button-3d button-rounded button-primary button-pill">新闻首页</a>
                <a href="admin/news.manage.php" class="button button-glow button-3d button-rounded button-primary button-pill">新闻列表</a>
                <a href="admin/news.add.php" class="button button-glow button-3d button-rounded button-primary button-pill">新闻发布</a>
                <a class="button button-glow button-3d button-rounded button-primary button-pill">新闻来稿</a>
                <a class="button button-glow button-3d button-rounded button-primary button-pill">关于我们</a>
            </div>
        </section>
        <section class="mainContent">
            <div class="homePage">
            <?php 
                require_once('connect.php');
                $sql = "SELECT * FROM `baidunews`order by `dateline` DESC";
                $query = mysql_query($sql);
                if ($query&&mysql_num_rows($query)) {
                    while ($rows = mysql_fetch_assoc($query)) {
                        $data[] = $rows;
                    }
                }
                if (!empty($data)) {
                    foreach ($data as $value) {
            ?>

                <div class="panel panel-default">
                    <div class="panel-heading artTitle">
                        <h2><a href="news.show.php?id=<?php echo $value['id']?>"><?php echo $value['title']?></a></h2>
                        <small>作者:<?php echo $value['author']?></small>
                    </div>
                    <div class="panel-body abstract">
                       <?php echo $value['content']?>
                    </div>
                </div>
            <?php
                    }
                }
            ?>
            </div>
        </section>
    </article>
</body>

</html>
