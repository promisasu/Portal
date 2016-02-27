'use strict';
/**
 * @module controller/helper/deduplicate
 */
/**
 *
 * @param {Array<Object>} rows - rows of json data
 * @param {Array<Strings>} properties whose duplicacy to be removed
 * @returns {Array<Object>} returns the rows with duplicacy removed
 */
function deduplicate (rows, properties) {
    const current = {};

    return rows.map((row) => {
        for (const property of properties) {
            if (row[property] === current[property]) {
                row[property] = ' ';
            } else {
                current[property] = row[property];
            }
        }
        return row;
    });
}
module.exports = deduplicate;
