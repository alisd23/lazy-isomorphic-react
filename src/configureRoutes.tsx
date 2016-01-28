import * as React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from './containers/App';
import Main from './containers/Main';
import Product from './containers/Product';

export default function configureRoutes(reducerRegistry) {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="/product/:id" getComponent={(location, cb) => {
        (require as any).ensure([], require => {
          // Load REDUCER
          reducerRegistry.register({ productPage: require('./reducers/productPage').default });
          // Load STYLES
          require('../../sass/productPage.scss');
          // Load REACT COMPONENT
          cb(null, require('./containers/Product').default);
        });
      }} />
    </Route>
  );
}

  // Register the reducer depended upon by the screen component
  // reducerRegistry.register({admin: require('./path/to/reducer')})

  // Configure hot module replacement for the reducer
  // if (process.env.NODE_ENV !== 'production') {
  //   if (module.hot) {
  //     module.hot.accept('./ducks/admin', () => {
  //       reducerRegistry.register({admin: require('./ducks/admin')})
  //     })
  //   }
  // }
