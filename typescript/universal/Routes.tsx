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
if(typeof (require as any).ensure !== "function") (require as any).ensure = function(d, c) { c(require) };
if(typeof (require as any).include !== "function") (require as any).include = function() {};

const ENV = typeof global !== 'undefined' ? (global as any).ENV : 'client';

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
        <IndexRoute getComponent={this.getShopPage.bind(this)} />
        <Route path="/product/:id" getComponent={this.getProductPage.bind(this)} />
        <Route path="/checkout" getComponent={this.getCheckoutPage.bind(this)} />
      </Route>
    );
  }


  /**
   * ROUTE HANDLERS
   */
  private getShopPage(location, cb) {
    if (ENV === 'client') {
      System.import('./containers/ShopPage')
        .then(container => this.changeScreen(location, cb, container))
        .catch(err => console.log('Epic fail: ShopPage -- ', err));
    } else {
      (require as any).ensure(['./containers/ShopPage'], require => {
        const container = require('./containers/ShopPage').default;
        this.changeScreen(location, cb, container)
      });
    }
  }
  private getProductPage(location, cb) {
    if (ENV === 'client') {
      Promise.all([
        System.import('./containers/productPage'),
        System.import('./redux/modules/productPage')
      ])
        .then(([container, reducer]: any) => this.changeScreen(location, cb, container, { reducer }))
        .catch(err => console.log('Epic fail: productPage -- ', err));
    } else {
      (require as any).ensure(['./containers/productPage', './redux/modules/productPage'], require => {
        const reducer = { ['productPage']: require('./redux/modules/productPage').default };
        const container = require('./containers/productPage').default;
        this.changeScreen(location, cb, container, reducer)
      });
    }
  }
 private getCheckoutPage(location, cb) {
   if (ENV === 'client') {
     System.import('./containers/CheckoutPage')
       .then(container => this.changeScreen(location, cb, container))
       .catch(err => console.log('Epic fail: CheckoutPage -- ', err));
   } else {
     (require as any).ensure(['./containers/CheckoutPage'], require => {
       const container = require('./containers/CheckoutPage').default;
       this.changeScreen(location, cb, container)
     });
   }
 }


  private changeScreen(
    location: HistoryModule.Location,
    cb: Function,
    component: React.Component<any, any>,
    reducer?: any
  ) {
    if (reducer) {
      this.reducerRegistry.register(reducer);
    }

    if (!this.store) {
      cb(null, component);
    } else if (this.store.getState().routing.location.pathname === location.pathname) {
      cb(null, component);
      this.store.dispatch(endLoading);
    }
  }
}
