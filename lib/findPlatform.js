'use strict';

var requireDir = require('bulk-require');
var platforms = requireDir(__dirname + '/../platforms', ['**/*.js']);

function matches(k){
  var platform = platforms[k];
  return platform.match && platform.match();
}

function findPlatform() {
  var foundKey = Object.keys(platforms).filter(matches)[0];

  return {
    name: foundKey || 'unsupported',
    platform: platforms[foundKey] || platforms.unsupported
  };
}

module.exports = findPlatform;
