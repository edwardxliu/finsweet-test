import './styles/style.css';
import './features/magic.js';
import './features/popupVideoControl.js';

import { init as init_cat, observe_animate as observe_cat } from './features/cat.js';
import { init as init_hint_cursor } from './features/hintCursor.js';
import { init as page_progress } from './features/pageProgress.js';
import { init as init_banner, observe_animate as observe_banner } from './features/particles.js';

// play main video
function playAllVideos() {
  $('#bg-video').get(0).firstChild.play();
}

$('#enter-button').click(playAllVideos);

init_hint_cursor();
page_progress();
init_cat();
observe_cat();
init_banner();
observe_banner();
