const client = require('../client')
const dumpApi = require('./dumpApi')

const DUMP_FIELDS = {
  fields: ['id'],
  endpoint: ['id', 'errors'],
  errorSets: true
}

function errorSetAdd (serviceId, errorSet) {
  let newErrorSet

  return dumpApi(serviceId, DUMP_FIELDS).then(api =>
    client
      .createServiceErrorSet(serviceId, errorSet)
      .then(errorSet => {
        newErrorSet = errorSet
        const endpoints = api.service.endpoints.map(({ id }) => ({
          id,
          errors: { errorSet: { id: errorSet.id } }
        }))
        return client.updateService(serviceId, { endpoints })
      })
      .then(() =>
        Promise.all(
          api.service.errorSets.map(({ id }) =>
            client.deleteServiceErrorSet(serviceId, id)
          )
        )
      )
      .then(() => newErrorSet)
  )
}

module.exports = errorSetAdd
