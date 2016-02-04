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

var _historyLibUseQueries = require('history/lib/useQueries');

var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);

var _execSteps = require('./execSteps');

var _execSteps2 = _interopRequireDefault(_execSteps);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

describe('When a router enters a branch', function () {
  var node = undefined,
      leaveHookSpy = undefined,
      removeLeaveHook = undefined,
      DashboardRoute = undefined,
      NewsFeedRoute = undefined,
      InboxRoute = undefined,
      RedirectToInboxRoute = undefined,
      MessageRoute = undefined,
      routes = undefined;

  beforeEach(function () {
    node = document.createElement('div');
    leaveHookSpy = _expect2['default'].createSpy();

    var Dashboard = (function (_Component) {
      _inherits(Dashboard, _Component);

      function Dashboard() {
        _classCallCheck(this, Dashboard);

        _Component.apply(this, arguments);
      }

      Dashboard.prototype.render = function render() {
        return _react2['default'].createElement(
          'div',
          { className: 'Dashboard' },
          _react2['default'].createElement(
            'h1',
            null,
            'The Dashboard'
          ),
          this.props.children
        );
      };

      return Dashboard;
    })(_react.Component);

    var NewsFeed = (function (_Component2) {
      _inherits(NewsFeed, _Component2);

      function NewsFeed() {
        _classCallCheck(this, NewsFeed);

        _Component2.apply(this, arguments);
      }

      NewsFeed.prototype.componentWillMount = function componentWillMount() {
        removeLeaveHook = this.context.router.setRouteLeaveHook(this.props.route, function () {
          return leaveHookSpy();
        } // Break reference equality.
        );
      };

      NewsFeed.prototype.render = function render() {
        return _react2['default'].createElement(
          'div',
          null,
          'News'
        );
      };

      return NewsFeed;
    })(_react.Component);

    NewsFeed.contextTypes = {
      router: _react2['default'].PropTypes.object.isRequired
    };

    var Inbox = (function (_Component3) {
      _inherits(Inbox, _Component3);

      function Inbox() {
        _classCallCheck(this, Inbox);

        _Component3.apply(this, arguments);
      }

      Inbox.prototype.render = function render() {
        return _react2['default'].createElement(
          'div',
          null,
          'Inbox'
        );
      };

      return Inbox;
    })(_react.Component);

    NewsFeedRoute = {
      path: 'news',
      component: NewsFeed,
      onEnter: function onEnter(nextState, replace) {
        _expect2['default'](this).toBe(NewsFeedRoute);
        _expect2['default'](nextState.routes).toContain(NewsFeedRoute);
        _expect2['default'](replace).toBeA('function');
      },
      onLeave: function onLeave() {
        _expect2['default'](this).toBe(NewsFeedRoute);
      }
    };

    InboxRoute = {
      path: 'inbox',
      component: Inbox,
      onEnter: function onEnter(nextState, replace) {
        _expect2['default'](this).toBe(InboxRoute);
        _expect2['default'](nextState.routes).toContain(InboxRoute);
        _expect2['default'](replace).toBeA('function');
      },
      onLeave: function onLeave() {
        _expect2['default'](this).toBe(InboxRoute);
      }
    };

    RedirectToInboxRoute = {
      path: 'redirect-to-inbox',
      onEnter: function onEnter(nextState, replace) {
        _expect2['default'](this).toBe(RedirectToInboxRoute);
        _expect2['default'](nextState.routes).toContain(RedirectToInboxRoute);
        _expect2['default'](replace).toBeA('function');

        replace('/inbox');
      },
      onLeave: function onLeave() {
        _expect2['default'](this).toBe(RedirectToInboxRoute);
      }
    };

    MessageRoute = {
      path: 'messages/:messageID',
      onEnter: function onEnter(nextState, replace) {
        _expect2['default'](this).toBe(MessageRoute);
        _expect2['default'](nextState.routes).toContain(MessageRoute);
        _expect2['default'](replace).toBeA('function');
      },
      onLeave: function onLeave() {
        _expect2['default'](this).toBe(MessageRoute);
      }
    };

    DashboardRoute = {
      path: '/',
      component: Dashboard,
      onEnter: function onEnter(nextState, replace) {
        _expect2['default'](this).toBe(DashboardRoute);
        _expect2['default'](nextState.routes).toContain(DashboardRoute);
        _expect2['default'](replace).toBeA('function');
      },
      onLeave: function onLeave() {
        _expect2['default'](this).toBe(DashboardRoute);
      },
      childRoutes: [NewsFeedRoute, InboxRoute, RedirectToInboxRoute, MessageRoute]
    };

    routes = [DashboardRoute];
  });

  afterEach(function () {
    _reactDom.unmountComponentAtNode(node);
  });

  it('calls the onEnter hooks of all routes in that branch', function (done) {
    var dashboardRouteEnterSpy = _expect.spyOn(DashboardRoute, 'onEnter').andCallThrough();
    var newsFeedRouteEnterSpy = _expect.spyOn(NewsFeedRoute, 'onEnter').andCallThrough();

    _reactDom.render(_react2['default'].createElement(_Router2['default'], { history: _createMemoryHistory2['default']('/news'), routes: routes }), node, function () {
      _expect2['default'](dashboardRouteEnterSpy).toHaveBeenCalled();
      _expect2['default'](newsFeedRouteEnterSpy).toHaveBeenCalled();
      done();
    });
  });

  it('calls the route leave hooks when leaving the route', function (done) {
    var history = _createMemoryHistory2['default']('/news');

    // Stub this function to exercise the code path.
    history.listenBeforeUnload = function () {
      return function () {};
    };

    _reactDom.render(_react2['default'].createElement(_Router2['default'], { history: history, routes: routes }), node, function () {
      _expect2['default'](leaveHookSpy.calls.length).toEqual(0);
      history.push('/inbox');
      _expect2['default'](leaveHookSpy.calls.length).toEqual(1);
      history.push('/news');
      _expect2['default'](leaveHookSpy.calls.length).toEqual(1);
      history.push('/inbox');
      _expect2['default'](leaveHookSpy.calls.length).toEqual(2);
      done();
    });
  });

  it('does not call removed route leave hooks', function (done) {
    var history = _createMemoryHistory2['default']('/news');

    _reactDom.render(_react2['default'].createElement(_Router2['default'], { history: history, routes: routes }), node, function () {
      removeLeaveHook();
      history.push('/inbox');
      _expect2['default'](leaveHookSpy).toNotHaveBeenCalled();
      done();
    });
  });

  describe('and one of the transition hooks navigates to another route', function () {
    it('immediately transitions to the new route', function (done) {
      var redirectRouteEnterSpy = _expect.spyOn(RedirectToInboxRoute, 'onEnter').andCallThrough();
      var redirectRouteLeaveSpy = _expect.spyOn(RedirectToInboxRoute, 'onLeave').andCallThrough();
      var inboxEnterSpy = _expect.spyOn(InboxRoute, 'onEnter').andCallThrough();

      _reactDom.render(_react2['default'].createElement(_Router2['default'], { history: _createMemoryHistory2['default']('/redirect-to-inbox'), routes: routes }), node, function () {
        _expect2['default'](this.state.location.pathname).toEqual('/inbox');
        _expect2['default'](redirectRouteEnterSpy).toHaveBeenCalled();
        _expect2['default'](redirectRouteLeaveSpy.calls.length).toEqual(0);
        _expect2['default'](inboxEnterSpy).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('and then navigates to another branch', function () {
    it('calls the onLeave hooks of all routes in the previous branch that are not in the next branch', function (done) {
      var dashboardRouteLeaveSpy = _expect.spyOn(DashboardRoute, 'onLeave').andCallThrough();
      var inboxRouteEnterSpy = _expect.spyOn(InboxRoute, 'onEnter').andCallThrough();
      var inboxRouteLeaveSpy = _expect.spyOn(InboxRoute, 'onLeave').andCallThrough();
      var history = _createMemoryHistory2['default']('/inbox');

      var steps = [function () {
        _expect2['default'](inboxRouteEnterSpy).toHaveBeenCalled('InboxRoute.onEnter was not called');
        history.push('/news');
      }, function () {
        _expect2['default'](inboxRouteLeaveSpy).toHaveBeenCalled('InboxRoute.onLeave was not called');
        _expect2['default'](dashboardRouteLeaveSpy.calls.length).toEqual(0, 'DashboardRoute.onLeave was called');
      }];

      var execNextStep = _execSteps2['default'](steps, done);

      _reactDom.render(_react2['default'].createElement(_Router2['default'], { history: history,
        routes: routes,
        onUpdate: execNextStep
      }), node, execNextStep);
    });
  });

  describe('and then navigates to the same branch, but with different params', function () {
    it('calls the onLeave and onEnter hooks of all routes whose params have changed', function (done) {
      var dashboardRouteLeaveSpy = _expect.spyOn(DashboardRoute, 'onLeave').andCallThrough();
      var dashboardRouteEnterSpy = _expect.spyOn(DashboardRoute, 'onEnter').andCallThrough();
      var messageRouteLeaveSpy = _expect.spyOn(MessageRoute, 'onLeave').andCallThrough();
      var messageRouteEnterSpy = _expect.spyOn(MessageRoute, 'onEnter').andCallThrough();
      var history = _createMemoryHistory2['default']('/messages/123');

      var steps = [function () {
        _expect2['default'](dashboardRouteEnterSpy).toHaveBeenCalled('DashboardRoute.onEnter was not called');
        _expect2['default'](messageRouteEnterSpy).toHaveBeenCalled('InboxRoute.onEnter was not called');
        history.push('/messages/456');
      }, function () {
        _expect2['default'](messageRouteLeaveSpy).toHaveBeenCalled('MessageRoute.onLeave was not called');
        _expect2['default'](messageRouteEnterSpy).toHaveBeenCalled('MessageRoute.onEnter was not called');
        _expect2['default'](dashboardRouteLeaveSpy.calls.length).toEqual(0, 'DashboardRoute.onLeave was called');
      }];

      var execNextStep = _execSteps2['default'](steps, done);

      _reactDom.render(_react2['default'].createElement(_Router2['default'], { history: history,
        routes: routes,
        onUpdate: execNextStep
      }), node, execNextStep);
    });
  });

  describe('and then the query changes', function () {
    it('calls the onEnter hooks of all routes in that branch', function (done) {
      var newsFeedRouteEnterSpy = _expect.spyOn(NewsFeedRoute, 'onEnter').andCallThrough();
      var history = _historyLibUseQueries2['default'](_createMemoryHistory2['default'])('/inbox');

      _reactDom.render(_react2['default'].createElement(_Router2['default'], { history: history, routes: routes }), node, function () {
        history.push({ pathname: '/news', query: { q: 1 } });
        _expect2['default'](newsFeedRouteEnterSpy.calls.length).toEqual(1);
        history.push({ pathname: '/news', query: { q: 2 } });
        _expect2['default'](newsFeedRouteEnterSpy.calls.length).toEqual(1);
        done();
      });
    });
  });
});