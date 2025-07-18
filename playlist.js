const videoElement = document.getElementById('previewVideo');
const sourceElement = videoElement.querySelector('source');
const items = document.querySelectorAll('.playlist li');

items.forEach(item => {
  // Change preview video on hover
  item.addEventListener('mouseenter', () => {
    const previewSrc = item.getAttribute('data-video');
    sourceElement.src = previewSrc;
    videoElement.load();
  });

  // Reset to default video when not hovering
  item.addEventListener('mouseleave', () => {
    sourceElement.src = 'video1.mp4'; // default preview video
    videoElement.load();
  });

  // Redirect on click
  item.addEventListener('click', () => {
    const song = item.getAttribute('data-song');
    const video = item.getAttribute('data-video');
    const title = item.getAttribute('data-title');
    const artist = item.getAttribute('data-artist');
    const image = item.getAttribute('data-image');

    const url = `index.html?song=${encodeURIComponent(song)}&video=${encodeURIComponent(video)}&title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}&image=${encodeURIComponent(image)}`;
    window.location.href = url;
  });
});
