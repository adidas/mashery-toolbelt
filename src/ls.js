const { fetchAllServices } = require('./client')
const makeSpinner = require('./utils/spinner')

function ls(filter) {
  const spinner = makeSpinner()
  spinner.start()
  const servicesRequest = fetchAllServices()
  servicesRequest.then(() => spinner.stop(true), () => spinner.stop(true))

  servicesRequest
    .then(services => {
      if(filter !== undefined) {
        return services.filter(({ name }) => name.toLowerCase().includes(filter))
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
