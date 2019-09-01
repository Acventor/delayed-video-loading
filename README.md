# delayed-video-loading
How to add any number of videos from YouTube to a website page without long downloading

If we need to add video to the page, we can use an iframe, which generates video hosting for us. But this method is quite "heavy" for pages, significantly increasing their weight even with one inserted video. The problem worsens with the increase in the number of such videos, so we can use a better way.

Its idea is that iframe from video will be loaded only after clicking on the video itself and until then it is replaced by a cover image (which stores the link we need).

*Note*: this script is only suitable for videos posted on YouTube.

## HTML markup
You can use that kind of markup:
```HTML
<div class="video">
  <img  class="video__media" 
        data-url="video id (1)"
        src="thumbnail image url (2)">
  <button class="video__button" type="button">Play</button>
</div>
```
Please note the following points:
1. This is a required point: the link to the video must be copied *not* from the url page, *but* from the "Share" button. Link example: https://youtu.be/ *4JS70KB9GS0* (the last part of link is the video id, which is the one we need).
2. You can specify the path to your picture, or leave this attribute blank. In the second case, the video thumbnail will be used.

## CSS styles
Minimal styles needed:
```CSS
/* Video container */
.video {
  position: relative;
  padding-bottom: 56.25%;
  background-color: #000;
}

/* Thumbnail; later video */
.video__media {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* Play button */
.video__button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
```
## JS script
Now is the time for the essentials. Save this script as "VideoLoader.js"
```JS
class VideosLoader {
  constructor() {
    this.videos = undefined;

    this.setupVideo = this.setupVideo.bind(this);
    this.createIframe = this.createIframe.bind(this);
    this.generateURL = this.generateURL.bind(this);
    this.generateThumbnail = this.generateThumbnail.bind(this);
  }

  init() {
    // Находим все видео на странице
    this.videos = document.querySelectorAll('.video');

    // И подключаем скрипт к каждому из них
    for (let i = 0; i < this.videos.length; i++) {
      this.setupVideo(this.videos[i]);
    }
  }

  setupVideo(video) {
    // Находим указанную ссылку на видео
    let videoUrl = video.querySelector('.video__media').dataset.url;
    // Берем из нее только последнюю часть с id
    let videoId = videoUrl.split('/')[3];
    // Находим кнопку проигрывателя
    let button = video.querySelector('.video__button');
    // Находим обложку и ее src атрибут
    let videoThumbnail = video.querySelector('.video__media');
    let videoThumbnailUrl = videoThumbnail.getAttribute('src');

    // Если src пуст (мы не указали обложку), то генерируем ее самостоятельно
    if (videoThumbnailUrl === '') {
      this.generateThumbnail(videoId, videoThumbnail);
    }

    // По клику на видео (кнопку или превью) создаем iframe,
    // также удаляя кнопку и обложку видео
    video.addEventListener('click', () => {
      let iframe = this.createIframe(videoId);

      button.remove();
      videoThumbnail.remove();
      video.appendChild(iframe);
    });
  }

  generateThumbnail(videoId, videoThumbnail) {
    // Совмещаем адрес, по которому YouTube хранит обложки,
    // с id нашего видео и создаем из них ссылку на изображение
    let videoThumbnailUrl = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
    videoThumbnail.setAttribute('src', videoThumbnailUrl);
  }

  createIframe(videoId) {
    // Создаем iframe
    let iframe = document.createElement('iframe');

    // Устанавливаем необходимые для него атрибуты
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    // Создаем внутри него ссылку на видео посредством функции generateURL
    iframe.setAttribute('src', this.generateURL(videoId));
    // Добавляем стили
    iframe.classList.add('video__media');

    return iframe;
  }

  generateURL(videoId) {
    // Параметры запуска видео
    let query = '?rel=0&showinfo=0&autoplay=1';

    // Совмещаем адрес видеохостинга и id видео, 
    // в конце добавляем параметры запуска 
    return 'https://www.youtube.com/embed/' + videoId + query;
  }
}

export default VideosLoader;
```
