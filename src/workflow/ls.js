const { fetchAllServices } = require('../client')
const spinner = require('../utils/spinner')

function ls(filter) {
  spinner.start()
  const servicesRequest = fetchAllServices()
  servicesRequest.then(spinner.stop, spinner.stop)

  servicesRequest
    .then(services => {
      // TODO: mashery api somehow supports filter query param. Try it
      if(filter !== undefined) {
        return services.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
      }

      return services
    })
    .then(services => {
      const count = services.length
      services.forEach((service, i) => {
        console.log(`${service.name}`)
        console.log(`id: ${service.id}${i < count - 1 ? "\n" : ""}`)
      })
    })
}

module.exports = ls
