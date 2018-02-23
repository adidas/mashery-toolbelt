const client = require('../client')

function createApi(api, { verbose = false } = {}) {
  verbose && console.log(`Creating service`)
  api = JSON.parse(JSON.stringify(api))

  const { service } = api
  service.endpoints = service.endpoints.map(({errors, ...endpoint}) => {
    // if(errors) {
    //   endpoint.errors = {
    //     ...errors,
    //     errorSet: null
    //   }
    // }

    return endpoint
  })

  delete service.errorSets

  return client
    .createService(service)
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
