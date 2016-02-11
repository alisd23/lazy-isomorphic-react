import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Store } from 'redux';

import { endLoading } from './redux/modules/global';
import App from './containers/App';
import Main from './containers/ShopPage';
import Product from './containers/ProductPage';
import ReducerRegistry from './redux/ReducerRegistry';
import IAppState from './interfaces/AppState';

// Require ensure shim
if(typeof require.ensure !== "function") require.ensure = function(d, c) { c(require) };
if(typeof require.include !== "function") require.include = function() {};

export default class routes {

  private store: Store = null;
  private reducerRegistry: any = null;

  constructor(reducerRegistry) {
    this.reducerRegistry = reducerRegistry;
  }


  /**
  * Only need to inject this on the CLIENT side for lazy loading
  */
  injectStore(store: Store) {
    this.store = store;
  }

  configure() {

    return (
      <Route path="/" component={App}>
        <IndexRoute getComponent={(location, cb) => {
          require.ensure([], require => {
            const component = require('./containers/ShopPage').default;
            // If route has changed since link clicked - do not load page
            if (!this.store) {
              cb(null, component);
            } else if (this.store.getState().routing.location.pathname === location.pathname) {
              cb(null, component);
              this.store.dispatch(endLoading);
            }
          });
        }} />
        <Route path="/product/:id" getComponent={(location, cb) => {
          require.ensure([], require => {
            setTimeout(() => {
              this.reducerRegistry.register({ ['productPage']: require('./redux/modules/productPage').default });
              const component = require('./containers/ProductPage').default;
              // If route has changed since link clicked - do not load page
              if (!this.store) {
                cb(null, component);
              } else if (this.store.getState().routing.location.pathname === location.pathname) {
                cb(null, component);
                this.store.dispatch(endLoading);
              }
            }, 1000);
          });
        }} />
        <Route path="/checkout" getComponent={(location, cb) => {
          require.ensure([], require => {
            const component = require('./containers/CheckoutPage').default;
            // If route has changed since link clicked - do not load page
            if (!this.store) {
              cb(null, component);
            } else if (this.store.getState().routing.location.pathname === location.pathname) {
              cb(null, component);
              this.store.dispatch(endLoading);
            }
          });
        }} />
      </Route>
    );
  }
}
