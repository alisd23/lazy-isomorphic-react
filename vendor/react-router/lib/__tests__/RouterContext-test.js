'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _expect9 = require('expect');

var _expect10 = _interopRequireDefault(_expect9);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _match = require('../match');

var _match2 = _interopRequireDefault(_match);

var _RouterContext = require('../RouterContext');

var _RouterContext2 = _interopRequireDefault(_RouterContext);

var _RouterUtils = require('../RouterUtils');

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
      push: _expect10['default'].createSpy(),
      replace: _expect10['default'].createSpy(),
      createHref: _expect10['default'].createSpy().andReturn(createHrefSentinel),
      go: _expect10['default'].createSpy(),
      goBack: _expect10['default'].createSpy(),
      goForward: _expect10['default'].createSpy()
    };
    transitionManager = {
      listenBeforeLeavingRoute: _expect10['default'].createSpy().andReturn(listenBeforeLeavingRouteSentinel),
      isActive: _expect10['default'].createSpy().andReturn(isActiveSentinel)
    };

    router = _RouterUtils.createRouterObject(history, transitionManager);

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
    })(_react2['default'].Component);

    Component.contextTypes = {
      router: _react2['default'].PropTypes.object.isRequired
    };

    routes = { path: '/', component: Component };
  });

  afterEach(function () {
    return _reactDom.unmountComponentAtNode(node);
  });

  function renderTest(done) {
    _match2['default']({ location: '/', routes: routes }, function (err, redirect, renderProps) {
      _reactDom.render(_react2['default'].createElement(_RouterContext2['default'], _extends({}, renderProps, { history: history, router: router })), node);
      done();
    });
  }

  describe('2.0', function () {
    it('exports only `router` to context');
  });

  it('exports a `router` object to routing context', function (done) {
    renderTest(function () {
      _expect10['default'](context.router).toExist();
      done();
    });
  });

  describe('some weird tests that test implementation and should probably go away', function () {
    it('proxies calls to `push` to `props.history`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router, _expect;

        (_context$router = context.router).push.apply(_context$router, args);
        (_expect = _expect10['default'](history.push)).toHaveBeenCalledWith.apply(_expect, args);
        done();
      });
    });

    it('proxies calls to `replace` to `props.history`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router2, _expect2;

        (_context$router2 = context.router).replace.apply(_context$router2, args);
        (_expect2 = _expect10['default'](history.replace)).toHaveBeenCalledWith.apply(_expect2, args);
        done();
      });
    });

    it('proxies calls to `setRouteLeaveHook` to `props.transitionManager`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router3, _expect3;

        var remove = (_context$router3 = context.router).setRouteLeaveHook.apply(_context$router3, args);
        (_expect3 = _expect10['default'](transitionManager.listenBeforeLeavingRoute)).toHaveBeenCalledWith.apply(_expect3, args);
        _expect10['default'](remove).toBe(listenBeforeLeavingRouteSentinel);
        done();
      });
    });

    it('proxies calls to `isActive` to `props.transitionManager`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router4, _expect4;

        var isActive = (_context$router4 = context.router).isActive.apply(_context$router4, args);
        (_expect4 = _expect10['default'](transitionManager.isActive)).toHaveBeenCalledWith.apply(_expect4, args);
        _expect10['default'](isActive).toBe(isActiveSentinel);
        done();
      });
    });

    it('proxies calls to `createHref` to `props.history`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router5, _expect5;

        var href = (_context$router5 = context.router).createHref.apply(_context$router5, args);
        (_expect5 = _expect10['default'](history.createHref)).toHaveBeenCalledWith.apply(_expect5, args);
        _expect10['default'](href).toBe(createHrefSentinel);
        done();
      });
    });

    it('proxies calls to `go` to `props.history`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router6, _expect6;

        (_context$router6 = context.router).go.apply(_context$router6, args);
        (_expect6 = _expect10['default'](history.go)).toHaveBeenCalledWith.apply(_expect6, args);
        done();
      });
    });

    it('proxies calls to `goBack` to `props.history`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router7, _expect7;

        (_context$router7 = context.router).goBack.apply(_context$router7, args);
        (_expect7 = _expect10['default'](history.goBack)).toHaveBeenCalledWith.apply(_expect7, args);
        done();
      });
    });

    it('proxies calls to `goForward` to `props.history`', function (done) {
      var args = [1, 2, 3];
      renderTest(function () {
        var _context$router8, _expect8;

        (_context$router8 = context.router).goForward.apply(_context$router8, args);
        (_expect8 = _expect10['default'](history.goForward)).toHaveBeenCalledWith.apply(_expect8, args);
        done();
      });
    });
  });
});