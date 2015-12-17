//require('es5-shim-sham');

var rtc = require('../../')();
var Peer = require('simple-peer');
var crel = require('crel');
var browser = require('detect-browser');
var onStreamLoaded = require('../../util/onStreamLoaded');

window.rtc = rtc;

function debug(peer){
  peer.on('signal', function(m){
    console.debug('[debug] signal', m);
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

rtc.getUserMedia(function(err, stream){
  if (err) {
    return console.error(err);
  }
  onStreamLoaded(stream, function(err, res){
    console.log(err, res);
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
