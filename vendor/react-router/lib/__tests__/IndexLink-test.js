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

var _IndexLink = require('../IndexLink');

var _IndexLink2 = _interopRequireDefault(_IndexLink);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

var _Link = require('../Link');

var _Link2 = _interopRequireDefault(_Link);

describe('An <IndexLink>', function () {
  var App = (function (_Component) {
    _inherits(App, _Component);

    function App() {
      _classCallCheck(this, App);

      _Component.apply(this, arguments);
    }

    App.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'ul',
          null,
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              _IndexLink2['default'],
              { id: 'rootLink', to: '/', activeClassName: 'active' },
              'root'
            )
          ),
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              _IndexLink2['default'],
              { id: 'overviewLink', to: '/website', activeClassName: 'active' },
              'overview'
            )
          ),
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              _Link2['default'],
              { id: 'contactLink', to: '/website/contact', activeClassName: 'active' },
              'contact'
            )
          ),
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              _Link2['default'],
              { id: 'productsLink', to: '/website/products', activeClassName: 'active' },
              'products'
            )
          ),
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              _IndexLink2['default'],
              { id: 'productsIndexLink', to: '/website/products', activeClassName: 'active' },
              'products index'
            )
          ),
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              _Link2['default'],
              { id: 'specificProductLink', to: '/website/products/15', activeClassName: 'active' },
              'specific product'
            )
          )
        ),
        this.props.children
      );
    };

    return App;
  })(_react.Component);

  var RootWrapper = (function (_Component2) {
    _inherits(RootWrapper, _Component2);

    function RootWrapper() {
      _classCallCheck(this, RootWrapper);

      _Component2.apply(this, arguments);
    }

    RootWrapper.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        null,
        'root wrapper ',
        this.props.children
      );
    };

    return RootWrapper;
  })(_react.Component);

  var RootPage = (function (_Component3) {
    _inherits(RootPage, _Component3);

    function RootPage() {
      _classCallCheck(this, RootPage);

      _Component3.apply(this, arguments);
    }

    RootPage.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        null,
        'website root'
      );
    };

    return RootPage;
  })(_react.Component);

  var Wrapper = (function (_Component4) {
    _inherits(Wrapper, _Component4);

    function Wrapper() {
      _classCallCheck(this, Wrapper);

      _Component4.apply(this, arguments);
    }

    Wrapper.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        null,
        'website wrapper ',
        this.props.children
      );
    };

    return Wrapper;
  })(_react.Component);

  var IndexPage = (function (_Component5) {
    _inherits(IndexPage, _Component5);

    function IndexPage() {
      _classCallCheck(this, IndexPage);

      _Component5.apply(this, arguments);
    }

    IndexPage.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        null,
        'website overview'
      );
    };

    return IndexPage;
  })(_react.Component);

  var ContactPage = (function (_Component6) {
    _inherits(ContactPage, _Component6);

    function ContactPage() {
      _classCallCheck(this, ContactPage);

      _Component6.apply(this, arguments);
    }

    ContactPage.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        null,
        'contact page'
      );
    };

    return ContactPage;
  })(_react.Component);

  var ProductsPage = (function (_Component7) {
    _inherits(ProductsPage, _Component7);

    function ProductsPage() {
      _classCallCheck(this, ProductsPage);

      _Component7.apply(this, arguments);
    }

    ProductsPage.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        null,
        'website products ',
        this.props.children
      );
    };

    return ProductsPage;
  })(_react.Component);

  var ProductPage = (function (_Component8) {
    _inherits(ProductPage, _Component8);

    function ProductPage() {
      _classCallCheck(this, ProductPage);

      _Component8.apply(this, arguments);
    }

    ProductPage.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        null,
        'specific product ',
        this.props.params.productId
      );
    };

    return ProductPage;
  })(_react.Component);

  var ProductsIndexPage = (function (_Component9) {
    _inherits(ProductsIndexPage, _Component9);

    function ProductsIndexPage() {
      _classCallCheck(this, ProductsIndexPage);

      _Component9.apply(this, arguments);
    }

    ProductsIndexPage.prototype.render = function render() {
      return _react2['default'].createElement(
        'div',
        null,
        'list of products'
      );
    };

    return ProductsIndexPage;
  })(_react.Component);

  var routes = _react2['default'].createElement(
    _Route2['default'],
    { component: App },
    _react2['default'].createElement(
      _Route2['default'],
      { path: '/', component: RootWrapper },
      _react2['default'].createElement(_IndexRoute2['default'], { component: RootPage }),
      _react2['default'].createElement(
        _Route2['default'],
        { path: 'website', component: Wrapper },
        _react2['default'].createElement(
          _Route2['default'],
          { path: 'products', component: ProductsPage },
          _react2['default'].createElement(_Route2['default'], { path: ':productId', component: ProductPage }),
          _react2['default'].createElement(_IndexRoute2['default'], { component: ProductsIndexPage })
        ),
        _react2['default'].createElement(_Route2['default'], { path: 'contact', component: ContactPage }),
        _react2['default'].createElement(_IndexRoute2['default'], { component: IndexPage })
      )
    )
  );

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    _reactDom.unmountComponentAtNode(node);
  });

  describe('when linking to the root', function () {
    it('is active and other routes are not', function (done) {
      _reactDom.render(_react2['default'].createElement(_Router2['default'], { history: _createMemoryHistory2['default']('/'), routes: routes }), node, function () {
        _expect2['default'](node.querySelector('#rootLink').className).toEqual('active');
        _expect2['default'](node.querySelector('#overviewLink').className).toEqual('');
        _expect2['default'](node.querySelector('#contactLink').className).toEqual('');
        _expect2['default'](node.querySelector('#productsLink').className).toEqual('');
        _expect2['default'](node.querySelector('#productsIndexLink').className).toEqual('');
        _expect2['default'](node.querySelector('#specificProductLink').className).toEqual('');
        done();
      });
    });
  });

  describe('when linking to the overview', function () {
    it('is active and other routes are not', function (done) {
      _reactDom.render(_react2['default'].createElement(_Router2['default'], { history: _createMemoryHistory2['default']('/website'), routes: routes }), node, function () {
        _expect2['default'](node.querySelector('#rootLink').className).toEqual('');
        _expect2['default'](node.querySelector('#overviewLink').className).toEqual('active');
        _expect2['default'](node.querySelector('#contactLink').className).toEqual('');
        _expect2['default'](node.querySelector('#productsLink').className).toEqual('');
        _expect2['default'](node.querySelector('#productsIndexLink').className).toEqual('');
        _expect2['default'](node.querySelector('#specificProductLink').className).toEqual('');
        done();
      });
    });
  });

  describe('when linking to the contact', function () {
    it('is active and other routes are not', function (done) {
      _reactDom.render(_react2['default'].createElement(_Router2['default'], { history: _createMemoryHistory2['default']('/website/contact'), routes: routes }), node, function () {
        _expect2['default'](node.querySelector('#rootLink').className).toEqual('');
        _expect2['default'](node.querySelector('#overviewLink').className).toEqual('');
        _expect2['default'](node.querySelector('#contactLink').className).toEqual('active');
        _expect2['default'](node.querySelector('#productsLink').className).toEqual('');
        _expect2['default'](node.querySelector('#productsIndexLink').className).toEqual('');
        _expect2['default'](node.querySelector('#specificProductLink').className).toEqual('');
        done();
      });
    });
  });

  describe('when linking to the products', function () {
    it('is active and other routes are not', function (done) {
      _reactDom.render(_react2['default'].createElement(_Router2['default'], { history: _createMemoryHistory2['default']('/website/products'), routes: routes }), node, function () {
        _expect2['default'](node.querySelector('#rootLink').className).toEqual('');
        _expect2['default'](node.querySelector('#overviewLink').className).toEqual('');
        _expect2['default'](node.querySelector('#contactLink').className).toEqual('');
        _expect2['default'](node.querySelector('#productsLink').className).toEqual('active');
        _expect2['default'](node.querySelector('#productsIndexLink').className).toEqual('active');
        _expect2['default'](node.querySelector('#specificProductLink').className).toEqual('');
        done();
      });
    });
  });

  describe('when linking to a specific product', function () {
    it("is active and it's parent is also active", function (done) {
      _reactDom.render(_react2['default'].createElement(_Router2['default'], { history: _createMemoryHistory2['default']('/website/products/15'), routes: routes }), node, function () {
        _expect2['default'](node.querySelector('#rootLink').className).toEqual('');
        _expect2['default'](node.querySelector('#overviewLink').className).toEqual('');
        _expect2['default'](node.querySelector('#contactLink').className).toEqual('');
        _expect2['default'](node.querySelector('#productsLink').className).toEqual('active');
        _expect2['default'](node.querySelector('#productsIndexLink').className).toEqual('');
        _expect2['default'](node.querySelector('#specificProductLink').className).toEqual('active');
        done();
      });
    });
  });
});