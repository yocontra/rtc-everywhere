'use strict';

var temasys = require('../../lib/temasys');

// TODO: mock all rtc objects until async load
module.exports = function() {
  temasys(); // start loading ahead of time

  return {};
};
