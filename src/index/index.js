define(["jquery"], function ($) {
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
            url: "./data.json",
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

    function banner() {
        $.ajax({
            url: "./banner.json",
            success: function (arr) {
                console.log(arr)

                for (let i = 0; i < arr.length; i++) {

                    var node = $(`<div class="big"></div>`)
                    node.appendTo($(".goods .bbig"))
                    for (let j = 0; j < arr[i].length; j++) {
                        $(`
                        <div class="goods-box">
                    <div class="goods-imgs">
                <img src="${arr[i][j].goods.img}" alt="">
                <div class="mask"></div>
            </div>
            <div class="goods-details">
                <p>${arr[i][j].goods.data[0]}</p>
                <p>${arr[i][j].goods.data[1]}</p>
                <div class="line3"></div>
                <p>${arr[i][j].goods.data[2]}</p>
            </div></div>`).appendTo(node)
                    }
                }

            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }



    return {
        indexActive,
        download,
        banner
    }
})