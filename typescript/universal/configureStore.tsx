import * as React from 'react';
import {applyMiddleware, createStore} from 'redux';
import { compose } from 'redux';
import * as logger from 'redux-logger';
import * as thunk from 'redux-thunk';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';
import configureReducers from './configureReducers';

export function configureClient(reducerRegistry, DevTools, initialState) {

  const historyMiddleware = syncHistory(browserHistory);
  const middleware = [thunk, logger(), historyMiddleware];

  const reducer = configureReducers(reducerRegistry.getReducers());

  const finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  historyMiddleware.listenForReplays(store);

  // Reconfigure the store's reducer when the reducer registry is changed - we
  // depend on this for loading reducers via code splitting and for hot
  // reloading reducer modules.
  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(configureReducers(reducers))
  });

  return store;
}

export function configureServer(reducerRegistry, initialState) {
  const middleware = [thunk];

  const reducer = configureReducers(reducerRegistry.getReducers());

  const finalCreateStore = compose(
    applyMiddleware(...middleware)
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  // Reconfigure the store's reducer when the reducer registry is changed - we
  // depend on this for loading reducers via code splitting and for hot
  // reloading reducer modules.
  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(configureReducers(reducers))
  });

  return store;
}
