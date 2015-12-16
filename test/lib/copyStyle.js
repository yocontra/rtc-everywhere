'use strict';

var should = require('should');
var crel = require('crel');
var copyStyle = require('../../lib/copyStyle');

describe('copyStyle()', function() {
  it('should copy style object', function() {
    var src = crel('div', {
      style: 'display: none;'
    });
    var dest = crel('div', {
      style: 'display: inline-block;'
    });
    copyStyle(src, dest);
    dest.style.display.should.equal('none');
  });
  it('should copy style object but not overwrite', function() {
    var src = crel('div', {
      style: 'display: none;'
    });
    var dest = crel('div', {
      style: 'display: inline-block; color: red;'
    });
    copyStyle(src, dest);
    dest.style.display.should.equal('none');
    dest.style.color.should.equal('red');
  });

  it('should copy class string', function() {
    var src = crel('div', {
      class: 'test'
    });
    var dest = crel('div');
    copyStyle(src, dest);
    dest.className.should.equal('test');
  });

  it('should merge a class string', function() {
    var src = crel('div', {
      class: 'test'
    });
    var dest = crel('div', {
      class: 'test2'
    });
    copyStyle(src, dest);
    dest.className.should.equal('test2 test');
  });
});
