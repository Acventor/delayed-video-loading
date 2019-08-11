# delayed-video-loading
How to add any number of videos from YouTube to a website page without long downloading

If we need to add video to the page, we can use an iframe, which generates video hosting for us. But this method is quite "heavy" for pages, significantly increasing their weight even with one inserted video. The problem worsens with the increase in the number of such videos, so we can use a better way.

Its idea is that iframe from video will be loaded only after clicking on the video itself and until then it is replaced by a cover image (which stores the link we need).

*Note*: this script is only suitable for videos posted on YouTube.

## HTML markup
You can use that kind of markup
`<div class="video">
  <img  class="video__media" 
        data-url="video id (1)"
        src="thumbnail image url (2)">
  <button class="video__button" type="button">Play</button>
</div>`
