'use strict';

function copyStyle(src, dest){
  Object.keys(src.style).forEach(function(k){
    dest.setAttribute('style', src.style.cssText);
  });
  dest.className = src.className;
}

module.exports = copyStyle;
