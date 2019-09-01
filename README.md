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
1. This is a required point: the link to the video must be copied *not* from the url page, *but* from the "Share" button. Link example: https://youtu.be/*4JS70KB9GS0* (the last part of link is the video id, which is the one we need).
2. You can specify the path to your picture, or leave this attribute blank. Then the thumbnail of the selected video will be used.

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

