'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactDom = require('react-dom');

var _execSteps = require('./execSteps');

var _execSteps2 = _interopRequireDefault(_execSteps);

var _historyLibCreateMemoryHistory = require('history/lib/createMemoryHistory');

var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

var _Link = require('../Link');

var _Link2 = _interopRequireDefault(_Link);

var click = _reactAddonsTestUtils.Simulate.click;

describe('v1 Link', function () {
  var Hello = (function (_Component) {
    _inherits(Hello, _Component);

    function Hello() {
      _classCallCheck(this, Hello);

      _Component.apply(this, arguments);
    }

    Hello.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        null,
        'Hello ',
        this.props.params.name,
        '!'
      );
    };

    return Hello;
  })(_react.Component);

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
        return _react2['default'].createElement(
          _Link2['default'],
          { to: '/hello/michael', query: { the: 'query' }, hash: '#the-hash' },
          'Link'
        );
      };

      return LinkWrapper;
    })(_react.Component);

    _reactDom.render(_react2['default'].createElement(
      _Router2['default'],
      { history: _historyLibCreateMemoryHistory2['default']('/') },
      _react2['default'].createElement(_Route2['default'], { path: '/', component: LinkWrapper })
    ), node, function () {
      var a = node.querySelector('a');
      _expect2['default'](a.getAttribute('href')).toEqual('/hello/michael?the=query#the-hash');
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
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            _Link2['default'],
            {
              to: '/hello/michael',
              activeClassName: 'active'
            },
            'Michael'
          ),
          _react2['default'].createElement(
            _Link2['default'],
            {
              to: 'hello/ryan', query: { the: 'query' },
              activeClassName: 'active'
            },
            'Ryan'
          )
        );
      };

      return App;
    })(_react.Component);

    it('is active when its params match', function (done) {
      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: _historyLibCreateMemoryHistory2['default']('/hello/michael') },
        _react2['default'].createElement(
          _Route2['default'],
          { path: '/', component: App },
          _react2['default'].createElement(_Route2['default'], { path: 'hello/:name', component: Hello })
        )
      ), node, function () {
        var a = node.querySelectorAll('a')[0];
        _expect2['default'](a.className.trim()).toEqual('active');
        done();
      });
    });

    it('is not active when its params do not match', function (done) {
      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: _historyLibCreateMemoryHistory2['default']('/hello/michael') },
        _react2['default'].createElement(
          _Route2['default'],
          { path: '/', component: App },
          _react2['default'].createElement(_Route2['default'], { path: 'hello/:name', component: Hello })
        )
      ), node, function () {
        var a = node.querySelectorAll('a')[1];
        _expect2['default'](a.className.trim()).toEqual('');
        done();
      });
    });

    it('is active when its params and query match', function (done) {
      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: _historyLibCreateMemoryHistory2['default']('/hello/ryan?the=query') },
        _react2['default'].createElement(
          _Route2['default'],
          { path: '/', component: App },
          _react2['default'].createElement(_Route2['default'], { path: 'hello/:name', component: Hello })
        )
      ), node, function () {
        var a = node.querySelectorAll('a')[1];
        _expect2['default'](a.className.trim()).toEqual('active');
        done();
      });
    });

    it('is not active when its query does not match', function (done) {
      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: _historyLibCreateMemoryHistory2['default']('/hello/ryan?the=other+query') },
        _react2['default'].createElement(
          _Route2['default'],
          { path: '/', component: App },
          _react2['default'].createElement(_Route2['default'], { path: 'hello/:name', component: Hello })
        )
      ), node, function () {
        var a = node.querySelectorAll('a')[1];
        _expect2['default'](a.className.trim()).toEqual('');
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

        return _react2['default'].createElement(
          _Link2['default'],
          { to: '/hello', hash: '#world', query: { how: 'are' }, state: { you: 'doing?' }, onClick: function (e) {
              return _this.handleClick(e);
            } },
          'Link'
        );
      };

      return LinkWrapper;
    })(_react.Component);

    var history = _historyLibCreateMemoryHistory2['default']('/');
    var spy = _expect.spyOn(history, 'push').andCallThrough();

    var steps = [function () {
      click(node.querySelector('a'), { button: 0 });
    }, function () {
      _expect2['default'](node.innerHTML).toMatch(/Hello/);
      _expect2['default'](spy).toHaveBeenCalled();

      var location = this.state.location;

      _expect2['default'](location.pathname).toEqual('/hello');
      _expect2['default'](location.search).toEqual('?how=are');
      _expect2['default'](location.hash).toEqual('#world');
      _expect2['default'](location.state).toEqual({ you: 'doing?' });
    }];

    var execNextStep = _execSteps2['default'](steps, done);

    _reactDom.render(_react2['default'].createElement(
      _Router2['default'],
      { history: history, onUpdate: execNextStep },
      _react2['default'].createElement(_Route2['default'], { path: '/', component: LinkWrapper }),
      _react2['default'].createElement(_Route2['default'], { path: '/hello', component: Hello })
    ), node, execNextStep);
  });
});