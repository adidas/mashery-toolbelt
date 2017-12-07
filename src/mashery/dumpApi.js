const client = require('../client')

function dumpApi(serviceId, fields = {}) {
  const {
    serviceFields = { except: ['endpoints', 'errorSets'] },
    endpointFields = { except: ['methods'] },
    errorSetFields = true
  } = fields

  let data = {}

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
      // NOTE: we dont need it call separately, because messages are already with errorSets
      // .then(() => {
      //   const messagesRequests = data.errorSets.map(({ id }) => client.fetchAllErrorMessages(serviceId, id, { fields: true }))
      //   return Promise.all(messagesRequests).then(data => console.log("x", data))
      // })
      // TODO: Download rest of service data
      .then(() => data)
      .catch(error => {
        console.error('Dump failed', error.name, error.message)
      })
  )
}

module.exports = dumpApi
