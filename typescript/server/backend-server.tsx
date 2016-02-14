
import * as React from 'react';
const path = require('path');
const express = require('express');
const _products = require('./products.json');
import Html from './Html';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { browserHistory } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';

import Routes from '../universal/Routes';
import { configureServer } from '../universal/configureStore';
import reducers from '../universal/configureReducers';
import coreReducers from '../universal/redux/core';
import ReducerRegistry from '../universal/redux/ReducerRegistry';
const socketIO = require('socket.io');
const http = require('http');

// Tell react that these global variables exist at compile time
declare var __DEVELOPMENT__: any;
declare var __dirname: any;
declare var webpackIsomorphicTools: any;

export default (PORT) => {

  const app = express();
  const server = http.Server(app);

  /**
   *  Start server listening
   */

  server.listen(PORT, function(error) {
    if (error) {
      console.error(error);
    } else {
      console.info('==> 🌎 Backend server listening on port %s.', PORT);
    }
  });


  /**
   * Setup Sockets
   */

   const io = new socketIO(server);

   io.on('connection', function (socket) {
     socket.emit('authenticated', { success: 1 });

     // Emit fake new products every so often
     let id = _products.length;
     setInterval(() => {
       const newProduct = Object.assign({},
         _products[Math.floor(Math.random() * _products.length)],
         { id: ++id }
       );

       socket.emit('new_product', newProduct);
     }, 6000);
   });

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
    const routes = new Routes(reducerRegistry);

    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      webpackIsomorphicTools.refresh();
    }

    match({ routes: routes.configure(), location: req.url || '/' }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {

        // Compile an initial state
        const products = {};
        _products.forEach((p) => products[p.id] = p);

        const initialState = {
          products,
          global: { loading: true },
          routing: { location: renderProps.location }
        }
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

};
