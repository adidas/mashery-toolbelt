const client = require('../client')

function findOrganization (query) {
  if (!query) {
    throw new Error(`Missing query for finding organization`)
  }

  query = query.trim()

  return client
    .fetchAllOrganizations({
      fields: ['id', 'name'],
      filter: { fields: ['id', 'name'], value: query }
    })
    .then(organizations => {
      const count = organizations.length

      if (count === 1) {
        return organizations[0]
      }

      throw new Error(
        `found '${count}' organizations for query '${query}', but expected 1. Specify query.`
      )
    })
}

module.exports = findOrganization
