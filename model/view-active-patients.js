'use strict';

/**
 * Registers view with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @param {String} salt - salt value to use when hashing password
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * patient that has not been deactivated
     * @typedef {Object} ActivePatient
     */
    sequelize.query(
        `
        CREATE OR REPLACE VIEW active_patients AS
        SELECT *
        FROM patient
        WHERE deletedAt IS NULL
        `,
        {
            raw: true
        }
    );
}

module.exports = register;
