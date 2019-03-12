/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * Class representing a Duration.
 */
class Duration {
  /**
   * Create a Duration.
   * @property {number} [seconds]
   * @property {boolean} [zero]
   * @property {array} [units]
   * @property {boolean} [negative]
   * @property {number} [nano]
   */
  constructor() {
  }

  /**
   * Defines the metadata of Duration
   *
   * @returns {object} metadata of Duration
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'Duration',
      type: {
        name: 'Composite',
        className: 'Duration',
        modelProperties: {
          seconds: {
            required: false,
            serializedName: 'seconds',
            type: {
              name: 'Number'
            }
          },
          zero: {
            required: false,
            serializedName: 'zero',
            type: {
              name: 'Boolean'
            }
          },
          units: {
            required: false,
            serializedName: 'units',
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'TemporalUnitElementType',
                  type: {
                    name: 'Composite',
                    className: 'TemporalUnit'
                  }
              }
            }
          },
          negative: {
            required: false,
            serializedName: 'negative',
            type: {
              name: 'Boolean'
            }
          },
          nano: {
            required: false,
            serializedName: 'nano',
            type: {
              name: 'Number'
            }
          }
        }
      }
    };
  }
}

module.exports = Duration;