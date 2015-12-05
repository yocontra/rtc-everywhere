'use strict';

var browser = require('detect-browser');

// TODO: need better platform detection
// TODO: need react-native detection
// TODO: cordova-ios = cordova? and browser === 'ios'

var getUserMedia, rtc;
switch (browser.name) {
  case 'node':
    getUserMedia = require('./lib/getUserMedia/unsupported');
    rtc = require('./lib/rtc/node');
    break;
  case 'ios':
    getUserMedia = require('./lib/getUserMedia/cordova-ios');
    rtc = require('./lib/rtc/cordova-ios');
    break;
  case 'chrome':
    getUserMedia = require('./lib/getUserMedia/browser');
    rtc = require('./lib/rtc/chrome');
    break;
  case 'firefox':
    getUserMedia = require('./lib/getUserMedia/browser');
    rtc = require('./lib/rtc/firefox');
    break;
  case 'edge':
    getUserMedia = require('./lib/getUserMedia/browser');
    rtc = require('./lib/rtc/edge');
    break;
  default:
    getUserMedia = require('./lib/getUserMedia/unsupported');
    rtc = require('./lib/rtc/unsupported');
    break;
}

module.exports = function(opt) {
  var ctors = rtc(opt);
  return {
    getUserMedia: getUserMedia(opt),
    RTCPeerConnection: ctors.RTCPeerConnection,
    RTCSessionDescription: ctors.RTCSessionDescription,
    RTCIceCandidate: ctors.RTCIceCandidate
  };
};
