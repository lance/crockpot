'use strict';

const { MicroprofileLra } = require('./openapi');

const STATES = {
  ACTIVE: 'active',
  CANCELLING: 'cancelling',
  CANCELLED: 'cancelled',
  FAILED_TO_CANCEL: 'failed to cancel',
  CLOSING: 'closing',
  CLOSED: 'closed',
  FAILED_TO_CLOSE: 'failed to close'
};

class CrockPot {
  constructor (lraCoordinatorUrl) {
    this.lraCoordinatorUrl = lraCoordinatorUrl;
    this.apiClient = new MicroprofileLra(lraCoordinatorUrl);
  }

  start (clientID, endpoints, timeLimit) {
    const opts = {
      clientID,
      timeLimit,
      customHeaders: { Link: constructHeader(endpoints) }
    };

    return new Promise((resolve, reject) => {
      this.apiClient.startLRA(opts, (error, result, request, response) => {
        if (error) return reject(error);
        const start = response.body.lastIndexOf('/') + 1;
        const end = response.body.lastIndexOf('"');
        const lraId = response.body.substring(start, end);
        return resolve(lraId);
      });
    });
  }

  status (lraId) {
    return new Promise((resolve, reject) => {
      this.apiClient.getLRAStatus(lraId, (error, result, request, response) => {
        if (error) return reject(error);
        return resolve(response.body);
      });
    });
  }

  join (lraID, clientID, endpoints, timeout) {
    // return axios.put(this.lraCoordinatorUrl, {
    //   clientID,
    //   headers: constructHeader(endpoints)
    // }).then(response => new Participant(response, clientID, timeout))
    //   .catch(console.error);
  }

  // status (lraID, )
}

class Participant {
  constructor (lraID, clientId, timeout) {
    this.clientId = clientId;
    this.timeout = timeout;
    this.id = lraID;
  }

  get id () {
    return this.id;
  }

  cancel (lraID) {

  }

  close (lraID) {

  }

  join (lraID) {

  }

  leave (lraID) {

  }

  status (lraID) {

  }
}

CrockPot.states = STATES;
CrockPot.Participant = Participant;

// Link:<http://localhost:8081/leave>; rel="leave"; title="leave URI", \
// <http://localhost:8081/complete>; rel="complete"; title="complete URI", \
// <http://localhost:8081/compensate>; rel="compensate"; title="compensate URI"'
function constructHeader (endpoints) {
  return `<${endpoints.leave}>; rel="leave"; title="leave URI", \
<${endpoints.complete}>; rel="complete", title="complete URI", \
<${endpoints.compensate}>; rel="compensate"; title="compensate URI"`;
}

module.exports = CrockPot;
