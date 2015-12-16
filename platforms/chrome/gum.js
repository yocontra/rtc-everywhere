'use strict';

module.exports = function(opt) {
  var getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia;

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
      stream._rtcOpt = opt;
      cb(null, stream);
    }

    function error(err) {
      cb(err);
    }

    getUserMedia.call(navigator, constraints, success, error);
  };
};
