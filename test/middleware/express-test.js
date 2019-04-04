'use strict';

const test = require('tape');
const { Middleware, LRA } = require('../..');
const expressLra = Middleware.express;

test('Middleware with types.REQUIRED, creates a new LRA if not provided', t => {
  const middleware = expressLra(LRA.types.REQUIRED, 30000);
  t.equal(typeof middleware, 'function');
  t.equal(middleware.LRA, undefined);
  middleware(undefined, undefined, _ => _);
  t.end();
});
