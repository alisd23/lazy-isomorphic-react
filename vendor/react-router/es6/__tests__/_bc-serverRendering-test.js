'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import expect from 'expect';
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';

import Link from '../Link';
import match from '../match';
import RoutingContext from '../RoutingContext';

describe('v1 server rendering', function () {
  var App = (function (_Component) {
    _inherits(App, _Component);

    function App() {
      _classCallCheck(this, App);

      _Component.apply(this, arguments);
    }

    App.prototype.render = function render() {
      return React.createElement(
        'div',
        { className: 'App' },
        React.createElement(
          'h1',
          null,
          'App'
        ),
        React.createElement(
          Link,
          { to: '/about', activeClassName: 'about-is-active' },
          'About'
        ),
        ' ',
        React.createElement(
          Link,
          { to: '/dashboard', activeClassName: 'dashboard-is-active' },
          'Dashboard'
        ),
        React.createElement(
          'div',
          null,
          this.props.children
        )
      );
    };

    return App;
  })(Component);

  var Dashboard = (function (_Component2) {
    _inherits(Dashboard, _Component2);

    function Dashboard() {
      _classCallCheck(this, Dashboard);

      _Component2.apply(this, arguments);
    }

    Dashboard.prototype.render = function render() {
      return React.createElement(
        'div',
        { className: 'Dashboard' },
        React.createElement(
          'h1',
          null,
          'The Dashboard'
        )
      );
    };

    return Dashboard;
  })(Component);

  var About = (function (_Component3) {
    _inherits(About, _Component3);

    function About() {
      _classCallCheck(this, About);

      _Component3.apply(this, arguments);
    }

    About.prototype.render = function render() {
      return React.createElement(
        'div',
        { className: 'About' },
        React.createElement(
          'h1',
          null,
          'About'
        )
      );
    };

    return About;
  })(Component);

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
    match({ routes: routes, location: '/dashboard' }, function (error, redirectLocation, renderProps) {
      var string = renderToString(React.createElement(RoutingContext, renderProps));
      expect(string).toMatch(/The Dashboard/);
      done();
    });
  });

  it('renders active Links as active', function (done) {
    match({ routes: routes, location: '/about' }, function (error, redirectLocation, renderProps) {
      var string = renderToString(React.createElement(RoutingContext, renderProps));
      expect(string).toMatch(/about-is-active/);
      expect(string).toNotMatch(/dashboard-is-active/);
      done();
    });
  });

  it('sends the redirect location', function (done) {
    match({ routes: routes, location: '/company' }, function (error, redirectLocation) {
      expect(redirectLocation).toExist();
      expect(redirectLocation.pathname).toEqual('/about');
      expect(redirectLocation.search).toEqual('');
      expect(redirectLocation.state).toEqual(null);
      expect(redirectLocation.action).toEqual('REPLACE');
      done();
    });
  });

  it('sends null values when no routes match', function (done) {
    match({ routes: routes, location: '/no-match' }, function (error, redirectLocation, state) {
      expect(error).toNotExist();
      expect(redirectLocation).toNotExist();
      expect(state).toNotExist();
      done();
    });
  });
});