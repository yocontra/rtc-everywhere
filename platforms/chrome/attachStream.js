'use strict';

module.exports = function(){
  var URL = window.URL || window.webkitURL;
  return function(el, stream) {
    el.src = URL.createObjectURL(stream);
    return el;
  };
};
