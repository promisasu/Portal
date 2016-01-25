'use strict';

/**
 * @module api/helper/group-by
 */

/**
 * Groups an {Array} of {Object} by values of a specific key
 * @param {Array<Object>} array - Array to group
 * @param {String} key - Object key to group values by
 * @returns {Array<Array<Object>>} an {Array} of {Array} with {Object} having the same value on a specific key
 */
function groupBy (array, key) {
    const groupedArray = [];

    // get unique values
    const uniqueValues = new Set(array.map((element) => {
        return element[key];
    }));

    // gather objects that have the same value
    for (const value of uniqueValues) {
        const group = array.filter((element) => {
            return element[key] === value;
        });

        groupedArray.push(group);
    }

    return groupedArray;
}

module.exports = groupBy;
