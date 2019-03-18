'use strict';

const LRA = require('./lra');
const Participant = require('./participant');
const MicroprofileLra = require('../openapi');

class Client {
  constructor (lraCoordinatorUrl) {
    this.lraCoordinatorUrl = lraCoordinatorUrl;
    this.apiClient = new MicroprofileLra(lraCoordinatorUrl);
  }

  start (clientID, timeLimit) {
    const opts = {
      clientID,
      timeLimit
    };

    return new Promise((resolve, reject) => {
      this.apiClient.startLRA(opts, (error, result, request, response) => {
        if (error) return reject(error);
        const start = response.body.lastIndexOf('/') + 1;
        const end = response.body.lastIndexOf('"');
        const lraId = response.body.substring(start, end);
        return resolve(new LRA(lraId, this.apiClient));
      });
    });
  }

  join (lraID, clientID, endpoints, timeLimit) {
    const opts = {
      clientID,
      timeLimit,
      link: constructHeader(endpoints)
    };

    return new Promise((resolve, reject) => {
      this.apiClient.joinLRAViaBody(lraID, timeLimit, opts,
        (error, result, request, response) => {
          if (error) return reject(error);
          if (response.statusCode === 412) return reject(response.body);
          console.log('BODY', response.body);
          return resolve(new Participant(response.body));
        });
    });
  }
}

function constructHeader (endpoints) {
  return `<${endpoints.status}>; rel="status"; title="status URI", \
<${endpoints.leave}>; rel="leave"; title="leave URI", \
<${endpoints.complete}>; rel="complete"; title="complete URI", \
<${endpoints.compensate}>; rel="compensate"; title="compensate URI"`;
}

module.exports = exports = Client;
