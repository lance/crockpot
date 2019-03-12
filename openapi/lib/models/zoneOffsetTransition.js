/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * Class representing a ZoneOffsetTransition.
 */
class ZoneOffsetTransition {
  /**
   * Create a ZoneOffsetTransition.
   * @property {object} [offsetBefore]
   * @property {number} [offsetBefore.totalSeconds]
   * @property {string} [offsetBefore.id]
   * @property {object} [offsetBefore.rules]
   * @property {boolean} [offsetBefore.rules.fixedOffset]
   * @property {array} [offsetBefore.rules.transitions]
   * @property {array} [offsetBefore.rules.transitionRules]
   * @property {object} [offsetAfter]
   * @property {number} [offsetAfter.totalSeconds]
   * @property {string} [offsetAfter.id]
   * @property {object} [offsetAfter.rules]
   * @property {boolean} [offsetAfter.rules.fixedOffset]
   * @property {array} [offsetAfter.rules.transitions]
   * @property {array} [offsetAfter.rules.transitionRules]
   * @property {object} [duration]
   * @property {number} [duration.seconds]
   * @property {boolean} [duration.zero]
   * @property {array} [duration.units]
   * @property {boolean} [duration.negative]
   * @property {number} [duration.nano]
   * @property {boolean} [gap]
   * @property {date} [dateTimeAfter]
   * @property {date} [dateTimeBefore]
   * @property {boolean} [overlap]
   * @property {number} [instant]
   */
  constructor() {
  }

  /**
   * Defines the metadata of ZoneOffsetTransition
   *
   * @returns {object} metadata of ZoneOffsetTransition
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'ZoneOffsetTransition',
      type: {
        name: 'Composite',
        className: 'ZoneOffsetTransition',
        modelProperties: {
          offsetBefore: {
            required: false,
            serializedName: 'offsetBefore',
            type: {
              name: 'Composite',
              className: 'ZoneOffset'
            }
          },
          offsetAfter: {
            required: false,
            serializedName: 'offsetAfter',
            type: {
              name: 'Composite',
              className: 'ZoneOffset'
            }
          },
          duration: {
            required: false,
            serializedName: 'duration',
            type: {
              name: 'Composite',
              className: 'Duration'
            }
          },
          gap: {
            required: false,
            serializedName: 'gap',
            type: {
              name: 'Boolean'
            }
          },
          dateTimeAfter: {
            required: false,
            serializedName: 'dateTimeAfter',
            type: {
              name: 'DateTime'
            }
          },
          dateTimeBefore: {
            required: false,
            serializedName: 'dateTimeBefore',
            type: {
              name: 'DateTime'
            }
          },
          overlap: {
            required: false,
            serializedName: 'overlap',
            type: {
              name: 'Boolean'
            }
          },
          instant: {
            required: false,
            serializedName: 'instant',
            type: {
              name: 'Number'
            }
          }
        }
      }
    };
  }
}

module.exports = ZoneOffsetTransition;
