'use strict';

var checkTracks = require('./checkTracks');
var crel = require('crel');
var timeoutTime = 20000;

// basic premise:
// - check for working video tracks
// - load video into dummy video tag
// - wait for onplaying event

function isVideoWorking(stream, cb){
  if (!checkTracks(stream, 'video')) return cb('dead video');
  if (stream._videoMeta) return cb(null, stream._videoMeta);

  var vidEl, actualEl;
  var finished = false;
  var timeout = setTimeout(finishIt.bind(null, 'no video data'), timeoutTime);

  function finishIt(err){
    if (finished) return;
    finished = true;
    clearTimeout(timeout);

    if (!err) {
      stream._videoMeta = {
        height: actualEl.videoHeight,
        width: actualEl.videoWidth
      };
    }

    vidEl.remove();
    actualEl.remove();
    cb(err, stream._videoMeta);
  }

  vidEl = crel('video', {
    muted: true,
    autoplay: true,
    style: 'display: none;'
  });

  actualEl = attach(stream, vidEl);
  actualEl.addEventListener('canplay', canPlay, false);
  actualEl.addEventListener('playing', canPlay, false);
}

module.exports = isVideoWorking;
