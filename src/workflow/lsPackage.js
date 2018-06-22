const { fetchAllPackages } = require('../client')
const spinner = require('../utils/spinner')

function lsPackage (filter) {
  spinner.start()

  let query = {}

  // Add search query param when filtering
  if (filter && filter.length) {
    query.search = {
      fields: ['name', 'description', 'id'],
      value: filter
    }
  }

  const packagesRequest = fetchAllPackages(query)
  packagesRequest.then(spinner.stop, spinner.stop)

  packagesRequest.then(packages => {
    const count = packages.length
    packages.forEach((package, i) => {
      console.log(`${package.name}`)
      console.log(`id: ${package.id}`)

      // New line between each listed package
      if (i < count - 1) {
        console.log()
      }
    })
  })
}

module.exports = lsPackage
