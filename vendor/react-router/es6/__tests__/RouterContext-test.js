'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import expect from 'expect';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import match from '../match';
import RouterContext from '../RouterContext';
import { createRouterObject } from '../RouterUtils';

describe('RouterContext', function () {
  var node = undefined,
      routes = undefined,
      context = undefined,
      history = undefined,
      transitionManager = undefined,
      router = undefined;
  var listenBeforeLeavingRouteSentinel = undefined,
      isActiveSentinel = undefined,
      createHrefSentinel = undefined;

  beforeEach(function () {
    listenBeforeLeavingRouteSentinel = {};
    isActiveSentinel = {};
    createHrefSentinel = {};

    node = document.createElement('div');

    history = {
      push: expect.createSpy(),
      replace: expect.createSpy(),
      createHref: expect.createSpy().andReturn(createHrefSentinel),
      go: expect.createSpy(),
      goBack: expect.createSpy(),
      goForward: expect.createSpy()
    };
    transitionManager = {
      listenBeforeLeavingRoute: expect.createSpy().andReturn(listenBeforeLeavingRouteSentinel),
      isActive: expect.createSpy().andReturn(isActiveSentinel)
    };

    router = createRouterObject(history, transitionManager);

    var Component = (function (_React$Component) {
      _inherits(Component, _React$Component);

      function Component(props, ctx) {
        _classCallCheck(this, Component);

        _React$Component.call(this, props, ctx);
        context = ctx;
      }

      Component.prototype.render = function render() {
        return null;
      };

      return Component;
    })(React.Component);

    Component.contextTypes = {
      router: React.PropTypes.object.isRequired
    };

    routes = { path: '/', component: Component };
  });

  afterEach(function () {
    return unmountComponentAtNode(node);
  });

  function renderTest(done) {
    match({ location: '/', routes: routes }, function (err, redirect, renderProps) {
      render(React.createElement(RouterContext, _extends({}, renderProps, { history: history, router: router })), node);
      done();
    });
  }

  describe('2.0', function () {
    it('exports only `router` to context');
  });

  it('exports a `router` object to routing context', function (done) {
    renderTest(function () {
      expect(context.router).toExist();
      done();
    });
  });

  describe('some weird tests that test implementation and should probably go away', function () {
    it('proxies calls to `push` to `props.history`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router, _expect;

        (_context$router = context.router).push.apply(_context$router, args);
        (_expect = expect(history.push)).toHaveBeenCalledWith.apply(_expect, args);
        done();
      });
    });

    it('proxies calls to `replace` to `props.history`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router2, _expect2;

        (_context$router2 = context.router).replace.apply(_context$router2, args);
        (_expect2 = expect(history.replace)).toHaveBeenCalledWith.apply(_expect2, args);
        done();
      });
    });

    it('proxies calls to `setRouteLeaveHook` to `props.transitionManager`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router3, _expect3;

        var remove = (_context$router3 = context.router).setRouteLeaveHook.apply(_context$router3, args);
        (_expect3 = expect(transitionManager.listenBeforeLeavingRoute)).toHaveBeenCalledWith.apply(_expect3, args);
        expect(remove).toBe(listenBeforeLeavingRouteSentinel);
        done();
      });
    });

    it('proxies calls to `isActive` to `props.transitionManager`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router4, _expect4;

        var isActive = (_context$router4 = context.router).isActive.apply(_context$router4, args);
        (_expect4 = expect(transitionManager.isActive)).toHaveBeenCalledWith.apply(_expect4, args);
        expect(isActive).toBe(isActiveSentinel);
        done();
      });
    });

    it('proxies calls to `createHref` to `props.history`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router5, _expect5;

        var href = (_context$router5 = context.router).createHref.apply(_context$router5, args);
        (_expect5 = expect(history.createHref)).toHaveBeenCalledWith.apply(_expect5, args);
        expect(href).toBe(createHrefSentinel);
        done();
      });
    });

    it('proxies calls to `go` to `props.history`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router6, _expect6;

        (_context$router6 = context.router).go.apply(_context$router6, args);
        (_expect6 = expect(history.go)).toHaveBeenCalledWith.apply(_expect6, args);
        done();
      });
    });

    it('proxies calls to `goBack` to `props.history`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router7, _expect7;

        (_context$router7 = context.router).goBack.apply(_context$router7, args);
        (_expect7 = expect(history.goBack)).toHaveBeenCalledWith.apply(_expect7, args);
        done();
      });
    });

    it('proxies calls to `goForward` to `props.history`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router8, _expect8;

        (_context$router8 = context.router).goForward.apply(_context$router8, args);
        (_expect8 = expect(history.goForward)).toHaveBeenCalledWith.apply(_expect8, args);
        done();
      });
    });
  });
});