'use strict';

function copyStyle(src, dest){
  dest.setAttribute('style', dest.style.cssText + src.style.cssText);
  if (dest.className) {
    dest.className = dest.className + ' ' + src.className;
  } else {
    dest.className = src.className;
  }
}

module.exports = copyStyle;
