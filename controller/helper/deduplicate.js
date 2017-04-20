'use strict';

/**
 * @module controller/helper/deduplicate
 */

/**
 * Finds groups of duplicated values and replaces duplicated values with a single value
 * @param {Array<Object>} rows - rows of json data
 * @param {Array<Strings>} properties whose duplicacy to be removed
 * @returns {Array<Object>} returns the rows with duplicacy removed
 */
function deduplicate (rows, properties) {
    const current = {};
    const copyOfRows = Object.assign([], rows);

    return copyOfRows.map((row) => {
        for (const property of properties) {
            if (property === 'date') {
                /* Used to facilitate the comparison of the date coming from
                the database with the date in current[property] */
                row[property] = String(row[property]);
            }
            if (row[property] === current[property]) {
                row[property] = '';
            } else {
                current[property] = row[property];
            }
        }

        return row;
    });
}

module.exports = deduplicate;
