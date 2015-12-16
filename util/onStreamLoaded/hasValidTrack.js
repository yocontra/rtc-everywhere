'use strict';

function isTrackEnabled(type, t){
  return t.kind === type && t.enabled &&
    !t.muted && t.readyState !== 'ended';
}

function hasValidTrack(stream, type){
  return stream.getTracks().some(isTrackEnabled.bind(null, type));
}

module.exports = hasValidTrack;
