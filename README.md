# videojs-dynamic-watermark

Dynamic watermarking for VideoJS.


This plugin allows you to embed dynamic watermark over your videos using VideoJS.


## Table of Contents

## Installation

- [Installation](#installation)
- [Plugin Options](#plugin-options)
  - [Default options](#default-options)
  - [Options](#options)
- [Usage](#usage)
  - [`<script>` Tag](#script-tag)
  - [Browserify/CommonJS](#browserifycommonjs)
  - [RequireJS/AMD](#requirejsamd)
- [License](#license)

## Installation

```sh
npm install --save @silaas/videojs-dynamic-watermark
```

## Plugin Options

### Default options

```js
{
  overlayElId: 'silaas-dynamic-watermark',
  overlayContent: 'silaas',
  changeDuration: 1000,
  cssText: 'display: inline-block; color: grey; background-color: transparent; font-size: 1rem; z-index: 9999; position: absolute; @media only screen and (max-width: 992px){font-size: 0.8rem;}'
}

```

### Options

- *overlayElId* `string` Unique id to be used as the `id` attribute of watermark element
- *overlayContent* `string` Watermark content
- *changeDuration* `int` Milliseconds after which the position of watermark is changed. FYI `1000 milliseconds = 1 second`
- *cssText* `string` CSS style properties to be used for the watermark. Copy what is  in default cssText and change color, font-size if you want to

## Usage

To include videojs-dynamic-watermark on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

***With Default Options***

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-dynamic-watermark.min.js"></script>
<script>
  var player = videojs('my-video');

  player.dynamicWatermark();
</script>
```

***With Custom Options***

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-dynamic-watermark.min.js"></script>
<script>
  var player = videojs('my-video');

  player.dynamicWatermark({
  	overlayElId: 'unique_id',
  	overlayContent: 'It will be displayed over video',
  	changeDuration: 1000,
  	cssText: 'display: inline-block; color: grey; background-color: transparent; font-size: 1rem; z-index: 9999; position: absolute; @media only screen and (max-width: 992px){font-size: 0.8rem;}'
  	});
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-dynamic-watermark via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-dynamic-watermark');

var player = videojs('my-video');

player.dynamicWatermark();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-dynamic-watermark'], function(videojs) {
  var player = videojs('my-video');

  player.dynamicWatermark();
});
```

## License

MIT. Copyright (c) Silaas Technologies &lt;silaas.tech@gmail.com&gt;


[videojs]: http://videojs.com/
