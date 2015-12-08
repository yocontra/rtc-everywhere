'use strict';

var requireDir = require('bulk-require');
var platforms = requireDir(__dirname + '/../platforms', ['**/*.js']);

function matches(k){
  var platform = platforms[k];
  return platform.match && platform.match();
}

function findPlatform() {
  var found = Object.keys(platforms).filter(matches);
  return platforms[found[0]] || platforms.unsupported;
}

module.exports = findPlatform;
