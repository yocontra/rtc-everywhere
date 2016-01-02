'use strict';

var requireDir = require('bulk-require');
var platforms = requireDir(__dirname + '/../platforms', ['**/*.js']);
var platformKeys = Object.keys(platforms);

function matches(k){
  var platform = platforms[k];
  return platform && platform.match && platform.match();
}

// valid options: platforms, platform
function findPlatform(opt) {
  var availPlatforms = platformKeys;
  var foundKey;

  if (opt && opt.platforms) {
    if (!Array.isArray(opt.platforms)) {
      throw new Error('Invalid platforms option');
    }
    availPlatforms = availPlatforms.filter(function(p){
      return opt.platforms.indexOf(p) !== -1;
    });
  }

  if (opt && opt.platform) {
    if (availPlatforms.indexOf(opt.platform) === -1) {
      throw new Error('Invalid platform option');
    }
    foundKey = opt.platform;
  } else {
    foundKey = availPlatforms.filter(matches)[0];
  }

  return {
    name: foundKey || 'unsupported',
    platform: platforms[foundKey] || platforms.unsupported
  };
}

module.exports = findPlatform;
module.exports.platforms = platformKeys;
