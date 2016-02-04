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

var _createMemoryHistory = require('../createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _execSteps = require('./execSteps');

var _execSteps2 = _interopRequireDefault(_execSteps);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

var _Link = require('../Link');

var _Link2 = _interopRequireDefault(_Link);

var click = _reactAddonsTestUtils.Simulate.click;

describe('A <Link>', function () {
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

  var Goodbye = (function (_Component2) {
    _inherits(Goodbye, _Component2);

    function Goodbye() {
      _classCallCheck(this, Goodbye);

      _Component2.apply(this, arguments);
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

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  it('knows how to make its href', function () {
    var LinkWrapper = (function (_Component3) {
      _inherits(LinkWrapper, _Component3);

      function LinkWrapper() {
        _classCallCheck(this, LinkWrapper);

        _Component3.apply(this, arguments);
      }

      LinkWrapper.prototype.render = function render() {
        return _react2['default'].createElement(
          _Link2['default'],
          { to: {
              pathname: '/hello/michael',
              query: { the: 'query' },
              hash: '#the-hash'
            } },
          'Link'
        );
      };

      return LinkWrapper;
    })(_react.Component);

    _reactDom.render(_react2['default'].createElement(
      _Router2['default'],
      { history: _createMemoryHistory2['default']('/') },
      _react2['default'].createElement(_Route2['default'], { path: '/', component: LinkWrapper })
    ), node, function () {
      var a = node.querySelector('a');
      _expect2['default'](a.getAttribute('href')).toEqual('/hello/michael?the=query#the-hash');
    });
  });

  // This test needs to be in its own file with beforeEach(resetHash).
  //
  //it('knows how to make its href with HashHistory', function () {
  //  class LinkWrapper extends Component {
  //    render() {
  //      return <Link to="/hello/michael" query={{the: 'query'}}>Link</Link>
  //    }
  //  }

  //  render((
  //    <Router history={new HashHistory}>
  //      <Route path="/" component={LinkWrapper} />
  //    </Router>
  //  ), node, function () {
  //    const a = node.querySelector('a')
  //    expect(a.getAttribute('href')).toEqual('#/hello/michael?the=query')
  //  })
  //})

  describe('with params', function () {
    var App = (function (_Component4) {
      _inherits(App, _Component4);

      function App() {
        _classCallCheck(this, App);

        _Component4.apply(this, arguments);
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
              to: { pathname: '/hello/ryan', query: { the: 'query' } },
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
        { history: _createMemoryHistory2['default']('/hello/michael') },
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
        { history: _createMemoryHistory2['default']('/hello/michael') },
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
        { history: _createMemoryHistory2['default']('/hello/ryan?the=query') },
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
        { history: _createMemoryHistory2['default']('/hello/ryan?the=other+query') },
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

  describe('when its route is active and className is empty', function () {
    it("it shouldn't have an active class", function (done) {
      var LinkWrapper = (function (_Component5) {
        _inherits(LinkWrapper, _Component5);

        function LinkWrapper() {
          _classCallCheck(this, LinkWrapper);

          _Component5.apply(this, arguments);
        }

        LinkWrapper.prototype.render = function render() {
          return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
              _Link2['default'],
              { to: '/hello', className: 'dontKillMe', activeClassName: '' },
              'Link'
            ),
            this.props.children
          );
        };

        return LinkWrapper;
      })(_react.Component);

      var history = _createMemoryHistory2['default']('/goodbye');

      var a = undefined;
      var steps = [function () {
        a = node.querySelector('a');
        _expect2['default'](a.className).toEqual('dontKillMe');
        history.push('/hello');
      }, function () {
        _expect2['default'](a.className).toEqual('dontKillMe');
      }];

      var execNextStep = _execSteps2['default'](steps, done);

      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: history, onUpdate: execNextStep },
        _react2['default'].createElement(
          _Route2['default'],
          { path: '/', component: LinkWrapper },
          _react2['default'].createElement(_Route2['default'], { path: 'goodbye', component: Goodbye }),
          _react2['default'].createElement(_Route2['default'], { path: 'hello', component: Hello })
        )
      ), node, execNextStep);
    });
  });

  describe('when its route is active', function () {
    it('has its activeClassName', function (done) {
      var LinkWrapper = (function (_Component6) {
        _inherits(LinkWrapper, _Component6);

        function LinkWrapper() {
          _classCallCheck(this, LinkWrapper);

          _Component6.apply(this, arguments);
        }

        LinkWrapper.prototype.render = function render() {
          return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
              _Link2['default'],
              { to: '/hello', className: 'dontKillMe', activeClassName: 'highlight' },
              'Link'
            ),
            this.props.children
          );
        };

        return LinkWrapper;
      })(_react.Component);

      var a = undefined;
      var history = _createMemoryHistory2['default']('/goodbye');
      var steps = [function () {
        a = node.querySelector('a');
        _expect2['default'](a.className).toEqual('dontKillMe');
        history.push('/hello');
      }, function () {
        _expect2['default'](a.className).toEqual('dontKillMe highlight');
      }];

      var execNextStep = _execSteps2['default'](steps, done);

      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: history, onUpdate: execNextStep },
        _react2['default'].createElement(
          _Route2['default'],
          { path: '/', component: LinkWrapper },
          _react2['default'].createElement(_Route2['default'], { path: 'goodbye', component: Goodbye }),
          _react2['default'].createElement(_Route2['default'], { path: 'hello', component: Hello })
        )
      ), node, execNextStep);
    });

    it('has its activeStyle', function (done) {
      var LinkWrapper = (function (_Component7) {
        _inherits(LinkWrapper, _Component7);

        function LinkWrapper() {
          _classCallCheck(this, LinkWrapper);

          _Component7.apply(this, arguments);
        }

        LinkWrapper.prototype.render = function render() {
          return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
              _Link2['default'],
              { to: '/hello', style: { color: 'white' }, activeStyle: { color: 'red' } },
              'Link'
            ),
            this.props.children
          );
        };

        return LinkWrapper;
      })(_react.Component);

      var a = undefined;
      var history = _createMemoryHistory2['default']('/goodbye');
      var steps = [function () {
        a = node.querySelector('a');
        _expect2['default'](a.style.color).toEqual('white');
        history.push('/hello');
      }, function () {
        _expect2['default'](a.style.color).toEqual('red');
      }];

      var execNextStep = _execSteps2['default'](steps, done);

      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: history, onUpdate: execNextStep },
        _react2['default'].createElement(
          _Route2['default'],
          { path: '/', component: LinkWrapper },
          _react2['default'].createElement(_Route2['default'], { path: 'hello', component: Hello }),
          _react2['default'].createElement(_Route2['default'], { path: 'goodbye', component: Goodbye })
        )
      ), node, execNextStep);
    });
  });

  describe('when route changes', function () {
    it('changes active state', function (done) {
      var LinkWrapper = (function (_Component8) {
        _inherits(LinkWrapper, _Component8);

        function LinkWrapper() {
          _classCallCheck(this, LinkWrapper);

          _Component8.apply(this, arguments);
        }

        LinkWrapper.prototype.render = function render() {
          return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
              _Link2['default'],
              { to: '/hello', activeClassName: 'active' },
              'Link'
            ),
            this.props.children
          );
        };

        return LinkWrapper;
      })(_react.Component);

      var a = undefined;
      var history = _createMemoryHistory2['default']('/goodbye');
      var steps = [function () {
        a = node.querySelector('a');
        _expect2['default'](a.className).toEqual('');
        history.push('/hello');
      }, function () {
        _expect2['default'](a.className).toEqual('active');
      }];

      var execNextStep = _execSteps2['default'](steps, done);

      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: history, onUpdate: execNextStep },
        _react2['default'].createElement(
          _Route2['default'],
          { path: '/', component: LinkWrapper },
          _react2['default'].createElement(_Route2['default'], { path: 'goodbye', component: Goodbye }),
          _react2['default'].createElement(_Route2['default'], { path: 'hello', component: Hello })
        )
      ), node, execNextStep);
    });
  });

  describe('when clicked', function () {
    it('calls a user defined click handler', function (done) {
      var LinkWrapper = (function (_Component9) {
        _inherits(LinkWrapper, _Component9);

        function LinkWrapper() {
          _classCallCheck(this, LinkWrapper);

          _Component9.apply(this, arguments);
        }

        LinkWrapper.prototype.handleClick = function handleClick(event) {
          event.preventDefault();
          done();
        };

        LinkWrapper.prototype.render = function render() {
          var _this = this;

          return _react2['default'].createElement(
            _Link2['default'],
            { to: '/hello', onClick: function (e) {
                return _this.handleClick(e);
              } },
            'Link'
          );
        };

        return LinkWrapper;
      })(_react.Component);

      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: _createMemoryHistory2['default']('/') },
        _react2['default'].createElement(_Route2['default'], { path: '/', component: LinkWrapper }),
        _react2['default'].createElement(_Route2['default'], { path: '/hello', component: Hello })
      ), node, function () {
        click(node.querySelector('a'));
      });
    });

    it('transitions to the correct route for string', function (done) {
      var LinkWrapper = (function (_Component10) {
        _inherits(LinkWrapper, _Component10);

        function LinkWrapper() {
          _classCallCheck(this, LinkWrapper);

          _Component10.apply(this, arguments);
        }

        LinkWrapper.prototype.render = function render() {
          return _react2['default'].createElement(
            _Link2['default'],
            { to: '/hello?the=query#hash' },
            'Link'
          );
        };

        return LinkWrapper;
      })(_react.Component);

      var history = _createMemoryHistory2['default']('/');
      var spy = _expect.spyOn(history, 'push').andCallThrough();

      var steps = [function () {
        click(node.querySelector('a'), { button: 0 });
      }, function () {
        _expect2['default'](node.innerHTML).toMatch(/Hello/);
        _expect2['default'](spy).toHaveBeenCalled();

        var location = this.state.location;

        _expect2['default'](location.pathname).toEqual('/hello');
        _expect2['default'](location.search).toEqual('?the=query');
        _expect2['default'](location.hash).toEqual('#hash');
      }];

      var execNextStep = _execSteps2['default'](steps, done);

      _reactDom.render(_react2['default'].createElement(
        _Router2['default'],
        { history: history, onUpdate: execNextStep },
        _react2['default'].createElement(_Route2['default'], { path: '/', component: LinkWrapper }),
        _react2['default'].createElement(_Route2['default'], { path: '/hello', component: Hello })
      ), node, execNextStep);
    });

    it('transitions to the correct route for object', function (done) {
      var LinkWrapper = (function (_Component11) {
        _inherits(LinkWrapper, _Component11);

        function LinkWrapper() {
          _classCallCheck(this, LinkWrapper);

          _Component11.apply(this, arguments);
        }

        LinkWrapper.prototype.render = function render() {
          return _react2['default'].createElement(
            _Link2['default'],
            {
              to: {
                pathname: '/hello',
                query: { how: 'are' },
                hash: '#world',
                state: { you: 'doing?' }
              }
            },
            'Link'
          );
        };

        return LinkWrapper;
      })(_react.Component);

      var history = _createMemoryHistory2['default']('/');
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

    it('does not transition when onClick prevents default', function (done) {
      var LinkWrapper = (function (_Component12) {
        _inherits(LinkWrapper, _Component12);

        function LinkWrapper() {
          _classCallCheck(this, LinkWrapper);

          _Component12.apply(this, arguments);
        }

        LinkWrapper.prototype.render = function render() {
          return _react2['default'].createElement(
            _Link2['default'],
            { to: '/hello', onClick: function (e) {
                return e.preventDefault();
              } },
            'Link'
          );
        };

        return LinkWrapper;
      })(_react.Component);

      var history = _createMemoryHistory2['default']('/');
      var spy = _expect.spyOn(history, 'push').andCallThrough();

      var steps = [function () {
        click(node.querySelector('a'), { button: 0 });
      }, function () {
        _expect2['default'](node.innerHTML).toMatch(/Link/);
        _expect2['default'](spy).toNotHaveBeenCalled();
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
});