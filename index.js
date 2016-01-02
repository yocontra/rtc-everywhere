'use strict';

var findPlatform = require('./lib/findPlatform');

module.exports = function(opt) {
  if (!opt) opt = {};
  var match = findPlatform(opt);
  var ctors = match.platform.rtc(opt);
  var gum = match.platform.gum(opt);
  var attachStream = match.platform.attachStream(opt);
  var supported = !!ctors.RTCPeerConnection;

  return {
    platform: match.name,
    supported: supported,
    getUserMedia: gum,
    RTCPeerConnection: ctors.RTCPeerConnection,
    RTCSessionDescription: ctors.RTCSessionDescription,
    RTCIceCandidate: ctors.RTCIceCandidate,
    attachStream: attachStream
  };
};

module.exports.platforms = findPlatform.platforms;
