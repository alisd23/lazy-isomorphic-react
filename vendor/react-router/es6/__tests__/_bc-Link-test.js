'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import expect, { spyOn } from 'expect';
import React, { Component } from 'react';
import { Simulate } from 'react-addons-test-utils';
import { render } from 'react-dom';
import execSteps from './execSteps';
import createHistory from 'history/lib/createMemoryHistory';
import Router from '../Router';
import Route from '../Route';
import Link from '../Link';

var click = Simulate.click;

describe('v1 Link', function () {
  var Hello = (function (_Component) {
    _inherits(Hello, _Component);

    function Hello() {
      _classCallCheck(this, Hello);

      _Component.apply(this, arguments);
    }

    Hello.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'Hello ',
        this.props.params.name,
        '!'
      );
    };

    return Hello;
  })(Component);

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  it('knows how to make its href', function () {
    var LinkWrapper = (function (_Component2) {
      _inherits(LinkWrapper, _Component2);

      function LinkWrapper() {
        _classCallCheck(this, LinkWrapper);

        _Component2.apply(this, arguments);
      }

      LinkWrapper.prototype.render = function render() {
        return React.createElement(
          Link,
          { to: '/hello/michael', query: { the: 'query' }, hash: '#the-hash' },
          'Link'
        );
      };

      return LinkWrapper;
    })(Component);

    render(React.createElement(
      Router,
      { history: createHistory('/') },
      React.createElement(Route, { path: '/', component: LinkWrapper })
    ), node, function () {
      var a = node.querySelector('a');
      expect(a.getAttribute('href')).toEqual('/hello/michael?the=query#the-hash');
    });
  });

  describe('with params', function () {
    var App = (function (_Component3) {
      _inherits(App, _Component3);

      function App() {
        _classCallCheck(this, App);

        _Component3.apply(this, arguments);
      }

      App.prototype.render = function render() {
        return React.createElement(
          'div',
          null,
          React.createElement(
            Link,
            {
              to: '/hello/michael',
              activeClassName: 'active'
            },
            'Michael'
          ),
          React.createElement(
            Link,
            {
              to: 'hello/ryan', query: { the: 'query' },
              activeClassName: 'active'
            },
            'Ryan'
          )
        );
      };

      return App;
    })(Component);

    it('is active when its params match', function (done) {
      render(React.createElement(
        Router,
        { history: createHistory('/hello/michael') },
        React.createElement(
          Route,
          { path: '/', component: App },
          React.createElement(Route, { path: 'hello/:name', component: Hello })
        )
      ), node, function () {
        var a = node.querySelectorAll('a')[0];
        expect(a.className.trim()).toEqual('active');
        done();
      });
    });

    it('is not active when its params do not match', function (done) {
      render(React.createElement(
        Router,
        { history: createHistory('/hello/michael') },
        React.createElement(
          Route,
          { path: '/', component: App },
          React.createElement(Route, { path: 'hello/:name', component: Hello })
        )
      ), node, function () {
        var a = node.querySelectorAll('a')[1];
        expect(a.className.trim()).toEqual('');
        done();
      });
    });

    it('is active when its params and query match', function (done) {
      render(React.createElement(
        Router,
        { history: createHistory('/hello/ryan?the=query') },
        React.createElement(
          Route,
          { path: '/', component: App },
          React.createElement(Route, { path: 'hello/:name', component: Hello })
        )
      ), node, function () {
        var a = node.querySelectorAll('a')[1];
        expect(a.className.trim()).toEqual('active');
        done();
      });
    });

    it('is not active when its query does not match', function (done) {
      render(React.createElement(
        Router,
        { history: createHistory('/hello/ryan?the=other+query') },
        React.createElement(
          Route,
          { path: '/', component: App },
          React.createElement(Route, { path: 'hello/:name', component: Hello })
        )
      ), node, function () {
        var a = node.querySelectorAll('a')[1];
        expect(a.className.trim()).toEqual('');
        done();
      });
    });
  });

  it('transitions to the correct route with deprecated props', function (done) {
    var LinkWrapper = (function (_Component4) {
      _inherits(LinkWrapper, _Component4);

      function LinkWrapper() {
        _classCallCheck(this, LinkWrapper);

        _Component4.apply(this, arguments);
      }

      LinkWrapper.prototype.handleClick = function handleClick() {
        // just here to make sure click handlers don't prevent it from happening
      };

      LinkWrapper.prototype.render = function render() {
        var _this = this;

        return React.createElement(
          Link,
          { to: '/hello', hash: '#world', query: { how: 'are' }, state: { you: 'doing?' }, onClick: function (e) {
              return _this.handleClick(e);
            } },
          'Link'
        );
      };

      return LinkWrapper;
    })(Component);

    var history = createHistory('/');
    var spy = spyOn(history, 'push').andCallThrough();

    var steps = [function () {
      click(node.querySelector('a'), { button: 0 });
    }, function () {
      expect(node.innerHTML).toMatch(/Hello/);
      expect(spy).toHaveBeenCalled();

      var location = this.state.location;

      expect(location.pathname).toEqual('/hello');
      expect(location.search).toEqual('?how=are');
      expect(location.hash).toEqual('#world');
      expect(location.state).toEqual({ you: 'doing?' });
    }];

    var execNextStep = execSteps(steps, done);

    render(React.createElement(
      Router,
      { history: history, onUpdate: execNextStep },
      React.createElement(Route, { path: '/', component: LinkWrapper }),
      React.createElement(Route, { path: '/hello', component: Hello })
    ), node, execNextStep);
  });
});