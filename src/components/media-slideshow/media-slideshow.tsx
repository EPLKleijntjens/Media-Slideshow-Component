import { Component, Prop, State, h, Host, Listen, Watch } from '@stencil/core';
import { MediaViewSource } from 'media-view-component';
import 'media-view-component';

@Component({
  tag: 'media-slideshow',
  styleUrl: 'media-slideshow.css',
  scoped: true
})
export class MediaSlideshow {

  /** The source urls of all the media (images/videos) in this slideshow. Accepts an array of strings when set from code, or a whitespace-separated list of urls (no quotes) when using the attribute directly from html. */
  @Prop() sourceUrls: Array<string> | string;

  /** (optional) The number of extra slides that are loading in the background, excluding the current and previous slides. */
  @Prop() slideBufferSize: number = 3;


  /** (optional) The number of seconds a slide is shown on speed 1. */
  @Prop() speedOneSlideTime: number = 5;

  /** (optional) The number of seconds a slide is shown on speed 2. */
  @Prop() speedTwoSlideTime: number = 3;

  /** (optional) The number of seconds a slide is shown on speed 3. */
  @Prop() speedThreeSlideTime: number = 1.5;

  /** (optional) The number of seconds the transition from one slide to another takes. */
  @Prop() slideTransitionDuration: number = 0.5;


  /** (optional) Initial value of the repeat button. If true, the slideshow will loop back to the beginning after the last slide. */
  @Prop({ reflect: true }) repeat: boolean = true;

  /** (optional) Set to a value to make the exit button appear in the controls. Accepted values are a url to navigate to or a callback function to call when exit is clicked. */
  @Prop() onexit: any = null;

  /** (optional) The number of seconds of inaction after which the controls are hidden. Set to 0 to always hide the controls. Set to Infinity to never hide them. */
  @Prop() hideControlsTime: number = 4;


  /** (optional) The kind of "object-fit" to use for the images/videos. Can be contian, cover, fill, none, scale-down or pan. */
  @Prop() fit: string = "pan";

  /** (optional) The minimum percentage of the media surface that is garanteed to be visible at any point during the panning. */
  @Prop() panMinVisible: number = 80;



  @State() private tick: number = 0;
  private prevTick: number = -1;

  @State() private speed: number = 1;
  @State() private paused: boolean = false;
  @State() private fullscreen: boolean = false;
  @State() private controlsHidden: boolean;


  private slideStartTime: number = 0;
  private slideTimerId: number;
  private hideControlsTimerId: number;
  private currentPanTime: number;
  private prevPanTime: number;

  private sources: Array<{index:number, url:string, mvs:MediaViewSource}>;
  @State() private sourcesCount: number;

  private stageDiv: HTMLDivElement;
  private slideBuffer: Array<HTMLMediaViewElement> = new Array<HTMLMediaViewElement>();



  @Listen("fullscreenchange", {target: 'document'})
  private handleFullscreenChange() {
    if (document.fullscreenElement == this.stageDiv)
      this.fullscreen = true;
    else
      this.fullscreen = false;

    this.slideBuffer.forEach((slide) => { if(slide) slide.sizeUpdated(); });
  }

  @Watch("slideTransitionDuration")
  private slideTransitionDurationUpdated() {
    this.stageDiv.style.setProperty("--slide-transition-duration", this.slideTransitionDuration + "s");
  }

  @Watch("sourceUrls")
  private sourceUrlsUpdated() {
    if (typeof this.sourceUrls === 'undefined' || this.sourceUrls === null)
      return;

    let urls: Array<string>;
    if (typeof this.sourceUrls === 'string') {
      urls = this.sourceUrls.trim().split(/\s+/);
    } else {
      urls = this.sourceUrls;
    }

    this.sourcesCount = urls.length;

    this.sources = urls.map((element, index) => {
      let mvs = new MediaViewSource();
      mvs.getLoadPromise().then((succes) => {
        if (!succes) {
          let indexToRemove = this.sources.findIndex((e) => e.index == index);
          if (indexToRemove != -1) {
            this.sources.splice(indexToRemove, 1);
            this.sourcesCount = this.sources.length;
          }
        }
      });

      if (index <= this.slideBufferSize + 2 || index == urls.length - 1)
        mvs.setSource(element);

      return {'index': index, 'url': element, 'mvs': mvs};
    });

    this.slideBuffer.length = this.slideBufferSize + 2;
    this.tick = 0;
    this.prevTick = -1;

    this.startSlideTimer();
  }



