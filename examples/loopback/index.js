var rtc = require('../../')();
var Peer = require('simple-peer');
var crel = require('crel');

function makeVideo() {
  return crel('video', {
    muted: true,
    autoplay: true
  });
}
var vid = makeVideo();
var vid2 = makeVideo();

console.log(rtc);

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

  initiator.on('signal', receiver.signal.bind(receiver));
  receiver.on('signal', initiator.signal.bind(initiator));

  initiator.once('connect', function(){
    console.log('Connected!');
  });

  initiator.once('stream', function(stream){
    vid.src = URL.createObjectURL(stream);
    crel(document.body, vid);
  });

  receiver.once('stream', function(stream){
    vid2.src = URL.createObjectURL(stream);
    crel(document.body, vid2);
  });
});
