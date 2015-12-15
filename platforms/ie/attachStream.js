'use strict';

module.exports = function(){
  var temasys = require('../../lib/temasys');
  return function(el, stream) {
    var newVideo = temasys.createVideo(stream);
    var container = el.parentNode;

    if (container) {
      container.insertBefore(newVideo);
      container.removeChild(el);
    }

    return newVideo;
  };
};
