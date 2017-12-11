const dumpApi = require('./mashery/dumpApi')
const createApi = require('./mashery/createApi')
const promoteApi = require('./adidas/promoteApi')
const spinner = require('./utils/spinner')

const DUMP_FIELDS = {
  serviceFields: {
    except: ['id', 'created', 'updated', 'endpoints', 'errorSets']
  },
  endpointFields: { except: ['id', 'created', 'updated', 'methods'] },
  errorSetFields: { except: ['id'] }
}

function promote(serviceId, environemnt, systemDomain) {
  console.log(
    `Promoting service '${serviceId}' to '${environemnt}' on system domain '${
      systemDomain
    }'`
  )

  spinner.start()

  dumpApi(serviceId, DUMP_FIELDS)
    .then(api => {
      const promotedApi = promoteApi(api, environemnt, systemDomain)
      return createApi(promotedApi)
    })
    .then(() => {
      spinner.stop()
      console.log('Promoting done')
    })
    .catch(error => {
      spinner.stop()
      console.error('Promote failed:')
      console.error(error)
    })
}

module.exports = promote
