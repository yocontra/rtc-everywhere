'use strict';

var events = require('add-event-listener');
var hasValidTrack = require('./hasValidTrack');
var crel = require('crel');
var rtc = require('../../');
var timeoutTime = 20000;

// basic premise:
// - check for working video tracks
// - load video into dummy video tag
// - wait for onplaying event

function isVideoWorking(stream, cb){
  if (!hasValidTrack(stream, 'video')) return cb('dead video');
  if (stream._videoMeta) return cb(null, stream._videoMeta);

  var rtcInst = rtc(stream._rtcOpt);
  var finished = false;
  var timeout = setTimeout(finishIt.bind(null, 'no video data'), timeoutTime);

  var vidEl = crel('video', {
    muted: true,
    autoplay: true,
    style: 'display: none;'
  });

  var actualEl = rtcInst.attachStream(stream, vidEl);
  events.addEventListener(actualEl, 'canplay', finishIt.bind(null, null));
  events.addEventListener(actualEl, 'playing', finishIt.bind(null, null));

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
}

module.exports = isVideoWorking;
