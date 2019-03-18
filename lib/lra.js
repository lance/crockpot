'use strict';

const STATE = Symbol('state');

class LRA {
  constructor (lraId, apiClient) {
    this.id = lraId;
    this.apiClient = apiClient;
    this[STATE] = LRA.states.ACTIVE;
  }

  status () {
    return new Promise((resolve, reject) => {
      this.apiClient.getLRAStatus(this.id,
        (error, result, request, response) => {
          if (error) return reject(error);
          return resolve(response.body);
        });
    });
  }

  isActive () {
    return new Promise((resolve, reject) => {
      this.apiClient.isActiveLRA(this.id,
        (error, result, request, response) => {
          if (error) {
            this[STATE] = LRA.states.UNKNOWN;
            reject(error);
          }
          this[STATE] = response.body === 'true'
            ? LRA.states.ACTIVE
            : LRA.states.UNKNOWN;
          return resolve(this[STATE] === LRA.states.ACTIVE);
        });
    });
  }

  cancel () {
    this[STATE] = LRA.states.CANCELLING;
    return new Promise((resolve, reject) => {
      this.apiClient.cancelLRA(this.id,
        (error, result, request, response) => {
          if (error) return reject(error);
          return resolve(response.body);
        });
    });
  }

  close () {
    return null;
  }
}

LRA.states = {
  ACTIVE: 'active',
  CANCELLING: 'cancelling',
  CANCELLED: 'cancelled',
  FAILED_TO_CANCEL: 'failed to cancel',
  CLOSING: 'closing',
  CLOSED: 'closed',
  FAILED_TO_CLOSE: 'failed to close',
  UNKNOWN: 'unknown'
};

module.exports = exports = LRA;
