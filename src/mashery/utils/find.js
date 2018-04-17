const client = require('../../client')
const { plural } = require('pluralize')
const casex = require('casex')

/**
 * Find entity by its `name` or `id`
 * @param {string} entity - name of entity to be searched
 * @param {any} query - to be searched
 * @param {Object} options
 * @param {any} [options.fields] - schema of fields to be returned
 * @returns
 */
function find (entity, query, { all = false, required = true, fields }) {
  const method = entityToQueryMethod(entity)

  if (!client[method]) {
    throw new Error(`unknown query method '${method}' for entity '${entity}'`)
  }

  if (!query) {
    throw new Error(`missing query for finding entity by '${method}'`)
  }

  const filter =
    typeof query === 'object' ? query : { fields: ['id', 'name'], value: query }

  return client[method]({
    fields,
    filter
  })
}

/**
 * Convert entity name linke 'service_endpoint' into 'fetchAllServiceEndpoints'
 * @param {string} entity
 * @returns {string}
 */
function entityToQueryMethod (entity) {
  return `fetchAll${plural(casex(entity, 'CaSe'))}`
}

module.exports = find
