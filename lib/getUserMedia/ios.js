'use strict';

module.exports = function() {
  return function(constraints, cb) {
    if (typeof cordova === 'undefined') return;
    if (typeof cordova.plugins === 'undefined') return;
    if (typeof cordova.plugins.iosrtc === 'undefined') return;

    // make constraints optional
    if (arguments.length !== 2) {
      cb = constraints;
      constraints = {
        video: true,
        audio: true
      };
    }

    function success(stream) {
      cb(null, stream);
    }

    function error(err) {
      cb(err);
    }

    cordova.plugins.iosrtc.getUserMedia(constraints, success, error);
  };
};
