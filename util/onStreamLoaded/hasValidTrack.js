'use strict';

function isTrackEnabled(t){
  return t.kind === forType && t.enabled &&
    !t.muted && t.readyState !== 'ended';
}

function hasValidTrack(stream, forType){
  return stream.getTracks().some(isTrackEnabled);
}

module.exports = hasValidTrack;
