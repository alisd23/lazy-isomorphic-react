
import * as React from 'react';
const path = require('path');
const express = require('express');
const _products = require('./products.json');
import Html from '../helpers/Html';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../client/configureReducers';
import coreReducers from '../client/redux/core';
import ReducerRegistry from '../client/redux/ReducerRegistry';
import { match, RouterContext } from 'react-router';
import { browserHistory } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';

import configureRoutes from '../client/configureRoutes';
import { configureServer } from '../client/configureStore';

// Tell react that these variables exist at compile time
declare var __DEVELOPMENT__: any;
declare var webpackIsomorphicTools: any;

export default (PORT) => {

  const app = express();

  /**
   *  Middleware
   */

  // Serve build folder
  app.use(express.static('../build'));
  app.use(handleRender);

  /**
   *  Routes
   */
  function handleRender(req, res) {

    const reducerRegistry = new ReducerRegistry(coreReducers);
    const routes = configureRoutes(reducerRegistry);
    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      webpackIsomorphicTools.refresh();
    }

    match({ routes, location: req.url || '/' }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {

        // console.log(renderProps);

        // Compile an initial state
        let initialState = {
          products: _products
          // cart: [1]
        }
        const store = configureServer(reducerRegistry, initialState);

        const component = (
          <Provider store={store}>
            <div>
              <RouterContext {...renderProps} />
            </div>
          </Provider>
        );

        const html = (
          <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />
        );

        // console.log(html.props.assets);

        res
          .status(200)
          .send('<!doctype html>\n' + renderToString(html));

        console.log("Lets go N");
      } else {
        res.status(404).send('Not found')
      }
    });

  }

  function renderFullPage(html, initialState) {
    return `
       <!DOCTYPE html>
       <html>
         <head>
           <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" rel="stylesheet">
           <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
         </head>
         <body>
           <div id="root">${html}</div>
           <div id="dev-tools"></div>
           <script>
             window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
           </script>
           <script src="/bundle.js"></script>
         </body>
       </html>
     `;
  }

  app.get('/products', function(req, res) {
    console.log("Getting products");
    res.status(200).send(_products);
  });


  /**
   *  Start server listening
   */

  app.listen(PORT, function(error) {
    if (error) {
      console.error(error);
    } else {
      console.info('==> 🌎 Backend server listening on port %s.', PORT);
    }
  });

};
