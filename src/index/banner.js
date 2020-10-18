
define(['jquery','index'], function ($,index) {
  index.banner();
  function move() {
    $(function () {
      //outerhtml不兼容ff
      const htmlFirst = $('.bbig .big')[0].outerHtml;
      // const htmlFirst = $('.bbig').closest('.bbig .big');
      $('.bbig').html($('.bbig').html() + htmlFirst);


      

      const aPics = $('.bbig .big');
      const aBtns = $('.banner-icon').find('span');
      const oLeftBtn = $('.icon-zuofanye');
      const oRightBtn = $('.icon-youfanye');

      const oGoods = $('.bbig');
      let iNow = 1;
      let timer = null;

        // const htmlLast = $('.bbig .big')[aPics.size() - 2].outerHTML
        // $('.bbig').html(htmlLast + $('.bbig').html())

      timerInner();

      $('.big').mouseenter(function () {
        clearInterval(timer);
      })

      $('.big').mouseleave(function () {
        //轮播
        timerInner();
      })

      //按钮移入移出
      $('.banner-icon').on('mouseenter', 'span', function () {
        clearInterval(timer);
      })
      $('.banner-icon').on('mouseleave', 'span', function () {
        timerInner();
      })
      //   鼠标抬起放下
      $('.banner-icon').on('mouseup', 'span', function () {
        $(this).removeClass('active-icon');
      })
      $('.banner-icon').on('mousedown', 'span', function () {
        $(this).addClass('active-icon');
      })

      //点击向左按钮
      oLeftBtn.click(function () {
        iNow--;
        if (iNow < 0) {
          iNow = aPics.size() - 1;
        }
        oGoods.animate(
          {
            left: (iNow - 1) * 1200,
          },
          500,
          function () { }
        )
      })
      //点击向右按钮
      oRightBtn.on('click', function () {
        clearTimeout(timer);
        iNow++;
        tab();
      })

      //轮播
      function timerInner() {
        timer = setInterval(function () {
          iNow++;
          tab();
        }, 2000)
      }

      function tab() {
        oGoods.animate(
          {
            left: (iNow - 1) * -1200,
          },
          500,
          function () {
            //判断是否是最后一张图片
            if (iNow === aPics.size()) {
              iNow = 0;
              oGoods.css('left', 0);
            }
          }
        )
      }
    })
  }

  return {
    move
  }
})