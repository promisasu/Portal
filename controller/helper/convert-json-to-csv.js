'use strict';

/**
 * ConversionOption has all the settings for displaying a single column in a CSV.
 * @typedef {Object} ConversionOption
 * @property {String} label - column title
 * @property {String} key - key in data object that will be used as source for column values
 * @property {String} default - value to be used if no other value is found
 */

/**
 * Converts JSON data into Comma Seperated Values
 * @param {Array<Object>} data - JSON data to convert
 * @param {Array<ConversionOption>} configuration - options to configure output
 * @returns {String} results of transform
 */
function convertJsonToCsv (data, configuration) {
    // create the spreadsheet header from the labels
    const header = configuration
    .map((item) => {
        return item.label;
    })
    .join(',');

    // format the body of data
    const body = data
    .map((row) => {
        return configuration
        .map((column) => {
            // check if there is a value for current column
            // if there is: return value wrapped in double quotes
            // otherwise: use default value
            if (row[column.key]) {
                return '"'.concat(row[column.key], '"');
            }

            return '"'.concat(column.default, '"');
        })
        .join(',');
    })
    .join('\n');

    return header.concat('\n', body);
}

module.exports = convertJsonToCsv;
