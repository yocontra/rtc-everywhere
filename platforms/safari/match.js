'use strict';

module.exports = function(){
  var browser = require('detect-browser');
  return browser.name === 'safari' && typeof cordova === 'undefined';
};
