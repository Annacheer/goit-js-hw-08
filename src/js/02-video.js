import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
  id: "vimeo-player",
  width: 640
});

player.on('play', function() {
  console.log('Відео почало відтворюватися!');
});

function updateTime() {
  player.getCurrentTime()
    .then(function(currentTime) {
      localStorage.setItem('videoplayer-current-time', Math.floor(currentTime));
    })
    .catch(function(error) {
      console.log('Помилка отримання поточного часу відтворення:', error);
    });
};

const throttledUpdateTime = throttle(updateTime, 1000);

const savedTimeVideo = localStorage.getItem('videoplayer-current-time');
if (savedTimeVideo) {
  player.setCurrentTime(savedTimeVideo)
    .then(function (seconds) {
      console.log('Встановлено позицію відтворення на ', seconds, 'секунд');
    })
    .catch(function (error) {
       console.log('Помилка встановлення часу відтворення:', error);
    });
};

player.on('timeupdate', throttledUpdateTime);
