const client = require('../client')

const FIELDS = {
  all: true,
  endpoints: { all: true, methods: { all: true } },
  errorSets: true
}

function dumpApi (serviceId, fields = FIELDS, { verbose = false } = {}) {
  verbose && console.log(`Dumping service ${serviceId}`)

  return client
    .fetchService(serviceId, { fields: fields })
    .then(service => {
      verbose && console.log('Dump done')
      return { service }
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
