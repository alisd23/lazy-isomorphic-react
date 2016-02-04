'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import expect, { spyOn } from 'expect';
import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from '../createMemoryHistory';
import useQueries from 'history/lib/useQueries';
import execSteps from './execSteps';
import Router from '../Router';

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
    leaveHookSpy = expect.createSpy();

    var Dashboard = (function (_Component) {
      _inherits(Dashboard, _Component);

      function Dashboard() {
        _classCallCheck(this, Dashboard);

        _Component.apply(this, arguments);
      }

      Dashboard.prototype.render = function render() {
        return React.createElement(
          'div',
          { className: 'Dashboard' },
          React.createElement(
            'h1',
            null,
            'The Dashboard'
          ),
          this.props.children
        );
      };

      return Dashboard;
    })(Component);

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
        return React.createElement(
          'div',
          null,
          'News'
        );
      };

      return NewsFeed;
    })(Component);

    NewsFeed.contextTypes = {
      router: React.PropTypes.object.isRequired
    };

    var Inbox = (function (_Component3) {
      _inherits(Inbox, _Component3);

      function Inbox() {
        _classCallCheck(this, Inbox);

        _Component3.apply(this, arguments);
      }

      Inbox.prototype.render = function render() {
        return React.createElement(
          'div',
          null,
          'Inbox'
        );
      };

      return Inbox;
    })(Component);

    NewsFeedRoute = {
      path: 'news',
      component: NewsFeed,
      onEnter: function onEnter(nextState, replace) {
        expect(this).toBe(NewsFeedRoute);
        expect(nextState.routes).toContain(NewsFeedRoute);
        expect(replace).toBeA('function');
      },
      onLeave: function onLeave() {
        expect(this).toBe(NewsFeedRoute);
      }
    };

    InboxRoute = {
      path: 'inbox',
      component: Inbox,
      onEnter: function onEnter(nextState, replace) {
        expect(this).toBe(InboxRoute);
        expect(nextState.routes).toContain(InboxRoute);
        expect(replace).toBeA('function');
      },
      onLeave: function onLeave() {
        expect(this).toBe(InboxRoute);
      }
    };

    RedirectToInboxRoute = {
      path: 'redirect-to-inbox',
      onEnter: function onEnter(nextState, replace) {
        expect(this).toBe(RedirectToInboxRoute);
        expect(nextState.routes).toContain(RedirectToInboxRoute);
        expect(replace).toBeA('function');

        replace('/inbox');
      },
      onLeave: function onLeave() {
        expect(this).toBe(RedirectToInboxRoute);
      }
    };

    MessageRoute = {
      path: 'messages/:messageID',
      onEnter: function onEnter(nextState, replace) {
        expect(this).toBe(MessageRoute);
        expect(nextState.routes).toContain(MessageRoute);
        expect(replace).toBeA('function');
      },
      onLeave: function onLeave() {
        expect(this).toBe(MessageRoute);
      }
    };

    DashboardRoute = {
      path: '/',
      component: Dashboard,
      onEnter: function onEnter(nextState, replace) {
        expect(this).toBe(DashboardRoute);
        expect(nextState.routes).toContain(DashboardRoute);
        expect(replace).toBeA('function');
      },
      onLeave: function onLeave() {
        expect(this).toBe(DashboardRoute);
      },
      childRoutes: [NewsFeedRoute, InboxRoute, RedirectToInboxRoute, MessageRoute]
    };

    routes = [DashboardRoute];
  });

  afterEach(function () {
    unmountComponentAtNode(node);
  });

  it('calls the onEnter hooks of all routes in that branch', function (done) {
    var dashboardRouteEnterSpy = spyOn(DashboardRoute, 'onEnter').andCallThrough();
    var newsFeedRouteEnterSpy = spyOn(NewsFeedRoute, 'onEnter').andCallThrough();

    render(React.createElement(Router, { history: createHistory('/news'), routes: routes }), node, function () {
      expect(dashboardRouteEnterSpy).toHaveBeenCalled();
      expect(newsFeedRouteEnterSpy).toHaveBeenCalled();
      done();
    });
  });

  it('calls the route leave hooks when leaving the route', function (done) {
    var history = createHistory('/news');

    // Stub this function to exercise the code path.
    history.listenBeforeUnload = function () {
      return function () {};
    };

    render(React.createElement(Router, { history: history, routes: routes }), node, function () {
      expect(leaveHookSpy.calls.length).toEqual(0);
      history.push('/inbox');
      expect(leaveHookSpy.calls.length).toEqual(1);
      history.push('/news');
      expect(leaveHookSpy.calls.length).toEqual(1);
      history.push('/inbox');
      expect(leaveHookSpy.calls.length).toEqual(2);
      done();
    });
  });

  it('does not call removed route leave hooks', function (done) {
    var history = createHistory('/news');

    render(React.createElement(Router, { history: history, routes: routes }), node, function () {
      removeLeaveHook();
      history.push('/inbox');
      expect(leaveHookSpy).toNotHaveBeenCalled();
      done();
    });
  });

  describe('and one of the transition hooks navigates to another route', function () {
    it('immediately transitions to the new route', function (done) {
      var redirectRouteEnterSpy = spyOn(RedirectToInboxRoute, 'onEnter').andCallThrough();
      var redirectRouteLeaveSpy = spyOn(RedirectToInboxRoute, 'onLeave').andCallThrough();
      var inboxEnterSpy = spyOn(InboxRoute, 'onEnter').andCallThrough();

      render(React.createElement(Router, { history: createHistory('/redirect-to-inbox'), routes: routes }), node, function () {
        expect(this.state.location.pathname).toEqual('/inbox');
        expect(redirectRouteEnterSpy).toHaveBeenCalled();
        expect(redirectRouteLeaveSpy.calls.length).toEqual(0);
        expect(inboxEnterSpy).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('and then navigates to another branch', function () {
    it('calls the onLeave hooks of all routes in the previous branch that are not in the next branch', function (done) {
      var dashboardRouteLeaveSpy = spyOn(DashboardRoute, 'onLeave').andCallThrough();
      var inboxRouteEnterSpy = spyOn(InboxRoute, 'onEnter').andCallThrough();
      var inboxRouteLeaveSpy = spyOn(InboxRoute, 'onLeave').andCallThrough();
      var history = createHistory('/inbox');

      var steps = [function () {
        expect(inboxRouteEnterSpy).toHaveBeenCalled('InboxRoute.onEnter was not called');
        history.push('/news');
      }, function () {
        expect(inboxRouteLeaveSpy).toHaveBeenCalled('InboxRoute.onLeave was not called');
        expect(dashboardRouteLeaveSpy.calls.length).toEqual(0, 'DashboardRoute.onLeave was called');
      }];

      var execNextStep = execSteps(steps, done);

      render(React.createElement(Router, { history: history,
        routes: routes,
        onUpdate: execNextStep
      }), node, execNextStep);
    });
  });

  describe('and then navigates to the same branch, but with different params', function () {
    it('calls the onLeave and onEnter hooks of all routes whose params have changed', function (done) {
      var dashboardRouteLeaveSpy = spyOn(DashboardRoute, 'onLeave').andCallThrough();
      var dashboardRouteEnterSpy = spyOn(DashboardRoute, 'onEnter').andCallThrough();
      var messageRouteLeaveSpy = spyOn(MessageRoute, 'onLeave').andCallThrough();
      var messageRouteEnterSpy = spyOn(MessageRoute, 'onEnter').andCallThrough();
      var history = createHistory('/messages/123');

      var steps = [function () {
        expect(dashboardRouteEnterSpy).toHaveBeenCalled('DashboardRoute.onEnter was not called');
        expect(messageRouteEnterSpy).toHaveBeenCalled('InboxRoute.onEnter was not called');
        history.push('/messages/456');
      }, function () {
        expect(messageRouteLeaveSpy).toHaveBeenCalled('MessageRoute.onLeave was not called');
        expect(messageRouteEnterSpy).toHaveBeenCalled('MessageRoute.onEnter was not called');
        expect(dashboardRouteLeaveSpy.calls.length).toEqual(0, 'DashboardRoute.onLeave was called');
      }];

      var execNextStep = execSteps(steps, done);

      render(React.createElement(Router, { history: history,
        routes: routes,
        onUpdate: execNextStep
      }), node, execNextStep);
    });
  });

  describe('and then the query changes', function () {
    it('calls the onEnter hooks of all routes in that branch', function (done) {
      var newsFeedRouteEnterSpy = spyOn(NewsFeedRoute, 'onEnter').andCallThrough();
      var history = useQueries(createHistory)('/inbox');

      render(React.createElement(Router, { history: history, routes: routes }), node, function () {
        history.push({ pathname: '/news', query: { q: 1 } });
        expect(newsFeedRouteEnterSpy.calls.length).toEqual(1);
        history.push({ pathname: '/news', query: { q: 2 } });
        expect(newsFeedRouteEnterSpy.calls.length).toEqual(1);
        done();
      });
    });
  });
});