  private getSlideTime(): number {
    return 1000 * (this.speed === 1 ? this.speedOneSlideTime :
      this.speed === 2 ? this.speedTwoSlideTime : this.speedThreeSlideTime);
  }

  private getSourceIndex(tick: number) { return ((tick % this.sources.length) + this.sources.length) % this.sources.length; }

  private getSlideIndex(tick: number) { return ((tick % this.slideBuffer.length) + this.slideBuffer.length) % this.slideBuffer.length; }


  private startSlideTimer() {
    clearTimeout(this.slideTimerId);
    if (this.slideStartTime == 0) {
      this.slideStartTime = Date.now();
    }

    if (!this.paused) {
      let timeLeft = this.getSlideTime() - (Date.now() - this.slideStartTime);

      if (timeLeft <= 0)
        this.stepForward();
      else
        this.slideTimerId = setTimeout(()=>{ this.stepForward(); }, timeLeft);
    }
  }

  private updatePanTimes() {
    this.prevPanTime = this.currentPanTime;
    this.currentPanTime = this.getSlideTime() / 1000 + this.slideTransitionDuration;
  }

  private resetHideControlsTimer() {
    if (this.hideControlsTime == Infinity || this.hideControlsTime == 0)
      return;

    this.controlsHidden = false;
    clearTimeout(this.hideControlsTimerId);
    this.hideControlsTimerId = setTimeout(()=>{this.controlsHidden = true;}, this.hideControlsTime * 1000);
  }

  private stepForward() {
    this.prevTick = this.tick;
    this.tick++;

    let toLoad = this.sources[(this.getSourceIndex(this.tick) + this.slideBufferSize + 2) % this.sources.length];
    if (!toLoad.mvs.isLoaded())
      toLoad.mvs.setSource(toLoad.url);

    this.slideStartTime = Date.now();
    this.startSlideTimer();
    this.updatePanTimes();
  }

  private stepBack() {
    this.prevTick = this.tick;
    this.tick--;

    let toLoad = this.sources[(this.getSourceIndex(this.tick) - 2 + this.sources.length) % this.sources.length];
    if (!toLoad.mvs.isLoaded())
      toLoad.mvs.setSource(toLoad.url);

    this.slideStartTime = Date.now();
    this.startSlideTimer();
    this.updatePanTimes();
  }


  private handleClickSpeed(value: number) {
    this.speed = value;
    this.paused = false;
    this.startSlideTimer();
  }

  private handleClickPause() {
    this.paused = !this.paused;
    this.startSlideTimer();
  }

  private handleClickStepBack() { this.stepBack(); }

  private handleClickStepForward() { this.stepForward(); }

  private handleClickRepeat() { this.repeat = !this.repeat; }

  private handleClickFullscreen() {
    if (this.fullscreen)
      document.exitFullscreen();
    else
      this.stageDiv.requestFullscreen();
  }

  private handleClickExit() {
    if (this.fullscreen) {
      document.exitFullscreen();
    }

    if (this.onexit !== null) {
      if (typeof this.onexit === "string")
        window.location.href = this.onexit;
      else if (Object.prototype.toString.call(this.onexit) === "[object Function]" || "function" === typeof this.onexit || this.onexit instanceof Function)
        this.onexit();
    }
  }


  componentWillLoad() {
    this.sourceUrlsUpdated();

    this.controlsHidden = this.hideControlsTime == 0;
    this.resetHideControlsTimer();

    this.updatePanTimes();
  }

  componentDidLoad() {
    this.slideTransitionDurationUpdated();
  }

