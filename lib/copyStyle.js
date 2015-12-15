'use strict';

function copyStyle(src, dest){
  dest.setAttribute('style', src.style.cssText);
  dest.className = src.className;
}

module.exports = copyStyle;
