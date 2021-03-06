/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * Class representing a ZoneRules.
 */
class ZoneRules {
  /**
   * Create a ZoneRules.
   * @property {boolean} [fixedOffset]
   * @property {array} [transitions]
   * @property {array} [transitionRules]
   */
  constructor() {
  }

  /**
   * Defines the metadata of ZoneRules
   *
   * @returns {object} metadata of ZoneRules
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'ZoneRules',
      type: {
        name: 'Composite',
        className: 'ZoneRules',
        modelProperties: {
          fixedOffset: {
            required: false,
            serializedName: 'fixedOffset',
            type: {
              name: 'Boolean'
            }
          },
          transitions: {
            required: false,
            serializedName: 'transitions',
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'ZoneOffsetTransitionElementType',
                  type: {
                    name: 'Composite',
                    className: 'ZoneOffsetTransition'
                  }
              }
            }
          },
          transitionRules: {
            required: false,
            serializedName: 'transitionRules',
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'ZoneOffsetTransitionRuleElementType',
                  type: {
                    name: 'Composite',
                    className: 'ZoneOffsetTransitionRule'
                  }
              }
            }
          }
        }
      }
    };
  }
}

module.exports = ZoneRules;
