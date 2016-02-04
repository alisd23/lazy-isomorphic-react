'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RouteUtils = require('../RouteUtils');

var _IndexRoute = require('../IndexRoute');

var _IndexRoute2 = _interopRequireDefault(_IndexRoute);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

describe('createRoutesFromReactChildren', function () {
  var Parent = (function (_Component) {
    _inherits(Parent, _Component);

    function Parent() {
      _classCallCheck(this, Parent);

      _Component.apply(this, arguments);
    }

    Parent.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'h1',
          null,
          'Parent'
        ),
        this.props.children
      );
    };

    return Parent;
  })(_react.Component);

  var Hello = (function (_Component2) {
    _inherits(Hello, _Component2);

    function Hello() {
      _classCallCheck(this, Hello);

      _Component2.apply(this, arguments);
    }

    Hello.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        null,
        'Hello'
      );
    };

    return Hello;
  })(_react.Component);

  var Goodbye = (function (_Component3) {
    _inherits(Goodbye, _Component3);

    function Goodbye() {
      _classCallCheck(this, Goodbye);

      _Component3.apply(this, arguments);
    }

    Goodbye.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        null,
        'Goodbye'
      );
    };

    return Goodbye;
  })(_react.Component);

  it('works with index routes', function () {
    var routes = _RouteUtils.createRoutesFromReactChildren(_react2['default'].createElement(
      _Route2['default'],
      { path: '/', component: Parent },
      _react2['default'].createElement(_IndexRoute2['default'], { component: Hello })
    ));

    _expect2['default'](routes).toEqual([{
      path: '/',
      component: Parent,
      indexRoute: {
        component: Hello
      }
    }]);
  });

  it('works with nested routes', function () {
    var routes = _RouteUtils.createRoutesFromReactChildren(_react2['default'].createElement(
      _Route2['default'],
      { component: Parent },
      _react2['default'].createElement(_Route2['default'], { path: 'home', components: { hello: Hello, goodbye: Goodbye } })
    ));

    _expect2['default'](routes).toEqual([{
      component: Parent,
      childRoutes: [{
        path: 'home',
        components: { hello: Hello, goodbye: Goodbye }
      }]
    }]);
  });

  it('works with falsy children', function () {
    var routes = _RouteUtils.createRoutesFromReactChildren([_react2['default'].createElement(_Route2['default'], { path: '/one', component: Parent }), null, _react2['default'].createElement(_Route2['default'], { path: '/two', component: Parent }), undefined]);

    _expect2['default'](routes).toEqual([{
      path: '/one',
      component: Parent
    }, {
      path: '/two',
      component: Parent
    }]);
  });

  it('works with comments', function () {
    var routes = _RouteUtils.createRoutesFromReactChildren(_react2['default'].createElement(
      _Route2['default'],
      { path: '/one', component: Parent },
      '// This is a comment.',
      _react2['default'].createElement(_Route2['default'], { path: '/two', component: Hello })
    ));

    _expect2['default'](routes).toEqual([{
      path: '/one',
      component: Parent,
      childRoutes: [{
        path: '/two',
        component: Hello
      }]
    }]);
  });
});