
const popup_play_buttons = document.getElementsByClassName("item-link");
const popup_close_buttons = document.getElementsByClassName("popup-close");
const popup_close_bg = document.getElementsByClassName("popup-background");

for (var i = 0; i < popup_close_buttons.length; i++) {
  // popup_close_buttons[i].onclick = pauseVideo;
  popup_close_buttons[i].addEventListener("click", pauseVideo);
  popup_close_bg[i].addEventListener("click", pauseVideo);
}
for (var i = 0; i < popup_play_buttons.length; i++) {
  popup_play_buttons[i].addEventListener("click", playVideo);
}

function playVideo(e) {
  var target = (e && e.target) || (event && event.srcElement);
  while (target) {
    if (target.classList.contains('grid-item')) {
      break;
    }
    // Note: May want parentElement here instead.
    target = target.parentNode;
  }
  target.getElementsByClassName('popup-video')[1].play();
}

function pauseVideo(e) {
  var target = (e && e.target) || (event && event.srcElement);
  while (target) {
    if (target.classList.contains('popup-inner')) {
      break;
    }
    // Note: May want parentElement here instead.
    target = target.parentNode;
  }
  target.getElementsByClassName('popup-video')[1].pause();
}