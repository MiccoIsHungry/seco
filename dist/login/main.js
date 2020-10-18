console.log("加载成功");
require.config({
    paths:{
        "jquery":"../lib/jquery-1.11.3",
        "login": "login"
    }
})

require(["login"], function(login){
    login.index();
})


