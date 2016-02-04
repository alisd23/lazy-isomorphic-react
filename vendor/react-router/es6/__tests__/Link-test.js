'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import expect, { spyOn } from 'expect';
import React, { Component } from 'react';
import { Simulate } from 'react-addons-test-utils';
import { render } from 'react-dom';
import createHistory from '../createMemoryHistory';
import execSteps from './execSteps';
import Router from '../Router';
import Route from '../Route';
import Link from '../Link';

var click = Simulate.click;

describe('A <Link>', function () {
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

  var Goodbye = (function (_Component2) {
    _inherits(Goodbye, _Component2);

    function Goodbye() {
      _classCallCheck(this, Goodbye);

      _Component2.apply(this, arguments);
    }

    Goodbye.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'Goodbye'
      );
    };

    return Goodbye;
  })(Component);

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
        return React.createElement(
          Link,
          { to: {
              pathname: '/hello/michael',
              query: { the: 'query' },
              hash: '#the-hash'
            } },
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
              to: { pathname: '/hello/ryan', query: { the: 'query' } },
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

  describe('when its route is active and className is empty', function () {
    it("it shouldn't have an active class", function (done) {
      var LinkWrapper = (function (_Component5) {
        _inherits(LinkWrapper, _Component5);

        function LinkWrapper() {
          _classCallCheck(this, LinkWrapper);

          _Component5.apply(this, arguments);
        }

        LinkWrapper.prototype.render = function render() {
          return React.createElement(
            'div',
            null,
            React.createElement(
              Link,
              { to: '/hello', className: 'dontKillMe', activeClassName: '' },
              'Link'
            ),
            this.props.children
          );
        };

        return LinkWrapper;
      })(Component);

      var history = createHistory('/goodbye');

      var a = undefined;
      var steps = [function () {
        a = node.querySelector('a');
        expect(a.className).toEqual('dontKillMe');
        history.push('/hello');
      }, function () {
        expect(a.className).toEqual('dontKillMe');
      }];

      var execNextStep = execSteps(steps, done);

      render(React.createElement(
        Router,
        { history: history, onUpdate: execNextStep },
        React.createElement(
          Route,
          { path: '/', component: LinkWrapper },
          React.createElement(Route, { path: 'goodbye', component: Goodbye }),
          React.createElement(Route, { path: 'hello', component: Hello })
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
          return React.createElement(
            'div',
            null,
            React.createElement(
              Link,
              { to: '/hello', className: 'dontKillMe', activeClassName: 'highlight' },
              'Link'
            ),
            this.props.children
          );
        };

        return LinkWrapper;
      })(Component);

      var a = undefined;
      var history = createHistory('/goodbye');
      var steps = [function () {
        a = node.querySelector('a');
        expect(a.className).toEqual('dontKillMe');
        history.push('/hello');
      }, function () {
        expect(a.className).toEqual('dontKillMe highlight');
      }];

      var execNextStep = execSteps(steps, done);

      render(React.createElement(
        Router,
        { history: history, onUpdate: execNextStep },
        React.createElement(
          Route,
          { path: '/', component: LinkWrapper },
          React.createElement(Route, { path: 'goodbye', component: Goodbye }),
          React.createElement(Route, { path: 'hello', component: Hello })
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
          return React.createElement(
            'div',
            null,
            React.createElement(
              Link,
              { to: '/hello', style: { color: 'white' }, activeStyle: { color: 'red' } },
              'Link'
            ),
            this.props.children
          );
        };

        return LinkWrapper;
      })(Component);

      var a = undefined;
      var history = createHistory('/goodbye');
      var steps = [function () {
        a = node.querySelector('a');
        expect(a.style.color).toEqual('white');
        history.push('/hello');
      }, function () {
        expect(a.style.color).toEqual('red');
      }];

      var execNextStep = execSteps(steps, done);

      render(React.createElement(
        Router,
        { history: history, onUpdate: execNextStep },
        React.createElement(
          Route,
          { path: '/', component: LinkWrapper },
          React.createElement(Route, { path: 'hello', component: Hello }),
          React.createElement(Route, { path: 'goodbye', component: Goodbye })
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
          return React.createElement(
            'div',
            null,
            React.createElement(
              Link,
              { to: '/hello', activeClassName: 'active' },
              'Link'
            ),
            this.props.children
          );
        };

        return LinkWrapper;
      })(Component);

      var a = undefined;
      var history = createHistory('/goodbye');
      var steps = [function () {
        a = node.querySelector('a');
        expect(a.className).toEqual('');
        history.push('/hello');
      }, function () {
        expect(a.className).toEqual('active');
      }];

      var execNextStep = execSteps(steps, done);

      render(React.createElement(
        Router,
        { history: history, onUpdate: execNextStep },
        React.createElement(
          Route,
          { path: '/', component: LinkWrapper },
          React.createElement(Route, { path: 'goodbye', component: Goodbye }),
          React.createElement(Route, { path: 'hello', component: Hello })
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

          return React.createElement(
            Link,
            { to: '/hello', onClick: function (e) {
                return _this.handleClick(e);
              } },
            'Link'
          );
        };

        return LinkWrapper;
      })(Component);

      render(React.createElement(
        Router,
        { history: createHistory('/') },
        React.createElement(Route, { path: '/', component: LinkWrapper }),
        React.createElement(Route, { path: '/hello', component: Hello })
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
          return React.createElement(
            Link,
            { to: '/hello?the=query#hash' },
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
        expect(location.search).toEqual('?the=query');
        expect(location.hash).toEqual('#hash');
      }];

      var execNextStep = execSteps(steps, done);

      render(React.createElement(
        Router,
        { history: history, onUpdate: execNextStep },
        React.createElement(Route, { path: '/', component: LinkWrapper }),
        React.createElement(Route, { path: '/hello', component: Hello })
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
          return React.createElement(
            Link,
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

    it('does not transition when onClick prevents default', function (done) {
      var LinkWrapper = (function (_Component12) {
        _inherits(LinkWrapper, _Component12);

        function LinkWrapper() {
          _classCallCheck(this, LinkWrapper);

          _Component12.apply(this, arguments);
        }

        LinkWrapper.prototype.render = function render() {
          return React.createElement(
            Link,
            { to: '/hello', onClick: function (e) {
                return e.preventDefault();
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
        expect(node.innerHTML).toMatch(/Link/);
        expect(spy).toNotHaveBeenCalled();
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
});