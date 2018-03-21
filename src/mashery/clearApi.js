const dumpApi = require('./dumpApi')
const client = require('../client')

const DUMP_FIELDS = {
  serviceFields: ['id'],
  endpointFields: ['id'],
  methodFields: false,
  errorSetFields: ['id']
}

function clearApi (serviceId, { verbose = false } = {}) {
  verbose && console.log(`Clearing service ${serviceId}`)

  return dumpApi(serviceId, DUMP_FIELDS)
    .then(({ service, service: { endpoints, errorSets } }) => {
      return Promise.all([
        ...endpoints.map(endpoint =>
          client.deleteServiceEndpoint(serviceId, endpoint.id)
        ),
        ...errorSets.map(errorSet =>
          client.deleteServiceErrorSet(serviceId, errorSet.id)
        )
      ])
    })
    .then(data => {
      verbose && console.log(`Clearing done`)
      return data
    })
    .catch(err => {
      if (verbose) {
        console.error(`Clearing failed:`)
        console.error(err)
      }

      return Promise.reject(err)
    })
}

module.exports = clearApi
