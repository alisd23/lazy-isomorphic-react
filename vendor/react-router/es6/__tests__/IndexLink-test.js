'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import expect from 'expect';
import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from '../createMemoryHistory';
import IndexRoute from '../IndexRoute';
import IndexLink from '../IndexLink';
import Router from '../Router';
import Route from '../Route';
import Link from '../Link';

describe('An <IndexLink>', function () {
  var App = (function (_Component) {
    _inherits(App, _Component);

    function App() {
      _classCallCheck(this, App);

      _Component.apply(this, arguments);
    }

    App.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'ul',
          null,
          React.createElement(
            'li',
            null,
            React.createElement(
              IndexLink,
              { id: 'rootLink', to: '/', activeClassName: 'active' },
              'root'
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              IndexLink,
              { id: 'overviewLink', to: '/website', activeClassName: 'active' },
              'overview'
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              Link,
              { id: 'contactLink', to: '/website/contact', activeClassName: 'active' },
              'contact'
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              Link,
              { id: 'productsLink', to: '/website/products', activeClassName: 'active' },
              'products'
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              IndexLink,
              { id: 'productsIndexLink', to: '/website/products', activeClassName: 'active' },
              'products index'
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              Link,
              { id: 'specificProductLink', to: '/website/products/15', activeClassName: 'active' },
              'specific product'
            )
          )
        ),
        this.props.children
      );
    };

    return App;
  })(Component);

  var RootWrapper = (function (_Component2) {
    _inherits(RootWrapper, _Component2);

    function RootWrapper() {
      _classCallCheck(this, RootWrapper);

      _Component2.apply(this, arguments);
    }

    RootWrapper.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'root wrapper ',
        this.props.children
      );
    };

    return RootWrapper;
  })(Component);

  var RootPage = (function (_Component3) {
    _inherits(RootPage, _Component3);

    function RootPage() {
      _classCallCheck(this, RootPage);

      _Component3.apply(this, arguments);
    }

    RootPage.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'website root'
      );
    };

    return RootPage;
  })(Component);

  var Wrapper = (function (_Component4) {
    _inherits(Wrapper, _Component4);

    function Wrapper() {
      _classCallCheck(this, Wrapper);

      _Component4.apply(this, arguments);
    }

    Wrapper.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'website wrapper ',
        this.props.children
      );
    };

    return Wrapper;
  })(Component);

  var IndexPage = (function (_Component5) {
    _inherits(IndexPage, _Component5);

    function IndexPage() {
      _classCallCheck(this, IndexPage);

      _Component5.apply(this, arguments);
    }

    IndexPage.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'website overview'
      );
    };

    return IndexPage;
  })(Component);

  var ContactPage = (function (_Component6) {
    _inherits(ContactPage, _Component6);

    function ContactPage() {
      _classCallCheck(this, ContactPage);

      _Component6.apply(this, arguments);
    }

    ContactPage.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'contact page'
      );
    };

    return ContactPage;
  })(Component);

  var ProductsPage = (function (_Component7) {
    _inherits(ProductsPage, _Component7);

    function ProductsPage() {
      _classCallCheck(this, ProductsPage);

      _Component7.apply(this, arguments);
    }

    ProductsPage.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'website products ',
        this.props.children
      );
    };

    return ProductsPage;
  })(Component);

  var ProductPage = (function (_Component8) {
    _inherits(ProductPage, _Component8);

    function ProductPage() {
      _classCallCheck(this, ProductPage);

      _Component8.apply(this, arguments);
    }

    ProductPage.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'specific product ',
        this.props.params.productId
      );
    };

    return ProductPage;
  })(Component);

  var ProductsIndexPage = (function (_Component9) {
    _inherits(ProductsIndexPage, _Component9);

    function ProductsIndexPage() {
      _classCallCheck(this, ProductsIndexPage);

      _Component9.apply(this, arguments);
    }

    ProductsIndexPage.prototype.render = function render() {
      return React.createElement(
        'div',
        null,
        'list of products'
      );
    };

    return ProductsIndexPage;
  })(Component);

  var routes = React.createElement(
    Route,
    { component: App },
    React.createElement(
      Route,
      { path: '/', component: RootWrapper },
      React.createElement(IndexRoute, { component: RootPage }),
      React.createElement(
        Route,
        { path: 'website', component: Wrapper },
        React.createElement(
          Route,
          { path: 'products', component: ProductsPage },
          React.createElement(Route, { path: ':productId', component: ProductPage }),
          React.createElement(IndexRoute, { component: ProductsIndexPage })
        ),
        React.createElement(Route, { path: 'contact', component: ContactPage }),
        React.createElement(IndexRoute, { component: IndexPage })
      )
    )
  );

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    unmountComponentAtNode(node);
  });

  describe('when linking to the root', function () {
    it('is active and other routes are not', function (done) {
      render(React.createElement(Router, { history: createHistory('/'), routes: routes }), node, function () {
        expect(node.querySelector('#rootLink').className).toEqual('active');
        expect(node.querySelector('#overviewLink').className).toEqual('');
        expect(node.querySelector('#contactLink').className).toEqual('');
        expect(node.querySelector('#productsLink').className).toEqual('');
        expect(node.querySelector('#productsIndexLink').className).toEqual('');
        expect(node.querySelector('#specificProductLink').className).toEqual('');
        done();
      });
    });
  });

  describe('when linking to the overview', function () {
    it('is active and other routes are not', function (done) {
      render(React.createElement(Router, { history: createHistory('/website'), routes: routes }), node, function () {
        expect(node.querySelector('#rootLink').className).toEqual('');
        expect(node.querySelector('#overviewLink').className).toEqual('active');
        expect(node.querySelector('#contactLink').className).toEqual('');
        expect(node.querySelector('#productsLink').className).toEqual('');
        expect(node.querySelector('#productsIndexLink').className).toEqual('');
        expect(node.querySelector('#specificProductLink').className).toEqual('');
        done();
      });
    });
  });

  describe('when linking to the contact', function () {
    it('is active and other routes are not', function (done) {
      render(React.createElement(Router, { history: createHistory('/website/contact'), routes: routes }), node, function () {
        expect(node.querySelector('#rootLink').className).toEqual('');
        expect(node.querySelector('#overviewLink').className).toEqual('');
        expect(node.querySelector('#contactLink').className).toEqual('active');
        expect(node.querySelector('#productsLink').className).toEqual('');
        expect(node.querySelector('#productsIndexLink').className).toEqual('');
        expect(node.querySelector('#specificProductLink').className).toEqual('');
        done();
      });
    });
  });

  describe('when linking to the products', function () {
    it('is active and other routes are not', function (done) {
      render(React.createElement(Router, { history: createHistory('/website/products'), routes: routes }), node, function () {
        expect(node.querySelector('#rootLink').className).toEqual('');
        expect(node.querySelector('#overviewLink').className).toEqual('');
        expect(node.querySelector('#contactLink').className).toEqual('');
        expect(node.querySelector('#productsLink').className).toEqual('active');
        expect(node.querySelector('#productsIndexLink').className).toEqual('active');
        expect(node.querySelector('#specificProductLink').className).toEqual('');
        done();
      });
    });
  });

  describe('when linking to a specific product', function () {
    it("is active and it's parent is also active", function (done) {
      render(React.createElement(Router, { history: createHistory('/website/products/15'), routes: routes }), node, function () {
        expect(node.querySelector('#rootLink').className).toEqual('');
        expect(node.querySelector('#overviewLink').className).toEqual('');
        expect(node.querySelector('#contactLink').className).toEqual('');
        expect(node.querySelector('#productsLink').className).toEqual('active');
        expect(node.querySelector('#productsIndexLink').className).toEqual('');
        expect(node.querySelector('#specificProductLink').className).toEqual('active');
        done();
      });
    });
  });
});