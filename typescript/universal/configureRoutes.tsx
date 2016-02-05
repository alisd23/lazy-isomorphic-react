import * as React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from './containers/App';
import Main from './containers/ShopPage';
import Product from './containers/ProductPage';
import ReducerRegistry from './redux/ReducerRegistry';

// Require ensure shim
if(typeof require.ensure !== "function") require.ensure = function(d, c) { c(require) };
if(typeof require.include !== "function") require.include = function() {};

interface IContentData {
  callback: Function;
  component: Function;
  stylesheet?: string;
  reducer?: { name: string, reducer: Function };
  reducerRegistry?: ReducerRegistry;
}

function loadContent(contentData: IContentData) {
  const { callback, component, reducer, reducerRegistry } = contentData;

  // Lazy load extra content
  if (reducer)
    reducerRegistry.register({ [reducer.name]: reducer.reducer });

  callback(null, component);
}

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
          reducerRegistry.register({ ['productPage']: require('./redux/modules/productPage').default });
          cb(null, require('./containers/ProductPage').default);
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
