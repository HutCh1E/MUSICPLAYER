const audio = document.getElementById('audio');
const video = document.getElementById('bgVideo');
const videoSource = document.getElementById('videoSource');
const progressBar = document.getElementById('progressBar');
const timer = document.getElementById('timer');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const loopBtn = document.getElementById('loopBtn');
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');
const lyricsBox = document.getElementById('lyrics');

const titleText = document.getElementById('songTitle');
const creatorImage = document.getElementById('creatorImage');
const singerName = document.getElementById('singerName');

const urlParams = new URLSearchParams(window.location.search);
let currentIndex = parseInt(urlParams.get('song')) || 0;

let loopMode = 0;

const songs = [
  {
    title: "Judas",
    file: "song1.mp3",
    video: "video1.mp4",
    image: "creator1.jpg",
    artist: "Lady Gaga",
    lyrics: [
      { time: 7.20, text: "I'm just a Holy Fool, oh baby" },
      { time: 10.00, text: "It's so cruel, but I'm still in love with Judas, baby" },
      { time: 14.00, text: "I'm just a Holy Fool, oh baby" },
      { time: 17.50, text: "It's so cruel, but I'm still in love with Judas, baby" },
      { time: 21.90, text: "Whoa-whoa-whoa-whoa-whoa" }
    ]
  },
  {
    title: "To the Bone",
    file: "song3.mp3",
    video: "video3.mp4",
    image: "creator3.jpg",
    artist: "Pamungkas",
    lyrics: [
      { time: 4.00, text: "Take me home, I’m fallin'" },
      { time: 7.20, text: "Love me long, I'm rollin’" },
      { time: 10.80, text: "Losing control, body and soul" },
      { time: 14.00, text: "Mind too for sure, I'm already yours" }
    ]
  },
  {
    title: "All The Stars",
    file: "song5.mp3",
    video: "video5.mp4",
    image: "creator5.jpg",
    artist: "Kendrick Lamar & SZA",
    lyrics: [
      { time: 1.80, text: "This may be the night that my dreams might let me know" },
      { time: 4.00, text: "All the stars approach you" },
      { time: 6.70, text: "All the stars approach you" },
      { time: 8.70, text: "All the stars approach you" },
      { time: 10.80, text: "This may be the night that my dreams might let me know" },
      { time: 14.00, text: "All the stars are closer" }
    ]
  },
  {
    title: "Consume",
    file: "consume.mp3",
    video: "consume.mp4",
    image: "consume.jpg",
    artist: "Chase Atlantic",
    lyrics: [
      { time: 0.8, text: "She said, Careful, or you'll lose it" },
      { time: 4, text: "But, girl, I'm only human," },
      { time: 7, text: "And I know there's a blade where your heart is" },
      { time: 10, text: "And you know how to use it" },
      { time: 13, text: "And you can take my flesh if you want girl" },
      { time: 16, text: "But, baby, don't abuse it (Calm down)" },
      { time: 19, text: "These voices in my head screaming, Run now (Don't run)" },
      { time: 22, text: "I'm praying that they're human" },
      { time: 25, text: "Please understand that I'm trying my hardest" },
      { time: 28, text: "My head's a mess, but I'm trying regardless" },
      { time: 31, text: "Anxiety is one hell of a problem" },
      { time: 34, text: "She's latching onto me, I can't resolve it" },
      { time: 37, text: "It's not right, it's not fair, it's not fair" },
      { time: 41.5, text: "It's not fair, it's not fair, it's not fair" },
      { time: 47, text: "Oh, no, no, no, ooh-ooh" },
    ]
  }
];

function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function loadSong(index) {
  const song = songs[index];
  titleText.textContent = song.title;
  creatorImage.src = song.image;
  singerName.textContent = song.artist;

  audio.src = song.file;
  videoSource.src = song.video;
  video.load();

  lyricsBox.innerHTML = song.lyrics.map(line =>
    `<p data-time="${line.time}">${line.text}</p>`
  ).join('');

  audio.play();
  video.play();
  playIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
      <path d="M6 4h4v16H6zm8 0h4v16h-4z"/>
    </svg>
  `;
}

loadSong(currentIndex);

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    video.play();
    playIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M6 4h4v16H6zm8 0h4v16h-4z"/>
      </svg>
    `;
  } else {
    audio.pause();
    video.pause();
    playIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
      </svg>
    `;
  }
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
});

audio.addEventListener('timeupdate', () => {
  const current = audio.currentTime;
  const duration = audio.duration || 1;
  progressBar.value = (current / duration) * 100;
  timer.textContent = `${formatTime(current)} / ${formatTime(duration)}`;

  document.querySelectorAll('#lyrics p').forEach((line, i, lines) => {
    const time = parseFloat(line.getAttribute('data-time'));
    const next = lines[i + 1] ? parseFloat(lines[i + 1].getAttribute('data-time')) : Infinity;

    if (current >= time && current < next) {
      line.classList.add('active');
      line.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      line.classList.remove('active');
    }
  });
});

progressBar.addEventListener('input', () => {
  const seek = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seek;
  video.currentTime = seek;
});

loopBtn.addEventListener('click', () => {
  loopMode = (loopMode + 1) % 3;
  switch (loopMode) {
    case 0:
      loopBtn.title = 'No Repeat';
      loopBtn.style.color = 'white';
      audio.loop = false;
      break;
    case 1:
      loopBtn.title = 'Repeat One';
      loopBtn.style.color = '#1db954';
      audio.loop = true;
      break;
    case 2:
      loopBtn.title = 'Repeat All';
      loopBtn.style.color = 'red';
      audio.loop = false;
      break;
  }
});

audio.addEventListener('ended', () => {
  if (loopMode === 2) {
    nextBtn.click();
  }
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
  volumeBtn.textContent = audio.volume == 0 ? '🔇' : audio.volume < 0.5 ? '🔈' : '🔊';
});

volumeBtn.addEventListener('click', () => {
  if (audio.volume > 0) {
    audio.dataset.lastVol = audio.volume;
    audio.volume = 0;
    volumeSlider.value = 0;
  } else {
    audio.volume = audio.dataset.lastVol || 1;
    volumeSlider.value = audio.volume;
  }
  volumeBtn.textContent = audio.volume == 0 ? '🔇' : audio.volume < 0.5 ? '🔈' : '🔊';
});
