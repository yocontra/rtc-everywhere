'use strict';

module.exports = function() {
  var ortc = require('ortc-adapter');
  ortc.RTCPeerConnection.prototype.createDataChannel = function(name){
    return {
      label: name
    };
  };

  return {
    RTCPeerConnection: ortc.RTCPeerConnection,
    RTCSessionDescription: ortc.RTCSessionDescription,
    RTCIceCandidate: ortc.RTCIceCandidate
  };
};
