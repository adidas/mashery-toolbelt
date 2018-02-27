const { fetchAllServices } = require('../client')
const spinner = require('../utils/spinner')

const LIMIT = 1000
const ID_MATCH = /[a-zA-Z0-9]+/

function ls(filter) {
  spinner.start()

  const search = [`name:${filter}`, `description:${filter}`]
  if(filter.match(ID_MATCH)) { search.push(`id:${filter}`)}

  const servicesRequest = fetchAllServices({limit: LIMIT, search: search.join(',')})
  servicesRequest.then(spinner.stop, spinner.stop)

  servicesRequest
    .then(services => {
      const count = services.length
      services.forEach((service, i) => {
        console.log(`${service.name}`)
        console.log(`id: ${service.id}${i < count - 1 ? "\n" : ""}`)
      })
    })
}

module.exports = ls
