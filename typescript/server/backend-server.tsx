
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

// Tell react that these global variables exist at compile time
declare var __DEVELOPMENT__: any;
declare var __dirname: any;
declare var webpackIsomorphicTools: any;

export default (PORT) => {

  const app = express();

  /**
   *  Middleware
   */

  // Serve build folder
  app.use(express.static(path.join(__dirname, '../..', 'build')));
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

        // Compile an initial state
        const products = {};
        _products.forEach((p) => products[p.id] = p);

        const initialState = { products }
        const store = configureServer(reducerRegistry, initialState);

        const component = (
          <Provider store={store}>
            <div>
              <RouterContext {...renderProps} />
            </div>
          </Provider>
        );

        // Render the initial html
        // - Store: Place initial state on the browser window object for the client to read on load
        // - assets: Load the relevant assets into the markup using webpackIsomorphicTools
        // - component: The main component to render in the html root
        const html = (
          <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />
        );

        res
          .status(200)
          .send('<!doctype html>\n' + renderToString(html));

      } else {
        res.status(404).send('Not found')
      }
    });
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
