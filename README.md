# youtube-onclick-loader
Allows you to upload a youtube video only after clicking on it, showing a placeholder picture before that. Useful if you want to improve your site's perfomance, especially if your page uses a lot of videos.

The original script was created by awesome **Vadim Makeev** (https://youtu.be/4JS70KB9GS0). I only slightly impoved it and wrote the launch tutorial here.

**Note**: this script works with Youtube's videos only.

## HTML markup
This markup will suffice:
```HTML
<div class="video">
  <img  class="video__media" 
        data-url="video's link (1)"
        src="placeholder image's url (2)">
  <button class="video__button" type="button">Play</button>
</div>
```
Please note the following points:
1. Use here the link of a video from Youtube's "Share" button.
2. Use any picture or leave it blank (in that case the original thumbnail of a video will be used instead).

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
  constructor(args) {
    this.videos = undefined;

    this.setupVideo = this.setupVideo.bind(this);
    this.createIframe = this.createIframe.bind(this);
    this.generateURL = this.generateURL.bind(this);
    this.generateThumbnail = this.generateThumbnail.bind(this);
  }

  init() {
    // get all videos on this page
    this.videos = document.querySelectorAll('.video');

    // init script for all of them
    this.videos.forEach(video => {
      this.setupVideo(video);
    })
  }

  setupVideo(video) {
    // get the link of the video
    const videoUrl = video.querySelector('.video__media').dataset.url;
    // throw an error if link is not specified
    if (!videoUrl) {
      throw new Error('No video\'s link specified');
    }
    // save the last part of it (video id)
    const videoId = videoUrl.split('/')[3];
    // get play button
    const button = video.querySelector('.video__button');
    // get thumbnail container and its src attribute
    const videoThumbnail = video.querySelector('.video__media');
    const videoThumbnailUrl = videoThumbnail.getAttribute('src');

    // if thumbnail is not specified generate original video's thumbnail then
    if (!videoThumbnailUrl) {
      this.generateThumbnail(videoId, videoThumbnail);
    }

    // remove button and thumbnail after clicking on them and insert iframe instead
    video.addEventListener('click', () => {
      const iframe = this.createIframe(videoId);

      button.remove();
      videoThumbnail.remove();
      video.appendChild(iframe);
    });
  }

  generateThumbnail(videoId, videoThumbnail) {
    // get a video's thumbnail
    const videoThumbnailUrl = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
    // and set it to video's placeholder
    videoThumbnail.setAttribute('src', videoThumbnailUrl);
  }

  createIframe(videoId) {
    // Create iframe
    const iframe = document.createElement('iframe');

    // set necessary attributes to it
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    // create video's link by the generateURL script
    iframe.setAttribute('src', this.generateURL(videoId));
    // Add css styles to iframe
    iframe.classList.add('video__media');

    return iframe;
  }

  generateURL(videoId) {
    // video's launch parameters
    const query = '?rel=0&showinfo=0&autoplay=1';
    // build new video's link
    return 'https://www.youtube.com/embed/' + videoId + query;
  }
}

export default VideosLoader;
```

## Final step
Let's import this script and initialize it
```JS
import VideosLoader from "./VideosLoader";

const videosLoader = new VideosLoader();
videosLoader.init();
```

That's all :) Hope this small script will help you to optimize loading of your sites. Have a nice day and coding!
