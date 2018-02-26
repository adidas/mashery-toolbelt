const fs = require('fs')
const spinner = require('../../utils/spinner')
const callErrorSetAdd = require('../../mashery/errorSetAdd')

function errorSetAdd(serviceId, errorSetPath) {
  console.log(`Adding error set ${errorSetPath} to service ${serviceId}`)

  spinner.start()

  const json = fs.readFileSync(errorSetPath, 'utf8')
  const errorSet = JSON.parse(json)

  callErrorSetAdd(serviceId, errorSet)
    .then(newErrorSet => {
      spinner.stop()
      console.log('Error Set created and assigned to all endpoints')
      console.log(newErrorSet)
    })
    .catch(err => {
      spinner.stop()
      console.error('Creating failed:')
      console.error(err)
    })
}

module.exports = errorSetAdd
