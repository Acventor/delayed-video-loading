# youtube-onclick-loader
Allows you to load a youtube video only after clicking on it, showing a placeholder picture before that. Useful if you want to improve your site's perfomance, especially if your page uses a lot of videos.

The original script was created by awesome **Vadim Makeev** (https://youtu.be/4JS70KB9GS0). I only slightly impoved it and wrote the launch tutorial here.

**Note**: this script works with Youtube's videos only.

## HTML markup
This markup will suffice:
```HTML
<div class="video">
  <img  class="video__media" 
        data-url="video's link (1)"
        src="placeholder image's link (2)">
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

## Final step
Import script file and run it
```JS
import VideosLoader from "./script";

const videosLoader = new VideosLoader();
videosLoader.init();
```

That's all :) Hope this small script will help you to optimize your sites. Have a nice day and coding!
