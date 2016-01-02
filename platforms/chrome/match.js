'use strict';

module.exports = function(){
  var browser = require('detect-browser');
  return typeof window !== 'undefined' &&
    typeof window.chrome !== 'undefined' &&
    browser.name === 'chrome';
};
