'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import expect from 'expect';
import React, { Component } from 'react';
import { createRoutesFromReactChildren } from '../RouteUtils';
import IndexRoute from '../IndexRoute';
import Route from '../Route';

describe('createRoutesFromReactChildren', function () {
  var Parent = (function (_Component) {
    _inherits(Parent, _Component);

    function Parent() {
      _classCallCheck(this, Parent);

      _Component.apply(this, arguments);
    }

    Parent.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Parent'
        ),
        this.props.children
      );
    };

    return Parent;
  })(Component);

  var Hello = (function (_Component2) {
    _inherits(Hello, _Component2);

    function Hello() {
      _classCallCheck(this, Hello);

      _Component2.apply(this, arguments);
    }

    Hello.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'Hello'
      );
    };

    return Hello;
  })(Component);

  var Goodbye = (function (_Component3) {
    _inherits(Goodbye, _Component3);

    function Goodbye() {
      _classCallCheck(this, Goodbye);

      _Component3.apply(this, arguments);
    }

    Goodbye.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'Goodbye'
      );
    };

    return Goodbye;
  })(Component);

  it('works with index routes', function () {
    var routes = createRoutesFromReactChildren(React.createElement(
      Route,
      { path: '/', component: Parent },
      React.createElement(IndexRoute, { component: Hello })
    ));

    expect(routes).toEqual([{
      path: '/',
      component: Parent,
      indexRoute: {
        component: Hello
      }
    }]);
  });

  it('works with nested routes', function () {
    var routes = createRoutesFromReactChildren(React.createElement(
      Route,
      { component: Parent },
      React.createElement(Route, { path: 'home', components: { hello: Hello, goodbye: Goodbye } })
    ));

    expect(routes).toEqual([{
      component: Parent,
      childRoutes: [{
        path: 'home',
        components: { hello: Hello, goodbye: Goodbye }
      }]
    }]);
  });

  it('works with falsy children', function () {
    var routes = createRoutesFromReactChildren([React.createElement(Route, { path: '/one', component: Parent }), null, React.createElement(Route, { path: '/two', component: Parent }), undefined]);

    expect(routes).toEqual([{
      path: '/one',
      component: Parent
    }, {
      path: '/two',
      component: Parent
    }]);
  });

  it('works with comments', function () {
    var routes = createRoutesFromReactChildren(React.createElement(
      Route,
      { path: '/one', component: Parent },
      '// This is a comment.',
      React.createElement(Route, { path: '/two', component: Hello })
    ));

    expect(routes).toEqual([{
      path: '/one',
      component: Parent,
      childRoutes: [{
        path: '/two',
        component: Hello
      }]
    }]);
  });
});