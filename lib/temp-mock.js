'use strict';

// temporarily mock a class
// when the thing is loaded, replay all actions
// that happened on the mock against the real thing

function mockit(opt) {
  if (!opt) opt = {};
  if (!opt.properties) opt.properties = [];
  if (!opt.methods) opt.methods = [];

  function Mock(){
    this._ctorArgs = arguments;
    this._actions = [];
    this._state = {};
    this._opt = opt;
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
        args: arguments
      });
      return this;
    };
  }

  function hookProperty(k){
    Object.defineProperty(Mock.prototype, k, {
      configurable: true,
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
  // create the real thing
  var clazz = fn.apply(fn, inst._ctorArgs);
  if (typeof clazz === 'undefined') {
    clazz = {};
  }

  // replay all of our stuff onto the real thing
  inst._actions.forEach(function(action){
    if (action.type === 'set') {
      clazz[action.key] = action.value;
    } else if (action.type === 'call' &&
      typeof clazz[action.key] === 'function') {
      clazz[action.key].apply(inst, action.args);
    }
  });

  // make our fake thing into the real thing
  inst._opt.methods.forEach(function(k){
    inst[k] = clazz[k];
  });
  inst._opt.properties.forEach(function(k){
    Object.defineProperty(inst, k, {
      configurable: true,
      set: function(v) {
        clazz[k] = v;
      },
      get: function(){
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
