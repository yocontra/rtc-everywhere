/*
 * rtc-everywhere.js v0.0.4
 * Cross-everything WebRTC Adapter/Polyfill
 * Copyright 2016 Contra <yo@contra.io> (http://contra.io)
 * License MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.rtcEverywhere = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var findPlatform = require('./lib/findPlatform');
module.exports = function (opt) {
    if (!opt)
        opt = {};
    var match = findPlatform(opt);
    var ctors = match.platform.rtc(opt);
    var gum = match.platform.gum(opt);
    var attachStream = match.platform.attachStream(opt);
    var supported = !!ctors.RTCPeerConnection;
    return {
        platform: match.name,
        supported: supported,
        getUserMedia: gum,
        RTCPeerConnection: ctors.RTCPeerConnection,
        RTCSessionDescription: ctors.RTCSessionDescription,
        RTCIceCandidate: ctors.RTCIceCandidate,
        attachStream: attachStream
    };
};
module.exports.platforms = findPlatform.platforms;
},{"./lib/findPlatform":3}],2:[function(require,module,exports){
'use strict';
function copyStyle(src, dest) {
    dest.setAttribute('style', dest.style.cssText + src.style.cssText);
    if (dest.className) {
        dest.className = dest.className + ' ' + src.className;
    } else {
        dest.className = src.className;
    }
}
module.exports = copyStyle;
},{}],3:[function(require,module,exports){
'use strict';

var platforms = ({"chrome":({"attachStream":require("../platforms/chrome/attachStream.js"),"gum":require("../platforms/chrome/gum.js"),"match":require("../platforms/chrome/match.js"),"rtc":require("../platforms/chrome/rtc.js")}),"cordova-ios":({"attachStream":require("../platforms/cordova-ios/attachStream.js"),"gum":require("../platforms/cordova-ios/gum.js"),"match":require("../platforms/cordova-ios/match.js"),"rtc":require("../platforms/cordova-ios/rtc.js")}),"edge":({"attachStream":require("../platforms/edge/attachStream.js"),"gum":require("../platforms/edge/gum.js"),"match":require("../platforms/edge/match.js"),"rtc":require("../platforms/edge/rtc.js")}),"firefox":({"attachStream":require("../platforms/firefox/attachStream.js"),"gum":require("../platforms/firefox/gum.js"),"match":require("../platforms/firefox/match.js"),"rtc":require("../platforms/firefox/rtc.js")}),"ie":({"attachStream":require("../platforms/ie/attachStream.js"),"gum":require("../platforms/ie/gum.js"),"match":require("../platforms/ie/match.js"),"rtc":require("../platforms/ie/rtc.js")}),"node":({"attachStream":require("../platforms/node/attachStream.js"),"gum":require("../platforms/node/gum.js"),"match":require("../platforms/node/match.js"),"rtc":require("../platforms/node/rtc.js")}),"react-native":({"attachStream":require("../platforms/react-native/attachStream.js"),"gum":require("../platforms/react-native/gum.js"),"match":require("../platforms/react-native/match.js"),"rtc":require("../platforms/react-native/rtc.js")}),"safari":({"attachStream":require("../platforms/safari/attachStream.js"),"gum":require("../platforms/safari/gum.js"),"match":require("../platforms/safari/match.js"),"rtc":require("../platforms/safari/rtc.js")}),"unsupported":({"attachStream":require("../platforms/unsupported/attachStream.js"),"gum":require("../platforms/unsupported/gum.js"),"rtc":require("../platforms/unsupported/rtc.js")})});
var platformKeys = Object.keys(platforms);
function matches(k) {
    var platform = platforms[k];
    return platform && platform.match && platform.match();
}
function findPlatform(opt) {
    var availPlatforms = platformKeys;
    var foundKey;
    if (opt && opt.platforms) {
        if (!Array.isArray(opt.platforms)) {
            throw new Error('Invalid platforms option');
        }
        availPlatforms = availPlatforms.filter(function (p) {
            return opt.platforms.indexOf(p) !== -1;
        });
    }
    if (opt && opt.platform) {
        if (availPlatforms.indexOf(opt.platform) === -1) {
            throw new Error('Invalid platform option');
        }
        foundKey = opt.platform;
    } else {
        foundKey = availPlatforms.filter(matches)[0];
    }
    return {
        name: foundKey || 'unsupported',
        platform: platforms[foundKey] || platforms.unsupported
    };
}
module.exports = findPlatform;
module.exports.platforms = platformKeys;
},{"../platforms/chrome/attachStream.js":48,"../platforms/chrome/gum.js":49,"../platforms/chrome/match.js":50,"../platforms/chrome/rtc.js":51,"../platforms/cordova-ios/attachStream.js":52,"../platforms/cordova-ios/gum.js":53,"../platforms/cordova-ios/match.js":54,"../platforms/cordova-ios/rtc.js":55,"../platforms/edge/attachStream.js":56,"../platforms/edge/gum.js":57,"../platforms/edge/match.js":58,"../platforms/edge/rtc.js":59,"../platforms/firefox/attachStream.js":60,"../platforms/firefox/gum.js":61,"../platforms/firefox/match.js":62,"../platforms/firefox/rtc.js":63,"../platforms/ie/attachStream.js":64,"../platforms/ie/gum.js":65,"../platforms/ie/match.js":66,"../platforms/ie/rtc.js":67,"../platforms/node/attachStream.js":68,"../platforms/node/gum.js":69,"../platforms/node/match.js":70,"../platforms/node/rtc.js":71,"../platforms/react-native/attachStream.js":72,"../platforms/react-native/gum.js":73,"../platforms/react-native/match.js":74,"../platforms/react-native/rtc.js":75,"../platforms/safari/attachStream.js":76,"../platforms/safari/gum.js":77,"../platforms/safari/match.js":78,"../platforms/safari/rtc.js":79,"../platforms/unsupported/attachStream.js":80,"../platforms/unsupported/gum.js":81,"../platforms/unsupported/rtc.js":82}],4:[function(require,module,exports){
'use strict';
var mock = require('../temp-mock');
var temasys = require('./index');
var isInstalled = require('./isInstalled');
var nu = require('new-operator');
var RTCPeerConnectionMock = mock({
        methods: [
            'addIceCandidate',
            'addStream',
            'close',
            'createAnswer',
            'createDataChannel',
            'createOffer',
            'setLocalDescription',
            'setRemoteDescription',
            'removeStream',
            'getLocalStreams',
            'getRemoteStreams',
            'getStats'
        ],
        properties: [
            'iceConnectionState',
            'iceGatheringState',
            'localDescription',
            'remoteDescription',
            'onaddstream',
            'ondatachannel',
            'onicecandidate',
            'oniceconnectionstatechange',
            'onnegotiationneeded',
            'onremovestream',
            'onsignalingstatechange',
            'signalingState'
        ]
    });
if (!isInstalled()) {
    module.exports = {};
} else {
    module.exports = {
        RTCPeerConnection: function () {
            var inst = nu.apply(RTCPeerConnectionMock, arguments);
            temasys(function (rtc) {
                mock.resolve(inst, rtc.RTCPeerConnection);
            });
            return inst;
        },
        RTCSessionDescription: function () {
            var ctor;
            temasys(function (rtc) {
                ctor = rtc.RTCSessionDescription;
            });
            if (!ctor) {
                throw new Error('Tried RTCSessionDescription before RTCPeerConnection');
            }
            return nu.apply(ctor, arguments);
        },
        RTCIceCandidate: function () {
            var ctor;
            temasys(function (rtc) {
                ctor = rtc.RTCIceCandidate;
            });
            if (!ctor) {
                throw new Error('Tried RTCIceCandidate before RTCPeerConnection');
            }
            return nu.apply(ctor, arguments);
        }
    };
}
},{"../temp-mock":10,"./index":8,"./isInstalled":9,"new-operator":33}],5:[function(require,module,exports){
'use strict';
var crel = require('crel');
module.exports = function (opt) {
    var params = [
            {
                name: 'onload',
                value: opt.onLoad
            },
            {
                name: 'pluginId',
                value: opt.pluginId
            },
            {
                name: 'windowless',
                value: false
            },
            {
                name: 'forceGetAllCams',
                value: true
            },
            {
                name: 'pageId',
                value: opt.pageId
            }
        ].map(crel.bind(null, 'param'));
    return crel('object', {
        width: '1px',
        height: '1px',
        type: 'application/x-temwebrtcplugin',
        id: opt.pluginId
    }, params);
};
},{"crel":13}],6:[function(require,module,exports){
'use strict';
var crel = require('crel');
var uuid = require('uuid');
module.exports = function (opt) {
    var renderId = uuid.v4();
    var params = [
            {
                name: 'pluginId',
                value: opt.pluginId
            },
            {
                name: 'windowless',
                value: true
            },
            {
                name: 'pageId',
                value: opt.pageId
            },
            {
                name: 'streamId',
                value: opt.stream.id
            }
        ].map(crel.bind(null, 'param'));
    opt.stream.enableSoundTracks(!opt.muted);
    return crel('object', {
        type: 'application/x-temwebrtcplugin',
        id: renderId
    }, params);
};
},{"crel":13,"uuid":47}],7:[function(require,module,exports){
'use strict';
function RTCPeerConnection(plugin, pageId, opt, constraints) {
    if (!constraints)
        constraints = {};
    if (!opt)
        opt = {};
    var iceServers = (opt.iceServers || []).map(function (s) {
            s.hasCredentials = !!s.credential;
            return s;
        });
    return plugin.PeerConnection(pageId, iceServers, constraints.mandatory || null, constraints.optional || null);
}
function RTCSessionDescription(plugin, opt) {
    if (!opt)
        opt = {};
    return plugin.ConstructSessionDescription(opt.type, opt.sdp);
}
function RTCIceCandidate(plugin, opt) {
    if (!opt)
        opt = {};
    return plugin.ConstructIceCandidate(opt.sdpMid || '', opt.sdpMLineIndex, opt.candidate);
}
module.exports = function (plugin, pageId) {
    return {
        getUserMedia: plugin.getUserMedia,
        RTCPeerConnection: RTCPeerConnection.bind(null, plugin, pageId),
        RTCSessionDescription: RTCSessionDescription.bind(null, plugin),
        RTCIceCandidate: RTCIceCandidate.bind(null, plugin)
    };
};
},{}],8:[function(require,module,exports){
'use strict';
var uuid = require('uuid');
var domReady = require('domready');
var crel = require('crel');
var merge = require('lodash.merge');
var EventEmitter = require('events').EventEmitter;
var getRTC = require('./getRTC');
var createPluginElement = require('./createPluginElement');
var createVideoElement = require('./createVideoElement');
var isInstalled = require('./isInstalled');
var plugin, rtc, loading;
var ee = new EventEmitter();
var pluginId = uuid.v4();
var pageId = uuid.v4();
var onLoadFn = '___$' + pluginId;
module.exports = function (cb) {
    if (!isInstalled()) {
        if (cb)
            cb();
        return;
    }
    if (rtc) {
        if (cb)
            cb(rtc);
        return;
    }
    loadPlugin();
    if (cb)
        ee.once('ready', cb);
};
module.exports.createVideo = function (stream, opt) {
    if (!opt)
        opt = {};
    return createVideoElement(merge({
        pluginId: pluginId,
        pageId: pageId,
        stream: stream
    }, opt));
};
function loadPlugin() {
    if (plugin || loading)
        return;
    loading = true;
    window[onLoadFn] = handleLoad;
    domReady(function () {
        plugin = createPluginElement({
            pluginId: pluginId,
            pageId: pageId,
            onLoad: onLoadFn
        });
        loading = false;
        crel(document.body, plugin);
    });
}
function handleLoad() {
    delete window[onLoadFn];
    plugin.setPluginId(pageId, pluginId);
    plugin.setLogFunction(console);
    plugin.setLogLevel('VERBOSE');
    rtc = getRTC(plugin, pageId);
    ee.emit('ready', rtc);
}
},{"./createPluginElement":5,"./createVideoElement":6,"./getRTC":7,"./isInstalled":9,"crel":13,"domready":15,"events":12,"lodash.merge":16,"uuid":47}],9:[function(require,module,exports){
'use strict';
var pluginName = 'TemWebRTCPlugin';
var companyPrefix = 'Tem';
function getPlugins() {
    var plugs = Array.prototype.slice.call(navigator.plugins);
    return plugs.reduce(function (prev, p) {
        prev[p.name] = p;
        return prev;
    }, {});
}
function AXExists(prefix, plugin) {
    try {
        new ActiveXObject(prefix + '.' + plugin);
        return true;
    } catch (e) {
        return false;
    }
}
module.exports = function () {
    var browser = require('detect-browser');
    if (browser.name === 'safari') {
        return getPlugins()[pluginName];
    }
    if (browser.name === 'ie') {
        return AXExists(companyPrefix, pluginName);
    }
    return false;
};
},{"detect-browser":14}],10:[function(require,module,exports){
'use strict';
function mockit(opt) {
    if (!opt)
        opt = {};
    if (!opt.properties)
        opt.properties = [];
    if (!opt.methods)
        opt.methods = [];
    function Mock() {
        this._ctorArgs = arguments;
        this._actions = [];
        this._state = {};
        this._opt = opt;
    }
    opt.properties.forEach(hookProperty);
    opt.methods.forEach(hookMethod);
    return Mock;
    function hookMethod(k) {
        Mock.prototype[k] = function () {
            this._actions.push({
                type: 'call',
                key: k,
                args: arguments
            });
            return this;
        };
    }
    function hookProperty(k) {
        Object.defineProperty(Mock.prototype, k, {
            configurable: true,
            set: function (v) {
                this._state[k] = v;
                this._actions.push({
                    type: 'set',
                    key: k,
                    value: v
                });
            },
            get: function () {
                return this._state[k];
            }
        });
    }
}
mockit.resolve = function (inst, fn) {
    var clazz = fn.apply(fn, inst._ctorArgs);
    if (typeof clazz === 'undefined') {
        clazz = {};
    }
    inst._actions.forEach(function (action) {
        if (action.type === 'set') {
            clazz[action.key] = action.value;
        } else if (action.type === 'call' && typeof clazz[action.key] === 'function') {
            clazz[action.key].apply(inst, action.args);
        }
    });
    inst._opt.methods.forEach(function (k) {
        inst[k] = clazz[k];
    });
    inst._opt.properties.forEach(function (k) {
        Object.defineProperty(inst, k, {
            configurable: true,
            set: function (v) {
                clazz[k] = v;
            },
            get: function () {
                return clazz[k];
            }
        });
    });
    delete inst._opt;
    delete inst._state;
    delete inst._actions;
    delete inst._ctorArgs;
    return clazz;
};
module.exports = mockit;
},{}],11:[function(require,module,exports){

},{}],12:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],13:[function(require,module,exports){
//Copyright (C) 2012 Kory Nunn

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*

    This code is not formatted for readability, but rather run-speed and to assist compilers.

    However, the code's intention should be transparent.

    *** IE SUPPORT ***

    If you require this library to work in IE7, add the following after declaring crel.

    var testDiv = document.createElement('div'),
        testLabel = document.createElement('label');

    testDiv.setAttribute('class', 'a');
    testDiv['className'] !== 'a' ? crel.attrMap['class'] = 'className':undefined;
    testDiv.setAttribute('name','a');
    testDiv['name'] !== 'a' ? crel.attrMap['name'] = function(element, value){
        element.id = value;
    }:undefined;


    testLabel.setAttribute('for', 'a');
    testLabel['htmlFor'] !== 'a' ? crel.attrMap['for'] = 'htmlFor':undefined;



*/

