'use strict';

/**
 * @module controller/handler/trial-csv
 */

const database = require('../../model');
const convertJsonToCsv = require('../helper/convert-json-to-csv');
const boom = require('boom');
const deduplicate = require('../helper/deduplicate');
const CustomMap = require('hashmap');

/**
 * Create a Comma Seperate Value export of the data of all the patient's that are enrolled in a trial.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function trialCSV (request, reply) {
    const formatSpecifier = '%a %b %d %Y %T';
    let dailyregex = new RegExp('/trial/.-daily.csv', 'g');
    let weeklyregex = new RegExp('/trial/.-weekly.csv', 'g');
    let configuration = '';
    let query = '';

    if (weeklyregex.test(request.path) === true) {
        configuration = [
            {
                label: 'Patient Pin',
                key: 'PatientPin',
                default: ''
            },
            {
                label: 'Date Started',
                key: 'DateStarted',
                default: ''
            },
            {
                label: 'Week 0',
                key: 'State0',
                default: ''
            },
            {
                label: 'Week 1',
                key: 'State1',
                default: ''
            },
            {
                label: 'Week 2',
                key: 'State2',
                default: ''
            },
            {
                label: 'Week 3',
                key: 'State3',
                default: ''
            },
            {
                label: 'Week 4',
                key: 'State4',
                default: ''
            },
            {
                label: 'Week 5',
                key: 'State5',
                default: ''
            }];
        query = 'Sickle Cell Weekly Survey';
    } else if (dailyregex.test(request.path) === true) {
        configuration = [
            {
                label: 'Patient Pin',
                key: 'PatientPin',
                default: ''
            },
            {
                label: 'Date Started',
                key: 'DateStarted',
                default: ''
            },
            {
                label: 'Day 0',
                key: 'State0',
                default: ''
            },
            {
                label: 'Day 1',
                key: 'State1',
                default: ''
            },
            {
                label: 'Day 2',
                key: 'State2',
                default: ''
            },
            {
                label: 'Day 3',
                key: 'State3',
                default: ''
            },
            {
                label: 'Day 4',
                key: 'State4',
                default: ''
            },
            {
                label: 'Day 5',
                key: 'State5',
                default: ''
            },
            {
                label: 'Day 6',
                key: 'State6',
                default: ''
            },
            {
                label: 'Day 7',
                key: 'State7',
                default: ''
            },
            {
                label: 'Day 8',
                key: 'State8',
                default: ''
            },
            {
                label: 'Day 9',
                key: 'State9',
                default: ''
            },
            {
                label: 'Day 10',
                key: 'State10',
                default: ''
            },
            {
                label: 'Day 11',
                key: 'State11',
                default: ''
            },
            {
                label: 'Day 12',
                key: 'State12',
                default: ''
            },
            {
                label: 'Day 13',
                key: 'State13',
                default: ''
            },
            {
                label: 'Day 14',
                key: 'State14',
                default: ''
            },
            {
                label: 'Day 15',
                key: 'State15',
                default: ''
            },
            {
                label: 'Day 16',
                key: 'State16',
                default: ''
            },
            {
                label: 'Day 17',
                key: 'State17',
                default: ''
            },
            {
                label: 'Day 18',
                key: 'State18',
                default: ''
            },
            {
                label: 'Day 19',
                key: 'State19',
                default: ''
            },
            {
                label: 'Day 20',
                key: 'State20',
                default: ''
            },
            {
                label: 'Day 21',
                key: 'State21',
                default: ''
            },
            {
                label: 'Day 22',
                key: 'State22',
                default: ''
            },
            {
                label: 'Day 23',
                key: 'State23',
                default: ''
            },
            {
                label: 'Day 24',
                key: 'State24',
                default: ''
            },
            {
                label: 'Day 25',
                key: 'State25',
                default: ''
            },
            {
                label: 'Day 26',
                key: 'State26',
                default: ''
            },
            {
                label: 'Day 27',
                key: 'State27',
                default: ''
            },
            {
                label: 'Day 28',
                key: 'State28',
                default: ''
            },
            {
                label: 'Day 29',
                key: 'State29',
                default: ''
            },
            {
                label: 'Day 30',
                key: 'State30',
                default: ''
            },
            {
                label: 'Day 31',
                key: 'State31',
                default: ''
            },
            {
                label: 'Day 32',
                key: 'State32',
                default: ''
            },
            {
                label: 'Day 33',
                key: 'State33',
                default: ''
            },
            {
                label: 'Day 34',
                key: 'State34',
                default: ''
            },
            {
                label: 'Day 35',
                key: 'State35',
                default: ''
            }
        ];
        query = 'Sickle Cell Daily Survey';
    } else {
        query = 'Unknown';
    }

    // AND a.state IN ('completed','expired')

    database.sequelize.query(
            `
        SELECT a.State, a.StartTime, p.DateStarted, p.PatientPin
        FROM activity_instance a
        JOIN patients p
        ON a.PatientPinFk = p.PatientPin
        WHERE a.activityTitle = ?
        ORDER BY a.PatientPinFk, a.ActivityInstanceId;
        `, {
            type: database.sequelize.QueryTypes.SELECT,
            replacements: [
                query,
                formatSpecifier,
                formatSpecifier
            ]
        })
        .then((queryResults) => {
            let optionsWithAnswers = queryResults;

            return optionsWithAnswers;
        })
        .then((returnedOptionsWithAnswers) => {
            let optionsWithAnswers = formatData(returnedOptionsWithAnswers);

            return optionsWithAnswers;
        })
        .then((formattedOptionsWithAnswers) => {
            return convertJsonToCsv(formattedOptionsWithAnswers, configuration);
        })
        .then((csv) => {
            return reply(csv).type('text/csv');
        })
        .catch((err) => {
            console.error(err);
            reply(boom.notFound('patient data not found'));
        });
}
/**
 * Forms a result set for the csv.
 * @param {Array} optionsWithAnswers - all options with answers.
 * @returns {Array} A result set.
 */
