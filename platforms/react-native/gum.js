'use strict';

module.exports = function() {
  var rtc;
  if (typeof navigator === 'undefined') return;
  try {
    rtc = require('react-native-webrtc');
  } catch (err) {
    return;
  }
  var getUserMedia = navigator.getUserMedia;
  if (typeof getUserMedia === 'undefined') return;

  return function(constraints, cb) {
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

    getUserMedia.call(navigator, constraints, success, error);
  };
};
