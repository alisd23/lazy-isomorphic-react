'use strict';

import expect from 'expect';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from '../createMemoryHistory';
import IndexRedirect from '../IndexRedirect';
import Router from '../Router';
import Route from '../Route';

describe('An <IndexRedirect>', function () {

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
      { history: createHistory('/') },
      React.createElement(
        Route,
        { path: '/' },
        React.createElement(IndexRedirect, { to: '/messages' }),
        React.createElement(Route, { path: 'messages' })
      )
    ), node, function () {
      expect(this.state.location.pathname).toEqual('/messages');
      done();
    });
  });
});