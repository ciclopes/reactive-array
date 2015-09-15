// Generated by CoffeeScript 1.9.3
var ARRAY_PROTO, METHODS, ReactiveArray, __assignReactiveModifiers, a, i, len;

METHODS = 'concat join slice toString toLocaleString indexOf lastIndexOf forEach entries every some filter map reduce reduceRight'.split(' ');

ARRAY_PROTO = Array.prototype;

__assignReactiveModifiers = function(array) {
  var self;
  self = this;
  array.pop = function() {
    return ReactiveArray.prototype.pop.apply(self, arguments);
  };
  array.push = function() {
    return ReactiveArray.prototype.push.apply(self, arguments);
  };
  array.shift = function() {
    return ReactiveArray.prototype.shift.apply(self, arguments);
  };
  array.splice = function() {
    return ReactiveArray.prototype.splice.apply(self, arguments);
  };
  return array.unshift = function() {
    return ReactiveArray.prototype.unshift.apply(self, arguments);
  };
};

ReactiveArray = function(initValue, equalsFn, makeArrayObjReactive) {
  if (!(this instanceof ReactiveArray)) {
    return new ReactiveArray(initValue, equalsFn, makeArrayObjReactive);
  }
  if (!(equalsFn instanceof Function)) {
    makeArrayObjReactive = equalsFn;
    equalsFn = void 0;
  }
  this._data = void 0;
  this._equalsFn = equalsFn;
  this._dep = new Tracker.Dependency;
  this._reactive_data_array = makeArrayObjReactive || true;
  if (typeof initValue !== 'undefined') {
    this.set(initValue);
  } else {
    this.set([]);
  }
};

ReactiveArray.prototype.set = function(value) {
  if (this._equalsFn && this._equalsFn(this._data, value)) {
    return;
  }
  if (value instanceof Array) {
    this._data = value;
  } else {
    this._data = [value];
  }
  if (this._reactive_data_array) {
    __assignReactiveModifiers.call(this, this._data);
  }
  this._dep.changed();
};

ReactiveArray.prototype.get = function() {
  if (Tracker.active) {
    this._dep.depend();
  }
  return this._data;
};

ReactiveArray.prototype.pop = function() {
  this._dep.changed();
  return ARRAY_PROTO.pop.apply(this._data, arguments);
};

ReactiveArray.prototype.push = function() {
  this._dep.changed();
  return ARRAY_PROTO.push.apply(this._data, arguments);
};

ReactiveArray.prototype.shift = function() {
  this._dep.changed();
  return ARRAY_PROTO.shift.apply(this._data, arguments);
};

ReactiveArray.prototype.splice = function() {
  this._dep.changed();
  return ARRAY_PROTO.splice.apply(this._data, arguments);
};

ReactiveArray.prototype.unshift = function() {
  this._dep.changed();
  return ARRAY_PROTO.unshift.apply(this._data, arguments);
};

ReactiveArray.prototype.toString = function() {
  return "ReactiveArray{ " + (this.get()) + " }";
};

for (i = 0, len = METHODS.length; i < len; i++) {
  a = METHODS[i];
  if (ARRAY_PROTO[a] instanceof Function) {
    ReactiveArray.prototype[a] = function() {
      return ARRAY_PROTO[a].apply(this._data, arguments);
    };
  }
}
