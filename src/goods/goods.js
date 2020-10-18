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
            url: "./nav.json",
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


    function goodsList() {
        $.ajax({
            url: "./goodsList.json",
            success: function (arr) {
                for (let i = 0; i < arr.length; i++) {
                    let str = ``;
                    const node = $(`<a href="../details/detail.html?id=${arr[i].details.id}" target="blank" class="goods-box"></a>`);
                    node.appendTo($(".goods"));
                    for (let j = 0; j < arr[i].items.num.length; j++) {
                        str += ` <span>${arr[i].items.num[j]}</span>`;
                    }
                    $(`<img src="${arr[i].items.image}" alt="">
                    <div class="shoesNum"> ${str}</div>
                    <div class="gb-title">
                        <span>欧洲</span>
                        <span>自营</span>
                        <span>直降</span>
                    </div>
                    <div class="gb-line"></div>
                    <div class="gb-text">
                        ${arr[i].details.text}
                    </div>
                    <h4><span>${arr[i].details.price}</span>
                    <span>收藏</span> </h4>`).appendTo(node);

                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }


    function lastGoods() {
        $.ajax({
            url: "./lastGoods.json",
            success: function (arr) {
                for (let i = 0; i < arr.length; i++) {
                    const node = $(`<div class="fg-box"></div>`);
                    node.appendTo($(".foot-goods"));
                    $(`<div class="fg-img"><img src="${arr[i].items.image}" alt=""></div>
                        <a href="javascript:;">${arr[i].items.text}</a>
                        <h3>${arr[i].items.price}</h3>`).appendTo(node);
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    function addTitle() {
        $.ajax({
            url: "./title.json",
            success: function (arr) {
                for (let i = 0; i < arr.length; i++) {
                    const node = $(`<dl><dt>${arr[i].title}</dt><div class="spr-div"></div></dl>`).appendTo(".catalog-box");
                    for (let j = 0; j < arr[i].content.length; j++) {
                        $(`
                        <a href="javascript:;">${arr[i].content[j]}</a>
                    `).appendTo(node.find(".spr-div"));
                    }
                }
                $(".spr-div").on("click", "a", function () {
                    console.log(this);
                    const a = $(this).html();
                    $(this).parent().parent().remove();
                    $(`<span class="spr-dt">${a}<a href="javascript:history.go(-1);location.reload()" class="spr-span">×</a></span>`).appendTo($(".ff"))
                })
                $(".ff").on("click", ".spr-span", function () {
                    $(this).parent().remove();
                    const node = $(`<dl><dt>${arr[i].title}</dt><div class="spr-div"></div></dl>`).appendTo(".catalog-box");
                })

            },
            error: function (msg) {
                console.log(msg);
            }
        })

    }


    return {
        indexActive,
        download,
        goodsList,
        lastGoods,
        addTitle
    }
})


