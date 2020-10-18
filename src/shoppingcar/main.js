console.log("首页加载成功");
require.config({
    paths:{
        "jquery":"../lib/jquery-1.11.3",
        "jquery-cookie":"../lib/jquery-cookie",
        "shoppingcar": "./shoppingcar",
    },
    shim: {
        'jquery-cookie': ["jquery"]
    }
})

require(["shoppingcar"],function(shoppingcar){
   shoppingcar.download();
   shoppingcar.deleteBtn();
   shoppingcar.addDeduceBtn();
   shoppingcar.settleAccount();
   shoppingcar.allChecked();
}) 