// Based on https://github.com/rackt/redux/issues/37#issue-85098222

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

  getReducers() {
    return this._reducers;
  }

  setChangeListener(listener) {
    if (this._emitChange != null) {
      throw new Error('Can only set the listener for a ReducerRegistry once.')
    }
    this._emitChange = listener
  }
}
