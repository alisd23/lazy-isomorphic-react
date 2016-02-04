'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDomServer = require('react-dom/server');

var _createMemoryHistory = require('../createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _Link = require('../Link');

var _Link2 = _interopRequireDefault(_Link);

var _match = require('../match');

var _match2 = _interopRequireDefault(_match);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _RouterContext = require('../RouterContext');

var _RouterContext2 = _interopRequireDefault(_RouterContext);

describe('server rendering', function () {
  var App = (function (_Component) {
    _inherits(App, _Component);

    function App() {
      _classCallCheck(this, App);

      _Component.apply(this, arguments);
    }

    App.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'App' },
        _react2['default'].createElement(
          'h1',
          null,
          'App'
        ),
        _react2['default'].createElement(
          _Link2['default'],
          { to: '/about', activeClassName: 'about-is-active' },
          'About'
        ),
        ' ',
        _react2['default'].createElement(
          _Link2['default'],
          { to: '/dashboard', activeClassName: 'dashboard-is-active' },
          'Dashboard'
        ),
        _react2['default'].createElement(
          'div',
          null,
          this.props.children
        )
      );
    };

    return App;
  })(_react.Component);

  var Dashboard = (function (_Component2) {
    _inherits(Dashboard, _Component2);

    function Dashboard() {
      _classCallCheck(this, Dashboard);

      _Component2.apply(this, arguments);
    }

    Dashboard.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'Dashboard' },
        _react2['default'].createElement(
          'h1',
          null,
          'The Dashboard'
        )
      );
    };

    return Dashboard;
  })(_react.Component);

  var About = (function (_Component3) {
    _inherits(About, _Component3);

    function About() {
      _classCallCheck(this, About);

      _Component3.apply(this, arguments);
    }

    About.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'About' },
        _react2['default'].createElement(
          'h1',
          null,
          'About'
        )
      );
    };

    return About;
  })(_react.Component);

  var Async = (function (_Component4) {
    _inherits(Async, _Component4);

    function Async() {
      _classCallCheck(this, Async);

      _Component4.apply(this, arguments);
    }

    Async.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'Async' },
        _react2['default'].createElement(
          'h1',
          null,
          'Async'
        ),
        _react2['default'].createElement(
          _Link2['default'],
          { to: '/async', activeClassName: 'async-is-active' },
          'Link'
        )
      );
    };

    return Async;
  })(_react.Component);

  var DashboardRoute = {
    path: '/dashboard',
    component: Dashboard
  };

  var AboutRoute = {
    path: '/about',
    component: About
  };

  var RedirectRoute = {
    path: '/company',
    onEnter: function onEnter(nextState, replace) {
      replace('/about');
    }
  };

  var AsyncRoute = {
    path: '/async',
    getComponent: function getComponent(location, cb) {
      setTimeout(function () {
        return cb(null, Async);
      });
    }
  };

  var routes = {
    path: '/',
    component: App,
    childRoutes: [DashboardRoute, AboutRoute, RedirectRoute, AsyncRoute]
  };

  it('works for synchronous route', function (done) {
    _match2['default']({ routes: routes, location: '/dashboard' }, function (error, redirectLocation, renderProps) {
      var string = _reactDomServer.renderToString(_react2['default'].createElement(_RouterContext2['default'], renderProps));
      _expect2['default'](string).toMatch(/The Dashboard/);
      done();
    });
  });

  it('works for asynchronous route', function (done) {
    _match2['default']({ routes: routes, location: '/async' }, function (error, redirectLocation, renderProps) {
      var string = _reactDomServer.renderToString(_react2['default'].createElement(_RouterContext2['default'], renderProps));
      _expect2['default'](string).toMatch(/Async/);
      done();
    });
  });

  it('accepts a custom history', function (done) {
    var history = _createMemoryHistory2['default']();
    var spy = _expect.spyOn(history, 'createLocation').andCallThrough();

    _match2['default']({ history: history, routes: routes, location: '/dashboard' }, function (error, redirectLocation, renderProps) {
      var string = _reactDomServer.renderToString(_react2['default'].createElement(_RouterContext2['default'], renderProps));
      _expect2['default'](string).toMatch(/The Dashboard/);
      _expect2['default'](spy).toHaveBeenCalled();
      done();
    });
  });

  it('renders active Links as active', function (done) {
    _match2['default']({ routes: routes, location: '/about' }, function (error, redirectLocation, renderProps) {
      var string = _reactDomServer.renderToString(_react2['default'].createElement(_RouterContext2['default'], renderProps));
      _expect2['default'](string).toMatch(/about-is-active/);
      _expect2['default'](string).toNotMatch(/dashboard-is-active/);
      done();
    });
  });

  it('sends the redirect location', function (done) {
    _match2['default']({ routes: routes, location: '/company' }, function (error, redirectLocation) {
      _expect2['default'](redirectLocation).toExist();
      _expect2['default'](redirectLocation.pathname).toEqual('/about');
      _expect2['default'](redirectLocation.search).toEqual('');
      _expect2['default'](redirectLocation.state).toEqual(null);
      _expect2['default'](redirectLocation.action).toEqual('REPLACE');
      done();
    });
  });

  it('sends null values when no routes match', function (done) {
    _match2['default']({ routes: routes, location: '/no-match' }, function (error, redirectLocation, state) {
      _expect2['default'](error).toNotExist();
      _expect2['default'](redirectLocation).toNotExist();
      _expect2['default'](state).toNotExist();
      done();
    });
  });

  describe('server/client consistency', function () {
    // Just render to static markup here to avoid having to normalize markup.

    it('should match for synchronous route', function () {
      var serverString = undefined;

      _match2['default']({ routes: routes, location: '/dashboard' }, function (error, redirectLocation, renderProps) {
        serverString = _reactDomServer.renderToStaticMarkup(_react2['default'].createElement(_RouterContext2['default'], renderProps));
      });

      var browserString = _reactDomServer.renderToStaticMarkup(_react2['default'].createElement(_Router2['default'], { history: _createMemoryHistory2['default']('/dashboard'), routes: routes }));

      _expect2['default'](browserString).toEqual(serverString);
    });

    it('should match for asynchronous route', function (done) {
      _match2['default']({ routes: routes, location: '/async' }, function (error, redirectLocation, renderProps) {
        var serverString = _reactDomServer.renderToStaticMarkup(_react2['default'].createElement(_RouterContext2['default'], renderProps));

        _match2['default']({ history: _createMemoryHistory2['default']('/async'), routes: routes }, function (error, redirectLocation, renderProps) {
          var browserString = _reactDomServer.renderToStaticMarkup(_react2['default'].createElement(_Router2['default'], renderProps));

          _expect2['default'](browserString).toEqual(serverString);
          _expect2['default'](browserString).toMatch(/async-is-active/);

          done();
        });
      });
    });
  });
});