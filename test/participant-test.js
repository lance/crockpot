'use strict';

const test = require('tape');
const { Participant, Client } = require('..');

const client = new Client('http://127.0.0.1:8080');
const timeLimit = 60000;

const endpoints = {
  leave: 'http://127.0.0.1:3000/leave',
  complete: 'http://127.0.0.1:3000/complete',
  compensate: 'http://127.0.0.1:3000/compensate',
  status: 'http://127.0.0.1:3000/status'
};

test('An LRA has possible states', t => {
  t.plan(7);
  t.equal(Participant.states.ACTIVE, 'active');
  t.equal(Participant.states.COMPENSATING, 'compensating');
  t.equal(Participant.states.COMPENSATED, 'compensated');
  t.equal(Participant.states.COMPLETING, 'completing');
  t.equal(Participant.states.COMPLETED, 'completed');
  t.equal(Participant.states.FAILED_TO_COMPENSATE, 'failed to compensate');
  t.equal(Participant.states.FAILED_TO_COMPLETE, 'failed to complete');
  t.end();
});

test('A Participant can join an active LRA', t => {
  client.start('test-crockpot', timeLimit)
    .then(lra => {
      client.join(lra.id, 'test-crockpot-participant',
        endpoints, timeLimit)
        .then(resp => {
          t.equal(resp.constructor.name, 'Participant');
          // TODO: Review spec and what should be returned here
          t.equal(resp.id, lra);
          t.end();
        })
        .catch(t.end);
    })
    .catch(t.end);
});
