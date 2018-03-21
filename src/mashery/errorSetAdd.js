const client = require('../client')
const dumpApi = require('./dumpApi')

const DUMP_FIELDS = {
  serviceFields: ['id'],
  endpointFields: ['id', 'errors'],
  methodFields: false,
  errorSetFields: ['id']
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
      .then(() => {
        return api.service.errorSets.map(({ id }) =>
          client.deleteServiceErrorSet(serviceId, id)
        )
      })
      .then(() => newErrorSet)
  )
}

module.exports = errorSetAdd
