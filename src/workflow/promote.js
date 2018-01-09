const inquirer = require('inquirer')
const jsondiffpatch = require('jsondiffpatch')
const dumpApi = require('../mashery/dumpApi')
const createApi = require('../mashery/createApi')
const promoteApi = require('./adidas/promoteApi')
const spinner = require('../utils/spinner')

const differ = jsondiffpatch.create({
  objectHash: function(obj, index) {
    // try to find an id property, otherwise just use the index in the array
    return obj.id || obj.name || '$$index:' + index
  },
  textDiff: {
    // default 60, minimum string length (left and right sides) to use text diff algorythm: google-diff-match-patch
    minLength: 200
  },
  propertyFilter: function(name, context) {
    return !['created', 'updated'].includes(name)
  },
  cloneDiffValues: true,
  arrays: {
    // default true, detect items moved inside the array (otherwise they will be registered as remove+add)
    detectMove: true,
    // default false, the value of items moved is not included in deltas
    includeValueOnMove: false
  }
})

const DUMP_FIELDS = {
  serviceFields: {
    except: ['created', 'updated', 'endpoints', 'errorSets']
  },
  endpointFields: { except: ['created', 'updated', 'methods'] }
}

function promote(serviceId, options) {
  console.log(`Promoting service '${serviceId}'`)

  spinner.start()

  dumpApi(serviceId, DUMP_FIELDS)
    .then(api => {
      const promote = promoteApi(api, options)
      const delta = differ.diff(promote.source, promote.target)
      spinner.stop()

      jsondiffpatch.console.log(delta)

      return inquirer.prompt([
        {
          name: 'confirm',
          type: 'confirm',
          message: 'Are this valid changes in promoted API?'
        }
      ])
      .then(() => {
        return createApi(promote.target)
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
