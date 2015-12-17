'use strict';

function needPlatform(){
  throw new Error('Missing iosrtc plugin for attachStream');
}

module.exports = function(){
  var URL = window.URL || window.webkitURL;

  return function(stream, el) {
    if (typeof cordova === 'undefined') return needPlatform();
    if (typeof cordova.plugins === 'undefined') return needPlatform();
    if (typeof cordova.plugins.iosrtc === 'undefined') return needPlatform();

    el.src = URL.createObjectURL(stream);
    el.setAttribute('webkit-playsinline', 'true');
    cordova.plugins.iosrtc.observeVideo(el);

    return el;
  };
};
