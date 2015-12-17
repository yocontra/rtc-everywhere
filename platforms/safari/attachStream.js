'use strict';

module.exports = function(){
  var copyStyle = require('../../lib/copyStyle');
  var temasys = require('../../lib/temasys');
  return function(stream, el) {
    var newVideo = temasys.createVideo(stream, {
      muted: Boolean(el.muted)
    });
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
