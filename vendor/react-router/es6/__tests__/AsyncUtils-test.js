'use strict';

import expect from 'expect';
import { loopAsync, mapAsync } from '../AsyncUtils';

describe('loopAsync', function () {
  it('should support calling done() and then next()', function (done) {
    var callback = function callback(turn, next, done) {
      done('foo');
      next();
    };

    var callbackSpy = expect.createSpy().andCall(callback);
    var doneSpy = expect.createSpy();

    loopAsync(10, callbackSpy, doneSpy);
    setTimeout(function () {
      expect(callbackSpy.calls.length).toBe(1);
      expect(doneSpy.calls.length).toBe(1);

      expect(doneSpy).toHaveBeenCalledWith('foo');

      done();
    });
  });
});

describe('mapAsync', function () {
  it('should support zero-length inputs', function (done) {
    mapAsync([], function () {
      return null;
    }, function (_, values) {
      expect(values).toEqual([]);
      done();
    });
  });

  it('should only invoke callback once on multiple errors', function (done) {
    var error = new Error();
    var work = function work(item, index, callback) {
      callback(error);
    };

    var workSpy = expect.createSpy().andCall(work);
    var doneSpy = expect.createSpy();

    mapAsync([null, null, null], workSpy, doneSpy);
    setTimeout(function () {
      expect(workSpy.calls.length).toBe(3);
      expect(doneSpy.calls.length).toBe(1);

      expect(doneSpy).toHaveBeenCalledWith(error);

      done();
    });
  });
});