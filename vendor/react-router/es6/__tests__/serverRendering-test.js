'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import expect, { spyOn } from 'expect';
import React, { Component } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import createMemoryHistory from '../createMemoryHistory';
import Link from '../Link';
import match from '../match';
import Router from '../Router';
import RouterContext from '../RouterContext';

describe('server rendering', function () {
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

  var Async = (function (_Component4) {
    _inherits(Async, _Component4);

    function Async() {
      _classCallCheck(this, Async);

      _Component4.apply(this, arguments);
    }

    Async.prototype.render = function render() {
      return React.createElement(
        'div',
        { className: 'Async' },
        React.createElement(
          'h1',
          null,
          'Async'
        ),
        React.createElement(
          Link,
          { to: '/async', activeClassName: 'async-is-active' },
          'Link'
        )
      );
    };

    return Async;
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
    match({ routes: routes, location: '/dashboard' }, function (error, redirectLocation, renderProps) {
      var string = renderToString(React.createElement(RouterContext, renderProps));
      expect(string).toMatch(/The Dashboard/);
      done();
    });
  });

  it('works for asynchronous route', function (done) {
    match({ routes: routes, location: '/async' }, function (error, redirectLocation, renderProps) {
      var string = renderToString(React.createElement(RouterContext, renderProps));
      expect(string).toMatch(/Async/);
      done();
    });
  });

  it('accepts a custom history', function (done) {
    var history = createMemoryHistory();
    var spy = spyOn(history, 'createLocation').andCallThrough();

    match({ history: history, routes: routes, location: '/dashboard' }, function (error, redirectLocation, renderProps) {
      var string = renderToString(React.createElement(RouterContext, renderProps));
      expect(string).toMatch(/The Dashboard/);
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it('renders active Links as active', function (done) {
    match({ routes: routes, location: '/about' }, function (error, redirectLocation, renderProps) {
      var string = renderToString(React.createElement(RouterContext, renderProps));
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

  describe('server/client consistency', function () {
    // Just render to static markup here to avoid having to normalize markup.

    it('should match for synchronous route', function () {
      var serverString = undefined;

      match({ routes: routes, location: '/dashboard' }, function (error, redirectLocation, renderProps) {
        serverString = renderToStaticMarkup(React.createElement(RouterContext, renderProps));
      });

      var browserString = renderToStaticMarkup(React.createElement(Router, { history: createMemoryHistory('/dashboard'), routes: routes }));

      expect(browserString).toEqual(serverString);
    });

    it('should match for asynchronous route', function (done) {
      match({ routes: routes, location: '/async' }, function (error, redirectLocation, renderProps) {
        var serverString = renderToStaticMarkup(React.createElement(RouterContext, renderProps));

        match({ history: createMemoryHistory('/async'), routes: routes }, function (error, redirectLocation, renderProps) {
          var browserString = renderToStaticMarkup(React.createElement(Router, renderProps));

          expect(browserString).toEqual(serverString);
          expect(browserString).toMatch(/async-is-active/);

          done();
        });
      });
    });
  });
});