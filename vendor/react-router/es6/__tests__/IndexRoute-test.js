'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import expect from 'expect';
import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from '../createMemoryHistory';
import IndexRoute from '../IndexRoute';
import Router from '../Router';
import Route from '../Route';

describe('An <IndexRoute>', function () {
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
        'parent ',
        this.props.children
      );
    };

    return Parent;
  })(Component);

  var Child = (function (_Component2) {
    _inherits(Child, _Component2);

    function Child() {
      _classCallCheck(this, Child);

      _Component2.apply(this, arguments);
    }

    Child.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'child'
      );
    };

    return Child;
  })(Component);

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    unmountComponentAtNode(node);
  });

  it("renders when its parent's URL matches exactly", function (done) {
    render(React.createElement(
      Router,
      { history: createHistory('/') },
      React.createElement(
        Route,
        { path: '/', component: Parent },
        React.createElement(IndexRoute, { component: Child })
      )
    ), node, function () {
      expect(node.textContent).toEqual('parent child');
      done();
    });
  });

  describe('nested deeply in the route hierarchy', function () {
    it("renders when its parent's URL matches exactly", function (done) {
      render(React.createElement(
        Router,
        { history: createHistory('/test') },
        React.createElement(
          Route,
          { path: '/', component: Parent },
          React.createElement(IndexRoute, { component: Child }),
          React.createElement(
            Route,
            { path: '/test', component: Parent },
            React.createElement(IndexRoute, { component: Child })
          )
        )
      ), node, function () {
        expect(node.textContent).toEqual('parent parent child');
        done();
      });
    });

    it('renders when its parents combined pathes match', function (done) {
      render(React.createElement(
        Router,
        { history: createHistory('/path/test') },
        React.createElement(
          Route,
          { path: '/path', component: Parent },
          React.createElement(IndexRoute, { component: Child }),
          React.createElement(
            Route,
            { path: 'test', component: Parent },
            React.createElement(IndexRoute, { component: Child })
          )
        )
      ), node, function () {
        expect(node.textContent).toEqual('parent parent child');
        done();
      });
    });

    it('renders when its parents combined pathes match, and its direct parent is path less', function (done) {
      render(React.createElement(
        Router,
        { history: createHistory('/') },
        React.createElement(
          Route,
          { path: '/', component: Parent },
          React.createElement(
            Route,
            { component: Parent },
            React.createElement(
              Route,
              { component: Parent },
              React.createElement(
                Route,
                { component: Parent },
                React.createElement(Route, { path: 'deep', component: Parent }),
                React.createElement(IndexRoute, { component: Child })
              )
            )
          )
        )
      ), node, function () {
        expect(node.textContent).toEqual('parent parent parent parent child');
        done();
      });
    });
  });
});