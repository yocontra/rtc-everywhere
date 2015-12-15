'use strict';

var mock = require('../temp-mock');
var temasys = require('./index');
var isInstalled = require('./isInstalled');
var nu = require('new-operator');

var RTCPeerConnectionMock = mock({
  methods: [
    'addIceCandidate',
    'addStream',
    'close',
    'createAnswer',
    'createDataChannel',
    'createOffer',
    'setLocalDescription',
    'setRemoteDescription',
    'removeStream',
    'getLocalStreams',
    'getRemoteStreams',
    'getStats'
  ],
  properties: [
    'iceConnectionState',
    'iceGatheringState',
    'localDescription',
    'remoteDescription',
    'onaddstream',
    'ondatachannel',
    'onicecandidate',
    'oniceconnectionstatechange',
    'onnegotiationneeded',
    'onremovestream',
    'onsignalingstatechange',
    'signalingState'
  ]
});

/*
var RTCSessionDescriptionMock = mock({
  properties: [
    'type',
    'sdp'
  ]
});

var RTCIceCandidateMock = mock({
  properties: [
    'candidate',
    'sdpMid',
    'sdpMLineIndex'
  ]
});
*/

if (!isInstalled()) {
  module.exports = {};
} else {
  module.exports = {
    RTCPeerConnection: function(){
      var inst = nu.apply(RTCPeerConnectionMock, arguments);
      temasys(function(rtc){
        mock.resolve(inst, rtc.RTCPeerConnection);
      });
      return inst;
    },
    RTCSessionDescription: function(){
      var ctor;
      temasys(function(rtc){
        ctor = rtc.RTCSessionDescription;
      });
      if (!ctor) {
        throw new Error('Tried RTCSessionDescription before RTCPeerConnection');
      }
      return nu.apply(ctor, arguments);
    },
    RTCIceCandidate: function(){
      var ctor;
      temasys(function(rtc){
        ctor = rtc.RTCIceCandidate;
      });
      if (!ctor) {
        throw new Error('Tried RTCIceCandidate before RTCPeerConnection');
      }
      return nu.apply(ctor, arguments);
    }
  };
}