function formatData (optionsWithAnswers) {
    let map = new CustomMap();
    let resultSet = [];

    for (let row of optionsWithAnswers) {
        let resultObject = {
            'PatientPin': null,
            'DateStarted': 'somedate',
            'State0': ' ',
            'State1': ' ',
            'State2': ' ',
            'State3': ' ',
            'State4': ' ',
            'State5': ' ',
            'State6': ' ',
            'State7': ' ',
            'State8': ' ',
            'State9': ' ',
            'State10': ' ',
            'State11': ' ',
            'State12': ' ',
            'State13': ' ',
            'State14': ' ',
            'State15': ' ',
            'State16': ' ',
            'State17': ' ',
            'State18': ' ',
            'State19': ' ',
            'State20': ' ',
            'State21': ' ',
            'State22': ' ',
            'State23': ' ',
            'State24': ' ',
            'State25': ' ',
            'State26': ' ',
            'State27': ' ',
            'State28': ' ',
            'State29': ' ',
            'State30': ' ',
            'State31': ' ',
            'State32': ' ',
            'State33': ' ',
            'State34': ' ',
            'State35': ' '
        };
        let x = -1;

        resultObject.PatientPin = row.PatientPin;
        resultObject.DateStarted = row.DateStarted;
        if (map.has(row.PatientPin)) {
            // do nothing
            // console.log(row.PatientPin + 'already exists');
        } else {
            console.log(row.PatientPin + 'First Occurence');
            for (let innerRow of optionsWithAnswers) {
                if (innerRow.PatientPin === resultObject.PatientPin) {
                    console.log(innerRow.PatientPin + ' ' + innerRow.State);
                    x++;
                    switch (x) {
                        case 0:
                            resultObject.State0 = determineStatus(innerRow.State);
                            break;
                        case 1:
                            resultObject.State1 = determineStatus(innerRow.State);
                            break;
                        case 2:
                            resultObject.State2 = determineStatus(innerRow.State);
                            break;
                        case 3:
                            resultObject.State3 = determineStatus(innerRow.State);
                            break;
                        case 4:
                            resultObject.State4 = determineStatus(innerRow.State);
                            break;
                        case 5:
                            resultObject.State5 = determineStatus(innerRow.State);
                            break;
                        case 6:
                            resultObject.State6 = determineStatus(innerRow.State);
                            break;
                        case 7:
                            resultObject.State7 = determineStatus(innerRow.State);
                            break;
                        case 8:
                            resultObject.State8 = determineStatus(innerRow.State);
                            break;
                        case 9:
                            resultObject.State9 = determineStatus(innerRow.State);
                            break;
                        case 10:
                            resultObject.State10 = determineStatus(innerRow.State);
                            break;
                        case 11:
                            resultObject.State11 = determineStatus(innerRow.State);
                            break;
                        case 12:
                            resultObject.State12 = determineStatus(innerRow.State);
                            break;
                        case 13:
                            resultObject.State13 = determineStatus(innerRow.State);
                            break;
                        case 14:
                            resultObject.State14 = determineStatus(innerRow.State);
                            break;
                        case 15:
                            resultObject.State15 = determineStatus(innerRow.State);
                            break;
                        case 16:
                            resultObject.State16 = determineStatus(innerRow.State);
                            break;
                        case 17:
                            resultObject.State17 = determineStatus(innerRow.State);
                            break;
                        case 18:
                            resultObject.State18 = determineStatus(innerRow.State);
                            break;
                        case 19:
                            resultObject.State19 = determineStatus(innerRow.State);
                            break;
                        case 20:
                            resultObject.State20 = determineStatus(innerRow.State);
                            break;
                        case 21:
                            resultObject.State21 = determineStatus(innerRow.State);
                            break;
                        case 22:
                            resultObject.State22 = determineStatus(innerRow.State);
                            break;
                        case 23:
                            resultObject.State23 = determineStatus(innerRow.State);
                            break;
                        case 24:
                            resultObject.State24 = determineStatus(innerRow.State);
                            break;
                        case 25:
                            resultObject.State25 = determineStatus(innerRow.State);
                            break;
                        case 26:
                            resultObject.State26 = determineStatus(innerRow.State);
                            break;
                        case 27:
                            resultObject.State27 = determineStatus(innerRow.State);
                            break;
                        case 28:
                            resultObject.State28 = determineStatus(innerRow.State);
                            break;
                        case 29:
                            resultObject.State29 = determineStatus(innerRow.State);
                            break;
                        case 30:
                            resultObject.State30 = determineStatus(innerRow.State);
                            break;
                        case 31:
                            resultObject.State31 = determineStatus(innerRow.State);
                            break;
                        case 32:
                            resultObject.State32 = determineStatus(innerRow.State);
                            break;
                        case 33:
                            resultObject.State33 = determineStatus(innerRow.State);
                            break;
                        case 34:
                            resultObject.State34 = determineStatus(innerRow.State);
                            break;
                        case 35:
                            resultObject.State35 = determineStatus(innerRow.State);
                            break;

                    }
                }
            }
            map.set(resultObject.PatientPin, '{"PatientPin":' + resultObject.PatientPin
                + ',"DateStarted":"' + resultObject.DateStarted + '","State0":"' + resultObject.State0
                + '","State1":"' + resultObject.State1 + '","State2":"' + resultObject.State2
                + '","State3":"' + resultObject.State3 + '","State4":"' + resultObject.State4
                + '","State5":"' + resultObject.State5 + '","State6":"' + resultObject.State6
                + '","State7":"' + resultObject.State7 + '","State8":"' + resultObject.State8
                + '","State9":"' + resultObject.State9 + '","State10":"' + resultObject.State10
                + '","State11":"' + resultObject.State11 + '","State12":"' + resultObject.State12
                + '","State13":"' + resultObject.State13 + '","State14":"' + resultObject.State14
                + '","State15":"' + resultObject.State15 + '","State16":"' + resultObject.State16
                + '","State17":"' + resultObject.State17 + '","State18":"' + resultObject.State18
                + '","State19":"' + resultObject.State19 + '","State20":"' + resultObject.State20
                + '","State21":"' + resultObject.State21 + '","State22":"' + resultObject.State22
                + '","State23":"' + resultObject.State23 + '","State24":"' + resultObject.State24
                + '","State25":"' + resultObject.State25 + '","State26":"' + resultObject.State26
                + '","State27":"' + resultObject.State27 + '","State28":"' + resultObject.State28
                + '","State29":"' + resultObject.State29 + '","State30":"' + resultObject.State30
                + '","State31":"' + resultObject.State31 + '","State32":"' + resultObject.State32
                + '","State33":"' + resultObject.State33 + '","State34":"' + resultObject.State34
                + '","State35":"' + resultObject.State35 + '"}');
        }
    }
    map.forEach((value, key) => {
        resultSet.push(JSON.parse(value));
    });
    console.log(resultSet);

    return resultSet;
}

/**
 * Determine status
 * @param {string} status as a string.
 * @returns {string} status in terms of required csv format.
 */
function determineStatus (status) {
    if (status === 'completed') {
        return 'Y';
    } else if (status === 'pending') {
        return ' ';
    } else if (status === 'expired') {
        return 'N';
    } else if (status === 'DEACTIVATED') {
        return 'PIN DEACTIVATED AT THIS POINT';
    } else if (status === 'in progress') {
        return 'IN PROGRESS';
    } else {
        return ' ';
    }
}

module.exports = trialCSV;
