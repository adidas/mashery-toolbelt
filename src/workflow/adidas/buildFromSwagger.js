const METHODS = ["post", "get", "put", "delete", "head", "patch", "options"]

const defaultService = {}
const defaultEndpoint = {}

function fixName(name) {
  return name.trim().replace('[', '(').replace(']', ')')
}

function buildSingleMethodEnpoints(paths, outboundTransportProtocol) {
  const endpoints = []

  const commonEndpoint = {
    outboundTransportProtocol
  }

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

function buildMultiMethodEnpoints(paths, outboundTransportProtocol) {
  const endpoints = []

  const commonEndpoint = {
    outboundTransportProtocol
  }

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
}, { multiMethodEndpoint, organization, https } = {}) {
  const outboundTransportProtocol = https ? 'https' : 'http';
  const endpoints = multiMethodEndpoint === true
                    ? buildMultiMethodEnpoints(paths, outboundTransportProtocol)
                    : buildSingleMethodEnpoints(paths, outboundTransportProtocol)

  const service = Object.assign(defaultService, {
    name: fixName(info.title),
    description: info.description ? info.description.trim() : null,
    version: info.version
  })

  if(organization) {
    service.organization = {
      id: organization
    }
  }

  service.endpoints = endpoints;

  // TODO:
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

  return {
    service
  }
}

module.exports = buildApiFromSwagger
