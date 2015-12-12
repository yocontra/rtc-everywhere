'use strict';

var pluginName = 'TemWebRTCPlugin';

function getPlugins(){
  var plugs = Array.prototype.slice.call(navigator.plugins);
  return plugs.reduce(function(prev, p){
    prev[p.name] = p;
    return prev;
  }, {});
}
module.exports = function(){
  return getPlugins()[pluginName];
};
