'use strict';

var uuid = require('uuid');
var domReady = require('domready');
var crel = require('crel');
var merge = require('lodash.merge');
var EventEmitter = require('events').EventEmitter;
var getRTC = require('./getRTC');
var createPluginElement = require('./createPluginElement');
var createVideoElement = require('./createVideoElement');
var isInstalled = require('./isInstalled');

var plugin, rtc, loading;
var ee = new EventEmitter();
var pluginId = uuid.v4();
var pageId = uuid.v4();
var onLoadFn = '___$' + pluginId;

// TODO: handle not installed
// this takes about 272ms to load the plugin
module.exports = function(cb){
  if (!isInstalled()) {
    if (cb) cb();
    return;
  }
  if (rtc) {
    if (cb) cb(rtc);
    return;
  }
  loadPlugin();
  if (cb) ee.once('ready', cb);
};
module.exports.createVideo = function(stream, opt) {
  if (!opt) opt = {};
  return createVideoElement(merge({
    pluginId: pluginId,
    pageId: pageId,
    stream: stream
  }, opt));
};

function loadPlugin(){
  if (plugin || loading) return;
  loading = true;
  window[onLoadFn] = handleLoad;
  domReady(function(){
    plugin = createPluginElement({
      pluginId: pluginId,
      pageId: pageId,
      onLoad: onLoadFn
    });
    loading = false;
    crel(document.body, plugin);
  });
}

function handleLoad() {
  delete window[onLoadFn];
  plugin.setPluginId(pageId, pluginId);
  plugin.setLogFunction(console);
  plugin.setLogLevel('VERBOSE');
  rtc = getRTC(plugin, pageId);
  ee.emit('ready', rtc);
}
