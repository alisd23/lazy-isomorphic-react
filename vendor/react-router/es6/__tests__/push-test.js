'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import expect from 'expect';
import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from '../createMemoryHistory';
import resetHash from './resetHash';
import execSteps from './execSteps';
import Router from '../Router';
import Route from '../Route';

describe('pushState', function () {
  var Index = (function (_Component) {
    _inherits(Index, _Component);

    function Index() {
      _classCallCheck(this, Index);

      _Component.apply(this, arguments);
    }

    Index.prototype.render = function render() {
      return React.createElement(
        'h1',
        null,
        'Index'
      );
    };

    return Index;
  })(Component);

  var Home = (function (_Component2) {
    _inherits(Home, _Component2);

    function Home() {
      _classCallCheck(this, Home);

      _Component2.apply(this, arguments);
    }

    Home.prototype.render = function render() {
      return React.createElement(
        'h1',
        null,
        'Home'
      );
    };

    return Home;
  })(Component);

  beforeEach(resetHash);

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    unmountComponentAtNode(node);
  });

  describe('when the target path contains a colon', function () {
    it('works', function (done) {
      var history = createHistory('/');
      var steps = [function () {
        expect(this.state.location.pathname).toEqual('/');
        history.push('/home/hi:there');
      }, function () {
        expect(this.state.location.pathname).toEqual('/home/hi:there');
      }];

      var execNextStep = execSteps(steps, done);

      render(React.createElement(
        Router,
        { history: history, onUpdate: execNextStep },
        React.createElement(Route, { path: '/', component: Index }),
        React.createElement(Route, { path: '/home/hi:there', component: Home })
      ), node, execNextStep);
    });
  });
});