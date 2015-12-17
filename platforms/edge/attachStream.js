'use strict';

module.exports = function(){
  return function(stream, el) {
    el.srcObject = stream;
    return el;
  };
};
