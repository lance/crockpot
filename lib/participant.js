'use strict';

const STATE = Symbol('state');

class Participant {
  constructor (lraID, clientId, timeLimit) {
    this[STATE] = Participant.states.ACTIVE;
    this.clientId = clientId;
    this.timeLimit = timeLimit;
    this.id = lraID;
  }

  compensate () {
    this[STATE] = Participant.states.COMPENSATING;
    // TODO: Do the work of compensating
    this[STATE] = Participant.states.COMPENSATED;
  }

  complete () {
    this[STATE] = Participant.states.COMPLETING;
    // TODO: DO the work of completing
    this[STATE] = Participant.states.COMPLETED;
  }

  get state () {
    return this[STATE];
  }
}

Participant.states = {
  ACTIVE: 'active',
  COMPENSATING: 'compensating',
  COMPENSATED: 'compensated',
  FAILED_TO_COMPENSATE: 'failed to compensate',
  COMPLETING: 'completing',
  COMPLETED: 'completed',
  FAILED_TO_COMPLETE: 'failed to complete'
};

module.exports = Participant;
