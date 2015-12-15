'use strict';

module.exports = function() {
  var getUserMedia = navigator.getUserMedia ||
    navigator.msGetUserMedia;

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
