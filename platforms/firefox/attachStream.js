'use strict';

module.exports = function(){
  return function(el, stream) {
    el.srcObject = stream;
    return el;
  };
};
