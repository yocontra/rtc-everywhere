'use strict';

module.exports = function() {
  var temasys = require('../../lib/temasys');
  temasys(); // start loading ahead of time

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

    temasys(function(rtc){
      rtc.getUserMedia(constraints, success, error);
    });
  };
};
