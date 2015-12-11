'use strict';

module.exports = function(){
  if (!!navigator.platform.match(/^Mac/i)) {
    return 'http://bit.ly/1n77hco';
  }
  if (!!navigator.platform.match(/^Win/i)) {
    return 'http://bit.ly/1kkS4FN';
  }
};
