'use strict';

module.exports = function() {
  var wrtc = require('wrtc');
  return {
    RTCPeerConnection: wrtc.RTCPeerConnection,
    RTCSessionDescription: wrtc.RTCSessionDescription,
    RTCIceCandidate: wrtc.RTCIceCandidate
  };
};