(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.crel = factory();
    }
}(this, function () {
    var fn = 'function',
        obj = 'object',
        nodeType = 'nodeType',
        textContent = 'textContent',
        setAttribute = 'setAttribute',
        attrMapString = 'attrMap',
        isNodeString = 'isNode',
        isElementString = 'isElement',
        d = typeof document === obj ? document : {},
        isType = function(a, type){
            return typeof a === type;
        },
        isNode = typeof Node === fn ? function (object) {
            return object instanceof Node;
        } :
        // in IE <= 8 Node is an object, obviously..
        function(object){
            return object &&
                isType(object, obj) &&
                (nodeType in object) &&
                isType(object.ownerDocument,obj);
        },
        isElement = function (object) {
            return crel[isNodeString](object) && object[nodeType] === 1;
        },
        isArray = function(a){
            return a instanceof Array;
        },
        appendChild = function(element, child) {
          if(!crel[isNodeString](child)){
              child = d.createTextNode(child);
          }
          element.appendChild(child);
        };


    function crel(){
        var args = arguments, //Note: assigned to a variable to assist compilers. Saves about 40 bytes in closure compiler. Has negligable effect on performance.
            element = args[0],
            child,
            settings = args[1],
            childIndex = 2,
            argumentsLength = args.length,
            attributeMap = crel[attrMapString];

        element = crel[isElementString](element) ? element : d.createElement(element);
        // shortcut
        if(argumentsLength === 1){
            return element;
        }

        if(!isType(settings,obj) || crel[isNodeString](settings) || isArray(settings)) {
            --childIndex;
            settings = null;
        }

        // shortcut if there is only one child that is a string
        if((argumentsLength - childIndex) === 1 && isType(args[childIndex], 'string') && element[textContent] !== undefined){
            element[textContent] = args[childIndex];
        }else{
            for(; childIndex < argumentsLength; ++childIndex){
                child = args[childIndex];

                if(child == null){
                    continue;
                }

                if (isArray(child)) {
                  for (var i=0; i < child.length; ++i) {
                    appendChild(element, child[i]);
                  }
                } else {
                  appendChild(element, child);
                }
            }
        }

        for(var key in settings){
            if(!attributeMap[key]){
                element[setAttribute](key, settings[key]);
            }else{
                var attr = attributeMap[key];
                if(typeof attr === fn){
                    attr(element, settings[key]);
                }else{
                    element[setAttribute](attr, settings[key]);
                }
            }
        }

        return element;
    }

    // Used for mapping one kind of attribute to the supported version of that in bad browsers.
    crel[attrMapString] = {};

    crel[isElementString] = isElement;

    crel[isNodeString] = isNode;

    return crel;
}));

},{}],14:[function(require,module,exports){
var browsers = [
  [ 'edge', /Edge\/([0-9\._]+)/ ],
  [ 'chrome', /Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/ ],
  [ 'firefox', /Firefox\/([0-9\.]+)(?:\s|$)/ ],
  [ 'opera', /Opera\/([0-9\.]+)(?:\s|$)/ ],
  [ 'ie', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/ ],
  [ 'ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/ ],
  [ 'ie', /MSIE\s(7\.0)/ ],
  [ 'bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/ ],
  [ 'android', /Android\s([0-9\.]+)/ ],
  [ 'ios', /iPad\;\sCPU\sOS\s([0-9\._]+)/ ],
  [ 'ios',  /iPhone\;\sCPU\siPhone\sOS\s([0-9\._]+)/ ],
  [ 'safari', /Safari\/([0-9\._]+)/ ]
];

var i = 0, mapped =[];
for (i = 0; i < browsers.length; i++) {
  browsers[i] = createMatch(browsers[i]);
  if (isMatch(browsers[i])) {
    mapped.push(browsers[i]);
  }
}

var match = mapped[0];
var parts = match && match[3].split(/[._]/).slice(0,3);

while (parts && parts.length < 3) {
  parts.push('0');
}

// set the name and version
exports.name = match && match[0];
exports.version = parts && parts.join('.');

function createMatch(pair) {
  return pair.concat(pair[1].exec(navigator.userAgent));
}

function isMatch(pair) {
  return !!pair[2];
}

},{}],15:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});

},{}],16:[function(require,module,exports){
/**
 * lodash 3.3.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var arrayCopy = require('lodash._arraycopy'),
    arrayEach = require('lodash._arrayeach'),
    createAssigner = require('lodash._createassigner'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray'),
    isPlainObject = require('lodash.isplainobject'),
    isTypedArray = require('lodash.istypedarray'),
    keys = require('lodash.keys'),
    toPlainObject = require('lodash.toplainobject');

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.merge` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {Object} Returns `object`.
 */
function baseMerge(object, source, customizer, stackA, stackB) {
  if (!isObject(object)) {
    return object;
  }
  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
      props = isSrcArr ? undefined : keys(source);

  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObjectLike(srcValue)) {
      stackA || (stackA = []);
      stackB || (stackB = []);
      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
    }
    else {
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = result === undefined;

      if (isCommon) {
        result = srcValue;
      }
      if ((result !== undefined || (isSrcArr && !(key in object))) &&
          (isCommon || (result === result ? (result !== value) : (value === value)))) {
        object[key] = result;
      }
    }
  });
  return object;
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
  var length = stackA.length,
      srcValue = source[key];

  while (length--) {
    if (stackA[length] == srcValue) {
      object[key] = stackB[length];
      return;
    }
  }
  var value = object[key],
      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
      isCommon = result === undefined;

  if (isCommon) {
    result = srcValue;
    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
      result = isArray(value)
        ? value
        : (isArrayLike(value) ? arrayCopy(value) : []);
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      result = isArguments(value)
        ? toPlainObject(value)
        : (isPlainObject(value) ? value : {});
    }
    else {
      isCommon = false;
    }
  }
  // Add the source value to the stack of traversed objects and associate
  // it with its merged value.
  stackA.push(srcValue);
  stackB.push(result);

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
  } else if (result === result ? (result !== value) : (value === value)) {
    object[key] = result;
  }
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Recursively merges own enumerable properties of the source object(s), that
 * don't resolve to `undefined` into the destination object. Subsequent sources
 * overwrite property assignments of previous sources. If `customizer` is
 * provided it is invoked to produce the merged values of the destination and
 * source properties. If `customizer` returns `undefined` merging is handled
 * by the method instead. The `customizer` is bound to `thisArg` and invoked
 * with five arguments: (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var users = {
 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
 * };
 *
 * var ages = {
 *   'data': [{ 'age': 36 }, { 'age': 40 }]
 * };
 *
 * _.merge(users, ages);
 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
 *
 * // using a customizer callback
 * var object = {
 *   'fruits': ['apple'],
 *   'vegetables': ['beet']
 * };
 *
 * var other = {
 *   'fruits': ['banana'],
 *   'vegetables': ['carrot']
 * };
 *
 * _.merge(object, other, function(a, b) {
 *   if (_.isArray(a)) {
 *     return a.concat(b);
 *   }
 * });
 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
 */
var merge = createAssigner(baseMerge);

module.exports = merge;

},{"lodash._arraycopy":17,"lodash._arrayeach":18,"lodash._createassigner":19,"lodash.isarguments":24,"lodash.isarray":25,"lodash.isplainobject":26,"lodash.istypedarray":28,"lodash.keys":29,"lodash.toplainobject":31}],17:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],18:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],19:[function(require,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var bindCallback = require('lodash._bindcallback'),
    isIterateeCall = require('lodash._isiterateecall'),
    restParam = require('lodash.restparam');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 ? sources[length - 2] : undefined,
        guard = length > 2 ? sources[2] : undefined,
        thisArg = length > 1 ? sources[length - 1] : undefined;

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : undefined;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"lodash._bindcallback":20,"lodash._isiterateecall":21,"lodash.restparam":22}],20:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = bindCallback;

},{}],21:[function(require,module,exports){
/**
 * lodash 3.0.9 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isIterateeCall;

},{}],22:[function(require,module,exports){
/**
 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],23:[function(require,module,exports){
/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;

},{}],24:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.5 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = global.Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null &&
    !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array constructors, and
  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isArguments;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],25:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;

},{}],26:[function(require,module,exports){
/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFor = require('lodash._basefor'),
    isArguments = require('lodash.isarguments'),
    keysIn = require('lodash.keysin');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  var Ctor;

  // Exit early for non `Object` objects.
  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  var result;
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function(subValue, key) {
    result = key;
  });
  return result === undefined || hasOwnProperty.call(value, result);
}

module.exports = isPlainObject;

},{"lodash._basefor":27,"lodash.isarguments":24,"lodash.keysin":30}],27:[function(require,module,exports){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * Creates a base function for methods like `_.forIn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = baseFor;

},{}],28:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for built-in method references. */
var objectProto = global.Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

module.exports = isTypedArray;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],29:[function(require,module,exports){
/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = require('lodash._getnative'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"lodash._getnative":23,"lodash.isarguments":24,"lodash.isarray":25}],30:[function(require,module,exports){
/**
 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"lodash.isarguments":24,"lodash.isarray":25}],31:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCopy = require('lodash._basecopy'),
    keysIn = require('lodash.keysin');

/**
 * Converts `value` to a plain object flattening inherited enumerable
 * properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return baseCopy(value, keysIn(value));
}

module.exports = toPlainObject;

},{"lodash._basecopy":32,"lodash.keysin":30}],32:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],33:[function(require,module,exports){
'use strict';
module.exports =
function new_() { //jshint validthis:true
  if (arguments.length === 1) return new this(arguments[0])
  if (arguments.length === 2) return new this(arguments[0], arguments[1])
  if (arguments.length === 3) return new this(arguments[0], arguments[1], arguments[2])
  if (arguments.length === 4) return new this(arguments[0], arguments[1], arguments[2], arguments[3])
  if (arguments.length === 5) return new this(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4])
  if (arguments.length === 6) return new this(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
  if (arguments.length === 7) return new this(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6])
  if (arguments.length === 8) return new this(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7])
  if (arguments.length === 9) return new this(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8])
  if (arguments.length === 10) return new this(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9])
  var obj = Object.create(this.prototype)
    , ret = this.apply(obj, arguments)
  return (typeof ret === 'object' && ret !== null)
    ? ret
    : obj
}

},{}],34:[function(require,module,exports){
'use strict';

module.exports.RTCIceCandidate = require('./rtcicecandidate');
module.exports.RTCPeerConnection = require('./rtcpeerconnection');
module.exports.RTCSessionDescription = require('./rtcsessiondescription');

},{"./rtcicecandidate":37,"./rtcpeerconnection":38,"./rtcsessiondescription":40}],35:[function(require,module,exports){
'use strict';

/**
 * Construct a {@link MediaSection}.
 * @class
 * @classdesc
 * @param {?string} [address="0.0.0.0"]
 * @param {?Array<RTCIceCandidate>} [candidates=[]]
 * @param {object} capabilities
 * @param {string} direction - one of "sendrecv", "sendonly", "recvonly", or "inactive"
 * @param {string} kind - one of "audio" or "video"
 * @param {string} mid
 * @param {?number} [port=9]
 * @param {?boolean} [rtcpMux=true]
 * @param {?string} streamId
 * @param {?MediaStreamTrack} track
 * @property {Array<RTCIceCandidate>} candidates
 * @property {object} capabilities
 * @property {?RTCIceCandidate} defaultCandidate
 * @property {string} direction - one of "sendrecv", "sendonly", "recvonly", or "inactive"
 * @property {string} kind - one of "audio" or "video"
 * @property {string} mid
 * @property {number} port
 * @property {boolean} rtcpMux
 * @property {?string} streamId
 * @property {?MediaStreamTrack} track
 */
function MediaSection(address, _candidates, capabilities, direction, kind, mid, port, rtcpMux, streamId, track) {
  if (!(this instanceof MediaSection)) {
    return new MediaSection(address, _candidates, capabilities, direction, kind,
      mid, port, rtcpMux, streamId, track);
  }
  var rejected = false;
  address = address || '0.0.0.0';
  port = typeof port === 'number' ? port : 9;
  rtcpMux = typeof rtcpMux === 'boolean' ? rtcpMux : true;
  streamId = streamId || null;
  track = track || null;
  Object.defineProperties(this, {
    _address: {
      get: function() {
        return address;
      },
      set: function(_address) {
        address = _address;
      }
    },
    _candidates: {
      value: []
    },
    _port: {
      get: function() {
        return port;
      },
      set: function(_port) {
        port = _port;
      }
    },
    _rejected: {
      get: function() {
        return rejected;
      },
      set: function(_rejected) {
        rejected = _rejected;
      }
    },
    _streamId: {
      get: function() {
        return streamId;
      },
      set: function(_streamId) {
        streamId = _streamId;
      }
    },
    _track: {
      get: function() {
        return track;
      },
      set: function(_track) {
        track = _track;
      }
    },
    _triples: {
      value: new Set()
    },
    candidates: {
      enumerable: true,
      get: function() {
        return this._candidates.slice();
      }
    },
    capabilities: {
      enumerable: true,
      value: capabilities
    },
    defaultCandidate: {
      enumerable: true,
      get: function() {
        return this._candidates.length ? this._candidates[0] : null;
      }
    },
    direction: {
      enumerable: true,
      value: direction
    },
    kind: {
      enumerable: true,
      value: kind
    },
    port: {
      enumerable: true,
      get: function() {
        return port;
      }
    },
    rtcpMux: {
      enumerable: true,
      value: rtcpMux
    },
    streamId: {
      enumerable: true,
      get: function() {
        return streamId;
      }
    },
    track: {
      enumerable: true,
      get: function() {
        return track;
      }
    }
  });
  if (_candidates) {
    _candidates.forEach(this.addCandidate, this);
  }
}

/**
 * Add an RTCIceCandidate to the {@link MediaSection}.
 * @param {RTCIceCandidate} candidate
 * @returns {boolean}
 */
MediaSection.prototype.addCandidate = function addCandidate(candidate) {
  var triple = [
    candidate.ip,
    candidate.port,
    candidate.protocol
  ].join(' ');
  if (!this._triples.has(triple)) {
    this._triples.add(triple);
    this._candidates.push(candidate);
    return true;
  }
  return false;
};

/**
 * Copy the {@link MediaSection}.
 * @param {?string} address - if unsupplied, use the {@link MediaSection} defaults
 * @param {?Array<RTCIceCandidates> candidates - if unsupplied, use the {@link MediaSection} defaults
 * @param {?string} capabilities - if unsupplied, copy the existing capabilities
 * @param {?string} direction - if unsupplied, copy the existing direction
 * @param {?number} port - if unsupplied, use the {@link MediaSection} defaults
 * @param {?string} streamId - if unsupplied, set to null
 * @param {?MediaStreamTrack} track - if unsupplied, set to null
 * @returns {MediaSection}
 */
MediaSection.prototype.copy = function copy(address, candidates, capabilities, direction, port, streamId, track) {
  return new MediaSection(this.address, candidates,
    capabilities || this.capabilities, direction || this.direction, this.kind,
    this.mid, port, this.rtcpMux, streamId, track);
};

/**
 * Copy and reject the {@link MediaSection}.
 * @returns {MediaSection}.
 */
MediaSection.prototype.copyAndReject = function copyAndReject() {
  var mediaSection = new MediaSection(null, this.candidates, this.capabilities,
    this.direction, this.kind, this.mid, null, this.rtcpMux);
  return mediaSection.reject();
};

/**
 * Reject the {@link MediaSection}.
 * @returns {MediaSection}
 */
MediaSection.prototype.reject = function reject() {
  // RFC 3264, Section 6:
  //
  //     To reject an offered stream, the port number in the corresponding
  //     stream in the answer MUST be set to zero. Any media formats listed
  //     are ignored. At least one MUST be present, as specified by SDP.
  //
  this.setPort(0);
  return this;
};

/**
 * Set the {@link MediaSection}'s address.
 * @param {string} address
 * @returns {MediaSection}
 */
MediaSection.prototype.setAddress = function setAddress(address) {
  this._address = address;
  return this;
};

/**
 * Set the {@link MediaSection}'s port.
 * @param {number} port
 * @returns {MediaSection}
 */
MediaSection.prototype.setPort = function setPort(port) {
  this._port = port;
  return this;
};

/* MediaSection.prototype.setStreamId = function setStreamId(streamId) {
  this._streamId = streamId;
  return this;
};

MediaSection.prototype.setTrack = function setTrack(track) {
  this._track = track;
  return this;
}; */

module.exports = MediaSection;

},{}],36:[function(require,module,exports){
'use strict';

/**
 * Construct a {@link MediaStreamEvent}.
 * @class
 * @classdesc
 * @extends Event
 * @param {string} type - one of "addstream" or "removestream"
 * @param {object} init
 * @property {MediaStream} stream
 */
function MediaStreamEvent(type, init) {
  if (!(this instanceof MediaStreamEvent)) {
    return new MediaStreamEvent(type, init);
  }
  Event.call(this, type, init);
  Object.defineProperties(this, {
    stream: {
      enumerable: true,
      value: init.stream
    }
  });
}

module.exports = MediaStreamEvent;

},{}],37:[function(require,module,exports){
'use strict';

/**
 * Construct an {@link RTCIceCandidate}.
 * @class
 * @classdesc
 * @param {object} candidate
 * @property {string} candidate
 * @property {number} sdpMLineIndex
 */
function RTCIceCandidate(candidate) {
  if (!(this instanceof RTCIceCandidate)) {
    return new RTCIceCandidate(candidate);
  }
  Object.defineProperties(this, {
    candidate: {
      enumerable: true,
      value: candidate.candidate
    },
    sdpMLineIndex: {
      enumerable: true,
      value: candidate.sdpMLineIndex
    }
  });
}

module.exports = RTCIceCandidate;

},{}],38:[function(require,module,exports){
'use strict';

var MediaSection = require('./mediasection');
var MediaStreamEvent = require('./mediastreamevent');
var RTCIceCandidate = require('./rtcicecandidate');
var RTCPeerConnectionIceEvent = require('./rtcpeerconnectioniceevent');
var RTCSessionDescription = require('./rtcsessiondescription');
var sdpTransform = require('sdp-transform');
var sdpUtils = require('./sdp-utils');

/**
 * Construct an {@link RTCPeerConnection}.
 * @class
 * @classdesc This {@link RTCPeerConnection} is implemented in terms of ORTC APIs.
 * @param {RTCConfiguration} configuration
 * @property {string} iceConnectionState
 * @property {string} iceGatheringState
 * @property {?RTCSessionDescription} localDescription
 * @property {?function} onaddstream
 * @property {?function} onicecandidate
 * @property {?function} oniceconnectionstatechange
 * @property {?function} onsignalingstatechange
 * @property {?RTCSessionDescription} remoteDescription
 * @property {string} signalingState
 */
function RTCPeerConnection(configuration) {
  if (!(this instanceof RTCPeerConnection)) {
    return new RTCPeerConnection(configuration);
  }

  // ICE Gatherer

  var gatherOptions = makeGatherOptions(configuration);
  /* global RTCIceGatherer:true */
  var iceGatherer = new RTCIceGatherer(gatherOptions);
  var iceGatheringCompleted = false;

  iceGatherer.onlocalcandidate = this._onlocalcandidate.bind(this);

  var onicecandidate = null;
  var onicecandidateWasSet = false;

  var iceCandidatesAdded = 0;

  // ICE Transport

  /* global RTCIceTransport:true */
  var iceTransport = new RTCIceTransport();
  var oniceconnectionstatechange = null;

  iceTransport.onicestatechange = this._onicestatechange.bind(this);

  // DTLS Transport

  /* global RTCDtlsTransport:true */
  var dtlsTransport = new RTCDtlsTransport(iceTransport);

  dtlsTransport.ondtlsstatechange = this._ondtlsstatechange.bind(this);

  // Descriptions

  var signalingState = 'stable';
  var onsignalingstatechange = null;

  var localDescription = null;
  var remoteDescription = null;

  // Streams

  var onaddstream = null;

  Object.defineProperties(this, {
    _dtlsTransport: {
      value: dtlsTransport
    },
    _dtmfSenders: {
      value: new Map()
    },
    _gatherOptions: {
      value: gatherOptions
    },
    _iceCandidatesAdded: {
      get: function() {
        return iceCandidatesAdded;
      },
      set: function(_iceCandidatesAdded) {
        iceCandidatesAdded = _iceCandidatesAdded;
      }
    },
    _iceGatherer: {
      value: iceGatherer
    },
    _iceGatheringCompleted: {
      get: function() {
        return iceGatheringCompleted;
      },
      set: function(_iceGatheringCompleted) {
        iceGatheringCompleted = _iceGatheringCompleted;
      }
    },
    _iceTransport: {
      value: iceTransport
    },
    _localCandidates: {
      value: new Set()
    },
    _localDescription: {
      get: function() {
        return localDescription;
      },
      set: function(_localDescription) {
        localDescription = _localDescription;
      }
    },
    _localStreams: {
      value: []
    },
    _midCounters: {
      value: {
        audio: 0,
        video: 0
      }
    },
    _remoteCandidates: {
      value: new Set()
    },
    _remoteDescription: {
      get: function() {
        return remoteDescription;
      },
      set: function(_remoteDescription) {
        remoteDescription = _remoteDescription;
      }
    },
    _remoteStreams: {
      value: []
    },
    _rtpReceivers: {
      value: new Map()
    },
    _rtpSenders: {
      value: new Map()
    },
    _signalingState: {
      get: function() {
        return signalingState;
      },
      set: function(_signalingState) {
        signalingState = _signalingState;
        if (this.onsignalingstatechange) {
          this.onsignalingstatechange();
        }
      }
    },
    _streamIds: {
      value: new Map()
    },
    iceConnectionState: {
      enumerable: true,
      get: function() {
        return iceTransport.state;
      }
    },
    iceGatheringState: {
      enumerable: true,
      get: function() {
        return iceGatheringCompleted ? 'gathering' : 'complete';
      }
    },
    localDescription: {
      enumerable: true,
      get: function() {
        return localDescription;
      }
    },
    onaddstream: {
      enumerable: true,
      get: function() {
        return onaddstream;
      },
      set: function(_onaddstream) {
        onaddstream = _onaddstream;
      }
    },
    onicecandidate: {
      enumerable: true,
      get: function() {
        return onicecandidate;
      },
      set: function(_onicecandidate) {
        onicecandidate = _onicecandidate;
        if (!onicecandidateWasSet) {
          try {
            iceGatherer.getLocalCandidates()
              .forEach(iceGatherer.onlocalcandidate);
          } catch (error) {
            // Do nothing.
          }
        }
        onicecandidateWasSet = true;
      }
    },
    oniceconnectionstatechange: {
      enumerable: true,
      get: function() {
        return oniceconnectionstatechange;
      },
      set: function(_oniceconnectionstatechange) {
        oniceconnectionstatechange = _oniceconnectionstatechange;
      }
    },
    onsignalingstatechange: {
      enumerable: true,
      get: function() {
        return onsignalingstatechange;
      },
      set: function(_onsignalingstatechange) {
        onsignalingstatechange = _onsignalingstatechange;
      }
    },
    remoteDescription: {
      enumerable: true,
      get: function() {
        return remoteDescription;
      }
    },
    signalingState: {
      enumerable: true,
      get: function() {
        return signalingState;
      }
    }
  });
}

RTCPeerConnection.prototype._makeMid = function _makeMid(kind) {
  return kind + ++this._midCounters[kind];
};

/**
 * This method is assigned to the {@link RTCDtlsTransport}'s "ondtlsstatechange" event handler.
 * @access private
 * @param {object} event
 */
RTCPeerConnection.prototype._ondtlsstatechange = function _ondtlsstatechange(event) {
  void event;
};

/**
 * This method is assigned to the {@link RTCIceTransport}'s "onicestatechange" event handler.
 * @access private
 * @param {object} event
 */
RTCPeerConnection.prototype._onicestatechange = function _onicestatechange(event) {
  if (this.oniceconnectionstatechange) {
    this.oniceconnectionstatechange(event);
  }
};

/**
 * This method is assigned to the {@link RTCIceGatherer}'s "onlocalcandidate" event handler.
 * @access private
 * @param {object} event
 */
RTCPeerConnection.prototype._onlocalcandidate = function _onlocalcandidate(event) {
  if (isEmptyObject(event.candidate)) {
    this._iceGatheringCompleted = true;
  }
  this._localCandidates.add(event.candidate);
  if (this.onicecandidate) {
    var webrtcCandidate = makeWebRTCCandidate(event.candidate);
    this.onicecandidate(makeOnIceCandidateEvent(webrtcCandidate));
  }
};

/**
 * Start sending RTP.
 * @access private
 * @param {MediaSection} mediaSection
 * @returns {this}
 */
RTCPeerConnection.prototype._sendRtp = function _sendRtp(mediaSection) {
  var kind = mediaSection.kind;
  // FIXME(mroberts): This is not right.
  this._rtpSenders.forEach(function(rtpSender) {
    if (rtpSender.track.kind !== kind) {
      return;
    }
    rtpSender.send(mediaSection.capabilities);
  }, this);
  return this;
};

/**
 * Start sending and receiving RTP for the given {@link MediaSection}s.
 * @access private
 * @param {Array<MediaSection>} mediaSections
 * @returns {this}
 */
RTCPeerConnection.prototype._sendAndReceiveRtp = function _sendAndReceiveRtp(mediaSections) {
  mediaSections.forEach(function(mediaSection) {
    if (mediaSection.direction === 'sendrecv' || mediaSection.direction === 'sendonly') {
      this._sendRtp(mediaSection);
    }
    if (mediaSection.direction === 'sendrecv' || mediaSection.direction === 'recvonly') {
    this._receiveRtp(mediaSection);
    }
  }, this);
  return this;
};

/**
 * Start receiving RTP.
 * @access private
 * @param {MediaSection} mediaSection
 * @returns {this}
 */
RTCPeerConnection.prototype._receiveRtp = function _receiveRtp(mediaSection) {
  var kind = mediaSection.capabilities.type;
  /* global RTCRtpReceiver:true */
  var rtpReceiver = new RTCRtpReceiver(this._dtlsTransport, kind);
  rtpReceiver.receive(mediaSection.capabilities);

  var track = rtpReceiver.track;
  this._rtpReceivers.set(track, rtpReceiver);

  // NOTE(mroberts): Without any source-level msid attribute, we are just
  // going to assume a one-to-one mapping between MediaStreams and
  // MediaStreamTracks.
  /* global MediaStream:true */
  var mediaStream = new MediaStream();
  mediaStream.addTrack(track);
  this._remoteStreams.push(mediaStream);

  if (this.onaddstream) {
    this.onaddstream(makeOnAddStreamEvent(mediaStream));
  }
  return this;
};

/**
 * Start the {@link RTCDtlsTransport}.
 * @access private
 * @param {RTCDtlsParameters} dtlsParameters - the remote DTLS parameters
 * @returns {this}
 */
RTCPeerConnection.prototype._startDtlsTransport = function _startDtlsTransport(dtlsParameters) {
  this._dtlsTransport.start(dtlsParameters);
  return this;
};

/**
 * Start the {@link RTCIceTransport}.
 * @access private
 * @param {RTCIceParameters} iceParameters - the remote ICE parameters
 * @returns {this}
 */
RTCPeerConnection.prototype._startIceTransport = function _startIceTransport(iceParameters) {
  var role = this.signalingState === 'have-local-offer'
    ? 'controlling'
    : 'controlled';
  this._iceTransport.start(this._iceGatherer, iceParameters, role);
  return this;
};

/**
 * Add an {@link RTCIceCandidate} to the {@link RTCPeerConnection}.
 * @param {RTCIceCandidate} candidate - the remote ICE candidate
 * @param {?function} [onSuccess]
 * @param {?function} [onFailure]
 * @returns {Promise}
 */
RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate(candidate, onSuccess, onFailure) {
  // NOTE(mroberts): I'm not sure there is a scenario where we'd ever call
  // onFailure.
  void onFailure;

  this._iceCandidatesAdded++;

  var ortcCandidate = makeORTCCandidate(candidate);

  // A candidate is identified by a triple of IP address, port, and protocol.
  // ORTC ICE candidates have no component ID, and so we need to deduplicate
  // the RTP and RTCP candidates when we're muxing.
  var triple =
    [ortcCandidate.ip, ortcCandidate.port, ortcCandidate.transport].join(' ');
  if (!this._remoteCandidates.has(triple)) {
    this._remoteCandidates.add(triple);
    this._iceTransport.addRemoteCandidate(ortcCandidate);
  }

  if (onSuccess) {
    onSuccess();
  }
};

/**
 * Add a {@link MediaStream} to the {@link RTCPeerConnection}.
 * @param {MediaStream} stream
 */
RTCPeerConnection.prototype.addStream = function addStream(mediaStream) {
  this._localStreams.push(mediaStream);
  mediaStream.getTracks().forEach(function(track) {
    /* eslint no-invalid-this:0 */
    /* global RTCRtpSender:true */
    var rtpSender = new RTCRtpSender(track, this._dtlsTransport);
    this._rtpSenders.set(track, rtpSender);
    this._streamIds.set(track, mediaStream.id);
  }, this);
};

/**
 * Close the {@link RTCPeerConnection}.
 */
RTCPeerConnection.prototype.close = function close() {
  this._signalingState = 'closed';
  this._rtpReceivers.forEach(function(rtpReceiver) {
    rtpReceiver.stop();
  });
  this._dtlsTransport.stop();
  this._iceTransport.stop();
};

/**
 * Construct an {@link RTCSessionDescription} containing an SDP answer.
 * @param {?function} [onSuccess]
 * @param {?function} [onFailure]
 * @returns {Promise<RTCSessionDescription>}
 */
RTCPeerConnection.prototype.createAnswer = function createAnswer(onSuccess, onFailure) {
  if (this.signalingState !== 'have-remote-offer') {
    return void onFailure(invalidSignalingState(this.signalingState));
  }

  // draft-ietf-rtcweb-jsep-11, Section 5.3.1:
  //
  //     The next step is to go through each offered m= section. If there is a
  //     local MediaStreamTrack of the same type which has been added to the
  //     PeerConnection via addStream and not yet associated with a m= section,
  //     and the specific m= section is either sendrecv or recvonly, the
  //     MediaStreamTrack will be associated with the m= section at this time.
  //     MediaStreamTracks are assigned using the canonical order described in
  //     Section 5.2.1.
  //
  var remote = sdpUtils.parseDescription(this.remoteDescription); // sdpTransform.parse(this.remoteDescription.sdp);
  var streams = this.getLocalStreams();
  var tracks = { audio: [], video: [] };
  streams.forEach(function(stream) {
    tracks.audio = tracks.audio.concat(stream.getAudioTracks());
    tracks.video = tracks.video.concat(stream.getVideoTracks());
  });
  var mediaSections = remote.mediaSections.map(function(remoteMediaSection) {
    var kind = remoteMediaSection.kind;
    var remoteDirection = remoteMediaSection.direction;

    var remoteCapabilities = remoteMediaSection.capabilities;
    var localCapabilities = RTCRtpSender.getCapabilities(kind);
    var sharedCodecs = intersectCodecs(remoteCapabilities.codecs,
      localCapabilities.codecs);
    var sharedCapabilities = { codecs: sharedCodecs };

    var capabilities = sharedCapabilities;
    var direction;
    var track;

    // RFC 3264, Section 6.1:
    //
    //     If the answerer has no media formats in common for a particular
    //     offered stream, the answerer MUST reject that media stream by
    //     setting the port to zero.
    //
    if (!sharedCodecs.length) {
      return remoteMediaSection.copyAndReject();
    }

    // RFC 3264, Section 6.1:
    //
    //     For streams marked as inactive in the answer, the list of media
    //     formats is constructed based on the offer. If the offer was
    //     sendonly, the list is constructed as if the answer were recvonly.
    //     Similarly, if the offer was recvonly, the list is constructed as if
    //     the answer were sendonly, and if the offer was sendrecv, the list is
    //     constructed as if the answer were sendrecv. If the offer was
    //     inactive, the list is constructed as if the offer were actually
    //     sendrecv and the answer were sendrecv.
    //
    if (remoteDirection === 'inactive'
      || remoteDirection === 'recvonly' && !tracks[kind].length)
    {
      direction = 'inactive';
    } else if (remoteDirection === 'recvonly') {
      track = tracks[kind].shift();
      direction = 'sendonly';
    } else if (remoteDirection === 'sendrecv') {
      track = tracks[kind].shift();
      direction = track ? 'sendrecv' : 'recvonly';
    } else { // sendonly
      direction = 'recvonly';
    }

    var streamId = this._streamIds.get(track);
    var mediaSection = remoteMediaSection.copy(null, null, capabilities,
      direction, null, streamId, track);
    return mediaSection;
  }, this);

  // FIXME(mroberts): We should probably provision an ICE transport for each
  // MediaSection in the event BUNDLE is not supported.
  mediaSections.forEach(function(mediaSection) {
    this._localCandidates.forEach(mediaSection.addCandidate, mediaSection);
  }, this);

  var sdp = sdpUtils.makeInitialSDPBlob();
  sdpUtils.addMediaSectionsToSDPBlob(sdp, mediaSections);
  sdpUtils.addIceParametersToSDPBlob(sdp, this._iceGatherer.getLocalParameters());
  sdpUtils.addDtlsParametersToSDPBlob(sdp, this._dtlsTransport.getLocalParameters());

  var description = new RTCSessionDescription({
    sdp: sdpTransform.write(sdp),
    type: 'answer'
  });

  onSuccess(description);
};

RTCPeerConnection.prototype.createDTMFSender = function createDTMFSender(track) {
  if (!this._dtmfSenders.has(track)) {
    var rtpSender = this._rtpSenders.get(track);
    /* global RTCDtmfSender:true */
    var dtmfSender = new RTCDtmfSender(rtpSender);
    this._dtmfSenders.set(track, dtmfSender);
  }
  return this._dtmfSenders.get(track);
};

/**
 * Construct an {@link RTCSessionDescription} containing an SDP offer.
 * @param {?function} [onSuccess]
 * @param {?function} [onFailure]
 * @param {?RTCOfferOptions} [options]
 * @returns {Promise<RTCSessionDescription>}
 */
RTCPeerConnection.prototype.createOffer = function createOffer(onSuccess, onFailure, options) {
  // draft-ieft-rtcweb-jsep-11, Section 5.2.3:
  //
  //    If the 'OfferToReceiveAudio' option is specified, with an integer value
  //    of N, and M audio MediaStreamTracks have been added to the
  //    PeerConnection, the offer MUST include M non-rejected m= sections with
  //    media type 'audio', even if N is greater than M. ... the directional
  //    attribute on the N-M audio m= sections without associated
  //    MediaStreamTracks MUST be set to recvonly.
  //
  //    ...
  //
  //    For backwards compatibility with pre-standards versions of this
  //    specification, a value of 'true' is interpreted as equivalent to N=1,
  //    and 'false' as N=0.
  //
  var N = { audio: null, video: null };
  var M = { audio: 0,    video: 0    };
  options = options || {};
  ['optional', 'mandatory'].forEach(function(optionType) {
    if (!(optionType in options)) {
      return;
    }
    if ('OfferToReceiveAudio' in options[optionType]) {
      N.audio = Number(options[optionType].OfferToReceiveAudio);
    }
    if ('OfferToReceiveVideo' in options[optionType]) {
      N.video = Number(options[optionType].OfferToReceiveVideo);
    }
  });

  var mediaSections = [];

  // draft-ietf-rtcweb-jsep-11, Section 5.2.1:
  //
  //     m=sections MUST be sorted first by the order in which the MediaStreams
  //     were added to the PeerConnection, and then by the alphabetical
  //     ordering of the media type for the MediaStreamTrack.
  //
  var _N = { audio: N.audio, video: N.video };
  var streams = this.getLocalStreams();
  streams.forEach(function(stream) {
    var audioTracks = stream.getAudioTracks();
    var videoTracks = stream.getVideoTracks();
    M.audio += audioTracks.length;
    M.video += videoTracks.length;
    var tracks = audioTracks.concat(videoTracks);
    tracks.forEach(function(track) {
      var kind = track.kind;
      var capabilities = RTCRtpSender.getCapabilities(kind);
      var direction;
      var mid = this._makeMid(kind);
      if (_N.audio === null) {
        direction = 'sendrecv';
      } else if (!_N[kind]) {
        direction = 'sendonly';
      } else {
        _N[kind]--;
        direction = 'sendrecv';
      }
      var mediaSection = new MediaSection(null, null, capabilities, direction,
        kind, mid, null, null, stream.id, track);
      mediaSections.push(mediaSection);
    }, this);
  }, this);

  // Add the N-M recvonly m=sections.
  ['audio', 'video'].forEach(function(kind) {
    var k = Math.max(N[kind] - M[kind], 0);
    if (!k) {
      return;
    }
    var capabilities = RTCRtpSender.getCapabilities(kind);
    var direction = 'recvonly';
    var mid;
    var mediaSection;
    while (k--) {
      mid = this._makeMid(kind);
      mediaSection = new MediaSection(null, null, capabilities, direction,
        kind, mid);
      mediaSections.push(mediaSection);
    }
  }, this);

  // FIXME(mroberts): We should probably provision an ICE transport for each
  // MediaSection in the event BUNDLE is not supported.
  mediaSections.forEach(function(mediaSection) {
    this._localCandidates.forEach(mediaSection.addCandidate, mediaSection);
  }, this);

  var sdp = sdpUtils.makeInitialSDPBlob();
  sdpUtils.addMediaSectionsToSDPBlob(sdp, mediaSections);
  sdpUtils.addIceParametersToSDPBlob(sdp, this._iceGatherer.getLocalParameters());
  sdpUtils.addDtlsParametersToSDPBlob(sdp, this._dtlsTransport.getLocalParameters());

  var description = new RTCSessionDescription({
    sdp: sdpTransform.write(sdp),
    type: 'offer'
  });

  onSuccess(description);
};

/**
 * Get the {@link MediaStream}s that are currently or will be sent with this
 * {@link RTCPeerConnection}.
 * @returns {Array<MediaStream>}
 */
RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
  return this._localStreams.slice();
};

/**
 * Get the {@link MediaStreams} that are currently received by this
 * {@link RTCPeerConnection}.
 * @returns {Array<MediaStream>}
 */
RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
  return this._remoteStreams.slice();
};

/**
 * Apply the supplied {@link RTCSessionDescription} as the local description.
 * @param {RTCSessionDescription}
 * @param {?function} [onSuccess]
 * @param {?function} [onFailure]
 * @returns {Promise}
 */
RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription(description, onSuccess, onFailure) {
  var nextSignalingState;
  switch (this.signalingState) {
    case 'stable':
      nextSignalingState = 'have-local-offer';
      break;
    case 'have-remote-offer':
      nextSignalingState = 'stable';
      break;
    default:
      return void onFailure(invalidSignalingState(this.signalingState));
  }
  var parsed = sdpUtils.parseDescription(description);
  if (this.signalingState === 'have-remote-offer') {
    this._sendAndReceiveRtp(parsed.mediaSections);
  }
  this._localDescription = description;
  this._signalingState = nextSignalingState;
  onSuccess();
};

/**
 * Apply the supplied {@link RTCSessionDescription} as the remote offer or answer.
 * @param {RTCSessionDescription}
 * @param {?function} [onSuccess]
 * @param {?function} [onFailure]
 * @returns {Promise}
 */
RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(description, onSuccess, onFailure) {
  var nextSignalingState;
  switch (this.signalingState) {
    case 'stable':
      nextSignalingState = 'have-remote-offer';
      break;
    case 'have-local-offer':
      nextSignalingState = 'stable';
      break;
    default:
      return void onFailure(invalidSignalingState(this.signalingState));
  }
  var parsed = sdpUtils.parseDescription(description);
  parsed.mediaSections.forEach(function(mediaSection) {
    mediaSection.candidates.forEach(this._iceTransport.addRemoteCandidate,
      this._iceTransport);
  }, this);
  this._startIceTransport(parsed.iceParameters[0]);
  this._startDtlsTransport(parsed.dtlsParameters[0]);
  if (this.signalingState === 'have-local-offer') {
    this._sendAndReceiveRtp(parsed.mediaSections);
  }
  this._remoteDescription = description;
  this._signalingState = nextSignalingState;
  onSuccess();
};

/**
 * Construct an "invalid signaling state" {@link Error}.
 * @access private
 * @param {string} singalingState
 * @returns {Error}
 */
function invalidSignalingState(signalingState) {
  return new Error('Invalid signaling state: ' + signalingState);
}

/**
 * Check if an object is empty (i.e. the object contains no keys).
 * @access private
 * @param {object} object
 * @returns {boolean}
 */
function isEmptyObject(object) {
  return !Object.keys(object).length;
}

/**
 * Construct {@link RTCIceGatherOptions} from an {@link RTCConfiguration}.
 * @access private
 * @param {RTCConfiguration} configuration
 * @returns {RTCIceGatherOptions}
 */
function makeGatherOptions(configuration) {
  // Filter STUN servers, since these appear to be broken.
  var iceServers = (configuration.iceServers || [])
    .filter(function(iceServer) {
      return !iceServer.urls.match(/^stun:/);
    });
  return {
    gatherPolicy: configuration.gatherPolicy || 'all',
    iceServers: iceServers
  };
}

/**
 * Construct an "addstream" {@link MediaStreamEvent}.
 * @access private
 * @param {MediaStream} stream
 * @returns {MediaStreamEvent}
 */
function makeOnAddStreamEvent(stream) {
  return new MediaStreamEvent('addstream', {
    stream: stream
  });
}

/**
 * Construct an "icecandidate" {@link RTCPeerConnectionIceEvent}.
 * @access private
 * @param {RTCIceCandidate} candidate
 * @returns {RTCPeerConnectionIceEvent}
 */
function makeOnIceCandidateEvent(candidate) {
  return new RTCPeerConnectionIceEvent('icecandidate', {
    candidate: candidate
  });
}

/**
 * Construct an ORTC ICE candidate from a WebRTC ICE candidate.
 * @access private
 * @param {RTCIceCandidate} candidate - an WebRTC ICE candidate
 * @returns {RTCIceCanddidate}
 */
function makeORTCCandidate(candidate) {
  if (!candidate) {
    return {};
  }
  var start = candidate.candidate.indexOf('candidate:');
  var line = candidate.candidate
    .slice(start + 10)
    .replace(/ +/g, ' ')
    .split(' ');
  var ortcIceCandidate = {
    foundation: line[0],
    protocol: line[2],
    priority: parseInt(line[3]),
    ip: line[4],
    port: parseInt(line[5]),
    type: line[7],
    relatedAddress: null,
    relatedPort: 0,
    tcpType: 'active'
  };
  if (ortcIceCandidate.type !== 'host') {
    ortcIceCandidate.relatedAddress = line[9];
    ortcIceCandidate.relatedPort = parseInt(line[11]);
  }
  return ortcIceCandidate;
}

/**
 * Construct a WebRTC ICE candidate from an ORTC ICE candidate.
 * @access private
 * @param {RTCIceCandidate} candidate - an ORTC ICE candidate
 * @returns {RTCIceCandidate}
 */
function makeWebRTCCandidate(candidate) {
  if (isEmptyObject(candidate)) {
    return null;
  }
  var line = [
    'a=candidate',
    candidate.foundation,
    1,
    candidate.protocol,
    candidate.priority,
    candidate.ip,
    candidate.port,
    candidate.type
  ];
  if (candidate.relatedAddress) {
    line = line.concat([
      'raddr',
      candidate.relatedAddress,
      'rport',
      candidate.relatedPort
    ]);
  }
  line.push('generation 0');
  return new RTCIceCandidate({
    candidate: line.join(' '),
    sdpMLineIndex: 0
  });
}

/**
 * Intersect codecs.
 * @param {Array<object>} localCodecs
 * @param {Array<object>} remoteCodecs
 * @returns {Array<object>}
 */
function intersectCodecs(localCodecs, remoteCodecs) {
  var sharedCodecs = [];
  localCodecs.forEach(function(localCodec) {
    remoteCodecs.forEach(function(remoteCodec) {
      if (localCodec.name === remoteCodec.name &&
        localCodec.clockRate === remoteCodec.clockRate &&
        localCodec.numChannels === remoteCodec.numChannels)
      {
        sharedCodecs.push(remoteCodec);
      }
    });
  });
  return sharedCodecs;
}

module.exports = RTCPeerConnection;

},{"./mediasection":35,"./mediastreamevent":36,"./rtcicecandidate":37,"./rtcpeerconnectioniceevent":39,"./rtcsessiondescription":40,"./sdp-utils":41,"sdp-transform":43}],39:[function(require,module,exports){
'use strict';

/**
 * Construct an {@link RTCPeerConnectionIceEvent}.
 * @class
 * @classdesc
 * @extends Event
 * @param {string} type - "icecandidate"
 * @param {object} init
 * @property {MediaStream} stream
 */
function RTCPeerConnectionIceEvent(type, init) {
  if (!(this instanceof RTCPeerConnectionIceEvent)) {
    return new RTCPeerConnectionIceEvent(type, init);
  }
  Event.call(this, type, init);
  Object.defineProperties(this, {
    candidate: {
      enumerable: true,
      value: init.candidate
    }
  });
}

module.exports = RTCPeerConnectionIceEvent;

},{}],40:[function(require,module,exports){
'use strict';

/**
 * Construct an {@link RTCSessionDescription}.
 * @class
 * @classdesc
 * @param {object} description
 * @property {string} sdp
 * @property {string} type - one of "offer" or "answer"
 */
function RTCSessionDescription(description) {
  if (!(this instanceof RTCSessionDescription)) {
    return new RTCSessionDescription(description);
  }
  Object.defineProperties(this, {
    sdp: {
      enumerable: true,
      value: description.sdp
    },
    type: {
      enumerable: true,
      value: description.type
    }
  });
}

module.exports = RTCSessionDescription;

},{}],41:[function(require,module,exports){
'use strict';

var MediaSection = require('./mediasection');
var sdpTransform = require('sdp-transform');

/**
 * Add ICE candidates to an arbitrary level of an SDP blob.
 * @param {?object} [level={}]
 * @param {?Array<RTCIceCandidate>} [candidates]
 * @param {?number} [component] - if unspecified, add both RTP and RTCP candidates
 * @returns {object}
 */
function addCandidatesToLevel(level, candidates, component) {
  level = level || {};
  level.candidates = level.candidates || [];
  if (!candidates) {
    return level;
  }
  candidates.forEach(function(candidate) {
    // TODO(mroberts): Empty dictionary check.
    if (!candidate.foundation) {
      level.endOfCandidates = 'end-of-candidates';
      return;
    }
    var candidate1 = {
      foundation: candidate.foundation,
      transport: candidate.protocol,
      priority: candidate.priority,
      ip: candidate.ip,
      port: candidate.port,
      type: candidate.type,
      generation: 0
    };
    if (candidate.relatedAddress) {
      candidate1.raddr = candidate.relatedAddress;
      candidate1.rport = candidate.relatedPort;
    }

    if (typeof component === 'number') {
      candidate1.component = component;
      level.candidates.push(candidate1);
      return;
    }

    // RTP candidate
    candidate1.component = 1;
    level.candidates.push(candidate1);

    // RTCP candidate
    var candidate2 = {};
    for (var key in candidate1) {
      candidate2[key] = candidate1[key];
    }
    candidate2.component = 2;
    level.candidates.push(candidate2);
  });
  return level;
}

/**
 * Add ICE candidates to the media-levels of an SDP blob. Since this adds to
 * the media-levels, you should call this after you have added all your media.
 * @param {?object} [sdp={}]
 * @param {?Array<RTCIceCandidate>} [candidates]
 * @param {?number} [component] - if unspecified, add both RTP and RTCP candidates
 * @returns {object}
 */
function addCandidatesToMediaLevels(sdp, candidates, component) {
  sdp = sdp || {};
  if (!sdp.media) {
    return sdp;
  }
  sdp.media.forEach(function(media) {
    addCandidatesToLevel(media, candidates, component);
  });
  return sdp;
}

/**
 * Add ICE candidates to the media-levels of an SDP blob. Since
 * this adds to the media-levels, you should call this after you have added
 * all your media.
 * @param {?object} [sdp={}]
 * @param {?Array<RTCIceCandidate>} [candidates]
 * @param {?number} [component] - if unspecified, add both RTP and RTCP candidates
 * @returns {object}
 */
function addCandidatesToSDPBlob(sdp, candidates, component) {
  sdp = sdp || {};
  // addCandidatesToSessionLevel(sdp, candidates, component);
  addCandidatesToMediaLevels(sdp, candidates, component);
  return sdp;
}

/**
 * Add the DTLS fingerprint to the media-levels of an SDP blob.
 * Since this adds to media-levels, you should call this after you have added
 * all your media.
 * @param {?object} [sdp={}]
 * @param {RTCDtlsParameters} dtlsParameters
 * @returns {object}
 */
function addDtlsParametersToSDPBlob(sdp, dtlsParameters) {
  sdp = sdp || {};
  // addDtlsParametersToSessionLevel(sdp, dtlsParameters);
  addDtlsParametersToMediaLevels(sdp, dtlsParameters);
  return sdp;
}

/**
 * Add the DTLS fingerprint to an arbitrary level of an SDP blob.
 * @param {?object} [sdp={}]
 * @param {RTCDtlsParameters} dtlsParameters
 * @returns {object}
 */
function addDtlsParametersToLevel(level, dtlsParameters) {
  level = level || {};
  var fingerprints = dtlsParameters.fingerprints;
  if (fingerprints.length) {
    level.fingerprint = {
      type: fingerprints[0].algorithm,
      hash: fingerprints[0].value
    };
  }
  return level;
}

/**
 * Add the DTLS fingerprint to the media-levels of an SDP blob. Since this adds
 * to the media-levels, you should call this after you have added all of your
 * media.
 * @param {?object} [sdp={}]
 * @param {RTCDtlsParameters} dtlsParameters
 * @returns {object}
 */
function addDtlsParametersToMediaLevels(sdp, dtlsParameters) {
  sdp = sdp || {};
  if (!sdp.media) {
    return sdp;
  }
  sdp.media.forEach(function(media) {
    addDtlsParametersToLevel(media, dtlsParameters);
  });
  return sdp;
}

/**
 * Add the ICE username fragment and password to the media-levels
 * of an SDP blob. Since this adds to media-levels, you should call this after
 * you have added all your media.
 * @param {?object} [sdp={}]
 * @param {RTCIceParameters} parameters
 * @returns {object}
 */
function addIceParametersToSDPBlob(sdp, iceParameters) {
  sdp = sdp || {};
  // addIceParametersToSessionLevel(sdp, iceParameters);
  addIceParametersToMediaLevels(sdp, iceParameters);
  return sdp;
}

/**
 * Add the ICE username fragment and password to the media-levels of an SDP
 * blob. Since this adds to media-levels, you should call this after you have
 * added all your media.
 * @param {?object} [sdp={}]
 * @param {RTCIceParameters} iceParameters
 * @returns {object}
 */
function addIceParametersToMediaLevels(sdp, iceParameters) {
  sdp = sdp || {};
  if (!sdp.media) {
    return sdp;
  }
  sdp.media.forEach(function(media) {
    addIceParametersToLevel(media, iceParameters);
  });
  return sdp;
}

/**
 * Add the ICE username fragment and password to an arbitrary level of an SDP
 * blob.
 * @param {?object} [level={}]
 * @param {RTCIceParameters} iceParameters
 * @returns {object}
 */
function addIceParametersToLevel(level, iceParameters) {
  level = level || {};
  level.iceUfrag = iceParameters.usernameFragment;
  level.icePwd = iceParameters.password;
  return level;
}

/**
 * Add a {@link MediaSection} to an SDP blob.
 * @param {object} sdp
 * @param {MediaSection} mediaSection
 * @returns {object}
 */
function addMediaSectionToSDPBlob(sdp, mediaSection) {
  var streamId = mediaSection.streamId;
  if (streamId) {
    sdp.msidSemantic = sdp.msidSemantic || {
      semantic: 'WMS',
      token: []
    };
    sdp.msidSemantic.token.push(streamId);
  }

  var mid = mediaSection.mid;
  if (mid) {
    sdp.groups = sdp.groups || [];
    var foundBundle = false;
    sdp.groups.forEach(function(group) {
      if (group.type === 'BUNDLE') {
        group.mids.push(mid);
        foundBundle = true;
      }
    });
    if (!foundBundle) {
      sdp.groups.push({
        type: 'BUNDLE',
        mids: [mid]
      });
    }
  }

  var payloads = [];
  var rtps = [];
  var fmtps = [];
  mediaSection.capabilities.codecs.forEach(function(codec) {
    var payload = codec.preferredPayloadType;
    payloads.push(payload);
    var rtp = {
      payload: payload,
      codec: codec.name,
      rate: codec.clockRate
    };
    if (codec.numChannels > 1) {
      rtp.encoding = codec.numChannels;
    }
    rtps.push(rtp);
    switch (codec.name) {
      case 'telephone-event':
        if (codec.parameters && codec.parameters.events) {
          fmtps.push({
            payload: payload,
            config: codec.parameters.events
          });
        }
        break;
    }
  });

  var ssrcs = [];
  if (streamId && mediaSection.track) {
    var ssrc = Math.floor(Math.random() * 4294967296);
    var cname = makeCname();
    var trackId = mediaSection.track.id;
    ssrcs = ssrcs.concat([
      {
        id: ssrc,
        attribute: 'cname',
        value: cname
      },
      {
        id: ssrc,
        attribute: 'msid',
        value: mediaSection.streamId + ' ' + trackId
      },
      {
        id: ssrc,
        attribute: 'mslabel',
        value: trackId
      },
      {
        id: ssrc,
        attribute: 'label',
        value: trackId
      }
    ]);
  }

  // draft-ietf-rtcweb-jsep-11, Section 5.2.2:
  //
  //     Each "m=" and c=" line MUST be filled in with the port, protocol,
  //     and address of the default candidate for the m= section, as
  //     described in [RFC5245], Section 4.3.  Each "a=rtcp" attribute line
  //     MUST also be filled in with the port and address of the
  //     appropriate default candidate, either the default RTP or RTCP
  //     candidate, depending on whether RTCP multiplexing is currently
  //     active or not.
  //
  var defaultCandidate = mediaSection.defaultCandidate;

  var media = {
    rtp: rtps,
    fmtp: fmtps,
    type: mediaSection.kind,
    port: defaultCandidate ? defaultCandidate.port : 9,
    payloads: payloads.join(' '),
    protocol: 'RTP/SAVPF',
    direction: mediaSection.direction,
    connection: {
      version: 4,
      ip: defaultCandidate ? defaultCandidate.ip : '0.0.0.0'
    },
    rtcp: {
      port: defaultCandidate ? defaultCandidate.port : 9,
      netType: 'IN',
      ipVer: 4,
      address: defaultCandidate ? defaultCandidate.ip : '0.0.0.0'
    },
    ssrcs: ssrcs
  };
  if (mid) {
    media.mid = mid;
  }
  if (mediaSection.rtcpMux) {
    media.rtcpMux = 'rtcp-mux';
  }
  addCandidatesToLevel(media, mediaSection.candidates);
  sdp.media.push(media);
  return sdp;
}

function addMediaSectionsToSDPBlob(sdp, mediaSections) {
  mediaSections.forEach(addMediaSectionToSDPBlob.bind(null, sdp));
  return sdp;
}

/**
 * Construct an initial SDP blob.
 * @param {?number} [sessionId]
 * @returns {object}
 */
function makeInitialSDPBlob(sessionId) {
  sessionId = sessionId || Math.floor(Math.random() * 4294967296);
  return {
    version: 0,
    origin: {
      username: '-',
      sessionId: sessionId,
      sessionVersion: 0,
      netType: 'IN',
      ipVer: 4,
      address: '127.0.0.1'
    },
    name: '-',
    timing: {
      start: 0,
      stop: 0
    },
    connection: {
      version: 4,
      ip: '0.0.0.0'
    },
    media: []
  };
}

/**
 * Parse the SDP contained in an {@link RTCSessionDescription} into individual
 * {@link RTCIceParameters}, {@link RTCDtlsParameters}, and
 * {@link RTCRtpParameters}.
 * @access private
 * @param {RTCSessionDescription} description
 * @returns {object}
 */
function parseDescription(description) {
  var sdp = sdpTransform.parse(description.sdp);

  var iceParameters = [];
  var dtlsParameters = [];
  var candidates = [];
  var mediaSections = [];

  var levels = [sdp];
  if (sdp.media) {
    levels = levels.concat(sdp.media);
  }

  levels.forEach(function(level) {
    // ICE and DTLS parameters may appear at the session- or media-levels.
    if (level.iceUfrag && level.icePwd && level.fingerprint) {
      iceParameters.push({
        usernameFragment: level.iceUfrag,
        password: level.icePwd
      });
      dtlsParameters.push({
        fingerprints: [
          {
            algorithm: level.fingerprint.type,
            value: level.fingerprint.hash
          }
        ]
      });
    }

    // RTP parameters appear at the media-level.
    if (level.rtp) {
      if (level.type === 'video') {
        return;
      }
      var address = level.connection ? level.connection.ip : null;
      // var candidates;
      var direction = level.direction;
      var kind = level.type;
      var mid = level.mid;
      var port = level.port || null;
      var rtcpMux = level.rtcpMux === 'rtcp-mux';

      var cname;
      var ssrc;
      var streamId;
      // var trackId;
      // FIXME(mroberts): This breaks with multiple SSRCs.
      (level.ssrcs || []).forEach(function(attribute) {
        switch (attribute.attribute) {
          case 'cname':
            ssrc = attribute.id;
            cname = attribute.value;
            break;
          case 'label':
          case 'mslabel':
            ssrc = attribute.id;
            // trackId = attribute.value;
            break;
          case 'msid':
            ssrc = attribute.id;
            streamId = attribute.value.split(' ')[0];
            break;
        }
      });

      var capabilities = {
        type: kind,
        muxId: mid,
        codecs: level.rtp.map(function(rtp) {
          var codec = {
            name: rtp.codec,
            payloadType: parseInt(rtp.payload),
            clockRate: parseInt(rtp.rate),
            numChannels: rtp.encoding || 1,
            rtcpFeedback: [],
            parameters: {}
          };
          switch (rtp.codec) {
            case 'telephone-event':
              codec.parameters.events = '0-16';
              break;
          }
          return codec;
        }),
        headerExtensions: [],
        encodings: level.rtp.map(function(rtp) {
          return {
            ssrc: ssrc,
            codecPayloadType: parseInt(rtp.payload),
            active: true
          };
        }),
        rtcp: {
          ssrc: ssrc,
          cname: cname,
          mux: rtcpMux
        }
      };

      var mediaSection = new MediaSection(address, candidates, capabilities,
        direction, kind, mid, port, rtcpMux, streamId);

      (level.candidates || []).forEach(function(candidate) {
        var ortcCandidate = {
          foundation: String(candidate.foundation),
          protocol: candidate.transport,
          priority: candidate.priority,
          ip: candidate.ip,
          port: candidate.port,
          type: candidate.type,
          relatedAddress: candidate.raddr,
          relatedPort: candidate.rport
        };
        candidates.push(ortcCandidate);
        mediaSection.addCandidate(ortcCandidate);
      });

      void candidates;

      if (level.endOfCandidates === 'end-of-candidates') {
        mediaSection.addCandidate({});
      }

      mediaSections.push(mediaSection);
    }
  });

  return {
    iceParameters: iceParameters,
    dtlsParameters: dtlsParameters,
    mediaSections: mediaSections
  };
}

function makeCname() {
  var a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/'.split('');
  var n = 16;
  var cname = '';
  while (n--) {
    cname += a[Math.floor(Math.random() * a.length)];
  }
  return cname;
}

module.exports.addCandidatesToSDPBlob = addCandidatesToSDPBlob;
module.exports.addDtlsParametersToSDPBlob = addDtlsParametersToSDPBlob;
module.exports.addIceParametersToSDPBlob = addIceParametersToSDPBlob;
module.exports.addMediaSectionsToSDPBlob = addMediaSectionsToSDPBlob;
module.exports.makeInitialSDPBlob = makeInitialSDPBlob;
module.exports.parseDescription = parseDescription;

},{"./mediasection":35,"sdp-transform":43}],42:[function(require,module,exports){
var grammar = module.exports = {
  v: [{
      name: 'version',
      reg: /^(\d*)$/
  }],
  o: [{ //o=- 20518 0 IN IP4 203.0.113.1
    // NB: sessionId will be a String in most cases because it is huge
    name: 'origin',
    reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
    names: ['username', 'sessionId', 'sessionVersion', 'netType', 'ipVer', 'address'],
    format: "%s %s %d %s IP%d %s"
  }],
  // default parsing of these only (though some of these feel outdated)
  s: [{ name: 'name' }],
  i: [{ name: 'description' }],
  u: [{ name: 'uri' }],
  e: [{ name: 'email' }],
  p: [{ name: 'phone' }],
  z: [{ name: 'timezones' }], // TODO: this one can actually be parsed properly..
  r: [{ name: 'repeats' }],   // TODO: this one can also be parsed properly
  //k: [{}], // outdated thing ignored
  t: [{ //t=0 0
    name: 'timing',
    reg: /^(\d*) (\d*)/,
    names: ['start', 'stop'],
    format: "%d %d"
  }],
  c: [{ //c=IN IP4 10.47.197.26
      name: 'connection',
      reg: /^IN IP(\d) (\S*)/,
      names: ['version', 'ip'],
      format: "IN IP%d %s"
  }],
  b: [{ //b=AS:4000
      push: 'bandwidth',
      reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
      names: ['type', 'limit'],
      format: "%s:%s"
  }],
  m: [{ //m=video 51744 RTP/AVP 126 97 98 34 31
      // NB: special - pushes to session
      // TODO: rtp/fmtp should be filtered by the payloads found here?
      reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
      names: ['type', 'port', 'protocol', 'payloads'],
      format: "%s %d %s %s"
  }],
  a: [
    { //a=rtpmap:110 opus/48000/2
      push: 'rtp',
      reg: /^rtpmap:(\d*) ([\w\-]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
      names: ['payload', 'codec', 'rate', 'encoding'],
      format: function (o) {
        return (o.encoding) ?
          "rtpmap:%d %s/%s/%s":
          o.rate ?
          "rtpmap:%d %s/%s":
          "rtpmap:%d %s";
      }
    },
    {
      //a=fmtp:108 profile-level-id=24;object=23;bitrate=64000
      //a=fmtp:111 minptime=10; useinbandfec=1
      push: 'fmtp',
      reg: /^fmtp:(\d*) ([\S| ]*)/,
      names: ['payload', 'config'],
      format: "fmtp:%d %s"
    },
    { //a=control:streamid=0
        name: 'control',
        reg: /^control:(.*)/,
        format: "control:%s"
    },
    { //a=rtcp:65179 IN IP4 193.84.77.194
      name: 'rtcp',
      reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
      names: ['port', 'netType', 'ipVer', 'address'],
      format: function (o) {
        return (o.address != null) ?
          "rtcp:%d %s IP%d %s":
          "rtcp:%d";
      }
    },
    { //a=rtcp-fb:98 trr-int 100
      push: 'rtcpFbTrrInt',
      reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
      names: ['payload', 'value'],
      format: "rtcp-fb:%d trr-int %d"
    },
    { //a=rtcp-fb:98 nack rpsi
      push: 'rtcpFb',
      reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
      names: ['payload', 'type', 'subtype'],
      format: function (o) {
        return (o.subtype != null) ?
          "rtcp-fb:%s %s %s":
          "rtcp-fb:%s %s";
      }
    },
    { //a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
      //a=extmap:1/recvonly URI-gps-string
      push: 'ext',
      reg: /^extmap:([\w_\/]*) (\S*)(?: (\S*))?/,
      names: ['value', 'uri', 'config'], // value may include "/direction" suffix
      format: function (o) {
        return (o.config != null) ?
          "extmap:%s %s %s":
          "extmap:%s %s";
      }
    },
    {
      //a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
      push: 'crypto',
      reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
      names: ['id', 'suite', 'config', 'sessionConfig'],
      format: function (o) {
        return (o.sessionConfig != null) ?
          "crypto:%d %s %s %s":
          "crypto:%d %s %s";
      }
    },
    { //a=setup:actpass
      name: 'setup',
      reg: /^setup:(\w*)/,
      format: "setup:%s"
    },
    { //a=mid:1
      name: 'mid',
      reg: /^mid:([^\s]*)/,
      format: "mid:%s"
    },
    { //a=msid:0c8b064d-d807-43b4-b434-f92a889d8587 98178685-d409-46e0-8e16-7ef0db0db64a
      name: 'msid',
      reg: /^msid:(.*)/,
      format: "msid:%s"
    },
    { //a=ptime:20
      name: 'ptime',
      reg: /^ptime:(\d*)/,
      format: "ptime:%d"
    },
    { //a=maxptime:60
      name: 'maxptime',
      reg: /^maxptime:(\d*)/,
      format: "maxptime:%d"
    },
    { //a=sendrecv
      name: 'direction',
      reg: /^(sendrecv|recvonly|sendonly|inactive)/
    },
    { //a=ice-lite
      name: 'icelite',
      reg: /^(ice-lite)/
    },
    { //a=ice-ufrag:F7gI
      name: 'iceUfrag',
      reg: /^ice-ufrag:(\S*)/,
      format: "ice-ufrag:%s"
    },
    { //a=ice-pwd:x9cml/YzichV2+XlhiMu8g
      name: 'icePwd',
      reg: /^ice-pwd:(\S*)/,
      format: "ice-pwd:%s"
    },
    { //a=fingerprint:SHA-1 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33
      name: 'fingerprint',
      reg: /^fingerprint:(\S*) (\S*)/,
      names: ['type', 'hash'],
      format: "fingerprint:%s %s"
    },
    {
      //a=candidate:0 1 UDP 2113667327 203.0.113.1 54400 typ host
      //a=candidate:1162875081 1 udp 2113937151 192.168.34.75 60017 typ host generation 0
      //a=candidate:3289912957 2 udp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 generation 0
      //a=candidate:229815620 1 tcp 1518280447 192.168.150.19 60017 typ host tcptype active generation 0
      //a=candidate:3289912957 2 tcp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 tcptype passive generation 0
      push:'candidates',
      reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?/,
      names: ['foundation', 'component', 'transport', 'priority', 'ip', 'port', 'type', 'raddr', 'rport', 'tcptype', 'generation'],
      format: function (o) {
        var str = "candidate:%s %d %s %d %s %d typ %s";

        str += (o.raddr != null) ? " raddr %s rport %d" : "%v%v";

        // NB: candidate has three optional chunks, so %void middles one if it's missing
        str += (o.tcptype != null) ? " tcptype %s" : "%v";

        if (o.generation != null) {
          str += " generation %d";
        }
        return str;
      }
    },
    { //a=end-of-candidates (keep after the candidates line for readability)
      name: 'endOfCandidates',
      reg: /^(end-of-candidates)/
    },
    { //a=remote-candidates:1 203.0.113.1 54400 2 203.0.113.1 54401 ...
      name: 'remoteCandidates',
      reg: /^remote-candidates:(.*)/,
      format: "remote-candidates:%s"
    },
    { //a=ice-options:google-ice
      name: 'iceOptions',
      reg: /^ice-options:(\S*)/,
      format: "ice-options:%s"
    },
    { //a=ssrc:2566107569 cname:t9YU8M1UxTF8Y1A1
      push: "ssrcs",
      reg: /^ssrc:(\d*) ([\w_]*):(.*)/,
      names: ['id', 'attribute', 'value'],
      format: "ssrc:%d %s:%s"
    },
    { //a=ssrc-group:FEC 1 2
      push: "ssrcGroups",
      reg: /^ssrc-group:(\w*) (.*)/,
      names: ['semantics', 'ssrcs'],
      format: "ssrc-group:%s %s"
    },
    { //a=msid-semantic: WMS Jvlam5X3SX1OP6pn20zWogvaKJz5Hjf9OnlV
      name: "msidSemantic",
      reg: /^msid-semantic:\s?(\w*) (\S*)/,
      names: ['semantic', 'token'],
      format: "msid-semantic: %s %s" // space after ":" is not accidental
    },
    { //a=group:BUNDLE audio video
      push: 'groups',
      reg: /^group:(\w*) (.*)/,
      names: ['type', 'mids'],
      format: "group:%s %s"
    },
    { //a=rtcp-mux
      name: 'rtcpMux',
      reg: /^(rtcp-mux)/
    },
    { //a=rtcp-rsize
      name: 'rtcpRsize',
      reg: /^(rtcp-rsize)/
    },
    { // any a= that we don't understand is kepts verbatim on media.invalid
      push: 'invalid',
      names: ["value"]
    }
  ]
};

// set sensible defaults to avoid polluting the grammar with boring details
Object.keys(grammar).forEach(function (key) {
  var objs = grammar[key];
  objs.forEach(function (obj) {
    if (!obj.reg) {
      obj.reg = /(.*)/;
    }
    if (!obj.format) {
      obj.format = "%s";
    }
  });
});

},{}],43:[function(require,module,exports){
var parser = require('./parser');
var writer = require('./writer');

exports.write = writer;
exports.parse = parser.parse;
exports.parseFmtpConfig = parser.parseFmtpConfig;
exports.parsePayloads = parser.parsePayloads;
exports.parseRemoteCandidates = parser.parseRemoteCandidates;

},{"./parser":44,"./writer":45}],44:[function(require,module,exports){
var toIntIfInt = function (v) {
  return String(Number(v)) === v ? Number(v) : v;
};

var attachProperties = function (match, location, names, rawName) {
  if (rawName && !names) {
    location[rawName] = toIntIfInt(match[1]);
  }
  else {
    for (var i = 0; i < names.length; i += 1) {
      if (match[i+1] != null) {
        location[names[i]] = toIntIfInt(match[i+1]);
      }
    }
  }
};

var parseReg = function (obj, location, content) {
  var needsBlank = obj.name && obj.names;
  if (obj.push && !location[obj.push]) {
    location[obj.push] = [];
  }
  else if (needsBlank && !location[obj.name]) {
    location[obj.name] = {};
  }
  var keyLocation = obj.push ?
    {} :  // blank object that will be pushed
    needsBlank ? location[obj.name] : location; // otherwise, named location or root

  attachProperties(content.match(obj.reg), keyLocation, obj.names, obj.name);

  if (obj.push) {
    location[obj.push].push(keyLocation);
  }
};

var grammar = require('./grammar');
var validLine = RegExp.prototype.test.bind(/^([a-z])=(.*)/);

exports.parse = function (sdp) {
  var session = {}
    , media = []
    , location = session; // points at where properties go under (one of the above)

  // parse lines we understand
  sdp.split(/(\r\n|\r|\n)/).filter(validLine).forEach(function (l) {
    var type = l[0];
    var content = l.slice(2);
    if (type === 'm') {
      media.push({rtp: [], fmtp: []});
      location = media[media.length-1]; // point at latest media line
    }

    for (var j = 0; j < (grammar[type] || []).length; j += 1) {
      var obj = grammar[type][j];
      if (obj.reg.test(content)) {
        return parseReg(obj, location, content);
      }
    }
  });

  session.media = media; // link it up
  return session;
};

var fmtpReducer = function (acc, expr) {
  var s = expr.split('=');
  if (s.length === 2) {
    acc[s[0]] = toIntIfInt(s[1]);
  }
  return acc;
};

exports.parseFmtpConfig = function (str) {
  return str.split(/\;\s?/).reduce(fmtpReducer, {});
};

exports.parsePayloads = function (str) {
  return str.split(' ').map(Number);
};

exports.parseRemoteCandidates = function (str) {
  var candidates = [];
  var parts = str.split(' ').map(toIntIfInt);
  for (var i = 0; i < parts.length; i += 3) {
    candidates.push({
      component: parts[i],
      ip: parts[i + 1],
      port: parts[i + 2]
    });
  }
  return candidates;
};

},{"./grammar":42}],45:[function(require,module,exports){
var grammar = require('./grammar');

// customized util.format - discards excess arguments and can void middle ones
var formatRegExp = /%[sdv%]/g;
var format = function (formatStr) {
  var i = 1;
  var args = arguments;
  var len = args.length;
  return formatStr.replace(formatRegExp, function (x) {
    if (i >= len) {
      return x; // missing argument
    }
    var arg = args[i];
    i += 1;
    switch (x) {
      case '%%':
        return '%';
      case '%s':
        return String(arg);
      case '%d':
        return Number(arg);
      case '%v':
        return '';
    }
  });
  // NB: we discard excess arguments - they are typically undefined from makeLine
};

var makeLine = function (type, obj, location) {
  var str = obj.format instanceof Function ?
    (obj.format(obj.push ? location : location[obj.name])) :
    obj.format;

  var args = [type + '=' + str];
  if (obj.names) {
    for (var i = 0; i < obj.names.length; i += 1) {
      var n = obj.names[i];
      if (obj.name) {
        args.push(location[obj.name][n]);
      }
      else { // for mLine and push attributes
        args.push(location[obj.names[i]]);
      }
    }
  }
  else {
    args.push(location[obj.name]);
  }
  return format.apply(null, args);
};

// RFC specified order
// TODO: extend this with all the rest
var defaultOuterOrder = [
  'v', 'o', 's', 'i',
  'u', 'e', 'p', 'c',
  'b', 't', 'r', 'z', 'a'
];
var defaultInnerOrder = ['i', 'c', 'b', 'a'];


module.exports = function (session, opts) {
  opts = opts || {};
  // ensure certain properties exist
  if (session.version == null) {
    session.version = 0; // "v=0" must be there (only defined version atm)
  }
  if (session.name == null) {
    session.name = " "; // "s= " must be there if no meaningful name set
  }
  session.media.forEach(function (mLine) {
    if (mLine.payloads == null) {
      mLine.payloads = "";
    }
  });

  var outerOrder = opts.outerOrder || defaultOuterOrder;
  var innerOrder = opts.innerOrder || defaultInnerOrder;
  var sdp = [];

  // loop through outerOrder for matching properties on session
  outerOrder.forEach(function (type) {
    grammar[type].forEach(function (obj) {
      if (obj.name in session && session[obj.name] != null) {
        sdp.push(makeLine(type, obj, session));
      }
      else if (obj.push in session && session[obj.push] != null) {
        session[obj.push].forEach(function (el) {
          sdp.push(makeLine(type, obj, el));
        });
      }
    });
  });

  // then for each media line, follow the innerOrder
  session.media.forEach(function (mLine) {
    sdp.push(makeLine('m', grammar.m[0], mLine));

    innerOrder.forEach(function (type) {
      grammar[type].forEach(function (obj) {
        if (obj.name in mLine && mLine[obj.name] != null) {
          sdp.push(makeLine(type, obj, mLine));
        }
        else if (obj.push in mLine && mLine[obj.push] != null) {
          mLine[obj.push].forEach(function (el) {
            sdp.push(makeLine(type, obj, el));
          });
        }
      });
    });
  });

  return sdp.join('\r\n') + '\r\n';
};

},{"./grammar":42}],46:[function(require,module,exports){
(function (global){

var rng;

if (global.crypto && crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  var _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  _rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}

module.exports = rng;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],47:[function(require,module,exports){
//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = require('./rng');

// Maps for number <-> hex string conversion
var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  var i = offset || 0, bth = _byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;

module.exports = uuid;

},{"./rng":46}],48:[function(require,module,exports){
'use strict';
module.exports = function () {
    var URL = window.URL || window.webkitURL;
    return function (stream, el) {
        el.src = URL.createObjectURL(stream);
        return el;
    };
};
},{}],49:[function(require,module,exports){
'use strict';
module.exports = function (opt) {
    return function (constraints, cb) {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        if (!getUserMedia) {
            throw new Error('Failed to find getUserMedia');
        }
        if (arguments.length !== 2) {
            cb = constraints;
            constraints = {
                video: true,
                audio: true
            };
        }
        function success(stream) {
            stream._rtcOpt = opt;
            cb(null, stream);
        }
        function error(err) {
            cb(err);
        }
        getUserMedia.call(navigator, constraints, success, error);
    };
};
},{}],50:[function(require,module,exports){
'use strict';
module.exports = function () {
    var browser = require('detect-browser');
    return typeof window !== 'undefined' && typeof window.chrome !== 'undefined' && browser.name === 'chrome';
};
},{"detect-browser":14}],51:[function(require,module,exports){
'use strict';
module.exports = function () {
    return {
        RTCPeerConnection: window.RTCPeerConnection || window.webkitRTCPeerConnection,
        RTCSessionDescription: window.RTCSessionDescription || window.webkitRTCSessionDescription,
        RTCIceCandidate: window.RTCIceCandidate || window.webkitRTCIceCandidate
    };
};
},{}],52:[function(require,module,exports){
'use strict';
function needPlatform() {
    throw new Error('Missing iosrtc plugin for attachStream');
}
module.exports = function () {
    var URL = window.URL || window.webkitURL;
    return function (stream, el) {
        if (typeof cordova === 'undefined')
            return needPlatform();
        if (typeof cordova.plugins === 'undefined')
            return needPlatform();
        if (typeof cordova.plugins.iosrtc === 'undefined')
            return needPlatform();
        el.src = URL.createObjectURL(stream);
        el.setAttribute('webkit-playsinline', 'true');
        cordova.plugins.iosrtc.observeVideo(el);
        return el;
    };
};
},{}],53:[function(require,module,exports){
'use strict';
function needPlatform() {
    throw new Error('Missing iosrtc plugin for getUserMedia');
}
module.exports = function (opt) {
    return function (constraints, cb) {
        if (typeof cordova === 'undefined')
            return needPlatform();
        if (typeof cordova.plugins === 'undefined')
            return needPlatform();
        if (typeof cordova.plugins.iosrtc === 'undefined')
            return needPlatform();
        if (arguments.length !== 2) {
            cb = constraints;
            constraints = {
                video: true,
                audio: true
            };
        }
        function success(stream) {
            stream._rtcOpt = opt;
            cb(null, stream);
        }
        function error(err) {
            cb(err);
        }
        cordova.plugins.iosrtc.getUserMedia(constraints, success, error);
    };
};
},{}],54:[function(require,module,exports){
'use strict';
module.exports = function () {
    return typeof cordova !== 'undefined' && window.device.platform === 'iOS';
};
},{}],55:[function(require,module,exports){
'use strict';
function needPlatform() {
    throw new Error('Missing iosrtc plugin for RTCPeerConnection');
}
module.exports = function () {
    if (typeof cordova === 'undefined')
        return needPlatform();
    if (typeof cordova.plugins === 'undefined')
        return needPlatform();
    if (typeof cordova.plugins.iosrtc === 'undefined')
        return needPlatform();
    return {
        RTCPeerConnection: cordova.plugins.iosrtc.RTCPeerConnection,
        RTCSessionDescription: cordova.plugins.iosrtc.RTCSessionDescription,
        RTCIceCandidate: cordova.plugins.iosrtc.RTCIceCandidate
    };
};
},{}],56:[function(require,module,exports){
'use strict';
module.exports = function () {
    return function (stream, el) {
        el.srcObject = stream;
        return el;
    };
};
},{}],57:[function(require,module,exports){
'use strict';
module.exports = function (opt) {
    return function (constraints, cb) {
        var getUserMedia = navigator.getUserMedia || navigator.msGetUserMedia;
        if (!getUserMedia) {
            throw new Error('Failed to find getUserMedia');
        }
        if (arguments.length !== 2) {
            cb = constraints;
            constraints = {
                video: true,
                audio: true
            };
        }
        function success(stream) {
            stream._rtcOpt = opt;
            cb(null, stream);
        }
        function error(err) {
            cb(err);
        }
        getUserMedia.call(navigator, constraints, success, error);
    };
};
},{}],58:[function(require,module,exports){
'use strict';
module.exports = function () {
    var browser = require('detect-browser');
    return browser.name === 'edge' && window.RTCIceGatherer;
};
},{"detect-browser":14}],59:[function(require,module,exports){
'use strict';
function fakeDC(name) {
    return {
        label: name,
        send: function () {
        },
        close: function () {
        }
    };
}
module.exports = function () {
    var ortc = require('ortc-adapter');
    ortc.RTCPeerConnection.prototype.createDataChannel = fakeDC;
    return {
        RTCPeerConnection: ortc.RTCPeerConnection,
        RTCSessionDescription: ortc.RTCSessionDescription,
        RTCIceCandidate: ortc.RTCIceCandidate
    };
};
},{"ortc-adapter":34}],60:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"dup":56}],61:[function(require,module,exports){
'use strict';
module.exports = function (opt) {
    return function (constraints, cb) {
        var getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
            throw new Error('Failed to find getUserMedia');
        }
        if (arguments.length !== 2) {
            cb = constraints;
            constraints = {
                video: true,
                audio: true
            };
        }
        function success(stream) {
            stream._rtcOpt = opt;
            cb(null, stream);
        }
        function error(err) {
            cb(err);
        }
        getUserMedia.call(navigator, constraints, success, error);
    };
};
},{}],62:[function(require,module,exports){
'use strict';
module.exports = function () {
    var browser = require('detect-browser');
    return browser.name === 'firefox';
};
},{"detect-browser":14}],63:[function(require,module,exports){
'use strict';
module.exports = function () {
    return {
        RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection,
        RTCSessionDescription: window.RTCSessionDescription || window.mozRTCSessionDescription,
        RTCIceCandidate: window.RTCIceCandidate || window.mozRTCIceCandidate
    };
};
},{}],64:[function(require,module,exports){
'use strict';
module.exports = function () {
    var copyStyle = require('../../lib/copyStyle');
    var temasys = require('../../lib/temasys');
    return function (stream, el) {
        var newVideo = temasys.createVideo(stream, { muted: Boolean(el.muted) });
        copyStyle(el, newVideo);
        var container = el.parentNode;
        if (container) {
            container.insertBefore(newVideo);
            container.removeChild(el);
        }
        return newVideo;
    };
};
},{"../../lib/copyStyle":2,"../../lib/temasys":8}],65:[function(require,module,exports){
'use strict';
module.exports = function (opt) {
    var temasys = require('../../lib/temasys');
    temasys();
    return function (constraints, cb) {
        if (arguments.length !== 2) {
            cb = constraints;
            constraints = {
                video: true,
                audio: true
            };
        }
        function success(stream) {
            stream._rtcOpt = opt;
            cb(null, stream);
        }
        function error(err) {
            cb(err);
        }
        temasys(function (rtc) {
            if (!rtc || !rtc.getUserMedia) {
                throw new Error('Failed to find getUserMedia');
            }
            rtc.getUserMedia(constraints, success, error);
        });
    };
};
},{"../../lib/temasys":8}],66:[function(require,module,exports){
'use strict';
module.exports = function () {
    var browser = require('detect-browser');
    return browser.name === 'ie';
};
},{"detect-browser":14}],67:[function(require,module,exports){
'use strict';
module.exports = function () {
    var MockRTC = require('../../lib/temasys/MockRTC');
    return MockRTC;
};
},{"../../lib/temasys/MockRTC":4}],68:[function(require,module,exports){
'use strict';
module.exports = require('../unsupported/attachStream');
},{"../unsupported/attachStream":80}],69:[function(require,module,exports){
'use strict';
module.exports = require('../unsupported/gum');
},{"../unsupported/gum":81}],70:[function(require,module,exports){
'use strict';
module.exports = function () {
    return typeof window === 'undefined';
};
},{}],71:[function(require,module,exports){
'use strict';
module.exports = function () {
    var wrtc;
    try {
        wrtc = require('wrtc');
    } catch (err) {
        return {};
    }
    return {
        RTCPeerConnection: wrtc.RTCPeerConnection,
        RTCSessionDescription: wrtc.RTCSessionDescription,
        RTCIceCandidate: wrtc.RTCIceCandidate
    };
};
},{"wrtc":11}],72:[function(require,module,exports){
'use strict';
module.exports = function () {
    return function (stream, el) {
    };
};
},{}],73:[function(require,module,exports){
'use strict';
module.exports = function (opt) {
    var rtc;
    try {
        rtc = require('react-native-webrtc');
    } catch (err) {
        throw new Error('Missing react-native-webrtc!');
    }
    return function (constraints, cb) {
        var getUserMedia = navigator.getUserMedia;
        if (!getUserMedia) {
            throw new Error('Failed to find getUserMedia');
        }
        if (arguments.length !== 2) {
            cb = constraints;
            constraints = {
                video: true,
                audio: true
            };
        }
        function success(stream) {
            stream._rtcOpt = opt;
            cb(null, stream);
        }
        function error(err) {
            cb(err);
        }
        getUserMedia.call(navigator, constraints, success, error);
    };
};
},{"react-native-webrtc":11}],74:[function(require,module,exports){
'use strict';
module.exports = function () {
    return false;
};
},{}],75:[function(require,module,exports){
'use strict';
module.exports = function () {
    var rtc;
    try {
        rtc = require('react-native-webrtc');
    } catch (err) {
        throw new Error('Missing react-native-webrtc!');
    }
    return {
        RTCPeerConnection: rtc.RTCPeerConnection,
        RTCSessionDescription: rtc.RTCSessionDescription,
        RTCIceCandidate: rtc.RTCIceCandidate
    };
};
},{"react-native-webrtc":11}],76:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"../../lib/copyStyle":2,"../../lib/temasys":8,"dup":64}],77:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"../../lib/temasys":8,"dup":65}],78:[function(require,module,exports){
'use strict';
module.exports = function () {
    var browser = require('detect-browser');
    return browser.name === 'safari' && typeof cordova === 'undefined';
};
},{"detect-browser":14}],79:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"../../lib/temasys/MockRTC":4,"dup":67}],80:[function(require,module,exports){
'use strict';
module.exports = function () {
    return function (stream, el) {
        throw new Error('No DOM, what are you doing?');
    };
};
},{}],81:[function(require,module,exports){
'use strict';
module.exports = function () {
    return function (constraints, cb) {
        if (arguments.length !== 2) {
            cb = constraints;
        }
        var err = new Error('MediaStreamError');
        err.name = 'NotSupportedError';
        return cb(err);
    };
};
},{}],82:[function(require,module,exports){
'use strict';
module.exports = function () {
    return {
        RTCPeerConnection: null,
        RTCSessionDescription: null,
        RTCIceCandidate: null
    };
};
},{}]},{},[1])(1)
});