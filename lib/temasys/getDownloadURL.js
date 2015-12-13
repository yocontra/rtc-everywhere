'use strict';

module.exports = function(){
  var browser = require('detect-browser');
  if (browser.name === 'safari' && !!navigator.platform.match(/^Mac/i)) {
    return 'http://bit.ly/1n77hco';
  }
  if (browser.name === 'ie' && !!navigator.platform.match(/^Win/i)) {
    return 'http://bit.ly/1kkS4FN';
  }
};
