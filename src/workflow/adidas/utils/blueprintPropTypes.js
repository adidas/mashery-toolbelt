const PropTypes = require('prop-types')

const { arrayOf, bool, number, string, object, objectOf, oneOf, oneOfType, shape } = PropTypes

// Shortcut for single value
const value = (value) => oneOf([value])
// Shortcut for single value with text of USER_INPUT
const userInput = string
// Shortcut for domain domain: [{address: "www.domain.com"}]
const domainType = arrayOf(shape({address: string.isRequired}))

// Main definition
module.exports = {
  endpoint: shape({
    outboundTransportProtocol: oneOf(['http', 'https']),

    //// Domains and paths
    // Public
    publicDomains: domainType,
    requestPathAlias: string,

    // System
    systemDomains: domainType,
    outboundRequestTargetPath: string,

    trafficManagerDomain: string,

    securityDefinitions: object,
    connectionTimeoutForSystemDomainRequest: number,
    connectionTimeoutForSystemDomainResponse: number,
    dropApiKeyFromIncomingCall: bool,
    processor: shape({
      adapter: string.isRequired,
      preProcessEnabled: bool.isRequired,
      preInputs: objectOf(string),
      postProcessEnabled: bool.isRequired,
      postInputs: objectOf(string),
    }),
    systemDomainAuthentication: oneOfType([
      shape({
        type: value("httpBasic").isRequired,
        username: userInput.isRequired,
        password: userInput.isRequired,
      }),
      shape({
        type: value("clientSslCert").isRequired,
        username: userInput.isRequired,
        password: userInput.isRequired,
      })
    ]),
    apiMethodDetectionKey: string,
    apiMethodDetectionLocations: arrayOf(
      oneOf(['request-path', 'request-parameters', 'request-header', 'request-body', 'custom'])
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
    headersToExcludeFromIncomingCall: string,
    methods: arrayOf(
      shape({
        "name": string.required,
        "sampleJsonResponse": string,
        "sampleXmlResponse": string
      })
    )
  })
}
