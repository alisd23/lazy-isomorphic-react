'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _history = require('history');

var _RouteUtils = require('../RouteUtils');

var _matchRoutes = require('../matchRoutes');

var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

var _IndexRoute = require('../IndexRoute');

var _IndexRoute2 = _interopRequireDefault(_IndexRoute);

describe('matchRoutes', function () {
  var routes = undefined;
  var RootRoute = undefined,
      UsersRoute = undefined,
      UsersIndexRoute = undefined,
      UserRoute = undefined,
      PostRoute = undefined,
      FilesRoute = undefined,
      AboutRoute = undefined,
      TeamRoute = undefined,
      ProfileRoute = undefined,
      GreedyRoute = undefined,
      OptionalRoute = undefined,
      OptionalRouteChild = undefined,
      CatchAllRoute = undefined;
  var createLocation = _history.createMemoryHistory().createLocation;

  beforeEach(function () {
    /*
    <Route>
      <Route path="users">
        <IndexRoute />
        <Route path=":userID">
          <Route path="/profile" />
        </Route>
        <Route path="/team" />
      </Route>
    </Route>
    <Route path="/about" />
    <Route path="/(optional)">
      <Route path="child" />
    </Route>
    <Route path="*" />
    */
    routes = [RootRoute = {
      childRoutes: [UsersRoute = {
        path: 'users',
        indexRoute: UsersIndexRoute = {},
        childRoutes: [UserRoute = {
          path: ':userID',
          childRoutes: [ProfileRoute = {
            path: '/profile'
          }, PostRoute = {
            path: ':postID'
          }]
        }, TeamRoute = {
          path: '/team'
        }]
      }]
    }, FilesRoute = {
      path: '/files/*/*.jpg'
    }, AboutRoute = {
      path: '/about'
    }, GreedyRoute = {
      path: '/**/f'
    }, OptionalRoute = {
      path: '/(optional)',
      childRoutes: [OptionalRouteChild = {
        path: 'child'
      }]
    }, CatchAllRoute = {
      path: '*'
    }];
  });

  function describeRoutes() {
    describe('when the location matches an index route', function () {
      it('matches the correct routes', function (done) {
        _matchRoutes2['default'](routes, createLocation('/users'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([RootRoute, UsersRoute, UsersIndexRoute]);
          done();
        });
      });
    });

    describe('when the location matches a nested route with params', function () {
      it('matches the correct routes and params', function (done) {
        _matchRoutes2['default'](routes, createLocation('/users/5'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([RootRoute, UsersRoute, UserRoute]);
          _expect2['default'](match.params).toEqual({ userID: '5' });
          done();
        });
      });
    });

    describe('when the location matches a deeply nested route with params', function () {
      it('matches the correct routes and params', function (done) {
        _matchRoutes2['default'](routes, createLocation('/users/5/abc'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([RootRoute, UsersRoute, UserRoute, PostRoute]);
          _expect2['default'](match.params).toEqual({ userID: '5', postID: 'abc' });
          done();
        });
      });
    });

    describe('when the location matches a nested route with multiple splat params', function () {
      it('matches the correct routes and params', function (done) {
        _matchRoutes2['default'](routes, createLocation('/files/a/b/c.jpg'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([FilesRoute]);
          _expect2['default'](match.params).toEqual({ splat: ['a', 'b/c'] });
          done();
        });
      });
    });

    describe('when the location matches a nested route with a greedy splat param', function () {
      it('matches the correct routes and params', function (done) {
        _matchRoutes2['default'](routes, createLocation('/foo/bar/f'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([GreedyRoute]);
          _expect2['default'](match.params).toEqual({ splat: 'foo/bar' });
          done();
        });
      });
    });

    describe('when the location matches a route with hash', function () {
      it('matches the correct routes', function (done) {
        _matchRoutes2['default'](routes, createLocation('/users#about'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([RootRoute, UsersRoute, UsersIndexRoute]);
          done();
        });
      });
    });

    describe('when the location matches a deeply nested route with params and hash', function () {
      it('matches the correct routes and params', function (done) {
        _matchRoutes2['default'](routes, createLocation('/users/5/abc#about'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([RootRoute, UsersRoute, UserRoute, PostRoute]);
          _expect2['default'](match.params).toEqual({ userID: '5', postID: 'abc' });
          done();
        });
      });
    });

    describe('when the location matches an absolute route', function () {
      it('matches the correct routes', function (done) {
        _matchRoutes2['default'](routes, createLocation('/about'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([AboutRoute]);
          done();
        });
      });
    });

    describe('when the location matches an optional route', function () {
      it('matches when the optional pattern is missing', function (done) {
        _matchRoutes2['default'](routes, createLocation('/'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([OptionalRoute]);
          done();
        });
      });

      it('matches when the optional pattern is present', function (done) {
        _matchRoutes2['default'](routes, createLocation('/optional'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([OptionalRoute]);
          done();
        });
      });
    });

    describe('when the location matches the child of an optional route', function () {
      it('matches when the optional pattern is missing', function (done) {
        _matchRoutes2['default'](routes, createLocation('/child'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([OptionalRoute, OptionalRouteChild]);
          done();
        });
      });

      it('matches when the optional pattern is present', function (done) {
        _matchRoutes2['default'](routes, createLocation('/optional/child'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([OptionalRoute, OptionalRouteChild]);
          done();
        });
      });
    });

    describe('when the location does not match any routes', function () {
      it('matches the "catch-all" route', function (done) {
        _matchRoutes2['default'](routes, createLocation('/not-found'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([CatchAllRoute]);
          done();
        });
      });

      it('matches the "catch-all" route on a deep miss', function (done) {
        _matchRoutes2['default'](routes, createLocation('/not-found/foo'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([CatchAllRoute]);
          done();
        });
      });

      it('matches the "catch-all" route on missing path separators', function (done) {
        _matchRoutes2['default'](routes, createLocation('/optionalchild'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([CatchAllRoute]);
          done();
        });
      });
    });
  }

  describe('a synchronous route config', function () {
    describeRoutes();

    describe('when the location matches a nested absolute route', function () {
      it('matches the correct routes', function (done) {
        _matchRoutes2['default'](routes, createLocation('/team'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([RootRoute, UsersRoute, TeamRoute]);
          done();
        });
      });
    });

    describe('when the location matches an absolute route nested under a route with params', function () {
      it('matches the correct routes and params', function (done) {
        _matchRoutes2['default'](routes, createLocation('/profile'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](match.routes).toEqual([RootRoute, UsersRoute, UserRoute, ProfileRoute]);
          _expect2['default'](match.params).toEqual({}); // no userID param
          done();
        });
      });
    });
  });

  describe('an asynchronous route config', function () {
    function makeAsyncRouteConfig(routes) {
      routes.forEach(function (route) {
        var childRoutes = route.childRoutes;
        var indexRoute = route.indexRoute;

        if (childRoutes) {
          delete route.childRoutes;

          route.getChildRoutes = function (location, callback) {
            setTimeout(function () {
              callback(null, childRoutes);
            });
          };

          makeAsyncRouteConfig(childRoutes);
        }

        if (indexRoute) {
          delete route.indexRoute;

          route.getIndexRoute = function (location, callback) {
            setTimeout(function () {
              callback(null, indexRoute);
            });
          };
        }
      });
    }

    beforeEach(function () {
      makeAsyncRouteConfig(routes);
    });

    describeRoutes();
  });

  describe('an asynchronous JSX route config', function () {
    var getChildRoutes = undefined,
        getIndexRoute = undefined,
        jsxRoutes = undefined;

    beforeEach(function () {
      getChildRoutes = function (location, callback) {
        setTimeout(function () {
          callback(null, _react2['default'].createElement(_Route2['default'], { path: ':userID' }));
        });
      };

      getIndexRoute = function (location, callback) {
        setTimeout(function () {
          callback(null, _react2['default'].createElement(_Route2['default'], { name: 'jsx' }));
        });
      };

      jsxRoutes = _RouteUtils.createRoutes([_react2['default'].createElement(_Route2['default'], { name: 'users',
        path: 'users',
        getChildRoutes: getChildRoutes,
        getIndexRoute: getIndexRoute })]);
    });

    it('when getChildRoutes callback returns reactElements', function (done) {
      _matchRoutes2['default'](jsxRoutes, createLocation('/users/5'), function (error, match) {
        _expect2['default'](match).toExist();
        _expect2['default'](match.routes.map(function (r) {
          return r.path;
        })).toEqual(['users', ':userID']);
        _expect2['default'](match.params).toEqual({ userID: '5' });
        done();
      });
    });

    it('when getIndexRoute callback returns reactElements', function (done) {
      _matchRoutes2['default'](jsxRoutes, createLocation('/users'), function (error, match) {
        _expect2['default'](match).toExist();
        _expect2['default'](match.routes.map(function (r) {
          return r.name;
        })).toEqual(['users', 'jsx']);
        done();
      });
    });
  });

  describe('invalid route configs', function () {
    var invalidRoutes = undefined,
        errorSpy = undefined;

    beforeEach(function () {
      errorSpy = _expect2['default'].spyOn(console, 'error');
    });

    afterEach(function () {
      errorSpy.restore();
    });

    describe('index route with path', function () {
      beforeEach(function () {
        invalidRoutes = _RouteUtils.createRoutes(_react2['default'].createElement(
          _Route2['default'],
          { path: '/' },
          _react2['default'].createElement(_IndexRoute2['default'], { path: 'foo' })
        ));
      });

      it('complains when matching', function (done) {
        _matchRoutes2['default'](invalidRoutes, createLocation('/'), function (error, match) {
          _expect2['default'](match).toExist();
          _expect2['default'](errorSpy).toHaveBeenCalledWith('Warning: [react-router] Index routes should not have paths');
          done();
        });
      });
    });
  });
});