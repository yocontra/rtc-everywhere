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
    console.debug('User camera:', stream);
    createLoopback(stream);
  });
}

function createLoopback(stream){

  // make this funky wrapper due to edge issues
  function getStream(){
    if (rtc.platform === 'edge') {
      return stream.clone();
    }
    return stream;
  }

  onStreamLoaded(getStream(), function(err, res){
    if (err) console.error('StreamLoaded error:', err);
    if (res) console.log('StreamLoaded:', res);
  });

  var initiator = new Peer({
    initiator: true,
    trickle: (rtc.platform !== 'edge'),
    stream: getStream(),
    wrtc: rtc
  });

  var receiver = new Peer({
    stream: getStream(),
    trickle: (rtc.platform !== 'edge'),
    wrtc: rtc
  });

  //debug(initiator, 'initiator');
  //debug(receiver, 'receiver');

  initiator.on('error', console.error.bind(console));
  receiver.on('error', console.error.bind(console));

  initiator.on('signal', receiver.signal.bind(receiver));
  receiver.on('signal', initiator.signal.bind(initiator));

  initiator.once('connect', function(){
    console.debug('Connected!');
  });

  initiator.once('stream', function(stream){
    console.debug('Stream relayed receiver -> initiator');
    crel(document.body, makeVideo(stream));
  });

  receiver.once('stream', function(stream){
    console.debug('Stream relayed  initiator -> receiver');
    crel(document.body, makeVideo(stream));
  });
}

function debug(peer, id){
  peer.on('signal', function(m){
    console.debug(id, 'signal:', JSON.stringify(m));
  });
}

function makeVideo(stream) {
  var el = crel('video', {
    muted: true,
    autoplay: true,
    className: 'video-stream',
    style: 'max-height:100px; max-width:100px; border: 2px solid gray; display:inline-block; background-color:black;'
  });
  return rtc.attachStream(stream, el);
}
