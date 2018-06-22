const client = require('../client')
const spinner = require('../utils/spinner')
const makeBlueprintParser = require('./adidas/makeBlueprintParser')
const servicePropTypes = require('./adidas/utils/serviceBlueprintPropTypes')
// const makeServiceFromBlueprint = require('./adidas/resolveServiceBlueprint')
// const confirmChanges = require('../utils/confirmChanges')

const loadBlueprint = makeBlueprintParser(servicePropTypes)

const SPLIT_PATH_PATTERN = /(?<!\\)\./

function syncBlueprintService (blueprintPath, options) {
  const environment = options.environment
  const blueprintValues = parseBlueprintValues(options.set)

  console.log(`Creating service from blueprint file '${blueprintPath}'`)
  spinner.start()

  loadBlueprint(blueprintPath, blueprintValues).then(data => {
    console.log(data)
  })
  //   .then(makeServiceFromBlueprint)
  //   .then(serviceData => {
  //     spinner.stop()

  //     if (serviceData.service.id) {
  //       updateService(serviceData)
  //     } else {
  //       createService(serviceData)
  //     }
  //   })
}

// function updateService (serviceData) {
//   return confirmChanges({
//     before: serviceData.persisted,
//     after: serviceData.service,
//     message: 'Is this valid update of service?',
//     action: updatedData => {
//       spinner.start()
//       return client.updateService(serviceData.service.id, updatedData)
//     }
//   })
//     .then(updatedService => {
//       spinner.stop()
//       console.log(
//         `Service updated. https://adidas.admin.mashery.com/control-center/api-definitions/${
//           updatedService.id
//         }`
//       )
//     })
//     .catch(error => {
//       console.error('Updating failed:')
//       console.error(error)
//     })
// }

// function createService (serviceData) {
//   return confirmChanges({
//     before: {},
//     after: serviceData.service,
//     message: 'Is this valid structure of new service?',
//     action: newData => {
//       spinner.start()
//       return client.createService(newData)
//     }
//   })
//     .then(newService => {
//       spinner.stop()
//       console.log(
//         `Service created. https://adidas.admin.mashery.com/control-center/api-definitions/${
//           newService.id
//         }`
//       )
//     })
//     .catch(error => {
//       console.error('Creating failed:')
//       console.error(error)
//     })
// }

// TODO: extract to module
function parseBlueprintValues (pairs) {
  if (pairs) {
    return pairs.reduce((result, pair) => {
      const match = pair.match(
        /^\s*(?<path>[a-zA-Z0-9-_\s\.\\(){}[\]]+?)\s*=\s*(?<value>.*?)\s*$/
      )

      if (!match) {
        throw new Error(`Cannot parse --set argument with value "${pair}"`)
      }

      const pathParts = match.groups.path.split(SPLIT_PATH_PATTERN)

      pathParts.reduce((nestedResult, part, índex) => {
        if (nestedResult[part]) {
          throw new Error(`--set argument with value "${pair}" is duplicated`)
        }
        nestedResult[part] =
          pathParts.length - 1 === índex ? match.groups.value : {}
        return nestedResult[part]
      }, result)

      return result
    }, {})
  }

  return {}
}

module.exports = syncBlueprintService
