'use strict';

module.exports = function(){
  var URL = window.URL || window.webkitURL;
  return function(stream, el) {
    el.src = URL.createObjectURL(stream);
    return el;
  };
};
