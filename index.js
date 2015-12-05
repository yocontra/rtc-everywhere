'use strict';

var browser = require('detect-browser');

var getUserMedia, rtc;
switch (browser.name) {
  case 'node':
    getUserMedia = require('./lib/getUserMedia/node');
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
    getUserMedia = require('./lib/getUserMedia/browser');
    rtc = require('./lib/rtc/unsupported');
    break;
}

module.exports = function() {
  var ctors = rtc();
  return {
    getUserMedia: getUserMedia(),
    RTCPeerConnection: ctors.RTCPeerConnection,
    RTCSessionDescription: ctors.RTCSessionDescription,
    RTCIceCandidate: ctors.RTCIceCandidate
  };
};
