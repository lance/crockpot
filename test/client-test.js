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
        t.equal(resp, 'Active');
        t.end();
      })
        .catch(t.end);
    })
    .catch(t.end);
});

// test('A client can determine if an LRA is active', t => {
//   t.plan(1);
//   client.start('test-crockpot-client', timeLimit)
//     .then(lra => {
//       lra.isActive(lra).then(resp => {
//         t.equal(resp, true);
//         t.end();
//       })
//         .catch(t.end);
//     })
//     .catch(t.end);
// });

// test('A client can cancel an active LRA', t => {
//   t.plan(2);
//   client.start('test-crockpot', timeLimit)
//     .then(lra => {
//       client.cancel(lra)
//         .then(resp => {
//           t.equal(resp, 'Cancelled');
//           client.isActive(lra)
//             .then(resp => {
//               t.equal(resp, false);
//               t.end();
//             })
//             .catch(t.end);
//         })
//         .catch(t.end);
//     })
//     .catch(t.end);
// });
