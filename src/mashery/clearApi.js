const dumpApi = require('./dumpApi')
const applyChanges = require('./utils/applyChanges')

const DUMP_FIELDS = {
  serviceFields: ['id'],
  endpointFields: ['id'],
  errorSetFields: ['id']
}

function clearApi(serviceId, { verbose = false } = {}) {
  verbose && console.log(`Clearing service ${serviceId}`)

  return dumpApi(serviceId, DUMP_FIELDS)
    .then(({ service, endpoints, errorSets }) => {
      return Promise.all([
        applyChanges({ toDelete: endpoints }, 'ServiceEndpoint', service.id),
        applyChanges({ toDelete: errorSets }, 'ServiceErrorSet', service.id)
      ])
    })
    .then(data => {
      verbose && console.log(`Clearing done`)
      return data
    })
    .catch(err => {
      if(verbose) {
        console.error(`Clearing failed:`)
        console.error(err)
      }

      return Promise.reject(err)
    })
}

module.exports = clearApi
