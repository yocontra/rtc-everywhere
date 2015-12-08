'use strict';

var findPlatform = require('./lib/findPlatform');

module.exports = function(opt) {
  var platform = findPlatform();
  var ctors = platform.rtc(opt);
  var gum = platform.gum(opt);
  var supported = !!gum && !!ctors.RTCPeerConnection;

  return {
    supported: supported,
    getUserMedia: gum,
    RTCPeerConnection: ctors.RTCPeerConnection,
    RTCSessionDescription: ctors.RTCSessionDescription,
    RTCIceCandidate: ctors.RTCIceCandidate
  };
};
