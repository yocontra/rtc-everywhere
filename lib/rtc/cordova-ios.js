'use strict';

module.exports = function() {
  if (typeof cordova === 'undefined') return;
  if (typeof cordova.plugins === 'undefined') return;
  if (typeof cordova.plugins.iosrtc === 'undefined') return;

  return {
    RTCPeerConnection: cordova.plugins.iosrtc.RTCPeerConnection,
    RTCSessionDescription: cordova.plugins.iosrtc.RTCSessionDescription,
    RTCIceCandidate: cordova.plugins.iosrtc.RTCIceCandidate
  };
};
