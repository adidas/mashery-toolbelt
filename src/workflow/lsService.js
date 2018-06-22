const { fetchAllServices } = require('../client')
const spinner = require('../utils/spinner')

function lsService (filter) {
  spinner.start()

  let query = {}

  // Add search query param when filtering
  if (filter && filter.length) {
    query.search = {
      fields: ['name', 'description', 'id'],
      value: filter
    }
  }

  const servicesRequest = fetchAllServices(query)
  servicesRequest.then(spinner.stop, spinner.stop)

  servicesRequest.then(services => {
    const count = services.length
    services.forEach((service, i) => {
      console.log(`${service.name}`)
      console.log(`id: ${service.id}`)

      // New line between each listed service
      if (i < count - 1) {
        console.log()
      }
    })
  })
}

module.exports = lsService
