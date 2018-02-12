const dumpApi = require('../mashery/dumpApi')
const createApi = require('../mashery/createApi')
const modifyValues = require('./adidas/modifyValues')
const spinner = require('../utils/spinner')
const confirmChanges = require('../utils/confirmChanges')

const DUMP_FIELDS = {
  serviceFields: {
    except: ['id', 'created', 'updated', 'endpoints', 'errorSets']
  },
  endpointFields: { except: ['id', 'created', 'updated', 'methods'] }
}

function promote(serviceId, options) {
  console.log(`Promoting service '${serviceId}'`)

  spinner.start()

  dumpApi(serviceId, DUMP_FIELDS)
    .then(api => {
      return confirmChanges({
        before: api,
        after: modifyValues(api, options),
        message: 'Are this valid changes in promoted API?',
        action: newData => {
          spinner.start()
          return createApi(newData)
        },
      })
    })
    .then(newService => {
      spinner.stop()
      console.log('Promoting done')
      console.log(`Service id=${newService.id}`)
    })
    .catch(error => {
      spinner.stop()
      console.error('Promote failed:')
      console.error(error)
    })
}

module.exports = promote
