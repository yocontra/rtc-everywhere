'use strict';

module.exports = function() {
  var rtc;
  try {
    rtc = require('react-native-webrtc');
  } catch (err) {
    return;
  }
  return {
    RTCPeerConnection: rtc.RTCPeerConnection,
    RTCSessionDescription: rtc.RTCSessionDescription,
    RTCIceCandidate: rtc.RTCIceCandidate
  };
};
