define(["jquery"], function($){
    function index(){
        $("#btn1").click(function(){
            $.ajax({
                url: "login.php",
                type: 'post',
                data: {
                    username: $("[name=username]").val(),
                    password: $("[name=password]").val()
                },
                dataType: "json",
                success: function(result){
                    if(result.code){
                        //有问题
                        $(".spr-block").show().html("登录失败").css("color","red");
                    }else{
                        //成功 修改背景颜色
                        $(".spr-block").show().html("登录成功").css("color","yellowgreen");
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            })

            return false;
        })
    }

    return {
        index: index
    }
})