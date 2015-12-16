'use strict';

function needPlatform(){
  throw new Error('Missing iosrtc plugin for getUserMedia');
}

module.exports = function(opt) {
  return function(constraints, cb) {
    if (typeof cordova === 'undefined') return needPlatform();
    if (typeof cordova.plugins === 'undefined') return needPlatform();
    if (typeof cordova.plugins.iosrtc === 'undefined') return needPlatform();

    // make constraints optional
    if (arguments.length !== 2) {
      cb = constraints;
      constraints = {
        video: true,
        audio: true
      };
    }

    function success(stream) {
      stream._rtcOpt = opt;
      cb(null, stream);
    }

    function error(err) {
      cb(err);
    }

    cordova.plugins.iosrtc.getUserMedia(constraints, success, error);
  };
};
