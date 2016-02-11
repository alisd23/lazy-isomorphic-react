import * as React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { createDevTools } from 'redux-devtools';

import ReducerRegistry from '../universal/redux/ReducerRegistry';

import Routes from '../universal/Routes';
import { configureClient } from '../universal/configureStore';
import { match } from 'react-router';

import coreReducers from '../universal/redux/core';
import productPage from '../universal/redux/modules/productPage';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q"
               defaultPosition="bottom"
               defaultIsVisible={false} >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

const reducerRegistry = new ReducerRegistry(coreReducers);
const routes = new Routes(reducerRegistry);

/**
 * This magic allows router to load correct reducer and components depending on which route we are in
 */
match({ history: browserHistory, routes: routes.configure() } as any, (error, redirectLocation, renderProps) => {

  const initialState = (window as any).__INITIAL_STATE__;
  const store = configureClient(reducerRegistry, DevTools, initialState);
  routes.injectStore(store);

  render(
    <Provider store={store}>
      <div>
        <Router {...renderProps} />
      </div>
    </Provider>,
    document.getElementById('root')
  );

  // Render dev tools
  render(
    <DevTools store={store} />,
    document.getElementById('dev-tools')
  )

});
