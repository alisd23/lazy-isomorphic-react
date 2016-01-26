import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as logger from 'redux-logger';
import * as thunk from 'redux-thunk';
import reducer from './reducers';
import { getAllProducts } from './actions';
import App from './containers/App';

const middleware = [thunk, logger()];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store: Redux.Store = createStoreWithMiddleware(reducer);

store.dispatch(getAllProducts());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
