
import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

// Import core third-party reducers here, e.g.:
// var {reducer: formReducer} = require('redux-form')

export default function configureReducers(reducers) {
  return combineReducers(Object.assign({},
    reducers,
    { routing: routeReducer }
    // Combine core third-party reducers here, e.g.:
    // form: formReducer
  ))
}
