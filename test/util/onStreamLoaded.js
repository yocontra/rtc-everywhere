'use strict';

var should = require('should');
var onStreamLoaded = require('../../util/onStreamLoaded');

function createMockStream(tracks) {
  return {
    getTracks: function(){
      return tracks.map(function(t){
        return {
          kind: t.type,
          readyState: t.state || 'playing',
          muted: t.muted == null ? false : t.muted,
          enabled: t.enabled == null ? true : t.enabled
        };
      });
    }
  };
}

describe('onStreamLoaded()', function() {
  it('should detect ended video stream', function(done) {
    var fakeStream = createMockStream([
      {
        type: 'video',
        state: 'ended'
      }
    ]);
    onStreamLoaded({video: true}, fakeStream, function(err, res){
      should.exist(err);
      done();
    });
  });
  it('should detect muted video stream', function(done) {
    var fakeStream = createMockStream([
      {
        type: 'video',
        muted: true
      }
    ]);
    onStreamLoaded({video: true}, fakeStream, function(err, res){
      should.exist(err);
      done();
    });
  });
  it('should detect disabled video stream', function(done) {
    var fakeStream = createMockStream([
      {
        type: 'video',
        enabled: false
      }
    ]);
    onStreamLoaded({video: true}, fakeStream, function(err, res){
      should.exist(err);
      done();
    });
  });
  it('should detect missing video stream', function(done) {
    var fakeStream = createMockStream([{
      type: 'audio'
    }]);
    onStreamLoaded({video: true}, fakeStream, function(err, res){
      should.exist(err);
      done();
    });
  });
  it('should detect ended audio stream', function(done) {
    var fakeStream = createMockStream([
      {
        type: 'audio',
        state: 'ended'
      }
    ]);
    onStreamLoaded({audio: true}, fakeStream, function(err, res){
      should.exist(err);
      done();
    });
  });
  it('should detect muted audio stream', function(done) {
    var fakeStream = createMockStream([
      {
        type: 'audio',
        muted: true
      }
    ]);
    onStreamLoaded({audio: true}, fakeStream, function(err, res){
      should.exist(err);
      done();
    });
  });
  it('should detect disabled audio stream', function(done) {
    var fakeStream = createMockStream([
      {
        type: 'audio',
        enabled: false
      }
    ]);
    onStreamLoaded({audio: true}, fakeStream, function(err, res){
      should.exist(err);
      done();
    });
  });
  it('should detect missing audio stream', function(done) {
    var fakeStream = createMockStream([{
      type: 'video'
    }]);
    onStreamLoaded({audio: true}, fakeStream, function(err, res){
      should.exist(err);
      done();
    });
  });
  it.skip('should detect hardware muted video stream', function(done) {

  });
  it.skip('should detect hardware muted audio stream', function(done) {

  });
  it.skip('should return video metadata', function(done) {

  });
  it.skip('should return audio metadata', function(done) {

  });
});
