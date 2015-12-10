'use strict';

// TODO: mock all rtc objects until async load
module.exports = function() {
  var temasys = require('../../lib/temasys');
  temasys(); // start loading ahead of time

  return {};
};
