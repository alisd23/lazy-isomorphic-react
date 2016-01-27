import * as React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import { Provider } from 'react-redux';
import * as logger from 'redux-logger';
import * as thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory  } from 'react-router';
import { syncHistory } from 'react-router-redux';

import createReducer from './reducers';
import { getAllProducts } from './actions';
import Main from './containers/Main';
import App from './containers/App';
import Product from './containers/Product';

// Import stylesheets
import '../../sass/common.scss';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q"
               defaultPosition="bottom">
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

const historyMiddleware = syncHistory(browserHistory);

const reducer = createReducer();

const middleware = [thunk, logger(), historyMiddleware];

const finalCreateStore = compose(
  applyMiddleware(...middleware),
  DevTools.instrument()
)(createStore);
const store = finalCreateStore(reducer);

historyMiddleware.listenForReplays(store);

store.dispatch(getAllProducts());

render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
       <Route path="/" component={App}>
         <IndexRoute component={Main}/>
         <Route path="/product/:id" component={Product}/>
       </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
)
