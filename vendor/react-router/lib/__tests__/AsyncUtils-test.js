'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _AsyncUtils = require('../AsyncUtils');

describe('loopAsync', function () {
  it('should support calling done() and then next()', function (done) {
    var callback = function callback(turn, next, done) {
      done('foo');
      next();
    };

    var callbackSpy = _expect2['default'].createSpy().andCall(callback);
    var doneSpy = _expect2['default'].createSpy();

    _AsyncUtils.loopAsync(10, callbackSpy, doneSpy);
    setTimeout(function () {
      _expect2['default'](callbackSpy.calls.length).toBe(1);
      _expect2['default'](doneSpy.calls.length).toBe(1);

      _expect2['default'](doneSpy).toHaveBeenCalledWith('foo');

      done();
    });
  });
});

describe('mapAsync', function () {
  it('should support zero-length inputs', function (done) {
    _AsyncUtils.mapAsync([], function () {
      return null;
    }, function (_, values) {
      _expect2['default'](values).toEqual([]);
      done();
    });
  });

  it('should only invoke callback once on multiple errors', function (done) {
    var error = new Error();
    var work = function work(item, index, callback) {
      callback(error);
    };

    var workSpy = _expect2['default'].createSpy().andCall(work);
    var doneSpy = _expect2['default'].createSpy();

    _AsyncUtils.mapAsync([null, null, null], workSpy, doneSpy);
    setTimeout(function () {
      _expect2['default'](workSpy.calls.length).toBe(3);
      _expect2['default'](doneSpy.calls.length).toBe(1);

      _expect2['default'](doneSpy).toHaveBeenCalledWith(error);

      done();
    });
  });
});