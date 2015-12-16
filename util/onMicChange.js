var meterOpt = {
  tweenIn: 2,
  tweenOut: 6
};

module.exports = function(stream, cb) {
  var watchVolume = require('volume-meter');
  var AudioContext = window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.msAudioContext;

  var ctx = new AudioContext();
  var src = ctx.createMediaStreamSource(stream);
  var meter = watchVolume(ctx, meterOpt, cb);
  src.connect(meter);
  src.connect(ctx.createGain());

  return {
    end: function() {
      // TODO: verify this works
      meter.stop();
      ctx.close();
      src.disconnect();
    }
  };
};
