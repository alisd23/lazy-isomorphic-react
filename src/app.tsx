import * as React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { createDevTools } from 'redux-devtools';

import createReducer from './reducers';
import { getAllProducts } from './actions';
import Main from './containers/Main';
import App from './containers/App';
import Product from './containers/Product';
import ReducerRegistry from './ReducerRegistry';
import { browserHistory } from 'react-router';

import configureRoutes from './configureRoutes';
import configureStore from './configureStore';

// Import stylesheets
import '../../sass/common.scss';

import coreReducers from './reducers/core';
const reducerRegistry = new ReducerRegistry(coreReducers);

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q"
               defaultPosition="bottom">
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

const routes = configureRoutes(reducerRegistry);
const store = configureStore(reducerRegistry, DevTools);

store.dispatch(getAllProducts());

render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory} routes={routes} />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
)
