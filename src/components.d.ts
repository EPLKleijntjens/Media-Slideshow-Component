/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface MediaSlideshow {
    /**
    * (optional) The kind of "object-fit" to use for the images/videos. Can be contian, cover, fill, none, scale-down or pan.
    */
    'fit': string;
    /**
    * (optional) The number of seconds of inaction after which the controls are hidden. Set to 0 to always hide the controls. Set to Infinity to never hide them.
    */
    'hideControlsTime': number;
    /**
    * (optional) Set to a value to make the exit button appear in the controls. Accepted values are a url to navigate to or a callback function to call when exit is clicked.
    */
    'onexit': any;
    /**
    * (optional) The minimum percentage of the media surface that is garanteed to be visible at any point during the panning.
    */
    'panMinVisible': number;
    /**
    * (optional) Initial value of the repeat button. If true, the slideshow will loop back to the beginning after the last slide.
    */
    'repeat': boolean;
    /**
    * (optional) The number of extra slides that are loading in the background, excluding the current and previous slides.
    */
    'slideBufferSize': number;
    /**
    * (optional) The number of seconds the transition from one slide to another takes.
    */
    'slideTransitionDuration': number;
    /**
    * The source urls of all the media (images/videos) in this slideshow. Accepts an array of strings when set from code, or a whitespace-separated list of urls (no quotes) when using the attribute directly from html.
    */
    'sourceUrls': Array<string> | string;
    /**
    * (optional) The number of seconds a slide is shown on speed 1.
    */
    'speedOneSlideTime': number;
    /**
    * (optional) The number of seconds a slide is shown on speed 3.
    */
    'speedThreeSlideTime': number;
    /**
    * (optional) The number of seconds a slide is shown on speed 2.
    */
    'speedTwoSlideTime': number;
  }
}

declare global {


  interface HTMLMediaSlideshowElement extends Components.MediaSlideshow, HTMLStencilElement {}
  var HTMLMediaSlideshowElement: {
    prototype: HTMLMediaSlideshowElement;
    new (): HTMLMediaSlideshowElement;
  };
  interface HTMLElementTagNameMap {
    'media-slideshow': HTMLMediaSlideshowElement;
  }
}

declare namespace LocalJSX {
  interface MediaSlideshow {
    /**
    * (optional) The kind of "object-fit" to use for the images/videos. Can be contian, cover, fill, none, scale-down or pan.
    */
    'fit'?: string;
    /**
    * (optional) The number of seconds of inaction after which the controls are hidden. Set to 0 to always hide the controls. Set to Infinity to never hide them.
    */
    'hideControlsTime'?: number;
    /**
    * (optional) Set to a value to make the exit button appear in the controls. Accepted values are a url to navigate to or a callback function to call when exit is clicked.
    */
    'onexit'?: any;
    /**
    * (optional) The minimum percentage of the media surface that is garanteed to be visible at any point during the panning.
    */
    'panMinVisible'?: number;
    /**
    * (optional) Initial value of the repeat button. If true, the slideshow will loop back to the beginning after the last slide.
    */
    'repeat'?: boolean;
    /**
    * (optional) The number of extra slides that are loading in the background, excluding the current and previous slides.
    */
    'slideBufferSize'?: number;
    /**
    * (optional) The number of seconds the transition from one slide to another takes.
    */
    'slideTransitionDuration'?: number;
    /**
    * The source urls of all the media (images/videos) in this slideshow. Accepts an array of strings when set from code, or a whitespace-separated list of urls (no quotes) when using the attribute directly from html.
    */
    'sourceUrls'?: Array<string> | string;
    /**
    * (optional) The number of seconds a slide is shown on speed 1.
    */
    'speedOneSlideTime'?: number;
    /**
    * (optional) The number of seconds a slide is shown on speed 3.
    */
    'speedThreeSlideTime'?: number;
    /**
    * (optional) The number of seconds a slide is shown on speed 2.
    */
    'speedTwoSlideTime'?: number;
  }

  interface IntrinsicElements {
    'media-slideshow': MediaSlideshow;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'media-slideshow': LocalJSX.MediaSlideshow & JSXBase.HTMLAttributes<HTMLMediaSlideshowElement>;
    }
  }
}


