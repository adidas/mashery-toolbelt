const client = require('../client')

// NOTE: updateService can handle creating/updating/deleting of endpoints and endpoints methods
// But for error sets it can't remove existing or create new one
function updateApi(serviceId, api, { verbose = false } = {}) {
  verbose && console.log(`Updating service ${serviceId}`)

  return client
    .updateService(api.service)
    .then(createdService => {
      verbose && console.log(`Updating done.`)
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
