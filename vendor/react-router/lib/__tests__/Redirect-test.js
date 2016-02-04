'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _createMemoryHistory = require('../createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _Redirect = require('../Redirect');

var _Redirect2 = _interopRequireDefault(_Redirect);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

describe('A <Redirect>', function () {

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    _reactDom.unmountComponentAtNode(node);
  });

  it('works', function (done) {
    _reactDom.render(_react2['default'].createElement(
      _Router2['default'],
      { history: _createMemoryHistory2['default']('/notes/5') },
      _react2['default'].createElement(_Route2['default'], { path: '/messages/:id' }),
      _react2['default'].createElement(_Redirect2['default'], { from: '/notes/:id', to: '/messages/:id' })
    ), node, function () {
      _expect2['default'](this.state.location.pathname).toEqual('/messages/5');
      done();
    });
  });

  it('works with relative paths', function (done) {
    _reactDom.render(_react2['default'].createElement(
      _Router2['default'],
      { history: _createMemoryHistory2['default']('/nested/route1') },
      _react2['default'].createElement(
        _Route2['default'],
        { path: 'nested' },
        _react2['default'].createElement(_Route2['default'], { path: 'route2' }),
        _react2['default'].createElement(_Redirect2['default'], { from: 'route1', to: 'route2' })
      )
    ), node, function () {
      _expect2['default'](this.state.location.pathname).toEqual('/nested/route2');
      done();
    });
  });

  it('works with relative paths with param', function (done) {
    _reactDom.render(_react2['default'].createElement(
      _Router2['default'],
      { history: _createMemoryHistory2['default']('/nested/1/route1') },
      _react2['default'].createElement(
        _Route2['default'],
        { path: 'nested/:id' },
        _react2['default'].createElement(_Route2['default'], { path: 'route2' }),
        _react2['default'].createElement(_Redirect2['default'], { from: 'route1', to: 'route2' })
      )
    ), node, function () {
      _expect2['default'](this.state.location.pathname).toEqual('/nested/1/route2');
      done();
    });
  });
});