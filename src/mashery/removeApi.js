const applyChanges = require('./utils/applyChanges')

function removeApi(serviceId, { verbose = false } = {}) {
  verbose && console.log(`Removing service ${serviceId}`)
  const service = { id: serviceId }

  return applyChanges({ toDelete: [service] }, 'Service')
    .then(data => {
      verbose && console.log(`Removing done`)

      return data
    })
    .catch(err => {
      if (verbose) {
        console.error(`Removing failed:`)
        console.error(err)
      }

      return Promise.reject(err)
    })
}

module.exports = removeApi
