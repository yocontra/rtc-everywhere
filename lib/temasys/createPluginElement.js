'use strict';

var crel = require('crel');

module.exports = function(opt) {
  var params = [
    {name: 'onload', value: opt.onLoad},
    {name: 'pluginId', value: opt.pluginId},
    {name: 'windowless', value: false},
    {name: 'forceGetAllCams', value: true},
    {name: 'pageId', value: opt.pageId}
  ].map(crel.bind(null, 'param'));

  return crel('object', {
    width: '1px',
    height: '1px',
    type: 'application/x-temwebrtcplugin',
    id: opt.pluginId
  }, params);
};
