'use strict';

module.exports = function() {
  if (typeof navigator === 'undefined') return;
  var getUserMedia = navigator.getUserMedia
    || navigator.webkitGetUserMedia
    || navigator.mozGetUserMedia
    || navigator.msGetUserMedia;
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
