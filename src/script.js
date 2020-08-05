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