// Based on https://github.com/rackt/redux/issues/37#issue-85098222

import { combineReducers } from 'redux';

export default class ReducerRegistry {
  _reducers: Object;
  _emitChange: Function;

  constructor(initialReducers = {}) {
    this._reducers = initialReducers;
    this._emitChange = null;
  }

  register(newReducers) {
    this._reducers = Object.assign({},
      this._reducers,
      newReducers
    );
    if (this._emitChange != null) {
      this._emitChange(this.getReducers());
    }
  }

  setChangeListener(listener) {
    if (this._emitChange != null) {
      throw new Error('Can only set the listener for a ReducerRegistry once.')
    }
    this._emitChange = listener
  }


  //----------------------//
  //        GETTERS       //
  //----------------------//
  getReducers() {
    return this._reducers;
  }


  /**
   * Replace the given reducers and update the store
   * @param  {object} store           Redux Store
   * @param  {object} updatedReducers Key value map of reducers to update
   */
  updateReducers(store, updatedReducers) {
    const currentReducers = this.getReducers();
    Object.keys(updatedReducers).forEach((reducer) => {
      if (!currentReducers[reducer])
        delete updatedReducers[reducer];
    });

    console.log("UPDATE REDUCERS: ", updatedReducers);
    
    store.replaceReducer(combineReducers(Object.assign({},
      currentReducers,
      updatedReducers
    )));
  }
}
