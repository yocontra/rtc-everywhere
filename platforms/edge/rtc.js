'use strict';

function fakeDC(name){
  return {
    label: name,
    send: function(){},
    close: function(){}
  };
}

module.exports = function() {
  var ortc = require('ortc-adapter');
  ortc.RTCPeerConnection.prototype.createDataChannel = fakeDC;

  return {
    RTCPeerConnection: ortc.RTCPeerConnection,
    RTCSessionDescription: ortc.RTCSessionDescription,
    RTCIceCandidate: ortc.RTCIceCandidate
  };
};
