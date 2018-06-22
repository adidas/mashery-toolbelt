const PropTypes = require('prop-types')
const organizationPropType = require('./propTypes/organization')

const {
  arrayOf,
  bool,
  number,
  string,
  object,
  objectOf,
  oneOf,
  oneOfType,
  shape
} = PropTypes

// Shortcut for single value
const value = value => oneOf([value])
// Shortcut for single value with text of USER_INPUT
const userInput = string

// Shortcut for domain:
// 1) "plainstring.com"
// 2) ["plainstring.com"]
// 3) [{address: "www.domain.com"}]
const domainTypePropTypes = oneOfType([
  string,
  arrayOf(oneOfType([string, shape({ address: string.isRequired })]).isRequired)
])

const variablesPropTypes = objectOf(string)

const endpointPropTypes = shape({
  name: string,

  outboundTransportProtocol: oneOf(['http', 'https']),

  /// / Domains and paths
  // Public
  publicDomains: domainTypePropTypes,
  publicPath: string,

  // System
  systemDomains: domainTypePropTypes,
  systemPath: string,

  trafficManagerDomain: string,

  apiKeyValueLocationKey: string,
  apiKeyValueLocations: arrayOf(
    oneOf([
      'request-path',
      'request-parameters',
      'request-header',
      'request-body',
      'custom'
    ])
  ),
  requestAuthenticationType: oneOf([
    'apiKey',
    'apiKeyAndSecret_SHA256',
    'apiKeyAndSecret_MD5'
  ]),

  securityDefinitions: object,
  connectionTimeoutForSystemDomainRequest: number,
  connectionTimeoutForSystemDomainResponse: number,
  dropApiKeyFromIncomingCall: bool,
  processor: shape({
    adapter: string.isRequired,
    preProcessEnabled: bool.isRequired,
    preInputs: objectOf(string),
    postProcessEnabled: bool.isRequired,
    postInputs: objectOf(string)
  }),
  systemDomainAuthentication: oneOfType([
    shape({
      type: value('httpBasic').isRequired,
      username: userInput.isRequired,
      password: userInput.isRequired
    }),
    shape({
      type: value('clientSslCert').isRequired,
      username: userInput.isRequired,
      password: userInput.isRequired
    })
  ]),
  apiMethodDetectionKey: string,
  apiMethodDetectionLocations: arrayOf(
    oneOf([
      'request-path',
      'request-parameters',
      'request-header',
      'request-body',
      'custom'
    ])
  ),
  cors: shape({
    maxAge: number,
    cookiesAllowed: bool,
    domainsAllowed: arrayOf(string),
    headersAllowed: arrayOf(string),
    headersExposed: arrayOf(string),
    subDomainMatchingAllowed: bool,
    allDomainsEnabled: bool
  }),
  headersToExcludeFromIncomingCall: arrayOf(string),
  methods: arrayOf(
    oneOfType([
      string,
      shape({
        name: string.isRequired,
        sampleJsonResponse: string,
        sampleXmlResponse: string
      })
    ])
  )
})

const whiteOrBlacklistEndpointPropTypes = shape({
  name: string,
  path: string,
  httpMethods: arrayOf(string)
})

// Main definition
module.exports = {
  swagger: string.isRequired,
  variables: variablesPropTypes,
  environments: objectOf(variablesPropTypes.isRequired).isRequired,

  service: shape({
    name: string,
    organization: organizationPropType.isRequired,
    version: string,
    errorSet: string,
    description: string,
    revisionNumber: number,
    robotsPolicy: string,
    crossdomainPolicy: string,
    qpsLimitOverall: number,
    rfc3986Encode: bool,
    securityProfile: object // TODO: shape?
  }),

  multipleHttpMethodsPerEndpoint: bool.isRequired,

  endpoint: endpointPropTypes.isRequired,

  individualEndpoints: objectOf(endpointPropTypes),

  whitelistEndpoints: arrayOf(whiteOrBlacklistEndpointPropTypes),

  blacklistEndpoints: arrayOf(whiteOrBlacklistEndpointPropTypes)
}
