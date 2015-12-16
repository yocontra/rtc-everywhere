'use strict';

var checkTracks = require('./checkTracks');
var timeoutTime = 20000;

// basic premise:
// - check for working video tracks
// - load video into dummy video tag
// - wait for onplaying event

function isVideoWorking(stream, cb){
  if (!checkTracks(stream, 'video')) return cb('dead');
  if (stream._videoMeta) return cb(null, stream._videoMeta);
  // TODO: load video, wait for play, return video meta
}

module.exports = isVideoWorking;
