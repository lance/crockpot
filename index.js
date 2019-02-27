'use strict';

const axios = require('axios');

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
  }

  start (clientID, endpoints, timeout) {
    return axios.post(this.lraCoordinatorUrl, {
      clientID,
      headers: constructHeader(endpoints)
    }).then(response => new Participant(response, clientID, timeout))
      .catch(console.error); // TODO: More better error handling
  }

  join (lraID, clientID, endpoints, timeout) {
    return axios.put(this.lraCoordinatorUrl, {
      clientID,
      headers: constructHeader(endpoints)
    }).then(response => new Participant(response, clientID, timeout))
      .catch(console.error);
  }
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
  return `Link: <${endpoints.leave}>; rel="leave"; title="leave URI", \
        <${endpoints.complete}>; rel="leave", title="complete URI", \
        <${endpoints.compensate}>; rel="compensate"; title="compensate URI"`;
}

module.exports = CrockPot;
