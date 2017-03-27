'use strict';

/**
 * @module controller/handler/trial-csv
 */

const database = require('../../model');
const convertJsonToCsv = require('../helper/convert-json-to-csv');
const boom = require('boom');
const deduplicate = require('../helper/deduplicate');
const customMap = require('hashmap');
const configuration = [
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
        label: '0',
        key: 'State0',
        default: ''
    },
    {
        label: '1',
        key: 'State1',
        default: ''
    },
    {
        label: '2',
        key: 'State2',
        default: ''
    },
    {
        label: '3',
        key: 'State3',
        default: ''
    },
    {
        label: '4',
        key: 'State4',
        default: ''
    },
    {
        label: '5',
        key: 'State5',
        default: ''
    }

];

/**
 * Create a Comma Seperate Value export of the data of all the patient's that are enrolled in a trial.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function trialCSV (request, reply) {
    const formatSpecifier = '%a %b %d %Y %T';

    database.sequelize.query(
        `
        SELECT p.PatientPin, p.DateStarted, a.State FROM patients p
        JOIN activity_instance a
        ON p.PatientPin = a.PatientPinFk
        WHERE a.activityTitle='Sickle Cell Weekly Survey'
        ORDER BY p.PatientPin;
        `,
        {
            type: database.sequelize.QueryTypes.SELECT,
            replacements: [
                formatSpecifier,
                formatSpecifier,
                request.params.id
            ]
        }
    )
    .then((optionsWithAnswers) => {
        optionsWithAnswers = formatData(optionsWithAnswers);
        return convertJsonToCsv(optionsWithAnswers, configuration);
    })
    .then((csv) => {
        return reply(csv).type('text/csv');
    })
    .catch((err) => {
        console.error(err);
        reply(boom.notFound('patient data not found'));
    });
}


function formatData(optionsWithAnswers){
  var map = new customMap();
  var resultSet = [];
  var resultObject = {'PatientPin':null,'DateStarted':'somedate', 'State0':'','State1':'','State2':'','State3':'','State4':'','State5':''};
  for (var row of optionsWithAnswers){
      var x = -1;
      resultObject.PatientPin = row.PatientPin;
      resultObject.DateStarted = row.DateStarted;
    if(map.has(row.PatientPin)){
      //do nothing
    }else{
      for(var row1 of optionsWithAnswers){
        if(row1.PatientPin === resultObject.PatientPin){
                x++;
                if (x === 0){
                    resultObject.State0 = determineStatus(row1.State);
                }
                else if (x === 1)
                {
                        resultObject.State1 = determineStatus(row1.State);

                }else if (x === 2)
                {
                        resultObject.State2 = determineStatus(row1.State);

                }else if (x === 3)
                {
                      resultObject.State3 = determineStatus(row1.State);

                }else if (x === 4)
                {
                  resultObject.State4 = determineStatus(row1.State);
                }else if (x === 5)
                {
                  resultObject.State5 = determineStatus(row1.State);
                }
        }
      }
      map.set(resultObject.PatientPin, '{"PatientPin":'+resultObject.PatientPin+',"DateStarted":"'+resultObject.DateStarted+'","State0":"'+resultObject.State0+'","State1":"'+resultObject.State1+'","State2":"'+resultObject.State2+'","State3":"'+resultObject.State3+'","State4":"'+resultObject.State4+'","State5":"'+resultObject.State5+'"}');
    }
}
      map.forEach(function(value, key) {
        resultSet.push(JSON.parse(value));
      });
      // console.log(resultSet);
      return resultSet;
}

function determineStatus(status){
  if(status === 'completed'){
      return 'Y';
  }else if(status === 'pending'){
        return 'N';
  }else if(status === 'expired'){
        return ' ';
  }else if(status === 'DEACTIVATED'){
    return 'DEACTIVATED';
  }
}

module.exports = trialCSV;
