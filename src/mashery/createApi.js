const applyChanges = require('./utils/applyChanges')
const clearApi = require('./clearApi')
const client = require('../client')

function createApi(api, { verbose = false } = {}) {
  verbose && console.log(`Creating service`)
  const { service, endpoints, errorSets } = api

  // NOTE: temp updating existing service for debugging, because with my permissions I cant create new service
  // const createService = clearApi('8t7a4qwh2dgk97tjmjxffthd').then(() => {
  //   return applyChanges(
  //     {
  //       toUpdate: [Object.assign(service, { id: '8t7a4qwh2dgk97tjmjxffthd' })]
  //     },
  //     'Service'
  //   ).then(([createdService]) => createdService)
  // })
  const createService = applyChanges({ toCreate: [service] }, 'Service')

  const result = {}
  return createService
    .then(createdService => {
      result.service = createdService

      const endpointsPromise = applyChanges(
        { toCreate: endpoints },
        'ServiceEndpoint',
        createdService.id
      ).then(endpoints => (result.endpoints = endpoints))

      const errorSetsPromise = applyChanges(
        { toCreate: errorSets },
        'ServiceErrorSet',
        createdService.id
      ).then(errorSets => (result.errorSets = errorSets))

      return Promise.all([endpointsPromise, errorSetsPromise])
    })
    .then(() => {
      verbose && console.log(`Creating done`)
      return result
    })
    .catch(err => {
      if (verbose) {
        console.error('Creating failed:')
        console.error(err)
      }

      const returnError = Promise.reject(err)

      // On error, remove service
      if (result.service) {
        return client
          .deleteService(result.service.id)
          .then(() => returnError, () => returnError)
      }

      return returnError
    })
}

module.exports = createApi
