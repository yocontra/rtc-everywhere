'use strict';

var should = require('should');
var mock = require('../../lib/temp-mock');

describe('temp-mock', function() {
  it('should construct', function(done) {
    var Clazz = mock();
    var o = new Clazz(1, 2, 3);

    mock.resolve(o, function(){
      Array.prototype.slice.call(arguments).should.eql([1, 2, 3]);
      done();
    });
  });

  it('should play back a method', function(done) {
    var Clazz = mock({
      methods: ['test']
    });
    var o = new Clazz();
    o.test(4, 5, 6);

    var actual = function(){
      Array.prototype.slice.call(arguments).should.eql([]);
      return {
        test: function(a, b, c) {
          a.should.equal(4);
          b.should.equal(5);
          c.should.equal(6);
          done();
        }
      };
    };
    mock.resolve(o, actual);
  });

  it('should correctly forward a method after resolve', function(done) {
    var Clazz = mock({
      methods: ['test']
    });
    var o = new Clazz();
    o.test(4, 5, 6);

    var calls = 0;
    var actual = function(){
      Array.prototype.slice.call(arguments).should.eql([]);
      return {
        test: function(a, b, c) {
          ++calls;
          if (calls === 1) {
            a.should.equal(4);
            b.should.equal(5);
            c.should.equal(6);
            return;
          }

          if (calls === 2) {
            a.should.equal(7);
            b.should.equal(8);
            c.should.equal(9);
          }
        }
      };
    };
    mock.resolve(o, actual);
    o.test(7, 8, 9);
    calls.should.equal(2);
    done();
  });

  it('should play back a set', function(done) {
    var Clazz = mock({
      properties: ['test']
    });
    var o = new Clazz();
    o.test = 123;

    var actual = function(){
      return {};
    };
    var inst = mock.resolve(o, actual);
    inst.test.should.equal(123);
    done();
  });

  it('should forward a set after resolve', function(done) {
    var Clazz = mock({
      properties: ['test']
    });
    var o = new Clazz();
    var actual = function(){
      return {};
    };
    var inst = mock.resolve(o, actual);
    o.test = 456;
    inst.test.should.equal(456);
    o.test.should.equal(456);
    done();
  });

  it('should play back a function set', function(done) {
    var Clazz = mock({
      properties: ['test']
    });
    var o = new Clazz();
    o.test = function(a){
      should.exist(a);
      a.should.equal(123);
      done();
    };

    var actual = function(){
      return {};
    };
    var inst = mock.resolve(o, actual);
    inst.test(123);
  });

  it('should play back two sets', function(done) {
    var Clazz = mock({
      properties: ['test']
    });
    var o = new Clazz();
    o.test = 123;
    o.test = 456;
    var actual = function(){
      return {};
    };
    var inst = mock.resolve(o, actual);
    inst.test.should.equal(456);
    done();
  });

  it('should play back everything in order', function(done) {
    var Clazz = mock({
      methods: ['test'],
      properties: ['testing']
    });
    var o = new Clazz(1, 2, 3);
    o.testing = 123;
    o.test(4, 5, 6);

    var actual = function(){
      Array.prototype.slice.call(arguments).should.eql([1, 2, 3]);
      return {
        test: function(a, b, c) {
          this.testing.should.equal(123);
          a.should.equal(4);
          b.should.equal(5);
          c.should.equal(6);
        }
      };
    };
    var inst = mock.resolve(o, actual);
    inst.testing.should.equal(123);
    done();
  });
});
