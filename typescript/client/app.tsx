import * as React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { Router } from 'react-router';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { createDevTools } from 'redux-devtools';

import ReducerRegistry from './redux/ReducerRegistry';
import { browserHistory } from 'react-router';

import configureRoutes from './configureRoutes';
import { configureClient } from './configureStore';

import coreReducers from './redux/core';
import productPage from './redux/modules/productPage';

const reducerRegistry = new ReducerRegistry(coreReducers);
// const reducerRegistry = new ReducerRegistry(Object.assign({}, coreReducers, { productPage }));

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q"
               defaultPosition="bottom"
               defaultIsVisible={false} >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

const initialState = (window as any).__INITIAL_STATE__;
console.log(initialState);
const routes = configureRoutes(reducerRegistry);
const store = configureClient(reducerRegistry, DevTools, initialState);

render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory} routes={routes} />
    </div>
  </Provider>,
  document.getElementById('root')
)

// Render dev tools
render(
  <DevTools store={store} />,
  document.getElementById('dev-tools')
)
