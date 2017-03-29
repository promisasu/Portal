'use strict';

/**
 * @module controller/handler/trial-csv
 */

const database = require('../../model');
const convertJsonToCsv = require('../helper/convert-json-to-csv');
const boom = require('boom');
const deduplicate = require('../helper/deduplicate');
const customMap = require('hashmap');

//Configuration JSON for Weekly activities
// const configuration = [
//     {
//         label: 'Patient Pin',
//         key: 'PatientPin',
//         default: ''
//     },
//     {
//         label: 'Date Started',
//         key: 'DateStarted',
//         default: ''
//     },
//     {
//         label: '0',
//         key: 'State0',
//         default: ''
//     },
//     {
//         label: '1',
//         key: 'State1',
//         default: ''
//     },
//     {
//         label: '2',
//         key: 'State2',
//         default: ''
//     },
//     {
//         label: '3',
//         key: 'State3',
//         default: ''
//     },
//     {
//         label: '4',
//         key: 'State4',
//         default: ''
//     },
//     {
//         label: '5',
//         key: 'State5',
//         default: ''
//     }
//
// ];


//configuration JSON for Daily activities
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
    },
    {
        label: '6',
        key: 'State6',
        default: ''
    },
    {
        label: '7',
        key: 'State7',
        default: ''
    },
    {
        label: '8',
        key: 'State8',
        default: ''
    },
    {
        label: '9',
        key: 'State9',
        default: ''
    },
    {
        label: '10',
        key: 'State10',
        default: ''
    },
    {
        label: '11',
        key: 'State11',
        default: ''
    },
    {
        label: '12',
        key: 'State12',
        default: ''
    },
    {
        label: '13',
        key: 'State13',
        default: ''
    },
    {
        label: '14',
        key: 'State14',
        default: ''
    },
    {
        label: '15',
        key: 'State15',
        default: ''
    },
    {
        label: '16',
        key: 'State16',
        default: ''
    },
    {
        label: '17',
        key: 'State17',
        default: ''
    },
    {
        label: '18',
        key: 'State18',
        default: ''
    },
    {
        label: '19',
        key: 'State19',
        default: ''
    },
    {
        label: '20',
        key: 'State20',
        default: ''
    },
    {
        label: '21',
        key: 'State21',
        default: ''
    },
    {
        label: '22',
        key: 'State22',
        default: ''
    },
    {
        label: '23',
        key: 'State23',
        default: ''
    },
    {
        label: '24',
        key: 'State24',
        default: ''
    },
    {
        label: '25',
        key: 'State25',
        default: ''
    },
    {
        label: '26',
        key: 'State26',
        default: ''
    },
    {
        label: '27',
        key: 'State27',
        default: ''
    },
    {
        label: '28',
        key: 'State28',
        default: ''
    },
    {
        label: '29',
        key: 'State29',
        default: ''
    },
    {
        label: '30',
        key: 'State30',
        default: ''
    },
    {
        label: '31',
        key: 'State31',
        default: ''
    },
    {
        label: '32',
        key: 'State32',
        default: ''
    },
    {
        label: '33',
        key: 'State33',
        default: ''
    },
    {
        label: '34',
        key: 'State34',
        default: ''
    },
    {
        label: '35',
        key: 'State35',
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

    // SELECT a.State, p.DateStarted, p.PatientPin
    // FROM activity_instance a
    // JOIN patients p
    // ON a.PatientPinFk = p.PatientPin
    // WHERE a.activityTitle = 'Sickle Cell Weekly Survey'   ---->> Query for weekly activities
    // ORDER BY a.PatientPinFk;

    database.sequelize.query(
        `
        SELECT a.State, p.DateStarted, p.PatientPin
        FROM activity_instance a
        JOIN patients p
        ON a.PatientPinFk = p.PatientPin
        WHERE a.activityTitle = 'Sickle Cell Daily Survey'
        ORDER BY a.PatientPinFk;
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
        //console.log(optionsWithAnswers);
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

//Function formatData to format the WEEKLY ACTIVITIES data to get it in the proper fomat for the CSV
// function formatData(optionsWithAnswers){
//   var map = new customMap();
//   var resultSet = [];
//   var resultObject = {'PatientPin':null,'DateStarted':'somedate', 'State0':'','State1':'','State2':'','State3':'','State4':'','State5':''};
//   for (var row of optionsWithAnswers){
//       var x = -1;
//       resultObject.PatientPin = row.PatientPin;
//       resultObject.DateStarted = row.DateStarted;
//     if(map.has(row.PatientPin)){
//       //do nothing
//     }else{
//       for(var row1 of optionsWithAnswers){
//         if(row1.PatientPin === resultObject.PatientPin){
//                 x++;
//                 if (x === 0){
//                     resultObject.State0 = determineStatus(row1.State);
//                 }
//                 else if (x === 1)
//                 {
//                         resultObject.State1 = determineStatus(row1.State);
//
//                 }else if (x === 2)
//                 {
//                         resultObject.State2 = determineStatus(row1.State);
//
//                 }else if (x === 3)
//                 {
//                       resultObject.State3 = determineStatus(row1.State);
//
//                 }else if (x === 4)
//                 {
//                   resultObject.State4 = determineStatus(row1.State);
//                 }else if (x === 5)
//                 {
//                   resultObject.State5 = determineStatus(row1.State);
//                 }
//         }
//       }
//       map.set(resultObject.PatientPin, '{"PatientPin":'+resultObject.PatientPin+',"DateStarted":"'+resultObject.DateStarted+'","State0":"'+resultObject.State0+'","State1":"'+resultObject.State1+'","State2":"'+resultObject.State2+'","State3":"'+resultObject.State3+'","State4":"'+resultObject.State4+'","State5":"'+resultObject.State5+'"}');
//     }
// }
//       map.forEach(function(value, key) {
//         resultSet.push(JSON.parse(value));
//       });
//       // console.log(resultSet);
//       return resultSet;
// }

//Function formatData to format the DAILY ACTIVITIES data to get it in the proper format for the CSV
function formatData(optionsWithAnswers){
  console.log(optionsWithAnswers);
  var map = new customMap();
  var resultSet = [];
  var resultObject = {'PatientPin':null,'DateStarted':'somedate', 'State0':' ','State1':' ','State2':' ','State3':' ','State4':' ','State5':' ','State6':' ','State7':' ','State8':' ','State9':' ',
  'State10':' ','State11':' ','State12':' ','State13':' ','State14':' ','State15':' ','State16':' ','State17':' ','State18':' ','State19':' ','State20':' ','State21':' ',
  'State22':' ','State23':' ','State24':' ','State25':' ','State26':' ','State27':' ','State28':' ','State29':' ','State30':' ','State31':' ','State32':' ','State33':' ','State34':' ',
  'State35':' '};
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
                switch(x){
                  case 0:
                  resultObject.State0 = determineStatus(row1.State);
                  break;
                  case 1:
                  resultObject.State1 = determineStatus(row1.State);
                  break;
                  case 2:
                  resultObject.State2 = determineStatus(row1.State);
                  break;
                  case 3:
                  resultObject.State3 = determineStatus(row1.State);
                  break;
                  case 4:
                  resultObject.State4 = determineStatus(row1.State);
                  break;
                  case 5:
                  resultObject.State5 = determineStatus(row1.State);
                  break;
                  case 6:
                  resultObject.State6 = determineStatus(row1.State);
                  break;
                  case 7:
                  resultObject.State7 = determineStatus(row1.State);
                  break;
                  case 8:
                  resultObject.State8 = determineStatus(row1.State);
                  break;
                  case 9:
                  resultObject.State9 = determineStatus(row1.State);
                  break;
                  case 10:
                  resultObject.State10 = determineStatus(row1.State);
                  break;
                  case 11:
                  resultObject.State11 = determineStatus(row1.State);
                  break;
                  case 12:
                  resultObject.State12 = determineStatus(row1.State);
                  break;
                  case 13:
                  resultObject.State13 = determineStatus(row1.State);
                  break;
                  case 14:
                  resultObject.State14 = determineStatus(row1.State);
                  break;
                  case 15:
                  resultObject.State15 = determineStatus(row1.State);
                  break;
                  case 16:
                  resultObject.State16 = determineStatus(row1.State);
                  break;
                  case 17:
                  resultObject.State17 = determineStatus(row1.State);
                  break;
                  case 18:
                  resultObject.State18 = determineStatus(row1.State);
                  break;
                  case 19:
                  resultObject.State19 = determineStatus(row1.State);
                  break;
                  case 20:
                  resultObject.State20 = determineStatus(row1.State);
                  break;
                  case 21:
                  resultObject.State21 = determineStatus(row1.State);
                  break;
                  case 22:
                  resultObject.State22 = determineStatus(row1.State);
                  break;
                  case 23:
                  resultObject.State23 = determineStatus(row1.State);
                  break;
                  case 24:
                  resultObject.State24 = determineStatus(row1.State);
                  break;
                  case 25:
                  resultObject.State25 = determineStatus(row1.State);
                  break;
                  case 26:
                  resultObject.State26 = determineStatus(row1.State);
                  break;
                  case 27:
                  resultObject.State27 = determineStatus(row1.State);
                  break;
                  case 28:
                  resultObject.State28 = determineStatus(row1.State);
                  break;
                  case 29:
                  resultObject.State29 = determineStatus(row1.State);
                  break;
                  case 30:
                  resultObject.State30 = determineStatus(row1.State);
                  break;
                  case 31:
                  resultObject.State31 = determineStatus(row1.State);
                  break;
                  case 32:
                  resultObject.State32 = determineStatus(row1.State);
                  break;
                  case 33:
                  resultObject.State33 = determineStatus(row1.State);
                  break;
                  case 34:
                  resultObject.State34 = determineStatus(row1.State);
                  break;
                  case 35:
                  resultObject.State35 = determineStatus(row1.State);
                  break;

                }
          }
      }
      map.set(resultObject.PatientPin, '{"PatientPin":'+resultObject.PatientPin+',"DateStarted":"'+resultObject.DateStarted+'","State0":"'+resultObject.State0+'","State1":"'+resultObject.State1+'","State2":"'+resultObject.State2+'","State3":"'+resultObject.State3+'","State4":"'+resultObject.State4+'","State5":"'+resultObject.State5+'","State6":"'+resultObject.State6+'","State7":"'+resultObject.State7+'","State8":"'+resultObject.State8+
      '","State9":"'+resultObject.State9+'","State10":"'+resultObject.State10+'","State11":"'+resultObject.State11+'","State12":"'+resultObject.State12+'","State13":"'+resultObject.State13+'","State14":"'+resultObject.State14+'","State15":"'+resultObject.State15+'","State16":"'+resultObject.State16+'","State17":"'+resultObject.State17+'","State18":"'+resultObject.State18+'","State19":"'+resultObject.State19+'","State20":"'+resultObject.State20+'","State21":"'
      +resultObject.State21+'","State22":"'+resultObject.State22+'","State23":"'+resultObject.State23+'","State24":"'+resultObject.State24+'","State25":"'+resultObject.State25+'","State26":"'+resultObject.State26+'","State27":"'+resultObject.State27+'","State28":"'+resultObject.State28+'","State29":"'+resultObject.State29+'","State30":"'+resultObject.State30+'","State31":"'+resultObject.State31+'","State32":"'+resultObject.State32+'","State33":"'+
      resultObject.State33+'","State34":"'+resultObject.State34+'","State35":"'+resultObject.State35+'"}');
    }
}
      map.forEach(function(value, key) {
        resultSet.push(JSON.parse(value));
      });
      //console.log(resultSet);
      return resultSet;
}

//Function determineStatus to get convert the State in the database to the Y/N State required in the CSV
function determineStatus(status){
  if(status === 'completed'){
      return 'Y';
  }else if(status === 'pending'){
        return 'N';
  }else if(status === 'expired'){
        return ' ';
  }else if(status === 'DEACTIVATED'){
    return 'DEACTIVATED';
  }else if(status === 'in progress'){
    return 'IN PROGRESS';
  }else{
    return '';
  }
}

module.exports = trialCSV;
