const service = [
  "id", "name", "description", "created", "updated", "endpoints", "editorHandle",
  "revisionNumber", "robotsPolicy", "crossdomainPolicy", "description",
  "errorSets", "qpsLimitOverall", "rfc3986Encode", "securityProfile", "version"
]

const endpoint = [
  "id", "allowMissingApiKey", "apiKeyValueLocationKey", "apiKeyValueLocations",
  "apiMethodDetectionKey", "apiMethodDetectionLocations", "cache",
  "connectionTimeoutForSystemDomainRequest", "connectionTimeoutForSystemDomainResponse",
  "cookiesDuringHttpRedirectsEnabled", "cors", "created", "customRequestAuthenticationAdapter",
  "dropApiKeyFromIncomingCall", "forceGzipOfBackendCall", "gzipPassthroughSupportEnabled",
  "headersToExcludeFromIncomingCall", "highSecurity", "hostPassthroughIncludedInBackendCallHeader",
  "inboundSslRequired", "jsonpCallbackParameter", "jsonpCallbackParameterValue", "scheduledMaintenanceEvent",
  "forwardedHeaders", "returnedHeaders", "methods", "name", "numberOfHttpRedirectsToFollow",
  "outboundRequestTargetPath", "outboundRequestTargetQueryParameters", "outboundTransportProtocol",
  "processor", "publicDomains", "requestAuthenticationType", "requestPathAlias", "requestProtocol",
  "oauthGrantTypes", "stringsToTrimFromApiKey", "supportedHttpMethods", "systemDomainAuthentication",
  "systemDomains", "trafficManagerDomain", "updated", "useSystemDomainCredentials",
  "systemDomainCredentialKey", "systemDomainCredentialSecret"
]

const method = [
  "id", "name", "created", "updated", "sampleJsonResponse", "sampleXmlResponse"
]

const responseFilters = [
  "id", "name", "created", "updated", "notes", "xmlFilterFields", "jsonFilterFields"
]

const scheduledMaintenanceEvent = [
  "id", "name", "startDateTime", "endDateTime", "endpoints"
]

const endpointCache = [ "clientSurrogateControlEnabled", "contentCacheKeyHeaders" ]

const cors = [ "allDomainsEnabled", "maxAge" ]

const systemDomainAuthentication = [ "type", "username", "certificate", "password" ]

const serviceErrors = [ "id", "created", "updated", "name", "action" ]

const errorSets = [ "id", "name", "type", "jsonp", "jsonpType", "errorMessages" ]

const errorMessages = [ "id", "code", "status", "detailHeader", "responseBody" ]

const cache = [ "cacheTtl" ]

const securityProfile = [ "oauth" ]

const oAuth = [
  "accessTokenTtlEnabled", "accessTokenTtl", "accessTokenType", "allowMultipleToken",
  "authorizationCodeTtl", "forwardedHeaders", "masheryTokenApiEnabled", "refreshTokenEnabled",
  "enableRefreshTokenTtl", "tokenBasedRateLimitsEnabled", "forceOauthRedirectUrl",
  "forceSslRedirectUrlEnabled", "grantTypes", "macAlgorithm", "qpsLimitCeiling",
  "rateLimitCeiling", "refreshTokenTtl", "secureTokensEnabled"
]

const roles = [ "id", "created", "updated", "name", "action" ]

module.exports = {
  service,
  endpoint,
  method,
  responseFilters,
  scheduledMaintenanceEvent,
  cors,
  systemDomainAuthentication,
  serviceErrors,
  errorSets,
  errorMessages,
  cache,
  endpointCache,
  securityProfile,
  oAuth,
}
