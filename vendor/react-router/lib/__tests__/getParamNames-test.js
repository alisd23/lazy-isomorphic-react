'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _PatternUtils = require('../PatternUtils');

describe('getParamNames', function () {
  describe('when a pattern contains no dynamic segments', function () {
    it('returns an empty array', function () {
      _expect2['default'](_PatternUtils.getParamNames('a/b/c')).toEqual([]);
    });
  });

  describe('when a pattern contains :a and :b dynamic segments', function () {
    it('returns the correct names', function () {
      _expect2['default'](_PatternUtils.getParamNames('/comments/:a/:b/edit')).toEqual(['a', 'b']);
    });
  });

  describe('when a pattern has a *', function () {
    it('uses the name "splat"', function () {
      _expect2['default'](_PatternUtils.getParamNames('/files/*.jpg')).toEqual(['splat']);
    });
  });
});