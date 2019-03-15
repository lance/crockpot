'use strict';

const test = require('tape');
const crockpot = require('..');

const client = new crockpot('http://localhost:8080');
const endpoints = {
  leave: 'http://127.0.0.1:3000/leave',
  complete: 'http://127.0.0.1:3000/complete',
  compensate: 'http://127.0.0.1:3000/compensate',
  status: 'http://127.0.0.1:3000/status'
};
const timeLimit = 60000;

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

test('A Participant is returned when an LRA has been started', t => {
  t.plan(4);
  client.start('test-crockpot', timeLimit)
    .then(participant => {
      t.ok(participant instanceof crockpot.Participant);
      t.equal(participant.clientId, 'test-crockpot');
      t.equal(participant.timeLimit, timeLimit);
      t.ok(participant.id);
      t.end();
    })
    .catch(t.end);
});

test('A client can start an LRA transaction and get its status', t => {
  t.plan(1);
  client.start('test-crockpot', timeLimit)
    .then(participant => {
      client.status(participant.id)
        .then(resp => {
          t.equal(resp, 'Active');
          t.end();
        })
        .catch(t.end);
    })
    .catch(t.end);
});

test('A client can determine if an LRA is active', t => {
  t.plan(1);
  client.start('test-crockpot', timeLimit)
    .then(participant => {
      client.isActive(participant.id)
        .then(resp => {
          t.equal(resp, true);
          t.end();
        })
        .catch(t.end);
    })
    .catch(t.end);
});

test('A client can cancel an active LRA', t => {
  t.plan(2);
  client.start('test-crockpot', timeLimit)
    .then(participant => {
      client.cancel(participant.id)
        .then(resp => {
          t.equal(resp, 'Cancelled');
          client.isActive(participant.id)
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

test('A compensator can join an active LRA', t => {
  client.start('test-crockpot', timeLimit)
    .then(participant => {
      client.join(participant.id, 'test-crockpot-compensator',
        endpoints, timeLimit)
        .then(resp => {
          t.end();
        })
        .catch(t.end);
    })
    .catch(t.end);
});
