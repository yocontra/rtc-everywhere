'use strict';

module.exports = function(){
  return typeof cordova !== 'undefined' && window.device.platform === 'iOS';
};
