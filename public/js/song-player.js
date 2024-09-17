document.addEventListener('DOMContentLoaded', () => {
  const playPauseBtn = document.getElementById('play-pause');
  const progress = document.getElementById('progress');
  const currentTime = document.getElementById('current-time');
  const duration = document.getElementById('duration');
  const volumeBtn = document.getElementById('volume');
  const volumeSlider = document.getElementById('volume-slider');

  let sound;

  if (playPauseBtn) {
    const audioUrl = playPauseBtn.getAttribute('data-audio-url');
    sound = new Howl({
      src: [audioUrl],
      html5: true,
      onplay: () => {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      },
      onpause: () => {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      },
      onend: () => {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        progress.value = 0;
      },
      onload: () => {
        duration.textContent = formatTime(sound.duration());
      }
    });

    playPauseBtn.addEventListener('click', () => {
      if (sound.playing()) {
        sound.pause();
      } else {
        sound.play();
      }
    });

    progress.addEventListener('input', () => {
      const time = (progress.value / 100) * sound.duration();
      sound.seek(time);
    });

    volumeBtn.addEventListener('click', () => {
      if (sound.volume() > 0) {
        sound.volume(0);
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        volumeSlider.value = 0;
      } else {
        sound.volume(1);
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        volumeSlider.value = 1;
      }
    });

    volumeSlider.addEventListener('input', () => {
      const volume = parseFloat(volumeSlider.value);
      sound.volume(volume);
      volumeBtn.innerHTML = volume > 0 ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
    });

    setInterval(() => {
      if (sound.playing()) {
        const seek = sound.seek();
        currentTime.textContent = formatTime(seek);
        progress.value = (seek / sound.duration()) * 100;
      }
    }, 1000);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
});
