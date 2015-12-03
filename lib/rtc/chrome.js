'use strict';

module.exports = function() {
  if (typeof window === 'undefined') return;
  return {
    RTCPeerConnection: window.RTCPeerConnection || window.webkitRTCPeerConnection,
    RTCSessionDescription: window.RTCSessionDescription || window.webkitRTCSessionDescription,
    RTCIceCandidate: window.RTCIceCandidate || window.webkitRTCIceCandidate
  };
};
