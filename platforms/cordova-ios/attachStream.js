'use strict';

var URL = window.URL || window.webkitURL;

module.exports = function(el, stream) {
  if (typeof cordova === 'undefined') return;
  if (typeof cordova.plugins === 'undefined') return;
  if (typeof cordova.plugins.iosrtc === 'undefined') return;

  el.src = URL.createObjectURL(stream);
  el.setAttribute('webkit-playsinline', 'true');
  cordova.plugins.iosrtc.observeVideo(el);
};
