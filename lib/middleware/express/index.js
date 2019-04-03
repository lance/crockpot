'use strict';

function express (opts) {
  return function lra (request, response, next) {
    console.log(opts);
    next();
  };
}

module.exports = exports = express;
