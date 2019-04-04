'use strict';

const test = require('tape');
const { Client } = require('..');

const client = new Client('http://127.0.0.1:8080');
const timeLimit = 60000;

test('A client can start an LRA transaction and get its status', t => {
  t.plan(1);
  client.start('test-crockpot-client', timeLimit)
    .then(lra => {
      lra.status().then(resp => {
        t.equal(resp.status, 'Active');
        t.end();
      })
        .catch(t.end);
    })
    .catch(t.end);
});
