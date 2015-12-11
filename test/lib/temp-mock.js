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
