'use strict';

module.exports = function() {
  var ortc = require('ortc-adapter');
  return {
    RTCPeerConnection: ortc.RTCPeerConnection,
    RTCSessionDescription: ortc.RTCSessionDescription,
    RTCIceCandidate: ortc.RTCIceCandidate
  };
};
