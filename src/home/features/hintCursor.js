
import "./TweenMax.min"
var tooltipSpan = document.getElementById('tooltip-span');


function init() {
  window.onmousemove = function (e) {
    var x = e.clientX,
      y = e.clientY;
    tooltipSpan.style.top = (y + 20) + 'px';
    tooltipSpan.style.left = (x + 20) + 'px';
  };

  window.onmousedown = function (e) {
    tooltipSpan.style.display = "none";
  };

  window.onmouseup = function (e) {
    tooltipSpan.style.display = "block";
  };

  if (window.innerWidth <= 768) {
    // document.getElementsByTagName('BODY')[0].style.cursor = 'default'
  } else {
    customCursor()
  }

  // $(window).resize(function () {
  //   if (window.innerWidth <= 768) {
  //     var cursor = $(".cursor"),
  //       follower = $(".cursor-follower");
  //     // cursor.remove()
  //     // follower.remove()
  //     // cursor.addClass("hide");
  //     // follower.addClass("hide");
  //     $('body').css({
  //       cursor: "default",
  //       follower: "default",
  //     })
  //     // document.getElementsByTagName('BODY')[0].style.cursor = 'default'
  //   } else {
  //     // $('body').css({
  //     //   cursor: "none",
  //     //   follower: "none",
  //     // })
  //     // var cursor = $(".cursor"),
  //     //   follower = $(".cursor-follower");
  //     // cursor.removeClass("hide");
  //     // follower.removeClass("hide");
  //     customCursor()
  //   }
  // });
}

function customCursor() {
  var cursor = $(".cursor"),
    follower = $(".cursor-follower");

  var posX = 0,
    posY = 0;

  var mouseX = 0,
    mouseY = 0;

  TweenMax.to({}, 0.006, {
    repeat: -1,
    onRepeat: function () {
      posX += (mouseX - posX) / 9;
      posY += (mouseY - posY) / 9;

      TweenMax.set(follower, {
        css: {
          left: posX - 0,
          top: posY - 0
        }
      });

      TweenMax.set(cursor, {
        css: {
          left: mouseX,
          top: mouseY
        }
      });
    }
  });

  $(document).on("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  $("a.f-bg-vid-keeper.w-inline-block, .f-grid-link").on("mouseenter", function () {
    cursor.addClass("active");
    follower.addClass("active");
  });
  $("a.f-bg-vid-keeper.w-inline-block, .f-grid-link").on("mouseleave", function () {
    cursor.removeClass("active");
    follower.removeClass("active");
  });

  $(".with-pov-h1-holder").on("mouseenter", function () {
    cursor.addClass("video");
    follower.addClass("video");
  });
  $(".with-pov-h1-holder").on("mouseleave", function () {
    cursor.removeClass("video");
    follower.removeClass("video");
  });

  $(".vjs-progress-holder").on("mouseenter", function () {
    cursor.addClass("bar");
    follower.addClass("bar");
  });
  $(".vjs-progress-holder").on("mouseleave", function () {
    cursor.removeClass("bar");
    follower.removeClass("bar");
  });

}
export { init };