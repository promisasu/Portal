'use strict';

/**
 * Converts a Survey Instance state to a Bootstrap status (css class name)
 * @param {String} state - state of a survey instance
 * @param {Object} options - handlebars helper options, allows for an optional prefix to be defined
 * @returns {String} css status class
 */
function stateToStatus (state, options) {
    let status = null;

    switch (state) {
        case 'completed':
            status = 'success';
            break;
        case 'in progress':
        case 'pending':
            status = '';
            break;
        default:
            status = 'danger';
            break;
    }

    // a custom css class name prefix has been set
    if (options.hash.prefix && status !== '') {
        return `${options.hash.prefix}${status}`;
    }

    return status;
}

module.exports = stateToStatus;
