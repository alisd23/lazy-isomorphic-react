import * as React from 'react';
import { render } from 'react-dom';

import { Store, combineReducers } from 'redux';
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
import SocketManager from './api/socketManager';


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
  const store: Store = configureClient(reducerRegistry, DevTools, initialState);

  const sockets = new SocketManager(store);
  sockets.connect();

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
  );


  //--------------------------//
  //  HOT RELOADING REDUCERS  //
  //--------------------------//

  if (__DEVELOPMENT__ && module.hot) {

    // CORE REDUCERS
    module.hot.accept('../universal/redux/core', () => {
      console.log("CORE");
      reducerRegistry.updateReducers(store, require('../universal/redux/core').default);
    });

    // ADDITIONAL REDUCERS
    // These reducers are required from the Routes.tsx file so we must also accept
    // a new routes file
    module.hot.accept('../universal/Routes', () => {});

    // Product Page
    System.import('../universal/redux/modules/productPage')
    module.hot.accept('../universal/redux/modules/productPage', () => {
      console.log("PRODUCT PAGE");
      System.import('../universal/redux/modules/productPage')
        .then((reducer) => {
          reducerRegistry.updateReducers(store, { 'productPage': reducer.default })
        });
    });
  }

});
