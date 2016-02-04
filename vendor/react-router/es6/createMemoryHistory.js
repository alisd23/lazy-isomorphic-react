'use strict';

export default createMemoryHistory;
import useQueries from 'history/lib/useQueries';
import baseCreateMemoryHistory from 'history/lib/createMemoryHistory';
function createMemoryHistory(options) {
  // signatures and type checking differ between `useRoutes` and
  // `createMemoryHistory`, have to create `memoryHistory` first because
  // `useQueries` doesn't understand the signature
  var memoryHistory = baseCreateMemoryHistory(options);
  var createHistory = function createHistory() {
    return memoryHistory;
  };
  var history = useQueries(createHistory)(options);
  history.__v2_compatible__ = true;
  return history;
}