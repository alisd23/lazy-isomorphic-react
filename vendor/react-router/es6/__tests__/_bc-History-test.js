'use strict';

import expect from 'expect';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import History from '../History';
import Router from '../Router';
import Route from '../Route';
import createHistory from 'history/lib/createMemoryHistory';

// skipping to remove warnings, and we don't intent to update this mixin
// keeping tests here just in-case
describe('v1 History Mixin', function () {

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    unmountComponentAtNode(node);
  });

  it('assigns the history to the component instance', function (done) {
    var history = createHistory('/');

    var Component = React.createClass({
      displayName: 'Component',

      mixins: [History],
      componentWillMount: function componentWillMount() {
        expect(this.history).toExist();
      },
      render: function render() {
        return null;
      }
    });

    render(React.createElement(
      Router,
      { history: history },
      React.createElement(Route, { path: '/', component: Component })
    ), node, done);
  });
});