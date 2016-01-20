var rtc = require('../../')();
var Peer = require('simple-peer');
var crel = require('crel');

if (rtc.platform === 'unsupported') {
  console.error('Platform not supported!');
}

rtc.getUserMedia(function(err, stream){
  if (err) return console.error(err);
  createLoopback(stream);
});

function createLoopback(stream){
  var initiator = new Peer({
    initiator: true,
    stream: stream,
    wrtc: rtc
  });

  var receiver = new Peer({
    stream: stream,
    wrtc: rtc
  });

  initiator.on('error', console.error.bind(console));
  receiver.on('error', console.error.bind(console));

  initiator.on('signal', receiver.signal.bind(receiver));
  receiver.on('signal', initiator.signal.bind(initiator));

  initiator.once('stream', function(stream){
    console.debug('Stream relayed receiver -> initiator');
    crel(document.body, makeVideo(stream));
  });

  receiver.once('stream', function(stream){
    console.debug('Stream relayed  initiator -> receiver');
    crel(document.body, makeVideo(stream));
  });
}

function makeVideo(stream) {
  var el = crel('video', {
    muted: true,
    autoplay: true
  });
  return rtc.attachStream(stream, el);
}
