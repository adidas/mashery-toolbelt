const { fetchAllServices } = require('../client')
const spinner = require('../utils/spinner')

const LIMIT = 1000
const ID_MATCH = /[a-zA-Z0-9]+/

function ls(filter) {
  spinner.start()

  let query = { limit: LIMIT }

  // Add search query param when filtering
  if(filter && filter.length) {
    const search = [`name:${filter}`, `description:${filter}`]
    if(filter.match(ID_MATCH)) { search.push(`id:${filter}`)}
    query.search = search.join(',')
  }

  const servicesRequest = fetchAllServices(query)
  servicesRequest.then(spinner.stop, spinner.stop)

  servicesRequest
    .then(services => {
      const count = services.length
      services.forEach((service, i) => {
        console.log(`${service.name}`)
        console.log(`id: ${service.id}`)

        // New line between each listed service
        if(i < count - 1) {
          console.log()
        }
      })
    })
}

module.exports = ls
