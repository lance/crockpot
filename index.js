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
        return resolve(new Participant(lraId, clientID, timeLimit));
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

  isActive (lraId) {
    return new Promise((resolve, reject) => {
      this.apiClient.isActiveLRA(lraId, (error, result, request, response) => {
        if (error) return reject(error);
        return resolve(response.body === 'true');
      });
    });
  }

  cancel (lraId) {
    return new Promise((resolve, reject) => {
      this.apiClient.cancelLRA(lraId, (error, result, request, response) => {
        if (error) return reject(error);
        return resolve(response.body);
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
          return resolve(response.body);
        });
    });
  }
}

class Participant {
  constructor (lraID, clientId, timeLimit) {
    this.clientId = clientId;
    this.timeLimit = timeLimit;
    this.id = lraID;
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
  return `<${endpoints.status}>; rel="status"; title="status URI", \
<${endpoints.leave}>; rel="leave"; title="leave URI", \
<${endpoints.complete}>; rel="complete"; title="complete URI", \
<${endpoints.compensate}>; rel="compensate"; title="compensate URI"`;
}

module.exports = CrockPot;
