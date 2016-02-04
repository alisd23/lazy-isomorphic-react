'use strict';

import expect from 'expect';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from '../createMemoryHistory';
import Redirect from '../Redirect';
import Router from '../Router';
import Route from '../Route';

describe('A <Redirect>', function () {

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    unmountComponentAtNode(node);
  });

  it('works', function (done) {
    render(React.createElement(
      Router,
      { history: createHistory('/notes/5') },
      React.createElement(Route, { path: '/messages/:id' }),
      React.createElement(Redirect, { from: '/notes/:id', to: '/messages/:id' })
    ), node, function () {
      expect(this.state.location.pathname).toEqual('/messages/5');
      done();
    });
  });

  it('works with relative paths', function (done) {
    render(React.createElement(
      Router,
      { history: createHistory('/nested/route1') },
      React.createElement(
        Route,
        { path: 'nested' },
        React.createElement(Route, { path: 'route2' }),
        React.createElement(Redirect, { from: 'route1', to: 'route2' })
      )
    ), node, function () {
      expect(this.state.location.pathname).toEqual('/nested/route2');
      done();
    });
  });

  it('works with relative paths with param', function (done) {
    render(React.createElement(
      Router,
      { history: createHistory('/nested/1/route1') },
      React.createElement(
        Route,
        { path: 'nested/:id' },
        React.createElement(Route, { path: 'route2' }),
        React.createElement(Redirect, { from: 'route1', to: 'route2' })
      )
    ), node, function () {
      expect(this.state.location.pathname).toEqual('/nested/1/route2');
      done();
    });
  });
});