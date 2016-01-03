var meterOpt = {
  tweenIn: 2,
  tweenOut: 6
};

module.exports = function(stream, cb) {
  var AudioContext = window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.msAudioContext;

  if (!AudioContext || !AudioContext.prototype.createMediaStreamSource) {
    return;
  }

  var watchVolume = require('volume-meter');
  var ctx = new AudioContext();
  var src = ctx.createMediaStreamSource(stream);
  var meter = watchVolume(ctx, meterOpt, cb);
  var gain = ctx.createGain();
  gain.gain.value = 0;

  // stream -> meter -> zero gain -> dest
  src.connect(meter);
  meter.connect(gain);
  gain.connect(ctx.destination);

  return {
    end: function(){
      // TODO: verify this works
      if (meter.disconnect) meter.disconnect();
      if (gain.disconnect) gain.disconnect();
      if (src.disconnect) src.disconnect();

      if (meter.stop) meter.stop();
      if (gain.stop) gain.stop();
      if (src.stop) src.stop();
      if (ctx.close) ctx.close();
    }
  };
};
