'use strict';

function RTCPeerConnection(plugin, pageId, opt, constraints){
  if (!constraints) constraints = {};
  if (!opt) opt = {};
  var iceServers = (opt.iceServers || []).map(function(s) {
    s.hasCredentials = !!s.credential;
    return s;
  });
  return plugin.PeerConnection(
    pageId,
    iceServers,
    constraints.mandatory || null,
    constraints.optional || null
  );
}

function RTCSessionDescription(plugin, opt) {
  if (!opt) opt = {};
  return plugin.ConstructSessionDescription(opt.type, opt.sdp);
}

function RTCIceCandidate(plugin, opt) {
  if (!opt) opt = {};
  return plugin.ConstructIceCandidate(
    opt.sdpMid || '',
    opt.sdpMLineIndex,
    opt.candidate
  );
}

module.exports = function(plugin, pageId){
  return {
    getUserMedia: plugin.getUserMedia,
    RTCPeerConnection: RTCPeerConnection.bind(null, plugin, pageId),
    RTCSessionDescription: RTCSessionDescription.bind(null, plugin),
    RTCIceCandidate: RTCIceCandidate.bind(null, plugin)
  };
};
