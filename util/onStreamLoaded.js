'use strict';

var async = require('async');

function isTrackEnabled(t){
  return t.kind === forType && t.enabled &&
    !t.muted && t.readyState isnt 'ended';
}

function checkTracks(stream, forType){
  return stream.getTracks().some(isTrackEnabled);
}

function isVideoWorking(stream, cb){
  if (!checkTracks(stream, 'video')) return cb('dead');
  if (stream._videoMeta) return cb(null, stream._videoMeta);
  // TODO: load video, wait for play, return video meta
}

function isAudioWorking(stream, cb){
  if (!checkTracks(stream, 'audio')) return cb('dead');
  if (stream._audioMeta) return cb(null, stream._audioMeta);
  if (typeof cordova !== 'undefined') return cb();
  // TODO: load audio, wait for audio volume, return audio meta
}

function isStreamWorking(opt, stream, cb) {
  if (arguments.length !== 3) {
    stream = opt;
    cb = stream;
    opt = null;
  }
  if (!opt) {
    opt = {
      video: true,
      audio: true
    };
  }
  var tasks = {};
  if (opt.video) {
    tasks.video = isVideoWorking.bind(null, stream);
  }
  if (opt.audio) {
    tasks.audio = isAudioWorking.bind(null, stream);
  }

  async.parallel(tasks, cb);
}

module.exports = isStreamWorking;
