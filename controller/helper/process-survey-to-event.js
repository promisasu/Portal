'use strict';

/**
 * Takes a Survey Instance and creates a Calendar event
 * @param {Object} surveyInstance - instance to process
 * @returns {Object} Full Calendar event
 */
function processSurveyToEvent (surveyInstance) {
    return {
        title: surveyInstance.name,
        className: statusToColor(surveyInstance.status),
        start: surveyInstance.startTime,
        end: surveyInstance.endTime
    };
}

/**
 * Takes a Survey Instance status and chooses a color name
 * @param {String} status - status name
 * @returns {String} color name
 */
function statusToColor (status) {
    switch (status) {
        case 'completed':
            return 'green';
        case 'in progress':
        case 'pending':
            return '';
        default:
            return 'red';
    }
}

module.exports = processSurveyToEvent;
