const client = require('../client')
const callErrorSetAdd = require('./errorSetAdd')
const extractErrorSet = require('./utils/extractErrorSet')

function updateApi(serviceId, api, { verbose = false } = {}) {
  verbose && console.log(`Updating service ${serviceId}`)

  const { service, errorSet } = extractErrorSet(api)

  return client
    .updateService(serviceId, api.service)
    .then(updatedService => {
      if(errorSet) {
        return callErrorSetAdd(updatedService.id, errorSet).then(() => updatedService)
      }

      return updatedService
    })
    .then(updatedService => {
      verbose && console.log(`Updating done.`)
      return updatedService
    })
    .catch(error => {
      if (verbose) {
        console.error('Updating failed:')
        console.error(error)
      }

      return Promise.reject(error)
    })
}

module.exports = updateApi
