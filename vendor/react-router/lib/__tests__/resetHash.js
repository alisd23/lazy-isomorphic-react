'use strict';

exports.__esModule = true;
function resetHash(done) {
  if (window.location.hash !== '') {
    window.location.hash = '';
    setTimeout(done, 10);
  } else {
    done();
  }
}

exports['default'] = resetHash;
module.exports = exports['default'];