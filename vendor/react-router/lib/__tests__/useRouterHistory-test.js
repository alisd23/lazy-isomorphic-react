'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _useRouterHistory = require('../useRouterHistory');

var _useRouterHistory2 = _interopRequireDefault(_useRouterHistory);

var _historyLibCreateMemoryHistory = require('history/lib/createMemoryHistory');

var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);

var _Redirect = require('../Redirect');

var _Redirect2 = _interopRequireDefault(_Redirect);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

describe('useRouterHistory', function () {
  it('adds backwards compatibility flag', function () {
    var history = _useRouterHistory2['default'](_historyLibCreateMemoryHistory2['default'])();
    _expect2['default'](history.__v2_compatible__).toBe(true);
  });

  it('passes along options, especially query parsing', function (done) {
    var history = _useRouterHistory2['default'](_historyLibCreateMemoryHistory2['default'])({
      stringifyQuery: function stringifyQuery() {
        _assert2['default'](true);
        done();
      }
    });

    history.push({ pathname: '/', query: { test: true } });
  });

  describe('when using basename', function () {

    var node = undefined;
    beforeEach(function () {
      node = document.createElement('div');
    });

    afterEach(function () {
      _reactDom.unmountComponentAtNode(node);
    });

    it('should regard basename', function (done) {
      var pathnames = [];
      var basenames = [];
      var history = _useRouterHistory2['default'](_historyLibCreateMemoryHistory2['default'])({
        entries: '/foo/notes/5',
        basename: '/foo'
      });
      history.listen(function (location) {
        pathnames.push(location.pathname);
        basenames.push(location.basename);
      });
      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: history },
        _react2['default'].createElement(_Route2['default'], { path: '/messages/:id' }),
        _react2['default'].createElement(_Redirect2['default'], { from: '/notes/:id', to: '/messages/:id' })
      ), node, function () {
        _expect2['default'](pathnames).toEqual(['/notes/5', '/messages/5']);
        _expect2['default'](basenames).toEqual(['/foo', '/foo']);
        _expect2['default'](this.state.location.pathname).toEqual('/messages/5');
        _expect2['default'](this.state.location.basename).toEqual('/foo');
        done();
      });
    });
  });
});