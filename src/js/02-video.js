import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

const updateCurrentTime = (time) => {
  localStorage.setItem('videoplayer-current-time', time);
};

const getCurrentTime = () => {
  return parseFloat(localStorage.getItem('videoplayer-current-time')) || 0;
};

player.ready().then(() => {
  player.getCurrentTime().then((time) => {
    updateCurrentTime(time);
  });

  player.on('timeupdate', throttle((event) => {
    updateCurrentTime(event.seconds);
  }, 1000));
});

window.addEventListener('load', () => {
  const currentTime = getCurrentTime();
  player.setCurrentTime(currentTime).then(() => {
    player.play();
  });
});

