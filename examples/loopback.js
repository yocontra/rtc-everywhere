var rtc = require('rtc-everywhere')();
var Peer = require('simple-peer');

var initiator = new Peer({
  initiator: true,
  wrtc: rtc
});

var receiver = new Peer({
  wrtc: rtc
});

initiator.on('signal', receiver.signal);
receiver.on('signal', initiator.signal);

initiator.once('connect', function(){
  console.log('Connected!');
});

receiver.once('stream', function(stream){
  document.getElementById('video').src = URL.createObjectURL(stream);
});

rtc.getUserMedia(function(err, stream){
  initiator.addStream(stream);
});
