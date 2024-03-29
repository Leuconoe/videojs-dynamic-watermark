import videojs from 'video.js';
import {version as VERSION} from '../package.json';
import window from 'global/window';

// Default options for the plugin.
const defaults = {
  overlayElId: 'silaas-dynamic-watermark',
  overlayContent: 'silaas',
  changeDuration: 1000,
  cssText: 'display: inline-block; color: grey; background-color: transparent; font-size: 1rem; z-index: 9999; position: absolute; @media only screen and (max-width: 992px){font-size: 0.8rem;}'
};

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
const dom = videojs.dom || videojs;

// Helper functions

const applyCssStyles = (el, options) => {
  el.innerHTML = options.overlayContent;
  el.style.cssText = options.cssText;
};

const createDyanmicWatermarkElement = (player, options) => {
  const el = dom.createEl('div', {}, { id: options.overlayElId});

  applyCssStyles(el, options);
  return el;
};

const setRandomPosition = (player, element, options) => {
  const videoHeight = player.el().clientHeight;
  const videoWidth = player.el().clientWidth;
  let startPosX = Math.floor(Math.random() * videoWidth);

  if (startPosX > 200) {
    startPosX = startPosX - 200;
  }
  element.style.left = startPosX + 'px';
  let startPosY = Math.floor(Math.random() * videoHeight);

  if (startPosY > 60) {
    startPosY = startPosY - 60;
  }
  element.style.top = startPosY + 'px';
  setTimeout(function() {
    // setRandomPosition(player, element, options);
    let dynamicWatermarkEl = window.document.getElementById('silaas-dynamic-watermark');

    if (!dynamicWatermarkEl) {
      dynamicWatermarkEl = createDyanmicWatermarkElement(player, options);
      player.el().appendChild(dynamicWatermarkEl);
    } else {
      applyCssStyles(dynamicWatermarkEl, options);
    }
    setRandomPosition(player, dynamicWatermarkEl, options);
  }, options.changeDuration);
};

const startDynamicWatermarking = (player, options) => {
  const el = createDyanmicWatermarkElement(player, options);

  player.el().appendChild(el);
  setRandomPosition(player, el, options);
};

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
const onPlayerReady = (player, options) => {
  player.addClass('videojs-dynamic-watermark');
  startDynamicWatermarking(player, options);
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function dynamicWatermark
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const dynamicWatermark = function(options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
registerPlugin('dynamicWatermark', dynamicWatermark);

// Include the version number.
dynamicWatermark.VERSION = VERSION;

export default dynamicWatermark;
