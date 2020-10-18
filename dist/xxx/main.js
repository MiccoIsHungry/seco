console.log("首页加载成功");
require.config({
    paths:{
        "jquery":"../lib/jquery-1.11.3",
        "index": "./index",
        "banner":"./banner"
    }
})

require(["index","banner"],function(index,banner){
  index.download()
  index.indexActive()
  index.banner()
  banner.move()
})