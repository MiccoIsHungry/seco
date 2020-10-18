console.log("首页加载成功");
require.config({
    paths:{
        "jquery":"../lib/jquery-1.11.3",
        "goods": "./goods",
    }
})

require(["goods"],function(goods){
    goods.indexActive(),
    goods.download(),
    goods.goodsList(),
    goods.lastGoods(),
    goods.addTitle()
})