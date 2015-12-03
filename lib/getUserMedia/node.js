'use strict';

module.exports = function() {
  return function(constraints, cb) {

    // make constraints optional
    if (arguments.length !== 2) {
      cb = constraints;
    }

    var err = new Error('MediaStreamError');
    err.name = 'NotSupportedError';
    return cb(err);
  };
};
