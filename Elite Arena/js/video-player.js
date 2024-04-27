const videoPlayer = document.getElementById('video-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const muteBtn = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');

// Play/Pause
playPauseBtn.addEventListener('click', () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

// Mute/Unmute
muteBtn.addEventListener('click', () => {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
});

// Volume Slider
volumeSlider.addEventListener('input', () => {
  videoPlayer.volume = volumeSlider.value / 100;
});

// Fullscreen
fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    videoPlayer.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});

// Progress Bar and Time
videoPlayer.addEventListener('timeupdate', () => {
  const currentTimeValue = videoPlayer.currentTime;
  const durationValue = videoPlayer.duration;

  const progressPercentage = (currentTimeValue / durationValue) * 100;
  progress.style.width = `${progressPercentage}%`;

  const currentMinutes = Math.floor(currentTimeValue / 60);
  const currentSeconds = Math.floor(currentTimeValue % 60);
  currentTime.textContent = `${currentMinutes}:${String(currentSeconds).padStart(2, '0')}`;

  const durationMinutes = Math.floor(durationValue / 60);
  const durationSeconds = Math.floor(durationValue % 60);
  duration.textContent = `${durationMinutes}:${String(durationSeconds).padStart(2, '0')}`;
});