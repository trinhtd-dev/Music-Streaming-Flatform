document.addEventListener("DOMContentLoaded", () => {
  // Global Player Elements
  const playerBar = document.querySelector(".player-bar");
  const audioPlayer = document.querySelector("#global-audio-player");
  const playButton = document.querySelector("#global-play-button i");
  const songArt = document.querySelector(".player-song-art img");
  const songTitle = document.querySelector(".player-song-info .song-title");
  const songArtist = document.querySelector(".player-song-info .song-artist");
  const currentTimeEl = document.querySelector(".current-time");
  const durationEl = document.querySelector(".duration");
  const progressBar = document.querySelector(".progress-bar");
  const progressBarWrapper = document.querySelector(".progress-bar-wrapper");

  if (!audioPlayer) return;

  let currentSongSrc = null;

  // --- Functions ---
  const playSong = (songData) => {
    if (currentSongSrc !== songData.src) {
      songArt.src = songData.image;
      songTitle.textContent = songData.title;
      songArtist.textContent = songData.artist;
      audioPlayer.src = songData.src;
      currentSongSrc = songData.src;
    }
    audioPlayer.play();
    playerBar.style.display = "grid"; // Show player bar
  };

  const togglePlayPause = () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // --- Event Listeners ---
  // Update play/pause icon
  audioPlayer.addEventListener("play", () => {
    playButton.classList.remove("fa-play");
    playButton.classList.add("fa-pause");
  });

  audioPlayer.addEventListener("pause", () => {
    playButton.classList.remove("fa-pause");
    playButton.classList.add("fa-play");
  });

  // Update progress bar and time
  audioPlayer.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audioPlayer;
    if (duration) {
      const progressPercent = (currentTime / duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
      currentTimeEl.textContent = formatTime(currentTime);
      durationEl.textContent = formatTime(duration);
    }
  });

  // Seek on progress bar click
  progressBarWrapper.addEventListener("click", (e) => {
    const width = progressBarWrapper.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    if (duration) {
      audioPlayer.currentTime = (clickX / width) * duration;
    }
  });

  // Global play button
  playButton.parentElement.addEventListener("click", togglePlayPause);

  // Find all playable items on the page
  const playableItems = document.querySelectorAll(".playable .play-button");
  playableItems.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent link navigation
      e.preventDefault();
      const songContainer = button.closest(".playable");
      const songData = {
        src: songContainer.dataset.songSrc,
        title: songContainer.dataset.songTitle,
        artist: songContainer.dataset.songArtist,
        image: songContainer.dataset.songImage,
      };
      playSong(songData);
    });
  });

  // Handle play button on detail page
  const detailPagePlayButton = document.querySelector("#play-this-song-button");
  if (detailPagePlayButton) {
    detailPagePlayButton.addEventListener("click", () => {
      const page = document.querySelector(".song-detail-page");
      const songData = {
        src: page.dataset.songSrc,
        title: page.dataset.songTitle,
        artist: page.dataset.songArtist,
        image: page.dataset.songImage,
      };
      playSong(songData);
    });
  }
});
