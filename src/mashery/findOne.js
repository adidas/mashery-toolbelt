const find = require('./utils/find')

/**
 * Find exactly one entity or throw error
 *
 * @example
 * findOne('errorSet', 'My error set', { optional: true })
 *   .then(errorSet => console.log('Found errorSet ', errorSet.id))
 *   .catch(console.error)
 *
 * @param {string} entity - name of entity
 * @param {string|Object} query
 * @param {Object} [options]
 * @param {boolean} [options.optional] - when true allow to return `null` when no match
 * @param {boolean} [options.fields]
 * @returns {Promise<?Object, Error>} found entity
 */
function findOne (entity, query, { optional = false, fields }) {
  return find(entity, query, { limit: 2, fields }).then(entities => {
    const count = entities.length

    if (count > 2) {
      throw new Error(
        `found more than one entitiy '${entity}' with query '${JSON.stringify(
          query
        )}'`
      )
    }

    if (count === 0) {
      if (optional === false) {
        throw new Error(
          `found no entity '${entity}' with query '${JSON.stringify(query)}'`
        )
      }

      return null
    }

    return entities[0]
  })
}

module.exports = findOne
