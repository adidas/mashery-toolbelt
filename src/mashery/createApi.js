const client = require('../client')
const callErrorSetAdd = require('./errorSetAdd')

function extractErrorSet({ service: { errorSets, ...service } }) {
  const endpointErrors = []
  let errorSet

  service.endpoints = service.endpoints.map(({errors, ...endpoint}) => {
    if(errors && errors.errorSet && errors.errorSet.id) {
      endpointErrors[endpoint.name] = errors

      if(!errorSet) {
        errorSet = errorSets.find(({id}) => id === errors.errorSet.id)
      }
    }

    return endpoint
  })

  return {
    service: {
      ...service
    },
    endpointErrors,
    errorSet
  }
}

function createApi(api, { verbose = false } = {}) {
  verbose && console.log(`Creating service`)
  api = JSON.parse(JSON.stringify(api))

  const { service, errorSet } = extractErrorSet(api)

  let createdService
  return client
    .createService(service)
    .then(service => {
      createdService = service
      return callErrorSetAdd(service.id, errorSet)
        .catch(error => {
          const rejectError = () => Promise.reject(error)
          return client.deleteService(service.id).then(rejectError, rejectError)
        })
    })
    .then(() => {
      if (verbose) {
        console.log(`Creating done.`)
        console.log(JSON.stringify(createdService, null, 2))
      }

      return createdService
    })
    .catch(error => {
      if (verbose) {
        console.error('Creating failed:')
        console.error(error)
      }

      return Promise.reject(error)
    })
}

module.exports = createApi
