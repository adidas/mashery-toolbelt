const client = require('../client')
const callErrorSetAdd = require('./errorSetAdd')
const extractErrorSet = require('./utils/extractErrorSet')

function createApi (api, { verbose = false } = {}) {
  verbose && console.log(`Creating service`)
  api = JSON.parse(JSON.stringify(api))

  const { service, errorSet } = extractErrorSet(api)

  return client
    .createService(service)
    .then(createdService => {
      if (errorSet) {
        return callErrorSetAdd(createdService.id, errorSet)
          .then(() => createdService)
          .catch(error => {
            const rejectError = () => Promise.reject(error)
            return client
              .deleteService(createdService.id)
              .then(rejectError, rejectError)
          })
      }

      return createdService
    })
    .then(createdService => {
      verbose && console.log(`Creating done.`)
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
