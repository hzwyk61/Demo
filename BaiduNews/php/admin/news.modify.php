<?php
   require_once('../connect.php');
   //读取旧信息
   $id = $_GET['id'];
   $query = mysql_query("SELECT * FROM `baidunews` WHERE `id` = $id");
   $data = mysql_fetch_assoc($query);
?>


<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>百度新闻后台管理系统</title>
    <link rel="stylesheet" href="../../css/bootstrap.min.css">
    <link rel="stylesheet" href="../../css/buttons.css">
    <link rel="stylesheet" href="../../css/newsManager.css">
    <script src="../../javascript/jquery-2.1.4.min.js"></script>
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
                <a href="news.modify.php" class="button button-glow button-3d button-rounded button-primary button-pill">新闻修改</a>
                <a class="button button-glow button-3d button-rounded button-primary button-pill">新闻来稿</a>
                <a class="button button-glow button-3d button-rounded button-primary button-pill">关于我们</a>
            </div>
        </section>
        <section class="mainContent">
            <div class="newsModify">
                 <h3>修改新闻</h3>
                <form id="form">
                    <input type="hidden" name="id" value="<?php echo $data['id']?>">
                    <div class="form-group">
                        <label for="title">新闻标题:</label>
                        <input type="text" class="form-control" name="title" value="<?php echo $data['title']?>">
                    </div>
                    <div class="form-group">
                        <label for="author">文章作者:</label>
                        <input type="text" class="form-control" name="author" value="<?php echo $data['author']?>">
                    </div>
                    <div class="form-group">
                        <label for="sort">新闻类别:</label>
                        <select name="sort" class="form-control">
                             <option value="推荐">推荐</option>
                            <option value="科技">科技</option>
                            <option value="本地">本地</option>
                            <option value="军事">军事</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="content">新闻内容:</label>
                        <textarea class="form-control" name="content" rows="9"><?php echo $data['content']?></textarea>
                    </div>
                    <input type="button" id="btn"class="button button-3d button-glow button-border button-rounded button-action" value="修改">
                    <input type="reset" class="button button-3d button-glow button-border button-rounded button-highlight" value="重置">
                </form>
            </div>
        </section>
    </article>
    <script src="../../javascript/news.modify.js"></script>
</body>

</html>
