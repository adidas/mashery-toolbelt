const client = require('../client')

const FIELDS = {
  all: true,
  plans: {
    all: true,
    services: {
      only: ['id', 'name'],
      endpoints: {
        only: ['id', 'name', 'undefinedMethodsAllowed'],
        methods: ['id', 'name']
      }
    }
  }
}

function dumpPackage (packageId, fields = FIELDS, { verbose = false } = {}) {
  verbose && console.log(`Dumping package ${packageId}`)

  return client
    .fetchPackage(packageId, { fields: FIELDS })
    .then(packageEntity => {
      verbose && console.log('Dump done')
      return { package: packageEntity }
    })
    .catch(error => {
      if (verbose) {
        console.error('Dump failed:')
        console.log(error)
      }

      return Promise.reject(error)
    })
}

module.exports = dumpPackage
