const loadBlueprint = require('./loadBlueprint')

const METHODS = ["post", "get", "put", "delete", "head", "patch", "options"]

const defaultService = {}
const defaultEndpoint = {}

function fixName(name) {
  return name.trim().replace('[', '(').replace(']', ')')
}

function buildSingleMethodEnpoints(paths, commonEndpoint) {
  const endpoints = []

  Object.keys(paths).forEach(path => {
    const methods = paths[path]

    Object.keys(methods).forEach(methodName => {
      // Skip other properties
      if(!METHODS.includes(methodName)) {
        return
      }

      const methodDetails = methods[methodName]
      const endpoint = Object.assign({}, defaultEndpoint, commonEndpoint, {
        name:  fixName(methodDetails.summary),
        supportedHttpMethods: [ methodName ],
        requestPathAlias: path,
        outboundRequestTargetPath: path,
        // TODO: add required query params
        // outboundRequestTargetQueryParameters
      })

      endpoints.push(endpoint)
    })
  })

  return endpoints
}

function buildMultiMethodEnpoints(paths, commonEndpoint) {
  const endpoints = []

  Object.keys(paths).forEach(path => {
    const methods = paths[path]

    let pathName
    const supportedHttpMethods = []

    Object.keys(methods).forEach(methodName => {
      // Get name for whole path
      if(methodName === 'x-summary') {
        pathName = methods[methodName]

        return
      }

      // Skip other properties
      if(!METHODS.includes(methodName)) {
        return
      }

      supportedHttpMethods.push(methodName)
    })

    const endpoint = Object.assign({}, defaultEndpoint, commonEndpoint, {
      name: fixName(pathName),
      supportedHttpMethods,
      requestPathAlias: path,
      outboundRequestTargetPath: path,
    })

    endpoints.push(endpoint)
  })

  return endpoints
}

function buildApiFromSwagger({
  info,
  schemes,
  securityDefinitions,
  paths,
}, {
  blueprint: blueprintPath,
  https,
  multiMethodEndpoint,
  organization
} = {}) {
  let commonEndpoint = {};

  if(blueprintPath) {
    commonEndpoint = loadBlueprint(blueprintPath).then(({endpoint}) => endpoint)
  }

  return Promise.resolve(commonEndpoint).then(commonEndpoint => {
    if(!commonEndpoint.outboundTransportProtocol) {
      commonEndpoint.outboundTransportProtocol = https ? 'https' : 'http'
    }

    const endpoints = multiMethodEndpoint === true
                      ? buildMultiMethodEnpoints(paths, commonEndpoint)
                      : buildSingleMethodEnpoints(paths, commonEndpoint)

    const service = Object.assign(defaultService, {
      name: fixName(info.title),
      description: info.description ? info.description.trim() : null,
      version: info.version
    })

    if(organization) {
      service.organization = {
        id: organization.trim()
      }
    }

    service.endpoints = endpoints;

    return {
      service
    }
  })
}

module.exports = buildApiFromSwagger

// from swagger:
// "securityDefinitions": {
//   "API Key": {
//     "type": "apiKey",
//     "in": "header",
//     "name": "x-api-key"
//   }
// },
//
// to endpoint:
// {
//   "apiKeyValueLocationKey": "x-api-key",
//   "apiKeyValueLocations": [
//     "request-header"
//     "request-parameters",
//     "request-body"
//   ],
//   "apiMethodDetectionKey": "1",
//   "apiMethodDetectionLocations": [
//     "request-path"
//   ],
// }
