// Adidas specific feature
// Promote one api (service with nested entities) to new environment
//   - prepend env to name of service and endpoints (ie: 'DEV name of service')
//   - prepend correct subdomain (ie: qa.internal.domain.com)
//   - prepend 'sit/' to path for SIT environment

const path = require('path')
const makeReplacer = require('./utils/makeReplacer')

// const ENVIRONMENT = {
//   DEV: 'DEV',
//   QA: 'QA',
//   UAT: 'UAT',
//   // NOTE: temporary disable until understanding how it works
//   // SIT: 'SIT',
//   PRD: 'PRD'
// }
//
// const ENV_CHAIN = {
//   [ENVIRONMENT.UAT]: ENVIRONMENT.DEV,
//   [ENVIRONMENT.QA]: ENVIRONMENT.DEV,
//   [ENVIRONMENT.PRD]: ENVIRONMENT.QA
// }
//
// const NEW_ENV_NAMES = [ENVIRONMENT.QA, ENVIRONMENT.PRD]
//
// function validateNewEnvironment(environment) {
//   environment = environment.toUpperCase()
//
//   if (!NEW_ENV_NAMES.includes(environment)) {
//     throw new Error(
//       `Invalid environment '${environment}', API can be promoted only to (${NEW_ENV_NAMES.join(
//         ','
//       )})`
//     )
//   }
//
//   return environment
// }

// function makeNameReplacer(arg, from, to) {
//   return makeReplacer(arg && arg.length ? arg : `${from}*:${to}*`, {
//     name: 'name'
//   })
// }
//
// function makePublicDomainReplacer(arg, from, to) {
//   from = `${from.toLowerCase()}.`
//   to = to === ENVIRONMENT.PROD ? '' : `${to.toLowerCase()}.`
//   return makeReplacer(arg ? arg : `${from}*:${to}*`, {
//     name: 'publicDomain'
//   })
// }

// function validateEndpoints(endpoints, prevEnvironemnt, ignoreOtherEnv) {
//   // Validate endpoints
//   const matchingEndpoints = endpoints.filter(endpoint => {
//     const isValid = endpoint.name.startsWith(prevEnvironemnt)
//
//     if(!isValid && !ignoreOtherEnv) {
//       throw new Error(`Service endpoint '${endpoint.name} is not ${prevEnvironemnt}'`)
//     }
//
//     return isValid
//   })
//
//   if (matchingEndpoints.length === 0) {
//     throw new Error(`Missing any ${prevEnvironemnt} endpoint to promote`)
//   }
//
//   return matchingEndpoints
// }

function promoteApi(api, environment, options = {}) {
  // Clone source
  const sourceApi = JSON.parse(JSON.stringify(api))
  // environment = validateNewEnvironment(environment)
  // const prevEnvironemnt = ENV_CHAIN[environment]
  // sourceApi.service.endpoints = validateEndpoints(api.service.endpoints, prevEnvironemnt, options.ignoreOtherEnv)
  // clone target
  const targetApi = JSON.parse(JSON.stringify(sourceApi))

  // Prepare replacer functions
  const nameReplacer = makeReplacer(options.name, {
    name: 'name'
  })
  // const nameReplacer = makeNameReplacer(
  //   options.name,
  //   prevEnvironemnt,
  //   environment
  // )

  const trafficDomainReplacer = makeReplacer(options.trafficDomain, {
    name: 'trafficDomain'
  })

  const publicDomainReplacer = makeReplacer(options.publicDomain, {
    name: 'publicDomain'
  })
  // const publicDomainReplacer = makePublicDomainReplacer(
  //   options.publicDomain,
  //   prevEnvironemnt,
  //   environment
  // )

  const publicPathReplacer = makeReplacer(options.publicPath, {
    name: 'publicPath',
    required: false
  })

  const endpointDomainReplacer = makeReplacer(options.endpointDomain, {
    name: 'endpointDomain'
  })

  const endpointPathReplacer = makeReplacer(options.publicPath, {
    name: 'endpointPath',
    required: false
  })

  targetApi.service.name = nameReplacer(targetApi.service.name)

  targetApi.service.endpoints.forEach(endpoint => {
    endpoint.name = nameReplacer(endpoint.name)
    endpoint.trafficManagerDomain = trafficDomainReplacer(endpoint.trafficManagerDomain)
    // Public
    endpoint.publicDomains[0].address = publicDomainReplacer(endpoint.publicDomains[0].address)
    endpoint.requestPathAlias = publicPathReplacer(endpoint.requestPathAlias)
    // Endpoint
    endpoint.systemDomains[0].address = endpointDomainReplacer(endpoint.systemDomains[0].address)
    endpoint.outboundRequestTargetPath = endpointPathReplacer(endpoint.outboundRequestTargetPath)

  })

  return { source: sourceApi, target: targetApi }
}

module.exports = promoteApi
