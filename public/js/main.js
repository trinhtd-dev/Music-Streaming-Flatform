document.addEventListener("DOMContentLoaded", () => {
  // --- Logic cho Trang Chi tiết Bài hát ---
  const playButton = document.querySelector(".play-main-button");
  const audioPlayer = document.querySelector("#song-audio");

  if (playButton && audioPlayer) {
    const playIcon = playButton.querySelector("i");

    // Hàm để cập nhật trạng thái
    const togglePlayPause = () => {
      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    };

    // Cập nhật icon khi trạng thái play/pause thay đổi
    audioPlayer.addEventListener("play", () => {
      playIcon.classList.remove("fa-play");
      playIcon.classList.add("fa-pause");
    });

    audioPlayer.addEventListener("pause", () => {
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
    });

    // Reset icon khi bài hát kết thúc
    audioPlayer.addEventListener("ended", () => {
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
    });

    // Gán sự kiện click cho nút
    playButton.addEventListener("click", togglePlayPause);
  }
});
