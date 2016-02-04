'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _createMemoryHistory = require('../createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _resetHash = require('./resetHash');

var _resetHash2 = _interopRequireDefault(_resetHash);

var _execSteps = require('./execSteps');

var _execSteps2 = _interopRequireDefault(_execSteps);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

describe('pushState', function () {
  var Index = (function (_Component) {
    _inherits(Index, _Component);

    function Index() {
      _classCallCheck(this, Index);

      _Component.apply(this, arguments);
    }

    Index.prototype.render = function render() {
      return _react2['default'].createElement(
        'h1',
        null,
        'Index'
      );
    };

    return Index;
  })(_react.Component);

  var Home = (function (_Component2) {
    _inherits(Home, _Component2);

    function Home() {
      _classCallCheck(this, Home);

      _Component2.apply(this, arguments);
    }

    Home.prototype.render = function render() {
      return _react2['default'].createElement(
        'h1',
        null,
        'Home'
      );
    };

    return Home;
  })(_react.Component);

  beforeEach(_resetHash2['default']);

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    _reactDom.unmountComponentAtNode(node);
  });

  describe('when the target path contains a colon', function () {
    it('works', function (done) {
      var history = _createMemoryHistory2['default']('/');
      var steps = [function () {
        _expect2['default'](this.state.location.pathname).toEqual('/');
        history.push('/home/hi:there');
      }, function () {
        _expect2['default'](this.state.location.pathname).toEqual('/home/hi:there');
      }];

      var execNextStep = _execSteps2['default'](steps, done);

      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: history, onUpdate: execNextStep },
        _react2['default'].createElement(_Route2['default'], { path: '/', component: Index }),
        _react2['default'].createElement(_Route2['default'], { path: '/home/hi:there', component: Home })
      ), node, execNextStep);
    });
  });
});