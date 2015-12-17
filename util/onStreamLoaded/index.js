'use strict';

var async = require('async');
var isAudioWorking = require('./isAudioWorking');
var isVideoWorking = require('./isVideoWorking');

function isStreamWorking(opt, stream, cb) {
  if (arguments.length !== 3) {
    cb = stream;
    stream = opt;
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