  componentDidUnload() {
    clearTimeout(this.slideTimerId);
    clearTimeout(this.hideControlsTimerId);
  }


  private renderSlides() {
    let result = [];
    let currentSourceIndex = this.getSourceIndex(this.tick);
    let currentSlideIndex = this.getSlideIndex(this.tick);
    let previousSlideIndex = this.getSlideIndex(this.prevTick);

    for(let index = 0; index < this.slideBuffer.length; index++) {
      let srcIndex = (currentSourceIndex - 1 + this.sourcesCount + ((index + this.slideBuffer.length) - (currentSlideIndex - 1)) % this.slideBuffer.length) % this.sourcesCount;
      let key = (this.tick - 1 + ((index + this.slideBuffer.length) - (currentSlideIndex - 1)) % this.slideBuffer.length);
      let isCurrentOrPreviousSlide = (index === currentSlideIndex || index === previousSlideIndex);

      result.push(
        <media-view key={key} class={{'visible': currentSlideIndex === index, 'invisible': currentSlideIndex !== index, 'transition': isCurrentOrPreviousSlide}}
              ref={(el) => this.slideBuffer[index] = el} mediaViewSource={this.sources[srcIndex].mvs} paused={(!isCurrentOrPreviousSlide) || this.paused}
              fit={this.fit} pan-min-visible={this.panMinVisible} pan-direction="random" pan-time={index === previousSlideIndex ? this.prevPanTime : this.currentPanTime}
              pan-paused={(!isCurrentOrPreviousSlide) || this.paused}>
        </media-view>
      );
    }

    return result;
  }

  render() {
    [<media-view></media-view>];
    return (
      <Host>
        <div class={{'stage': true, 'fullscreen': this.fullscreen, "controls-hidden": this.controlsHidden}} ref={(el) => this.stageDiv = el}
              onMouseMove={()=>{this.resetHideControlsTimer();}}  onClick={()=>{this.resetHideControlsTimer();}}>
          { this.renderSlides() }
          <div class="controls-container">
            <div class="controls">
              <div class="controls-row">
                <button type="button" class={{'btn': true, 'btn-left': true, 'pressed': this.paused}}
                  onClick={() => this.handleClickPause()}><span class="icon icon-pause"></span></button>
                <button type="button" class={{'btn': true, 'btn-middle': true, 'pressed': this.speed == 1 && !this.paused}}
                  onClick={() => this.handleClickSpeed(1)}><span class="icon icon-play"></span></button>
                <button type="button" class={{'btn': true, 'btn-middle': true, 'pressed': this.speed == 2 && !this.paused}}
                  onClick={() => this.handleClickSpeed(2)}><span class="icon icon-play-forward"></span></button>
                <button type="button" class={{'btn': true, 'btn-right': true, 'pressed': this.speed == 3 && !this.paused}}
                  onClick={() => this.handleClickSpeed(3)}><span class="icon icon-play-fast"></span></button>
              </div>
              <div class="controls-flexbox">
                <div class="controls-flex">
                  <div class="controls-row">
                    <button type="button" class="btn btn-default" onClick={() => this.handleClickStepBack()}><span class="icon icon-play-skip-back"></span></button>
                    <button type="button" class="btn btn-default" onClick={() => this.handleClickStepForward()}><span class="icon icon-play-skip-forward"></span></button>
                  </div>
                  <div class="controls-row">
                    <button type="button" class={{'btn': true, 'btn-default': true, 'pressed': this.repeat}}
                      onClick={() => this.handleClickRepeat()}><span class="icon icon-repeat"></span></button>
                    <button type="button" class={{'btn': true, 'btn-default': true, 'pressed': this.fullscreen}}
                      onClick={() => this.handleClickFullscreen()}><span class="icon icon-fullscreen"></span></button>
                  </div>
                  { this.onexit !== null ?
                      <div class="controls-row">
                        <button type="button" class="btn btn-default" onClick={() => this.handleClickExit()}><span class="icon icon-exit"></span></button>
                      </div>
                    : ""
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
