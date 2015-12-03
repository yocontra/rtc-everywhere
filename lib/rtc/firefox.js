'use strict';

module.exports = function() {
  if (typeof window === 'undefined') return;
  return {
    RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection,
    RTCSessionDescription: window.RTCSessionDescription || window.mozRTCSessionDescription,
    RTCIceCandidate: window.RTCIceCandidate || window.mozRTCIceCandidate
  };
};
