![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Media Slideshow Component

`<media-slideshow>` is a Web Component that makes a slideshow out of a whitespace-separated list of urls to images and/or videos.


## Installation

### Script tag
- Put this script tag `<script src='https://unpkg.com/media-slideshow-component/dist/mediaslideshowcomponent.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc.

### Node Modules
- Run `npm install media-slideshow-component --save`
- Put this script tag `<script src='node_modules/media-slideshow-component/dist/mediaslideshowcomponent.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc.

### In a stencil-starter app
- Run `npm install media-slideshow-component --save`
- Add an import to the npm packages `import media-slideshow-component;`
- Then you can use the element anywhere in your template, JSX, html etc.

### As part of another stencil component
- Run `npm install media-slideshow-component --save`
- Add `import 'media-slideshow-component';` to the components that need it
- In your render method, add this line before return: `[<media-slideshow></media-slideshow>];`


## Usage

Simply place the `<media-slideshow>` element anywhere on your page. It will automatically take up the space of it's parent element and start showing the provided urls in a slideshow immediately.

```html
<media-slideshow source-urls="https://picsum.photos/480/640
                              https://picsum.photos/640/480
                              https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4
                              https://picsum.photos/100/200
                              https://picsum.photos/1900/1200
                              https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_1280_10MG.mp4
                              https://picsum.photos/300/1200
                              https://picsum.photos/300/300">
</media-slideshow>
```

Below is an overview of all the available properties on the `<media-slideshow>` element. See and play around with the above example [here](https://codepen.io/EPLKleijntjens/pen/ZEEEVdy).


### Properties

| Property                  | Attribute                   | Description                                                                                                                                                                                                         | Type                 | Default     |
| ------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `fit`                     | `fit`                       | (optional) The kind of "object-fit" to use for the images/videos. Can be contian, cover, fill, none, scale-down or pan.                                                                                             | `string`             | `"pan"`     |
| `hideControlsTime`        | `hide-controls-time`        | (optional) The number of seconds of inaction after which the controls are hidden. Set to 0 to always hide the controls. Set to Infinity to never hide them.                                                         | `number`             | `4`         |
| `onexit`                  | `onexit`                    | (optional) Set to a value to make the exit button appear in the controls. Accepted values are a url to navigate to or a callback function to call when exit is clicked.                                             | `any`                | `null`      |
| `panMinVisible`           | `pan-min-visible`           | (optional) The minimum percentage of the media surface that is garanteed to be visible at any point during the panning.                                                                                             | `number`             | `80`        |
| `repeat`                  | `repeat`                    | (optional) Initial value of the repeat button. If true, the slideshow will loop back to the beginning after the last slide.                                                                                         | `boolean`            | `true`      |
| `slideBufferSize`         | `slide-buffer-size`         | (optional) The number of extra slides that are loading in the background, excluding the current and previous slides.                                                                                                | `number`             | `3`         |
| `slideTransitionDuration` | `slide-transition-duration` | (optional) The number of seconds the transition from one slide to another takes.                                                                                                                                    | `number`             | `0.5`       |
| `sourceUrls`              | `source-urls`               | The source urls of all the media (images/videos) in this slideshow. Accepts an array of strings when set from code, or a whitespace-separated list of urls (no quotes) when using the attribute directly from html. | `string \| string[]` | `undefined` |
| `speedOneSlideTime`       | `speed-one-slide-time`      | (optional) The number of seconds a slide is shown on speed 1.                                                                                                                                                       | `number`             | `5`         |
| `speedThreeSlideTime`     | `speed-three-slide-time`    | (optional) The number of seconds a slide is shown on speed 3.                                                                                                                                                       | `number`             | `1.5`       |
| `speedTwoSlideTime`       | `speed-two-slide-time`      | (optional) The number of seconds a slide is shown on speed 2.                                                                                                                                                       | `number`             | `3`         |