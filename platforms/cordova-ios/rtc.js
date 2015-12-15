'use strict';

function needPlatform(){
  throw new Error('Missing iosrtc plugin for RTCPeerConnection');
}

module.exports = function() {
  if (typeof cordova === 'undefined') return needPlatform();
  if (typeof cordova.plugins === 'undefined') return needPlatform();
  if (typeof cordova.plugins.iosrtc === 'undefined') return needPlatform();

  return {
    RTCPeerConnection: cordova.plugins.iosrtc.RTCPeerConnection,
    RTCSessionDescription: cordova.plugins.iosrtc.RTCSessionDescription,
    RTCIceCandidate: cordova.plugins.iosrtc.RTCIceCandidate
  };
};
