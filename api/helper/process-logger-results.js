'use strict';

/**
 * @module api/helper/process-logger-results
 */

/**
 * Takes in a survey_instance model and processes it into a format recognized by app.
 * @param {Object} logs - list of objects of survey result logs
 * @returns {Object} processed list of logs in an array
 */
function processLoggerResults (logs) {
    return {
        eventName: logs.eventName,
        metaData: JSON.stringify(logs.metaData),
        start: logs.startTime
    };
}

module.exports = processLoggerResults;
