'use strict';

module.exports = function(){
  var copyStyle = require('../../lib/copyStyle');
  var temasys = require('../../lib/temasys');
  return function(el, stream) {
    var newVideo = temasys.createVideo(stream);
    copyStyle(el, newVideo);

    // replace el if needed
    var container = el.parentNode;
    if (container) {
      container.insertBefore(newVideo);
      container.removeChild(el);
    }

    return newVideo;
  };
};
