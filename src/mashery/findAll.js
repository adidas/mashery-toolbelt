const find = require('./utils/find')

/**
 * Find exactly one entity or throw error
 *
 * @example
 * findAll('errorSet', 'My error set')
 *   .then(errorSets => console.log('Found errorSets ', errorSets))
 *   .catch(console.error)
 *
 * @param {string} entity - name of entity
 * @param {string} query
 * @param {Object} [options]
 * @param {boolean} [options.limit=9999]
 * @param {boolean} [options.fields]
 * @returns {Promise<Array<Object>, Error>} found entity
 */
function findAll (entity, query, { limit = 9999, fields }) {
  return find(entity, query, { limit, fields })
}

module.exports = findAll
