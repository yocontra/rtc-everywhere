'use strict';

var pluginName = 'TemWebRTCPlugin';
var companyPrefix = 'Tem';

function getPlugins(){
  var plugs = Array.prototype.slice.call(navigator.plugins);
  return plugs.reduce(function(prev, p){
    prev[p.name] = p;
    return prev;
  }, {});
}

function AXExists(prefix, plugin) {
  try {
    new ActiveXObject(prefix + '.' + plugin);
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = function(){
  var browser = require('detect-browser');
  if (browser.name === 'safari') {
    return getPlugins()[pluginName];
  }
  if (browser.name === 'ie') {
    return AXExists(companyPrefix, pluginName);
  }
  return false;
};
