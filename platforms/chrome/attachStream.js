'use strict';

var URL = window.URL || window.webkitURL;

module.exports = function(el, stream) {
  el.src = URL.createObjectURL(stream);
};
