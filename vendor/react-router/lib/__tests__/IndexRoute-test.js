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

var _IndexRoute = require('../IndexRoute');

var _IndexRoute2 = _interopRequireDefault(_IndexRoute);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

describe('An <IndexRoute>', function () {
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
        'parent ',
        this.props.children
      );
    };

    return Parent;
  })(_react.Component);

  var Child = (function (_Component2) {
    _inherits(Child, _Component2);

    function Child() {
      _classCallCheck(this, Child);

      _Component2.apply(this, arguments);
    }

    Child.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        null,
        'child'
      );
    };

    return Child;
  })(_react.Component);

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    _reactDom.unmountComponentAtNode(node);
  });

  it("renders when its parent's URL matches exactly", function (done) {
    _reactDom.render(_react2['default'].createElement(
      _Router2['default'],
      { history: _createMemoryHistory2['default']('/') },
      _react2['default'].createElement(
        _Route2['default'],
        { path: '/', component: Parent },
        _react2['default'].createElement(_IndexRoute2['default'], { component: Child })
      )
    ), node, function () {
      _expect2['default'](node.textContent).toEqual('parent child');
      done();
    });
  });

  describe('nested deeply in the route hierarchy', function () {
    it("renders when its parent's URL matches exactly", function (done) {
      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: _createMemoryHistory2['default']('/test') },
        _react2['default'].createElement(
          _Route2['default'],
          { path: '/', component: Parent },
          _react2['default'].createElement(_IndexRoute2['default'], { component: Child }),
          _react2['default'].createElement(
            _Route2['default'],
            { path: '/test', component: Parent },
            _react2['default'].createElement(_IndexRoute2['default'], { component: Child })
          )
        )
      ), node, function () {
        _expect2['default'](node.textContent).toEqual('parent parent child');
        done();
      });
    });

    it('renders when its parents combined pathes match', function (done) {
      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: _createMemoryHistory2['default']('/path/test') },
        _react2['default'].createElement(
          _Route2['default'],
          { path: '/path', component: Parent },
          _react2['default'].createElement(_IndexRoute2['default'], { component: Child }),
          _react2['default'].createElement(
            _Route2['default'],
            { path: 'test', component: Parent },
            _react2['default'].createElement(_IndexRoute2['default'], { component: Child })
          )
        )
      ), node, function () {
        _expect2['default'](node.textContent).toEqual('parent parent child');
        done();
      });
    });

    it('renders when its parents combined pathes match, and its direct parent is path less', function (done) {
      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: _createMemoryHistory2['default']('/') },
        _react2['default'].createElement(
          _Route2['default'],
          { path: '/', component: Parent },
          _react2['default'].createElement(
            _Route2['default'],
            { component: Parent },
            _react2['default'].createElement(
              _Route2['default'],
              { component: Parent },
              _react2['default'].createElement(
                _Route2['default'],
                { component: Parent },
                _react2['default'].createElement(_Route2['default'], { path: 'deep', component: Parent }),
                _react2['default'].createElement(_IndexRoute2['default'], { component: Child })
              )
            )
          )
        )
      ), node, function () {
        _expect2['default'](node.textContent).toEqual('parent parent parent parent child');
        done();
      });
    });
  });
});