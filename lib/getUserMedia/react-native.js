'use strict';

var browserGUM = require('./browser');

module.exports = function() {
  var rtc;
  try {
    rtc = require('react-native-webrtc');
  } catch (err) {
    return;
  }
  return browserGUM();
};
