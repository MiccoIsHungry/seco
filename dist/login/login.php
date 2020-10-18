<?php
    header("Content-type:text/html;charset=utf-8");

    $responseData = array("code" => 0, "msg" => "");

    $username = $_POST['username'];
    $password = $_POST['password'];

    if(!$username){
        $responseData['code'] = 1;
        $responseData['msg'] = "用户名不能为空";
        echo json_encode($responseData);
        exit;
    }

    if(!$password){
        $responseData['code'] = 2;
        $responseData['msg'] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }

    //1
    $link = mysqli_connect('127.0.0.1','root','12345678');
    //2
    if(!$link){
        echo '数据库链接失败';
        exit;
    }
    //3
    mysqli_set_charset($link,'utf8');
    //4
    mysqli_select_db($link,'test1');
    //5
    $str = md5(md5(md5($password).'qingdao').'jiami2');

    $sql = "SELECT * FROM users WHERE username='{$username}' AND password='{$str}'";

    $res = mysqli_query($link,$sql);

    $row = mysqli_fetch_assoc($res);

    if(!$row){
        $responseData['code'] = 3;
        $responseData['msg'] = '用户名或密码错误';
        echo json_encode($responseData);
        exit;
    }
    $responseData['msg'] = '登录成功';
    echo json_encode($responseData);

    mysqli_close($link);
?>