'use strict';

module.exports = function() {
  var rtc = require('react-native-webrtc');
  return {
    RTCPeerConnection: rtc.RTCPeerConnection,
    RTCSessionDescription: rtc.RTCSessionDescription,
    RTCIceCandidate: rtc.RTCIceCandidate
  };
};
