'use strict';

var should = require('should');
var rtc = require('../');

describe('rtc', function() {
  it('should export a function', function(done) {
    should.exist(rtc);
    (typeof rtc).should.equal('function');
    done();
  });
});

describe('rtc()', function(){
  it('should export an object', function(done) {
    var val = rtc();
    (typeof val).should.equal('object');
    done();
  });
  it('should export the correct keys', function(done) {
    var val = rtc();
    Object.keys(val).should.eql([
      'getUserMedia',
      'RTCPeerConnection',
      'RTCSessionDescription',
      'RTCIceCandidate'
    ]);
    done();
  });
});
