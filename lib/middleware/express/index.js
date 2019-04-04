'use strict';

function express (type, timeLimit) {
  return function lra (request, response, next) {
    console.log('here');
    next();
  };
}

module.exports = exports = express;
