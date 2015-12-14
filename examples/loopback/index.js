require('es5-shim-sham');

var rtc = require('../../')();
var Peer = require('simple-peer');
var crel = require('crel');
var browser = require('detect-browser');

function debug(peer){
  peer.on('signal', function(m){
    console.debug('[debug] signal', m);
  });
}
function makeVideo(stream) {
  var el = crel('video');
  el.muted = true;
  el.autoplay = true;
  rtc.attachStream(el, stream);
  return el;
}

rtc.getUserMedia(function(err, stream){
  if (err) {
    return console.error(err);
  }
  var initiator = new Peer({
    initiator: true,
    stream: stream,
    wrtc: rtc
  });

  var receiver = new Peer({
    stream: stream,
    wrtc: rtc
  });

  debug(initiator);
  debug(receiver);

  initiator.on('error', console.error.bind(console));
  receiver.on('error', console.error.bind(console));

  initiator.on('signal', receiver.signal.bind(receiver));
  receiver.on('signal', initiator.signal.bind(initiator));

  initiator.once('connect', function(){
    console.log('Connected!');
  });

  initiator.once('stream', function(stream){
    console.log('got stream');
    crel(document.body, makeVideo(stream));
  });

  receiver.once('stream', function(stream){
    crel(document.body, makeVideo(stream));
  });
});
