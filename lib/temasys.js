'use strict';

var uuid = require('uuid');
var domReady = require('domready');
var crel = require('crel');
var EventEmitter = require('events').EventEmitter;

var plugin, rtc, loading;
var ee = new EventEmitter();
var pluginId = uuid.v4();
var pageId = uuid.v4();
var onLoadFn = '___$' + pluginId;

// this takes about 272ms to load the plugin
module.exports = function(cb){
  if (rtc) {
    if (cb) cb(null, rtc);
    return;
  }
  loadPlugin();
  if (cb) ee.once('ready', cb);
};

function loadPlugin(cb){
  if (plugin || loading) return;
  loading = true;
  window[onLoadFn] = handleLoad;
  domReady(function(){
    plugin = createElement(pluginId, pageId);
    loading = false;
    crel(document.body, plugin);
  });
}

function handleLoad() {
  delete window[onLoadFn];

  plugin.setPluginId(pageId, pluginId);
  plugin.setLogFunction(console);

  rtc = {
    getUserMedia: plugin.getUserMedia,
    RTCPeerConnection: function(opt, constraints){
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
    },
    RTCSessionDescription: function(opt){
      if (!opt) opt = {};
      return plugin.ConstructSessionDescription(opt.type, opt.sdp);
    },
    RTCIceCandidate: function(opt){
      if (!opt) opt = {};
      return plugin.ConstructIceCandidate(
        opt.sdpMid || '',
        opt.sdpMLineIndex,
        opt.candidate
      );
    }
  };

  ee.emit('ready', rtc);
}

function createElement(pluginId, pageId) {
  var params = [
    {name: 'onload', value: onLoadFn},
    {name: 'pluginId', value: pluginId},
    {name: 'windowless', value: false},
    {name: 'pageId', value: pageId}
  ].map(crel.bind(null, 'param'));

  return crel('object', {
    width: 0,
    height: 0,
    type: 'application/x-temwebrtcplugin',
    id: pluginId
  }, params);
}
