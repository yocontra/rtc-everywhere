'use strict';

module.exports = function() {
  return {
    RTCPeerConnection: window.RTCPeerConnection ||
      window.webkitRTCPeerConnection,
    RTCSessionDescription: window.RTCSessionDescription ||
      window.webkitRTCSessionDescription,
    RTCIceCandidate: window.RTCIceCandidate ||
      window.webkitRTCIceCandidate
  };
};
