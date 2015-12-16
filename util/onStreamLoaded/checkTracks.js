'use strict';

function isTrackEnabled(t){
  return t.kind === forType && t.enabled &&
    !t.muted && t.readyState isnt 'ended';
}

function checkTracks(stream, forType){
  return stream.getTracks().some(isTrackEnabled);
}

module.exports = checkTracks;
