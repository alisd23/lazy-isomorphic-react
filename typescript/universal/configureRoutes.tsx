import * as React from 'react';
import { IndexRoute, Route } from 'react-router';

import { startLoading, endLoading } from './redux/modules/global';
import App from './containers/App';
import Main from './containers/ShopPage';
import Product from './containers/ProductPage';
import ReducerRegistry from './redux/ReducerRegistry';

// Require ensure shim
if(typeof require.ensure !== "function") require.ensure = function(d, c) { c(require) };
if(typeof require.include !== "function") require.include = function() {};


export default function configureRoutes(reducerRegistry) {
  return (
    <Route path="/" component={App}>
      <IndexRoute getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/ShopPage').default);
        });
      }} />
      <Route path="/product/:id" getComponent={(location, cb) => {
        require.ensure([], require => {
          setTimeout(function() {
            reducerRegistry.register({ ['productPage']: require('./redux/modules/productPage').default });
            cb(null, require('./containers/ProductPage').default);
          }, 1000);
        });
      }} />
      <Route path="/checkout" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/CheckoutPage').default);
        });
      }} />
    </Route>
  );
}
