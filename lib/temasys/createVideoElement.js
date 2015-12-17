'use strict';

var crel = require('crel');
var uuid = require('uuid');

module.exports = function(opt) {
  var renderId = uuid.v4();
  var params = [
    {name: 'pluginId', value: opt.pluginId},
    {name: 'windowless', value: true},
    {name: 'pageId', value: opt.pageId},
    {name: 'streamId', value: opt.stream.id},
  ].map(crel.bind(null, 'param'));

  opt.stream.enableSoundTracks(!opt.muted);

  return crel('object', {
    type: 'application/x-temwebrtcplugin',
    id: renderId
  }, params);
};
