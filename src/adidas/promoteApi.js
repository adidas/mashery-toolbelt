// Adidas specific feature
// Promote one api (service with nested entities) to new environment
//   - prepend env to name of service and endpoints (ie: 'DEV name of service')
//   - prepend correct subdomain (ie: qa.internal.domain.com)
//   - prepend 'sit/' to path for SIT environment

const path = require('path')

const ENVIRONMENT = {
  DEV: 'DEV',
  QA: 'QA',
  SIT: 'SIT',
  PRD: 'PRD'
}

const ENV_NAMES = Object.keys(ENVIRONMENT)

function validateEnvironment(environment) {
  environment = environment.toUpperCase()

  if (!ENVIRONMENT[environment]) {
    throw new Error(
      `Invalid environment '${environment}', valid (${ENV_NAMES.join(',')})`
    )
  }

  return environment
}

// Remote any current environment and prepend new one
function promoteName(name, environment) {
  ENV_NAMES.forEach(matchEnv => {
    if (name.startsWith(matchEnv)) {
      name = name.slice(matchEnv.length).trim()
    }
  })

  return `${environment} ${name}`
}

function promoteDomain(domain, environment) {
  ENV_NAMES.forEach(matchEnv => {
    const envDomainPart = `${matchEnv.toLowerCase()}.`
    if (domain.startsWith(envDomainPart)) {
      domain = domain.slice(envDomainPart.length)
    }
  })

  return environment === ENVIRONMENT.PRD
    ? domain
    : `${environment.toLowerCase()}.${domain}`
}

function promoteEndpointPath(endpointPath, environment) {
  if (endpointPath.startsWith('sit/')) {
    endpointPath = endpointPath.slice(4)
  }

  return environment === ENVIRONMENT.SIT
    ? path.join('sit', endpointPath)
    : endpointPath
}

function promoteApi(api, environment, systemDomain) {
  // Clone
  api = JSON.parse(JSON.stringify(api))

  environment = validateEnvironment(environment)

  api.service.name = promoteName(api.service.name, environment)

  api.endpoints.forEach(endpoint => {
    endpoint.name = promoteName(endpoint.name, environment)

    endpoint.trafficManagerDomain = promoteDomain(
      endpoint.trafficManagerDomain,
      environment
    )

    endpoint.publicDomains.forEach(publicDomain => {
      publicDomain.address = promoteDomain(publicDomain.address, environment)
    })

    // Set new backend address
    endpoint.systemDomains.forEach(currentSystemDomain => {
      currentSystemDomain.address = systemDomain
    })

    // requestPathAlias - public path
    // outboundRequestTargetPath - backend path

    endpoint.outboundRequestTargetPath = promoteEndpointPath(
      endpoint.outboundRequestTargetPath,
      environment
    )
  })

  return api
}

module.exports = promoteApi
