const client = require('../client')

function createApi(api, { verbose = false } = {}) {
  verbose && console.log(`Creating service`)

  return client
    .createService(api.service)
    .then(createdService => {
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
