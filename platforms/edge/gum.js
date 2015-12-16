'use strict';

module.exports = function(opt) {
  return function(constraints, cb) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.msGetUserMedia;

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

    getUserMedia.call(navigator, constraints, success, error);
  };
};
