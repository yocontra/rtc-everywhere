'use strict';

var browser = require('detect-browser');

var getUserMedia, rtc;
switch (browser.name) {
  case 'node':
    getUserMedia = require('./getUserMedia/node');
    rtc = require('./rtc/node');
    break;
  case 'ios':
    getUserMedia = require('./getUserMedia/ios');
    rtc = require('./rtc/ios');
    break;
  case 'chrome':
    getUserMedia = require('./getUserMedia/browser');
    rtc = require('./rtc/chrome');
    break;
  case 'firefox':
    getUserMedia = require('./getUserMedia/browser');
    rtc = require('./rtc/firefox');
    break;
  case 'edge':
    getUserMedia = require('./getUserMedia/browser');
    rtc = require('./rtc/edge');
    break;
  default:
    getUserMedia = require('./getUserMedia/browser');
    rtc = require('./rtc/unsupported');
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
