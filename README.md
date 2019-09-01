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
    // get all the videos on this page
    this.videos = document.querySelectorAll('.video');

    // init script for the all of them
    for (let i = 0; i < this.videos.length; i++) {
      this.setupVideo(this.videos[i]);
    }
  }

  setupVideo(video) {
    // get the link of this video
    let videoUrl = video.querySelector('.video__media').dataset.url;
    // get the last part of it (video id)
    let videoId = videoUrl.split('/')[3];
    // get play button
    let button = video.querySelector('.video__button');
    // get thumbnail container and its src attribute
    let videoThumbnail = video.querySelector('.video__media');
    let videoThumbnailUrl = videoThumbnail.getAttribute('src');

    // if src attr is empty generate original video thumbnail then
    if (videoThumbnailUrl === '') {
      this.generateThumbnail(videoId, videoThumbnail);
    }

    // by clicking on the button or the thumbnail, delete them 
    // and create iframe with the video
    video.addEventListener('click', () => {
      let iframe = this.createIframe(videoId);

      button.remove();
      videoThumbnail.remove();
      video.appendChild(iframe);
    });
  }

  generateThumbnail(videoId, videoThumbnail) {
    // connect the link to the YouTube thumbnail archive with the video id
    let videoThumbnailUrl = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
    videoThumbnail.setAttribute('src', videoThumbnailUrl);
  }

  createIframe(videoId) {
    // Create iframe
    let iframe = document.createElement('iframe');

    // set its necessary attributes
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    // create video link by the generateURL script
    iframe.setAttribute('src', this.generateURL(videoId));
    // Add css class for our iframe
    iframe.classList.add('video__media');

    return iframe;
  }

  generateURL(videoId) {
    // video launch parameters
    let query = '?rel=0&showinfo=0&autoplay=1';

    // connect YouTube site link with the video id and launch parameters
    return 'https://www.youtube.com/embed/' + videoId + query;
  }
}

export default VideosLoader;
```
