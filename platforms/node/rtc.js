'use strict';

module.exports = function() {
  var wrtc;
  try {
    wrtc = require('wrtc');
  } catch (err) {
    return {};
  }
  return {
    RTCPeerConnection: wrtc.RTCPeerConnection,
    RTCSessionDescription: wrtc.RTCSessionDescription,
    RTCIceCandidate: wrtc.RTCIceCandidate
  };
};
