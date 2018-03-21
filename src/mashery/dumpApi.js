const client = require('../client')

const ENDPOINTS_LIMIT = 1000

function dumpService (data, serviceId, fields) {
  return client
    .fetchService(serviceId, { fields })
    .then(service => (data.service = service))
}

function dumpEndpoints (service, fields) {
  if (fields === false) {
    return
  }

  return client
    .fetchAllServiceEndpoints(service.id, { fields, limit: ENDPOINTS_LIMIT })
    .then(endpoints => (service.endpoints = endpoints))
}

function dumpMethods (service, fields) {
  if (fields === false) {
    return
  }

  return Promise.all(
    service.endpoints.map(endpoint =>
      client
        .fetchAllEndpointMethods(service.id, endpoint.id, { fields })
        .then(methods => (endpoint.methods = methods))
    )
  )
}

function dumpErrorSets (service, fields) {
  if (fields === false) {
    return
  }

  return client
    .fetchAllServiceErrorSets(service.id, { fields })
    .then(errorSets => (service.errorSets = errorSets))
}

function dumpApi (serviceId, fields = {}, { verbose = false } = {}) {
  verbose && console.log(`Dumping service ${serviceId}`)

  const {
    serviceFields = { except: ['endpoints', 'errorSets'] },
    endpointFields = true,
    methodFields = true,
    errorSetFields = true
  } = fields

  const data = {}

  return dumpService(data, serviceId, serviceFields)
    .then(() => dumpEndpoints(data.service, endpointFields, methodFields))
    .then(() => dumpMethods(data.service, methodFields))
    .then(() => dumpErrorSets(data.service, errorSetFields))
    .then(() => {
      verbose && console.log('Dump done')
      return data
    })
    .catch(error => {
      if (verbose) {
        console.error('Dump failed:')
        console.log(error)
      }

      return Promise.reject(error)
    })
}

module.exports = dumpApi
