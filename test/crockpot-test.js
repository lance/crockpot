'use strict';

const test = require('tape');
const crockpot = require('..');

test('module returns a CockPot constructor function', t => {
  t.equal(typeof crockpot, 'function');
  t.equal(crockpot.name, 'CrockPot');
  t.end();
});

test('CrockPot constructor exposes a Participant object', t => {
  t.equal(typeof crockpot.Participant, 'function');
  t.equal(crockpot.Participant.name, 'Participant');
  t.end();
});

test('An LRA client has possible states', t => {
  t.plan(6);
  t.equal(crockpot.states.ACTIVE, 'active');
  t.equal(crockpot.states.CANCELLED, 'cancelled');
  t.equal(crockpot.states.CLOSED, 'closed');
  t.equal(crockpot.states.CLOSING, 'closing');
  t.equal(crockpot.states.FAILED_TO_CANCEL, 'failed to cancel');
  t.equal(crockpot.states.FAILED_TO_CLOSE, 'failed to close');
  t.end();
});

test('An LRA client can start an LRA transaction', t => {
  const client = new crockpot('http://localhost:8080');
  const endpoints = {
    leave: 'http://127.0.0.1:3000/leave',
    complete: 'http://127.0.0.1:3000/complete',
    compensate: 'http://127.0.0.1:3000/compensate'
  };

  client.start(`${Date.now()}`, endpoints, 60000)
    .then(resp => {
      client.status(resp)
        .then(resp => {
          t.equal(resp, 'Active');
          t.end();
        });
    })
    .catch(t.end);
});
