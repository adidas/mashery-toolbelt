const client = require('../client')

function updateApi (packageId, api, { verbose = false } = {}) {
  verbose && console.log(`Updating package ${packageId}`)

  return client
    .updatePackage(packageId, api.package)
    .then(updatedPackage => {
      verbose && console.log(`Updating done.`)
      return updatedPackage
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
