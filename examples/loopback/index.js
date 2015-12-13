var rtc = require('../../')();
var Peer = require('simple-peer');
var crel = require('crel');
var browser = require('detect-browser');

function debug(peer){
  peer.on('signal', function(m){
    console.debug('[debug] signal', m);
  });
}
function makeTemVideo(stream) {
  var tem = require('../../lib/temasys');
  return tem.createVideo(stream);
}
function makeVideo(stream) {
  if (browser.name === 'safari' || browser.name === 'ie') {
    return makeTemVideo(stream);
  }
  var el = crel('video');
  el.muted = true;
  el.autoplay = true;
  el.src = URL.createObjectURL(stream);
  return el;
}

rtc.getUserMedia(function(err, stream){
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
