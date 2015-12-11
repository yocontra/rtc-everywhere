'use strict';

var mock = require('../temp-mock');
var temasys = require('./index');

var RTCPeerConnectionMock = mock({
  methods: [''],
  properties: ['']
});

var RTCSessionDescriptionMock = mock({
  methods: [''],
  properties: ['']
});

var RTCIceCandidateMock = mock({
  methods: [''],
  properties: ['']
});

module.exports = {
  RTCPeerConnection: function(){
    var inst = new RTCPeerConnectionMock(arguments);
    temasys(function(rtc){
      mock.resolve(inst, rtc.RTCPeerConnection);
    });
    return inst;
  },
  RTCSessionDescription: function(){
    var inst = new RTCSessionDescriptionMock(arguments);
    temasys(function(rtc){
      mock.resolve(inst, rtc.RTCSessionDescription);
    });
    return inst;
  },
  RTCIceCandidate: function(){
    var inst = new RTCIceCandidateMock(arguments);
    temasys(function(rtc){
      mock.resolve(inst, rtc.RTCIceCandidate);
    });
    return inst;
  }
};
