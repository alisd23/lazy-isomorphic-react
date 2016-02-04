'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _historyLibCreateMemoryHistory = require('history/lib/createMemoryHistory');

var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);

var _IndexRoute = require('../IndexRoute');

var _IndexRoute2 = _interopRequireDefault(_IndexRoute);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

describe('v1 isActive', function () {

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    _reactDom.unmountComponentAtNode(node);
  });

  describe('a pathname that matches the URL', function () {
    describe('with no query', function () {
      it('is active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/home?the=query') },
          _react2['default'].createElement(_Route2['default'], { path: '/home' })
        ), node, function () {
          _expect2['default'](this.history.isActive('/home')).toBe(true);
          done();
        });
      });
    });

    describe('with a query that also matches', function () {
      it('is active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/home?the=query') },
          _react2['default'].createElement(_Route2['default'], { path: '/home' })
        ), node, function () {
          _expect2['default'](this.history.isActive('/home', { the: 'query' })).toBe(true);
          done();
        });
      });
    });

    describe('with a query that also matches by value, but not by type', function () {
      it('is active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/home?the=query&n=2&show=false') },
          _react2['default'].createElement(_Route2['default'], { path: '/home' })
        ), node, function () {
          _expect2['default'](this.history.isActive('/home', { the: 'query', n: 2, show: false })).toBe(true);
          done();
        });
      });
    });

    describe('with a query that does not match', function () {
      it('is not active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/home?the=query') },
          _react2['default'].createElement(_Route2['default'], { path: '/home' })
        ), node, function () {
          _expect2['default'](this.history.isActive('/home', { something: 'else' })).toBe(false);
          done();
        });
      });
    });
  });

  describe('nested routes', function () {
    describe('on the child', function () {
      it('is active for the child and the parent', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/parent/child') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/parent' },
            _react2['default'].createElement(_Route2['default'], { path: 'child' })
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/parent/child')).toBe(true);
          _expect2['default'](this.history.isActive('/parent/child', null, true)).toBe(true);
          _expect2['default'](this.history.isActive('/parent')).toBe(true);
          _expect2['default'](this.history.isActive('/parent', null, true)).toBe(false);
          done();
        });
      });

      it('is active with extraneous slashes', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/parent/child') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/parent' },
            _react2['default'].createElement(_Route2['default'], { path: 'child' })
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/parent////child////')).toBe(true);
          done();
        });
      });

      it('is not active with missing slashes', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/parent/child') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/parent' },
            _react2['default'].createElement(_Route2['default'], { path: 'child' })
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/parentchild')).toBe(false);
          done();
        });
      });
    });

    describe('on the parent', function () {
      it('is active for the parent', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/parent') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/parent' },
            _react2['default'].createElement(_Route2['default'], { path: 'child' })
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/parent/child')).toBe(false);
          _expect2['default'](this.history.isActive('/parent/child', null, true)).toBe(false);
          _expect2['default'](this.history.isActive('/parent')).toBe(true);
          _expect2['default'](this.history.isActive('/parent', null, true)).toBe(true);
          done();
        });
      });
    });
  });

  describe('a pathname that matches a parent route, but not the URL directly', function () {
    describe('with no query', function () {
      it('is active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/absolute') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/home' },
            _react2['default'].createElement(_Route2['default'], { path: '/absolute' })
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/home')).toBe(true);
          _expect2['default'](this.history.isActive('/home', null, true)).toBe(false);
          done();
        });
      });
    });

    describe('with a query that also matches', function () {
      it('is active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/absolute?the=query') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/home' },
            _react2['default'].createElement(_Route2['default'], { path: '/absolute' })
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/home', { the: 'query' })).toBe(true);
          _expect2['default'](this.history.isActive('/home', { the: 'query' }, true)).toBe(false);
          done();
        });
      });
    });

    describe('with a query that does not match', function () {
      it('is active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/absolute?the=query') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/home' },
            _react2['default'].createElement(_Route2['default'], { path: '/absolute' })
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/home', { something: 'else' })).toBe(false);
          _expect2['default'](this.history.isActive('/home', { something: 'else' }, true)).toBe(false);
          done();
        });
      });
    });
  });

  describe('a pathname that matches a nested absolute path', function () {
    describe('with no query', function () {
      it('is active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/absolute') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/home' },
            _react2['default'].createElement(_Route2['default'], { path: '/absolute' })
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/absolute')).toBe(true);
          _expect2['default'](this.history.isActive('/absolute', null, true)).toBe(true);
          done();
        });
      });
    });
  });

  describe('a pathname that matches an index URL', function () {
    describe('with no query', function () {
      it('is active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/home') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/home' },
            _react2['default'].createElement(_IndexRoute2['default'], null)
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/home', null)).toBe(true);
          _expect2['default'](this.history.isActive('/home', null, true)).toBe(true);
          done();
        });
      });
    });

    describe('with a query that also matches', function () {
      it('is active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/home?the=query') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/home' },
            _react2['default'].createElement(_IndexRoute2['default'], null)
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/home', { the: 'query' })).toBe(true);
          _expect2['default'](this.history.isActive('/home', { the: 'query' }, true)).toBe(true);
          done();
        });
      });
    });

    describe('with a query that does not match', function () {
      it('is not active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/home?the=query') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/home' },
            _react2['default'].createElement(_IndexRoute2['default'], null)
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/home', { something: 'else' })).toBe(false);
          _expect2['default'](this.history.isActive('/home', { something: 'else' }, true)).toBe(false);
          done();
        });
      });
    });

    describe('with the index route nested under a pathless route', function () {
      it('is active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/home') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/home' },
            _react2['default'].createElement(
              _Route2['default'],
              null,
              _react2['default'].createElement(_IndexRoute2['default'], null)
            )
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/home', null)).toBe(true);
          _expect2['default'](this.history.isActive('/home', null, true)).toBe(true);
          done();
        });
      });
    });

    describe('with a nested index route', function () {
      it('is active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/parent/child') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/parent' },
            _react2['default'].createElement(
              _Route2['default'],
              { path: 'child' },
              _react2['default'].createElement(_IndexRoute2['default'], null)
            )
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/parent/child', null)).toBe(true);
          _expect2['default'](this.history.isActive('/parent/child', null, true)).toBe(true);
          done();
        });
      });

      it('is active with extraneous slashes', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/parent/child') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/parent' },
            _react2['default'].createElement(
              _Route2['default'],
              { path: 'child' },
              _react2['default'].createElement(_IndexRoute2['default'], null)
            )
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/parent///child///', null)).toBe(true);
          _expect2['default'](this.history.isActive('/parent///child///', null, true)).toBe(true);
          done();
        });
      });
    });

    describe('with a nested index route under a pathless route', function () {
      it('is active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/parent/child') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/parent' },
            _react2['default'].createElement(
              _Route2['default'],
              { path: 'child' },
              _react2['default'].createElement(
                _Route2['default'],
                null,
                _react2['default'].createElement(_IndexRoute2['default'], null)
              )
            )
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/parent/child', null)).toBe(true);
          _expect2['default'](this.history.isActive('/parent/child', null, true)).toBe(true);
          done();
        });
      });

      it('is active with extraneous slashes', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/parent/child') },
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/parent' },
            _react2['default'].createElement(
              _Route2['default'],
              { path: 'child' },
              _react2['default'].createElement(
                _Route2['default'],
                null,
                _react2['default'].createElement(_IndexRoute2['default'], null)
              )
            )
          )
        ), node, function () {
          _expect2['default'](this.history.isActive('/parent///child///', null)).toBe(true);
          _expect2['default'](this.history.isActive('/parent///child///', null, true)).toBe(true);
          done();
        });
      });
    });
  });

  describe('a pathname that matches only the beginning of the URL', function () {
    it('is not active', function (done) {
      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: _historyLibCreateMemoryHistory2['default']('/home') },
        _react2['default'].createElement(_Route2['default'], { path: '/home' })
      ), node, function () {
        _expect2['default'](this.history.isActive('/h')).toBe(false);
        done();
      });
    });
  });

  describe('a pathname that matches the root URL only if it is a parent route', function () {
    it('is active', function (done) {
      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: _historyLibCreateMemoryHistory2['default']('/home') },
        _react2['default'].createElement(
          _Route2['default'],
          { path: '/' },
          _react2['default'].createElement(_Route2['default'], { path: '/home' })
        )
      ), node, function () {
        _expect2['default'](this.history.isActive('/')).toBe(true);
        done();
      });
    });
  });

  describe('a pathname that does not match the root URL if it is not a parent route', function () {
    it('is not active', function (done) {
      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: _historyLibCreateMemoryHistory2['default']('/home') },
        _react2['default'].createElement(_Route2['default'], { path: '/' }),
        _react2['default'].createElement(_Route2['default'], { path: '/home' })
      ), node, function () {
        _expect2['default'](this.history.isActive('/')).toBe(false);
        done();
      });
    });
  });

  describe('a pathname that matches URL', function () {
    describe('with query that does match', function () {
      it('is active', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/home?foo=bar&foo=bar1&foo=bar2') },
          _react2['default'].createElement(_Route2['default'], { path: '/' }),
          _react2['default'].createElement(_Route2['default'], { path: '/home' })
        ), node, function () {
          _expect2['default'](this.history.isActive('/home', { foo: ['bar', 'bar1', 'bar2'] })).toBe(true);
          done();
        });
      });
    });

    describe('with a custom parse function and a query that does not match', function () {
      it('is not active', function (done) {
        function stringifyQuery(params) {
          return _qs2['default'].stringify(params, { arrayFormat: 'indices' });
        }
        function parseQueryString(query) {
          return _qs2['default'].parse(query, { parseArrays: false });
        }

        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/home?foo[1]=bar'), stringifyQuery: stringifyQuery, parseQueryString: parseQueryString },
          _react2['default'].createElement(_Route2['default'], { path: '/' }),
          _react2['default'].createElement(_Route2['default'], { path: '/home' })
        ), node, function () {
          _expect2['default'](this.history.isActive('/home', { foo: { 4: 'bar' } })).toBe(false);
          done();
        });
      });
    });

    describe('with a custom parse function and a query that match', function () {
      it('is active', function (done) {
        function stringifyQuery(params) {
          return _qs2['default'].stringify(params, { arrayFormat: 'indices' });
        }
        function parseQueryString(query) {
          return _qs2['default'].parse(query, { parseArrays: false });
        }

        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/home?foo[4]=bar&foo[1]=bar2'), stringifyQuery: stringifyQuery, parseQueryString: parseQueryString },
          _react2['default'].createElement(_Route2['default'], { path: '/' }),
          _react2['default'].createElement(_Route2['default'], { path: '/home' })
        ), node, function () {
          _expect2['default'](this.history.isActive('/home', { foo: { 1: 'bar2', 4: 'bar' } })).toBe(true);
          done();
        });
      });
    });

    describe('with a query with explicit undefined values', function () {
      it('matches missing query keys', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/home?foo=1') },
          _react2['default'].createElement(_Route2['default'], { path: '/' }),
          _react2['default'].createElement(_Route2['default'], { path: '/home' })
        ), node, function () {
          _expect2['default'](this.history.isActive('/home', { foo: 1, bar: undefined })).toBe(true);
          done();
        });
      });

      it('does not match a present query key', function (done) {
        _reactDom.render(_react2['default'].createElement(
          _Router2['default'],
          { history: _historyLibCreateMemoryHistory2['default']('/home?foo=1&bar=') },
          _react2['default'].createElement(_Route2['default'], { path: '/' }),
          _react2['default'].createElement(_Route2['default'], { path: '/home' })
        ), node, function () {
          _expect2['default'](this.history.isActive('/home', { foo: 1, bar: undefined })).toBe(false);
          done();
        });
      });
    });
  });

  describe('dynamic routes', function () {
    var routes = {
      path: '/',
      childRoutes: [{ path: 'foo' }],
      getIndexRoute: function getIndexRoute(location, callback) {
        setTimeout(function () {
          return callback(null, {});
        });
      }
    };

    describe('when not on index route', function () {
      it('does not show index as active', function (done) {
        _reactDom.render(_react2['default'].createElement(_Router2['default'], { history: _historyLibCreateMemoryHistory2['default']('/foo'), routes: routes }), node, function () {
          _expect2['default'](this.history.isActive('/')).toBe(true);
          _expect2['default'](this.history.isActive('/', null, true)).toBe(false);
          _expect2['default'](this.history.isActive('/foo')).toBe(true);
          done();
        });
      });
    });

    describe('when on index route', function () {
      it('shows index as active', function (done) {
        _reactDom.render(_react2['default'].createElement(_Router2['default'], { history: _historyLibCreateMemoryHistory2['default']('/'), routes: routes }), node, function () {
          var _this = this;

          // Need to wait for async match to complete.
          setTimeout(function () {
            _expect2['default'](_this.history.isActive('/')).toBe(true);
            _expect2['default'](_this.history.isActive('/', null, true)).toBe(true);
            _expect2['default'](_this.history.isActive('/foo')).toBe(false);
            done();
          });
        });
      });
    });
  });
});