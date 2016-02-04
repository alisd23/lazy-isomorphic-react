'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import expect from 'expect';
import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from '../createMemoryHistory';
import Route from '../Route';
import Router from '../Router';

describe('Router', function () {
  var Parent = (function (_Component) {
    _inherits(Parent, _Component);

    function Parent() {
      _classCallCheck(this, Parent);

      _Component.apply(this, arguments);
    }

    Parent.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'parent ',
        this.props.children
      );
    };

    return Parent;
  })(Component);

  var Child = (function (_Component2) {
    _inherits(Child, _Component2);

    function Child() {
      _classCallCheck(this, Child);

      _Component2.apply(this, arguments);
    }

    Child.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'child'
      );
    };

    return Child;
  })(Component);

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    unmountComponentAtNode(node);
  });

  it('renders routes', function (done) {
    render(React.createElement(
      Router,
      { history: createHistory('/') },
      React.createElement(Route, { path: '/', component: Parent })
    ), node, function () {
      expect(node.textContent).toEqual('parent ');
      done();
    });
  });

  it('renders child routes when the parent does not have a path', function (done) {
    render(React.createElement(
      Router,
      { history: createHistory('/') },
      React.createElement(
        Route,
        { component: Parent },
        React.createElement(
          Route,
          { component: Parent },
          React.createElement(Route, { path: '/', component: Child })
        )
      )
    ), node, function () {
      expect(node.textContent).toEqual('parent parent child');
      done();
    });
  });

  it('renders nested children correctly', function (done) {
    render(React.createElement(
      Router,
      { history: createHistory('/hello') },
      React.createElement(
        Route,
        { component: Parent },
        React.createElement(Route, { path: 'hello', component: Child })
      )
    ), node, function () {
      expect(node.textContent).toMatch(/parent/);
      expect(node.textContent).toMatch(/child/);
      done();
    });
  });

  it("renders the child's component when it has no component", function (done) {
    render(React.createElement(
      Router,
      { history: createHistory('/hello') },
      React.createElement(
        Route,
        null,
        React.createElement(Route, { path: 'hello', component: Child })
      )
    ), node, function () {
      expect(node.textContent).toMatch(/child/);
      done();
    });
  });

  it('renders with a custom "createElement" prop', function (done) {
    var Wrapper = (function (_Component3) {
      _inherits(Wrapper, _Component3);

      function Wrapper() {
        _classCallCheck(this, Wrapper);

        _Component3.apply(this, arguments);
      }

      Wrapper.prototype.render = function render() {
        return React.createElement(this.props.component, { fromWrapper: 'wrapped' });
      };

      return Wrapper;
    })(Component);

    var Child = (function (_Component4) {
      _inherits(Child, _Component4);

      function Child() {
        _classCallCheck(this, Child);

        _Component4.apply(this, arguments);
      }

      Child.prototype.render = function render() {
        return React.createElement(
          'div',
          null,
          this.props.fromWrapper
        );
      };

      return Child;
    })(Component);

    render(React.createElement(
      Router,
      { history: createHistory('/'), createElement: function (x) {
          return React.createElement(Wrapper, { component: x });
        } },
      React.createElement(Route, { path: '/', component: Child })
    ), node, function () {
      expect(node.textContent).toEqual('wrapped');
      done();
    });
  });

  describe('with named components', function () {
    var Parent = (function (_Component5) {
      _inherits(Parent, _Component5);

      function Parent() {
        _classCallCheck(this, Parent);

        _Component5.apply(this, arguments);
      }

      Parent.prototype.render = function render() {
        return React.createElement(
          'div',
          null,
          this.props.sidebar,
          '-',
          this.props.content
        );
      };

      return Parent;
    })(Component);

    var Sidebar = (function (_Component6) {
      _inherits(Sidebar, _Component6);

      function Sidebar() {
        _classCallCheck(this, Sidebar);

        _Component6.apply(this, arguments);
      }

      Sidebar.prototype.render = function render() {
        return React.createElement(
          'div',
          null,
          'sidebar'
        );
      };

      return Sidebar;
    })(Component);

    var Content = (function (_Component7) {
      _inherits(Content, _Component7);

      function Content() {
        _classCallCheck(this, Content);

        _Component7.apply(this, arguments);
      }

      Content.prototype.render = function render() {
        return React.createElement(
          'div',
          null,
          'content'
        );
      };

      return Content;
    })(Component);

    var routes = undefined;

    beforeEach(function () {
      routes = React.createElement(
        Route,
        { component: Parent },
        React.createElement(Route, { path: '/', components: { sidebar: Sidebar, content: Content } })
      );
    });

    it('receives those components as props', function (done) {
      render(React.createElement(Router, { history: createHistory('/'), routes: routes }), node, function () {
        expect(node.textContent).toEqual('sidebar-content');
        done();
      });
    });

    it('sets the key on those components', function (done) {
      var components = {};
      function createElementSpy(Component, props) {
        if (props.key) {
          components[props.key] = Component;
        }

        return null;
      }

      render(React.createElement(Router, {
        history: createHistory('/'), routes: routes,
        createElement: createElementSpy
      }), node, function () {
        expect(components.sidebar).toBe(Sidebar);
        expect(components.content).toBe(Content);
        done();
      });
    });
  });

  describe('at a route with special characters', function () {
    it('does not double escape', function (done) {
      // https://github.com/rackt/react-router/issues/1574

      var MyComponent = (function (_Component8) {
        _inherits(MyComponent, _Component8);

        function MyComponent() {
          _classCallCheck(this, MyComponent);

          _Component8.apply(this, arguments);
        }

        MyComponent.prototype.render = function render() {
          return React.createElement(
            'div',
            null,
            this.props.params.someToken
          );
        };

        return MyComponent;
      })(Component);

      render(React.createElement(
        Router,
        { history: createHistory('/point/aaa%2Bbbb') },
        React.createElement(Route, { path: 'point/:someToken', component: MyComponent })
      ), node, function () {
        expect(node.textContent).toEqual('aaa+bbb');
        done();
      });
    });

    it('does not double escape when nested', function (done) {
      // https://github.com/rackt/react-router/issues/1574

      var MyWrapperComponent = (function (_Component9) {
        _inherits(MyWrapperComponent, _Component9);

        function MyWrapperComponent() {
          _classCallCheck(this, MyWrapperComponent);

          _Component9.apply(this, arguments);
        }

        MyWrapperComponent.prototype.render = function render() {
          return this.props.children;
        };

        return MyWrapperComponent;
      })(Component);

      var MyComponent = (function (_Component10) {
        _inherits(MyComponent, _Component10);

        function MyComponent() {
          _classCallCheck(this, MyComponent);

          _Component10.apply(this, arguments);
        }

        MyComponent.prototype.render = function render() {
          return React.createElement(
            'div',
            null,
            this.props.params.someToken
          );
        };

        return MyComponent;
      })(Component);

      render(React.createElement(
        Router,
        { history: createHistory('/point/aaa%2Bbbb') },
        React.createElement(
          Route,
          { component: MyWrapperComponent },
          React.createElement(Route, { path: 'point/:someToken', component: MyComponent })
        )
      ), node, function () {
        expect(node.textContent).toEqual('aaa+bbb');
        done();
      });
    });

    it('is happy to have colons in parameter values', function (done) {
      // https://github.com/rackt/react-router/issues/1759

      var MyComponent = (function (_Component11) {
        _inherits(MyComponent, _Component11);

        function MyComponent() {
          _classCallCheck(this, MyComponent);

          _Component11.apply(this, arguments);
        }

        MyComponent.prototype.render = function render() {
          return React.createElement(
            'div',
            null,
            this.props.params.foo
          );
        };

        return MyComponent;
      })(Component);

      render(React.createElement(
        Router,
        { history: createHistory('/ns/aaa:bbb/bar') },
        React.createElement(Route, { path: 'ns/:foo/bar', component: MyComponent })
      ), node, function () {
        expect(node.textContent).toEqual('aaa:bbb');
        done();
      });
    });

    it('handles % in parameters', function (done) {
      // https://github.com/rackt/react-router/issues/1766

      var MyComponent = (function (_Component12) {
        _inherits(MyComponent, _Component12);

        function MyComponent() {
          _classCallCheck(this, MyComponent);

          _Component12.apply(this, arguments);
        }

        MyComponent.prototype.render = function render() {
          return React.createElement(
            'div',
            null,
            this.props.params.name
          );
        };

        return MyComponent;
      })(Component);

      render(React.createElement(
        Router,
        { history: createHistory('/company/CADENCE%20DESIGN%20SYSTEM%20INC%20NOTE%202.625%25%2060') },
        React.createElement(Route, { path: '/company/:name', component: MyComponent })
      ), node, function () {
        expect(node.textContent).toEqual('CADENCE DESIGN SYSTEM INC NOTE 2.625% 60');
        done();
      });
    });

    it('handles forward slashes', function (done) {
      // https://github.com/rackt/react-router/issues/1865

      var Parent = (function (_Component13) {
        _inherits(Parent, _Component13);

        function Parent() {
          _classCallCheck(this, Parent);

          _Component13.apply(this, arguments);
        }

        Parent.prototype.render = function render() {
          return React.createElement(
            'div',
            null,
            this.props.children
          );
        };

        return Parent;
      })(Component);

      var Child = (function (_Component14) {
        _inherits(Child, _Component14);

        function Child() {
          _classCallCheck(this, Child);

          _Component14.apply(this, arguments);
        }

        Child.prototype.render = function render() {
          return React.createElement(
            'h1',
            null,
            this.props.params.name
          );
        };

        return Child;
      })(Component);

      render(React.createElement(
        Router,
        { history: createHistory('/apple%2Fbanana') },
        React.createElement(
          Route,
          { component: Parent },
          React.createElement(Route, { path: '/:name', component: Child })
        )
      ), node, function () {
        expect(node.textContent).toEqual('apple/banana');
        done();
      });
    });
  });

  describe('render prop', function () {
    it('renders with the render prop', function (done) {
      render(React.createElement(Router, {
        history: createHistory('/'),
        render: function () {
          return React.createElement(
            'div',
            null,
            'test'
          );
        },
        routes: { path: '/', component: Parent }
      }), node, function () {
        expect(node.textContent).toBe('test');
        done();
      });
    });

    it('passes router props to render prop', function (done) {
      var MyComponent = function MyComponent() {
        return React.createElement('div', null);
      };
      var route = { path: '/', component: MyComponent };

      var assertProps = function assertProps(props) {
        expect(props.routes).toEqual([route]);
        expect(props.components).toEqual([MyComponent]);
        expect(props.foo).toBe('bar');
        expect(props.render).toNotExist();
        done();
        return React.createElement('div', null);
      };

      render(React.createElement(Router, {
        history: createHistory('/'),
        routes: route,
        render: assertProps,
        foo: 'bar'
      }), node);
    });
  });

  describe('async components', function () {
    var componentSpy = undefined,
        renderSpy = undefined;

    beforeEach(function () {
      componentSpy = expect.createSpy();

      renderSpy = function (_ref) {
        var components = _ref.components;

        componentSpy(components);
        return React.createElement('div', null);
      };
    });

    it('should support getComponent', function (done) {
      var Component = function Component() {
        return React.createElement('div', null);
      };
      var getComponent = function getComponent(_, callback) {
        setTimeout(function () {
          return callback(null, Component);
        });
      };

      render(React.createElement(
        Router,
        { history: createHistory('/'), render: renderSpy },
        React.createElement(Route, { path: '/', getComponent: getComponent })
      ), node, function () {
        setTimeout(function () {
          expect(componentSpy).toHaveBeenCalledWith([Component]);
          done();
        });
      });
    });

    it('should support getComponents', function (done) {
      var foo = function foo() {
        return React.createElement('div', null);
      };
      var bar = function bar() {
        return React.createElement('div', null);
      };

      var getComponents = function getComponents(_, callback) {
        setTimeout(function () {
          return callback(null, { foo: foo, bar: bar });
        });
      };

      render(React.createElement(
        Router,
        { history: createHistory('/'), render: renderSpy },
        React.createElement(Route, { path: '/', getComponents: getComponents })
      ), node, function () {
        setTimeout(function () {
          expect(componentSpy).toHaveBeenCalledWith([{ foo: foo, bar: bar }]);
          done();
        });
      });
    });
  });

  describe('error handling', function () {
    var error = undefined,
        getComponent = undefined;

    beforeEach(function () {
      error = new Error('error fixture');
      getComponent = function (_, callback) {
        return callback(error);
      };
    });

    it('should work with onError', function (done) {
      var errorSpy = expect.createSpy();

      render(React.createElement(
        Router,
        { history: createHistory('/'), onError: errorSpy },
        React.createElement(Route, { path: '/', getComponent: getComponent })
      ), node, function () {
        expect(errorSpy).toHaveBeenCalledWith(error);
        done();
      });
    });

    it('should throw without onError', function () {
      expect(function () {
        render(React.createElement(
          Router,
          { history: createHistory('/') },
          React.createElement(Route, { path: '/', getComponent: getComponent })
        ), node);
      }).toThrow('error fixture');
    });
  });
});