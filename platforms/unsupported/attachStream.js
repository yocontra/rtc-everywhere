'use strict';

module.exports = function(){
  return function(stream, el) {
    throw new Error('No DOM, what are you doing?');
  };
};
