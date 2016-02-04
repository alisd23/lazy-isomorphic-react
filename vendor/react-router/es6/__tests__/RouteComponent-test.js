'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import expect from 'expect';
import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from '../createMemoryHistory';
import Router from '../Router';

describe('a Route Component', function () {

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    unmountComponentAtNode(node);
  });

  it('injects the right props', function (done) {
    var Parent = (function (_Component) {
      _inherits(Parent, _Component);

      function Parent() {
        _classCallCheck(this, Parent);

        _Component.apply(this, arguments);
      }

      Parent.prototype.componentDidMount = function componentDidMount() {
        expect(this.props.route).toEqual(parent);
        expect(this.props.routes).toEqual([parent, child]);
      };

      Parent.prototype.render = function render() {
        return null;
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
        return null;
      };

      return Child;
    })(Component);

    var child = { path: 'child', component: Child };
    var parent = { path: '/', component: Parent, childRoutes: [child] };

    render(React.createElement(Router, { history: createHistory('/child'), routes: parent }), node, done);
  });
});