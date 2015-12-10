'use strict';

module.exports = function(){
  return typeof window!== 'undefined' &&
    typeof window.chrome !== 'undefined';
};
