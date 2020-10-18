define(["jquery", "jquery-cookie"], function ($) {
    function indexActive() {
        $(".h-leftBox").on("mouseenter", "li", function () {
            $(this).addClass("active-first");
        })
        $(".h-leftBox").on("mouseout", "li", function () {
            $(this).removeClass("active-first");
        })
        $(".h-rightBox").on("mouseenter", "li", function () {
            $(this).addClass("active-first");
        })
        $(".h-rightBox").on("mouseout", "li", function () {
            $(this).removeClass("active-first");
        })
    }






    function download() {
        $.ajax({
            url: "../goods/nav.json",
            success: function (arr) {
                $('.nav-left li').each(function (index, item) {
                    if (!arr[index].fenlei) return
                    let str = ``
                    let str1 = ``
                    const str2 = $(this).html()
                    for (let i = 0; i < arr[index].fenlei.data.length; i++) {
                        str += `<li>${arr[index].fenlei.data[i]}</li>`
                    }
                    for (let i = 0; i < arr[index].brand.data.length; i++) {
                        str1 += `<li>${arr[index].brand.data[i]}</li>`
                    }
                    const fenlei = `<div class="list">
                <div class="classfy">
                    <h3 class="en">${arr[index].fenlei.title}</h3>
                    <ul class="zhen zhen1">${str}</ul>
                </div>
                <div class="classfy">
                    <h3>${arr[index].brand.title}</h3>
                    <ul class="zhen">${str1}</ul>
                </div>
                </div>`
                    $(this).html(`${str2}${fenlei}`)
                })
            },
            error: function (msg) {
                console.log(msg);
            }
        })

    }


    //根据当前
    function GetQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = window.location.search.substr(1).match(reg) //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2])
        return null
    }


    function matchPic() {
        $.ajax({
            url: "./magnify.json",
            success: function (obj) {
                for (let i = 0; i < obj[GetQueryString("id")].img.length; i++) {
                    $(`<div class="mbltl-1"><img src="${obj[GetQueryString("id")].img[i].img}" alt=""></div>`).appendTo($(".mblt-left"));
                    $(`<img src="${obj[GetQueryString("id")].img[i].img}" alt="">`).appendTo($(".img"));
                    $(".mb-right h3").html(`${obj[GetQueryString("id")].title.txt}`);
                }
                $(`<img src="${obj[GetQueryString("id")].img[1].img}" alt="">`).appendTo(".mblt-right");
                $(`<img src="${obj[GetQueryString("id")].img[1].img}" alt="">`).appendTo($(".big"));
                $(".mblt-left").on("mouseenter", ".mbltl-1", function () {
                    const a = $(this).index();
                    // console.log(a);
                    $(".mblt-right img").remove();
                    $(`<img src="${obj[GetQueryString("id")].img[a].img}" alt="">`).appendTo($(".mblt-right"));
                    $(`<img src="${obj[GetQueryString("id")].img[a].img}" alt="">`).appendTo($(".big"));
                })
            },
            error: function (msg) {
                console.log(msg);
            }
        })

    }


    function magnifyPic() {
        $(".mblt-right").mouseenter(function () {
            $(".mask").show();
            $(".big").show();
        }).mouseleave(function () {
            $(".mask").hide();
            $(".big").hide();
        }).mousemove(function (ev) {
            let l = ev.clientX - $(this).offset().left + window.scrollX - 75;
            l = Math.max(0, l);
            l = Math.min(l, 216);
            let t = ev.clientY - $(this).offset().top + window.scrollY - 75;
            t = Math.max(0, t);
            t = Math.min(t, 216);
            $(".mask").css({
                left: l,
                top: t
            })
            $(".big img").css({
                left: -2 * l,
                top: -2 * t
            })
        })

    }


    //cookie

    function strange() {
        $(".scc-btn").click(function () {
            let id = Number(GetQueryString("id"));
            //判断是否第一次添加
            let first = !($.cookie("mockgoods"));
            if (first) {
                $.cookie("mockgoods", JSON.stringify([{ id: id, num: 1 }]), {
                    expires: 7,
                    path: "/"
                });
            } else {
                //not first,check history
                let cookieArr = JSON.parse($.cookie("mockgoods"));
                let same = false; //假设没有相同的数据
                for (let i = 0; i < cookieArr.length; i++) {
                    if (cookieArr[i].id == id) {
                        same = true;
                        cookieArr[i].num++
                        break;
                    }
                }
                if (!same) cookieArr.push({ id: id, num: 1 });

                $.cookie("mockgoods", JSON.stringify(cookieArr), {
                    expires: 7,
                    path: "/"
                })

            }
            alert($.cookie("mockgoods"));
        })

    }





    return {
        indexActive,
        download,
        matchPic,
        magnifyPic,
        strange
    }
}) 