'use strict';

// temporarily mock a class
// when the thing is loaded, replay all actions
// that happened on the mock against the real thing


function mockit(opt) {
  if (!opt) opt = {};
  if (!opt.properties) opt.properties = [];
  if (!opt.methods) opt.methods = [];

  function Mock(){
    this._ctorArgs = Array.prototype.slice.call(arguments);
    this._actions = [];
    this._state = {};
  }

  // TODO: detect key conflicts between these options
  opt.properties.forEach(hookProperty);
  opt.methods.forEach(hookMethod);
  return Mock;

  function hookMethod(k){
    Mock.prototype[k] = function(){
      this._actions.push({
        type: 'call',
        key: k,
        args: Array.prototype.slice.call(arguments)
      });
      return this;
    };
  }

  function hookProperty(k){
    Object.defineProperty(Mock.prototype, k, {
      set: function(v){
        this._state[k] = v;
        this._actions.push({
          type: 'set',
          key: k,
          value: v
        });
      },
      get: function(){
        return this._state[k];
      }
    });
  }
}

mockit.resolve = function(inst, fn) {
  var clazz = fn.apply(fn, inst._ctorArgs);
  if (typeof clazz === 'undefined') {
    clazz = {};
  }
  inst._actions.forEach(function(action){
    if (action.type === 'set') {
      clazz[action.key] = action.value;
    } else if (action.type === 'call' &&
      typeof clazz[action.key] === 'function') {
      clazz[action.key].apply(clazz, action.args);
    }
  });

  return clazz;
};

module.exports = mockit;
