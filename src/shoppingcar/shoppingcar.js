define(["jquery", "jquery-cookie"], function ($) {
    function download() {
        $.ajax({
            url: "../details/magnify.json",
            success: function (obj) {
                var cookieStr = $.cookie("mockgoods");
                if (!cookieStr) {
                    return;
                }
                var cookieArr = JSON.parse(cookieStr);

                for (var i = 0; i < cookieArr.length; i++) {
                    $(` <tr class="goods" id = '${cookieArr[i].id}'>
                   <td><input class="checkBox" value="36256790_0" name="promotionId0" id="choseItem"
                           type="checkbox" checked></td>
                   <td width="97" valign="top">
                       <div class="cartPic padRight15">
                           <a href="http://item.secoo.com/36256790.shtml?source=cart" target="_blank">
                               <img src="${obj[cookieArr[i].id].img[0].img}"
                                   alt="${obj[cookieArr[i].id].title.txt}"
                                   width="80" height="80">
                           </a>
                       </div>
                   </td>
                   <td>
                       <div class="cartNames">
                           <p class="namePro"><a href="http://item.secoo.com/36256790.shtml?source=cart"
                                   target="_blank">${obj[cookieArr[i].id].title.txt}</a></p>
                       </div>
                       <div class="cartNames" style="overflow:visible">
                           <p>
                               颜色：混色&nbsp;&nbsp;
                               尺码：意码40&nbsp;&nbsp;
                           </p>
                       </div>
                   </td>
                   <td valign="top">欧洲</td>
                   <td valign="top"><span class="rmb">¥</span><span class = 'price'>${obj[cookieArr[i].id].price.price}</span></td>
                   <td valign="top">
                       <div class="countNum">
                           <div class="cPlus" action="decrease">-</div>
                           <div class="cInput"><input class="Num" type="text" name="quantity" action="goto"
                                   value="${cookieArr[i].num}"></div>
                           <div class="cMinus" action="increase">+</div>
                       </div>
                   </td>
                   <td valign="top">
                       <strong class="colore93"><span class="rmb colore93">¥</span><span class = 'total'>${obj[cookieArr[i].id].price.price * cookieArr[i].num}</span>元</strong>
                   </td>
                   <td valign="top"><a href="###" class="del" name="deleteRow">删除</a></td>
               </tr>`).appendTo($(".cartSlist table thead"));
                    let totalAccountPrice = obj[cookieArr[i].id].price.price * cookieArr[i].num;
                    $(".totalPriceBottom strong").html(`${obj[cookieArr[i].id].price.price * cookieArr[i].num}元`);
                }
                settleAccount();
            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }

    function deleteBtn() {
        $(".cartSlist table").on("click", "td .del", function () {
            //从页面上删除
            var id = $(this).closest(".goods").remove().attr("id");
            //从cookie中删除
            var cookieStr = $.cookie("mockgoods");
            var cookieArr = JSON.parse(cookieStr);
            for (var i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    cookieArr.splice(i, 1);
                    break;
                }
            }

            if (!cookieArr.length) {
                $.cookie("mockgoods", null, {
                    path: "/"
                });
            } else {
                $.cookie("mockgoods", JSON.stringify(cookieArr), {
                    expires: 7,
                    path: "/"
                })
            }
            settleAccount();
            return false;
        })
    }

    function addDeduceBtn() {
        $(".cartSlist table").on("click", ".countNum .cPlus,.countNum .cMinus", function () {

            var id = $(this).closest('.goods').attr("id");
            var cookieArr = JSON.parse($.cookie("mockgoods"));
            for (var i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    break;
                }
            }
            if (this.className == "cMinus") {
                cookieArr[i].num++;
            } else {
                cookieArr[i].num == 1 ? alert("数量为1，不能减少") : cookieArr[i].num--;
            }

            $.cookie("mockgoods", JSON.stringify(cookieArr), {
                expires: 7,
                path: "/"
            })
            $(this).siblings(".cInput").find("input").val(cookieArr[i].num);
            //计算单个商品的总价
            var total = cookieArr[i].num * parseInt($(this).closest('.goods').find("td .price").html().trim());
            $(this).closest('.goods').find("td  .total").html(total);

            settleAccount();
        })
    }


    function settleAccount() {
        var sum = 0;
        var total = 0;
        var isAll = true;
        $("table").find(".goods").each(function(index, item){
            if($(item).find(".checkBox").prop("checked")){
                sum += parseInt($(item).find(".countNum .Num").val().trim());
                total += parseInt($(item).find(".price").html().trim()) * parseInt($(item).find(".countNum .Num").val().trim());
            }else{
                isAll = false;
            }
        })
        $(".anoright .ar-num1").html(`商品数量总计：${sum}件`);
        $(".anoright .ar-num2").html(`包装数量总计：${sum}件`);
        $(".clearfix strong").html(`商品数量总计：${sum}件`);
        $(".totalPriceBottom strong").html(total);
        $("#choseAll").prop("checked", isAll);
    }


    function allChecked(){
        $("#choseAll").click(function(){
            var iCur = $(this).prop("checked")
            if(iCur){
                $(this).prop("checked", true);
                $("table").find(".goods .checkBox").prop("checked", true);
            }else{
                $(this).prop("checked", false);
                $("table").find(".goods .checkBox").prop("checked", false);
            }
            settleAccount();
        })

        
        $(".cartSlist table").on("click", "[name=promotionId0]", function(){
            settleAccount();
        })

    }
    return {
        download: download,
        deleteBtn: deleteBtn,
        addDeduceBtn: addDeduceBtn,
        settleAccount: settleAccount,
        allChecked: allChecked
    }
})