'use strict';

module.exports = function() {
  return {
    RTCPeerConnection: window.RTCPeerConnection ||
      window.mozRTCPeerConnection,
    RTCSessionDescription: window.RTCSessionDescription ||
      window.mozRTCSessionDescription,
    RTCIceCandidate: window.RTCIceCandidate ||
      window.mozRTCIceCandidate
  };
};
