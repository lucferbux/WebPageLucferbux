/**
 * From https://github.com/KrauseFx/krausefx.com
 */


import { Component, OnInit, HostListener } from '@angular/core';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESC = 27
}


@Component({
  selector: 'app-insta-pipe',
  templateUrl: './insta-pipe.component.html',
  styleUrls: ['./insta-pipe.component.css']
})
export class InstaPipeComponent implements OnInit {

  private storiesToShow = null;
  private timeOutForPhotos = 4.0;
  private storyProgressSpacing = 5;
  private progressPadding = 2;
  private progressBars = null;
  private storiesContent = null;

  nextStoryTimeout = null;
  currentIndex = -1;


  constructor() {
    this.preloadStoriesIndex();
  }

  ngOnInit() {
    
  }

  preloadStoriesIndex() {
    var url = "https://instapipe.herokuapp.com/stories.json";

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        this.storiesContent = JSON.parse(xmlHttp.responseText);
        if (this.storiesContent.length == 0) {
          // Default it's shown, as it looks nicer
          // and I post stories most days :joy:
          document.getElementById("story-available").style.display = "none";
        } else {
          // preload the first story if it's a picture
          if (!this.storiesContent[0]["is_video"]) {
            let fakeContent: HTMLImageElement = document.getElementById("fakeContentToPreloadImages") as HTMLImageElement
            fakeContent.src = this.storiesContent[0]["signed_url"]
          }
        }
      }
    };

    xmlHttp.open("GET", url, true); // true = asynchronous 
    xmlHttp.send(null);
  }

  showStories() {
    if (this.storiesContent == null || this.storiesContent.length == 0) {
      return;
    }

    this.storiesToShow = []
    this.progressBars = []

    document.getElementById("storyViewer").style.display = "block"

    for (let storyIndex in this.storiesContent) {
      let currentStory = this.storiesContent[storyIndex]
      this.storiesToShow.push(currentStory)
    }

    for (let currentStoryIndex in this.storiesToShow) {
      let currentStory = this.storiesToShow[currentStoryIndex]

      // Append the progress items
      var progressBarBackground = document.createElement("div")
      progressBarBackground.className = "storyProgressBarItemBg"
      progressBarBackground.style.width = "calc(" + (1.0 / this.storiesToShow.length) * 100 + "%" + " - " + this.progressPadding * 2 + "px)"
      progressBarBackground.style.marginRight = this.progressPadding + "px"
      progressBarBackground.style.marginLeft = this.progressPadding + "px"
      document.getElementById("storyProgressBar").appendChild(progressBarBackground)

      var progressBarForeground = document.createElement("div")
      progressBarForeground.style.width = "0%"
      progressBarForeground.className = "storyProgressBarItemFg"
      progressBarBackground.appendChild(progressBarForeground)

      this.progressBars.push(progressBarForeground)
    }

    this.currentIndex = 0
    this.renderCurrentStory()
  }

  renderCurrentStory() {
    let currentStory = this.storiesToShow[this.currentIndex]
    
    this.progressBars.forEach((currentProgressBar, index) => {
      if (this.currentIndex > index) {
        currentProgressBar.style.width = "100%"
      } else {
        currentProgressBar.style.width = "0%"
      }
    })

    // Show image/video
    let videoViewer: HTMLMediaElement = document.getElementById("storyVideoViewer") as HTMLMediaElement;
    let photoViewer = document.getElementById("storyPhotoViewer");
    let progressBarContent = this.progressBars[this.currentIndex];

    if (currentStory["is_video"]) {
      videoViewer.src = currentStory["signed_url"];
      videoViewer.style.display = "block";
      videoViewer.onended = () => {
        this.currentIndex++;
        this.renderCurrentStory();
      };
      let videoUpdatedDuration = function() {
        // this is triggered when the video file was loaded
        // videos have dynamic length
        this.animateProgressBar(progressBarContent, videoViewer.duration)
        videoViewer.removeEventListener("durationchange", videoUpdatedDuration)
      }
      videoViewer.addEventListener("durationchange", videoUpdatedDuration)
      videoViewer.load()
      videoViewer.play()
      photoViewer.style.display = "none"
    } else {
      photoViewer.style.backgroundImage = "url('" + currentStory["signed_url"] + "')"
      videoViewer.style.display = "none"
      photoViewer.style.display = "block"
      this.animateProgressBar(progressBarContent, this.timeOutForPhotos) // photos are always x seconds

      // Advance to next story after X seconds
      this.nextStoryTimeout = setTimeout(function() {
        if (this.currentIndex < this.storiesToShow.length - 1) {
          this.currentIndex++;
          this.renderCurrentStory();
        } else {
          this.dismissStories();
        }
      }, this.timeOutForPhotos * 1000)
    }

    // Trigger the next one
    if (this.currentIndex < this.storiesToShow.length - 1 && !this.storiesToShow[this.currentIndex + 1]["is_video"])
    {
      setTimeout(function() {
        // Poor person's pre-loading of images, with a slight delay
        let fakeContent: HTMLImageElement = document.getElementById("fakeContentToPreloadImages") as HTMLImageElement
        fakeContent.src = this.storiesToShow[this.currentIndex + 1]["signed_url"]
      }, this.timeOutForPhotos / 3.0 * 1000)
    }
  }

  animateProgressBar(progressBar, duration) {
    progressBar.style.animationName = "storyViewProgress";
    progressBar.style.animationDuration = duration + "s";
  }

  userDidClickPreviousStory() {
    if (this.currentIndex > 0) {
      this.stopAllAnimations()
      this.currentIndex--;
      this.renderCurrentStory();
    } else {
      this.dismissStories();
    }
  }

  userDidClickNextStory() {
    if (this.currentIndex < this.storiesToShow.length - 1) {
      this.stopAllAnimations()
      this.currentIndex++;
      this.renderCurrentStory();
    } else {
      this.dismissStories();
    }
  }

  stopAllAnimations() {
    clearTimeout(this.nextStoryTimeout)
    document.getElementById("storyVideoViewer").onended = null

    for (let index in this.progressBars) {
      let currentProgressBar = this.progressBars[index]
      currentProgressBar.style.animationName = null
    }
  }

  dismissStories() {
    document.getElementById("storyViewer").style.display = "none"
    document.getElementById("storyProgressBar").innerHTML = ""
    this.stopAllAnimations()
  }

  // window.addEventListener("keyup", function(e) {
  //   if (e.keyCode == 27) { // ESC
  //     this.dismissStories()
  //     return true;
  //   }
  //   if (e.keyCode == 37) { // Left
  //     this.userDidClickPreviousStory();
  //   }
  //   if (e.keyCode == 39) { // Right
  //     this.userDidClickNextStory();
  //   }
  // }, false);

  @HostListener('window:keyup' , ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    
    if (event.keyCode === KEY_CODE.ESC) { // ESC
      this.dismissStories()
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.userDidClickPreviousStory();
    }

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.userDidClickNextStory();
    }
  }
}
