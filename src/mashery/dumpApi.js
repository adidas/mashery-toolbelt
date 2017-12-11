const client = require('../client')

function dumpApi(serviceId, fields = {}, { verbose = false } = {}) {
  verbose && console.log(`Dumping service ${serviceId}`)

  const {
    serviceFields = { except: ['endpoints', 'errorSets'] },
    endpointFields = { except: ['methods'] },
    errorSetFields = true
  } = fields

  const data = {}

  return (
    client
      .fetchService(serviceId, { fields: serviceFields })
      .then(service => (data.service = service))
      .then(() =>
        client
          .fetchAllServiceEndpoints(serviceId, { fields: endpointFields })
          .then(endpoints => (data.endpoints = endpoints))
      )
      // NOTE: We dont use it anywhere yet?
      // .then(() => {
      //   const methodsRequests = data.endpoints.map(({ id }) => client.fetchAllEndpointMethods(serviceId, id, { fields: true }))
      //   return Promise.all(methodsRequests).then(data => console.log("x", data))
      // })
      .then(() =>
        client
          .fetchAllServiceErrorSets(serviceId, { fields: errorSetFields })
          .then(errorSets => (data.errorSets = errorSets))
      )
      // TODO: Download rest of service data
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
  )
}

module.exports = dumpApi
