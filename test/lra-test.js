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

test('An LRA can determine if it is active', t => {
  t.plan(1);
  client.start('test-crockpot-client', timeLimit)
    .then(lra => {
      lra.isActive().then(resp => {
        t.equal(resp, true);
        t.end();
      })
        .catch(t.end);
    })
    .catch(t.end);
});

test('An active LRA can be cancelled', t => {
  t.plan(2);
  client.start('test-crockpot', timeLimit)
    .then(lra => {
      lra.cancel()
        .then(resp => {
          t.equal(resp, 'Cancelled');
          lra.isActive()
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

test('An LRA can provide its status', t => {
  t.plan(6);
  client.start('test-crockpot-client', timeLimit)
    .then(lra => {
      lra.status().then(resp => {
        t.equal(resp.clientId, 'test-crockpot-client');
        t.equal(resp.status, 'Active');
        t.equal(resp.complete, false);
        t.equal(resp.recovering, false);
        t.equal(resp.topLevel, true);
        t.equal(resp.active, true);
        t.end();
      })
        .catch(t.end);
    })
    .catch(t.end);
});
