'use strict';

/**
 * @module rule/task/expire-survey-instances
 */

const database = require('../../model');

/**
 * Finds all survey instances where the end time has passed, and changes state to 'expired'
 * @returns {Promise<Array<Number, Array<Object>>>} Resolves to number of affected rows and the rows themselves
 */
function expireSurveyInstances () {
    const surveyInstance = database.sequelize.model('survey_instance');

    return surveyInstance.update(
        {
            state: 'expired'
        },
        {
            where: {
                $and: [
                    {
                        endTime: {
                            $lt: new Date()
                        }
                    },
                    {
                        $or: [
                            {
                                state: 'pending'
                            },
                            {
                                state: 'in progress'
                            }
                        ]
                    }
                ]
            }
        }
    );
}

module.exports = expireSurveyInstances;
