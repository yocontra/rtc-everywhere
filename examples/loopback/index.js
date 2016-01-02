//require('es5-shim-sham');

var ctor = require('../../');
var rtc = ctor();
var Peer = require('simple-peer');
var crel = require('crel');
var browser = require('detect-browser');
var onStreamLoaded = require('../../util/onStreamLoaded');

window.ctor = ctor;
window.rtc = rtc;
bootstrap();


function bootstrap(){
  console.log('Platform:', rtc.platform);
  console.debug('Inspect:', rtc);

  if (rtc.platform === 'unsupported') {
    console.error('Platform not supported!');
    return;
  }

  rtc.getUserMedia(function(err, stream){
    if (err) {
      return console.error(err);
    }
    createLoopback(stream);
  });
}

function createLoopback(stream){
  onStreamLoaded(stream, function(err, res){
    if (err) console.error('StreamLoaded error:', err);
    if (res) console.log('StreamLoaded:', res);
  });

  var initiator = new Peer({
    initiator: true,
    stream: stream,
    wrtc: rtc
  });

  var receiver = new Peer({
    stream: stream,
    wrtc: rtc
  });

  //debug(initiator);
  //debug(receiver);

  initiator.on('error', console.error.bind(console));
  receiver.on('error', console.error.bind(console));

  initiator.on('signal', receiver.signal.bind(receiver));
  receiver.on('signal', initiator.signal.bind(initiator));

  initiator.once('connect', function(){
    console.debug('Connected!');
  });

  initiator.once('stream', function(stream){
    console.debug('Stream relayed between peers');
    crel(document.body, makeVideo(stream));
  });

  receiver.once('stream', function(stream){
    crel(document.body, makeVideo(stream));
  });
}

function debug(peer){
  peer.on('signal', function(m){
    console.debug('Signal:', m);
  });
}

function makeVideo(stream) {
  var el = crel('video', {
    muted: true,
    autoplay: true,
    className: 'video-stream',
    style: 'height:100px; width:100px; display:inline-block; background-color:black;'
  });
  return rtc.attachStream(stream, el);
}
