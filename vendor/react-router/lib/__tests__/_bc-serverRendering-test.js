'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDomServer = require('react-dom/server');

var _Link = require('../Link');

var _Link2 = _interopRequireDefault(_Link);

var _match = require('../match');

var _match2 = _interopRequireDefault(_match);

var _RoutingContext = require('../RoutingContext');

var _RoutingContext2 = _interopRequireDefault(_RoutingContext);

describe('v1 server rendering', function () {
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
    onEnter: function onEnter(nextState, replaceState) {
      replaceState(null, '/about');
    }
  };

  var routes = {
    path: '/',
    component: App,
    childRoutes: [DashboardRoute, AboutRoute, RedirectRoute]
  };

  it('works', function (done) {
    _match2['default']({ routes: routes, location: '/dashboard' }, function (error, redirectLocation, renderProps) {
      var string = _reactDomServer.renderToString(_react2['default'].createElement(_RoutingContext2['default'], renderProps));
      _expect2['default'](string).toMatch(/The Dashboard/);
      done();
    });
  });

  it('renders active Links as active', function (done) {
    _match2['default']({ routes: routes, location: '/about' }, function (error, redirectLocation, renderProps) {
      var string = _reactDomServer.renderToString(_react2['default'].createElement(_RoutingContext2['default'], renderProps));
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
});