'use strict';

const test = require('tape');
const { Client, LRA } = require('..');

const client = new Client('http://127.0.0.1:8080');
const timeLimit = 60000;

test('An LRA has possible states', t => {
  t.plan(7);
  t.equal(LRA.states.ACTIVE, 'active');
  t.equal(LRA.states.CANCELLING, 'cancelling');
  t.equal(LRA.states.CANCELLED, 'cancelled');
  t.equal(LRA.states.CLOSED, 'closed');
  t.equal(LRA.states.CLOSING, 'closing');
  t.equal(LRA.states.FAILED_TO_CANCEL, 'failed to cancel');
  t.equal(LRA.states.FAILED_TO_CLOSE, 'failed to close');
  t.end();
});

test('An active LRA can be cancelled', t => {
  t.plan(2);
  client.start('test-crockpot', timeLimit)
    .then(lra => {
      lra.cancel(lra)
        .then(resp => {
          t.equal(resp, 'Cancelled');
          lra.isActive(lra)
            .then(resp => {
              t.equal(resp, false);
              t.end();
            })
            .catch(t.end);
        })
        .catch(t.end);
    })
    .catch(t.end);
});
