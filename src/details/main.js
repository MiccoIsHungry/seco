console.log("首页加载成功");
require.config({
    paths:{
        "jquery":"../lib/jquery-1.11.3",
        "jquery-cookie":"../lib/jquery-cookie",
        "detail": "./detail",
    },
    shim: {
        'jquery-cookie': ["jquery"]
    }
})

require(["detail"],function(detail){
    detail.indexActive();
    detail.download();
    detail.matchPic();
    detail.magnifyPic();
    detail.strange()
})